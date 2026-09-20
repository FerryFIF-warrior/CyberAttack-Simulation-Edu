<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SimulationAttemptController extends Controller
{
    public function attempt(Request $request, string $simulationId, int $levelNumber, int $floorNumber): JsonResponse
    {
        $user = Auth::user();
        if (! $user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $validated = $request->validate([
            'choice_id' => ['required', Rule::in(['safe', 'neutral', 'risky'])],
        ]);

        // Get floor configuration
        $levelConfigs = config('simulation.levels.'.$simulationId);
        if (! $levelConfigs || ! isset($levelConfigs[$levelNumber - 1])) {
            return response()->json(['success' => false, 'message' => 'Invalid simulation or level'], 404);
        }

        $levelConfig = $levelConfigs[$levelNumber - 1];
        $floorConfig = $this->getFloorContent($simulationId, $levelNumber, $floorNumber);
        if (! $floorConfig) {
            return response()->json(['success' => false, 'message' => 'Floor not found'], 404);
        }

        // Find choice and calculate points
        $choice = collect($floorConfig['story']['choices'])->firstWhere('id', $validated['choice_id']);
        if (! $choice) {
            return response()->json(['success' => false, 'message' => 'Invalid choice'], 400);
        }

        $floorPoints = $choice['points'];

        // Get or create user progress
        $progress = $user->simulationProgress()->firstOrCreate(
            ['simulation_id' => $simulationId],
            ['progress_data' => $this->getInitialProgress($simulationId)]
        );

        $progressData = $progress->progress_data;
        $levelIndex = $levelNumber - 1;
        $floorIndex = $floorNumber - 1;

        if (! isset($progressData['levels'][$levelIndex]['floors'][$floorIndex])) {
            return response()->json(['success' => false, 'message' => 'Invalid floor index'], 400);
        }

        $floorProgress = &$progressData['levels'][$levelIndex]['floors'][$floorIndex];
        $floorProgress['completed'] = true;
        $floorProgress['best_points'] = max($floorProgress['best_points'] ?? 0, $floorPoints);

        // Recalculate level score
        $levelProgress = &$progressData['levels'][$levelIndex];
        $rawScore = collect($levelProgress['floors'])->sum('best_points');
        $levelProgress['raw_score'] = $rawScore;
        $levelProgress['level_score'] = max(0, min($rawScore, $levelProgress['max_score']));
        $levelProgress['completed'] = collect($levelProgress['floors'])->every(fn ($f) => $f['completed']);
        $levelProgress['mastered'] = $levelProgress['level_score'] === $levelProgress['max_score'];

        // Unlock next level if threshold met
        if ($levelProgress['completed'] && $levelProgress['level_score'] >= 15) {
            $nextLevelIndex = $levelIndex + 1;
            if (isset($progressData['levels'][$nextLevelIndex])) {
                $progressData['levels'][$nextLevelIndex]['unlocked'] = true;
            }
        }

        // Recalculate simulation totals
        $completedFloorCount = collect($progressData['levels'])->flatMap(fn ($l) => $l['floors'])->filter(fn ($f) => $f['completed'])->count();
        $totalScore = collect($progressData['levels'])->sum('level_score');
        $progressData['completed_floor_count'] = $completedFloorCount;
        $progressData['total_score'] = $totalScore;
        $progressData['completion_percent'] = round(($completedFloorCount / $progressData['total_floor_count']) * 100);
        $progressData['mastery_percent'] = round(($totalScore / $progressData['max_score']) * 100);

        // Badges
        $earnedBadges = [];
        $level1 = $progressData['levels'][0] ?? null;
        $level2 = $progressData['levels'][1] ?? null;
        if ($level1 && $level2 && $level1['level_score'] === 20 && $level2['level_score'] === 20) {
            $earnedBadges[] = 'beginner';
        }
        if (collect($progressData['levels'])->every(fn ($l) => $l['level_score'] === 20)) {
            $earnedBadges[] = 'suhu';
        }
        $progressData['earned_badges'] = $earnedBadges;

        $progress->progress_data = $progressData;
        $progress->save();

        $isLastFloor = $floorNumber === $levelConfig['floorCount'];
        $nextLevelUnlocked = false;
        if ($isLastFloor && isset($progressData['levels'][$levelIndex + 1])) {
            $nextLevelUnlocked = $progressData['levels'][$levelIndex + 1]['unlocked'] ?? false;
        }

        return response()->json([
            'success' => true,
            'floor_points' => $floorPoints,
            'level_raw_score' => $levelProgress['raw_score'],
            'level_score' => $levelProgress['level_score'],
            'level_completed' => $levelProgress['completed'],
            'next_level_unlocked' => $nextLevelUnlocked,
        ]);
    }

    public function progress(Request $request): JsonResponse
    {
        $user = Auth::user();
        if (! $user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $progress = $user->simulationProgress()->get()->keyBy('simulation_id');

        $result = [];
        foreach ($progress as $simulationId => $p) {
            $result[$simulationId] = $p->progress_data;
        }

        return response()->json([
            'success' => true,
            'progress' => $result,
        ]);
    }

    private function getFloorContent(string $simulationId, int $levelNumber, int $floorNumber): ?array
    {
        // For MVP, return hardcoded floor-1 content for phishing level 1
        if ($simulationId === 'phishing' && $levelNumber === 1 && $floorNumber === 1) {
            return [
                'story' => [
                    'choices' => [
                        ['id' => 'safe', 'points' => 4],
                        ['id' => 'neutral', 'points' => 1],
                        ['id' => 'risky', 'points' => -2],
                    ],
                ],
            ];
        }

        return null;
    }

    private function getInitialProgress(string $simulationId): array
    {
        $levelConfigs = config('simulation.levels.'.$simulationId) ?? [];
        $levels = [];

        foreach ($levelConfigs as $index => $config) {
            $floors = [];
            for ($i = 1; $i <= $config['floorCount']; $i++) {
                $floors[] = [
                    'floor_number' => $i,
                    'completed' => false,
                    'best_points' => 0,
                    'max_points' => $config['maxScore'] / $config['floorCount'], // simplified
                ];
            }
            $levels[] = [
                'level_number' => $index + 1,
                'completed' => false,
                'mastered' => false,
                'unlocked' => $index === 0,
                'raw_score' => 0,
                'level_score' => 0,
                'max_score' => $config['maxScore'],
                'floors' => $floors,
            ];
        }

        return [
            'simulation_id' => $simulationId,
            'completed_floor_count' => 0,
            'total_floor_count' => 30,
            'completion_percent' => 0,
            'total_score' => 0,
            'max_score' => 100,
            'mastery_percent' => 0,
            'earned_badges' => [],
            'levels' => $levels,
        ];
    }
}
