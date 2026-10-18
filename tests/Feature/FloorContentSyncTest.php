<?php

namespace Tests\Feature;

use Tests\TestCase;

class FloorContentSyncTest extends TestCase
{
    private const SIMULATIONS = ['phishing', 'bruteforce', 'sqli', 'auth'];

    private const CHOICE_IDS = ['safe', 'neutral', 'risky'];

    public function test_level1_floor_content_files_exist_for_every_lab(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            for ($floor = 1; $floor <= 5; $floor++) {
                $this->assertFileExists($this->floorPath($simulationId, $floor));
            }
        }
    }

    public function test_level1_floor_content_metadata_matches_registry(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            for ($floor = 1; $floor <= 5; $floor++) {
                $content = file_get_contents($this->floorPath($simulationId, $floor));

                $this->assertStringContainsString(sprintf('id: "%s_level_1_floor_%d"', $simulationId, $floor), $content);
                $this->assertStringContainsString(sprintf('simulationId: "%s"', $simulationId), $content);
                $this->assertStringContainsString('levelNumber: 1', $content);
                $this->assertStringContainsString(sprintf('floorNumber: %d', $floor), $content);
                $this->assertStringContainsString('from "@/features/simulation/types/simulation"', $content);
            }
        }
    }

    public function test_floor_choice_points_config_matches_ts_content_points(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            for ($floor = 1; $floor <= 5; $floor++) {
                $tsPoints = $this->parseChoicePoints(
                    file_get_contents($this->floorPath($simulationId, $floor))
                );

                $this->assertSame(
                    self::CHOICE_IDS,
                    array_keys($tsPoints),
                    "Pilihan di {$simulationId} floor {$floor} harus safe/neutral/risky berurutan."
                );

                $configPoints = config(sprintf('simulation.floor_choice_points.%s.1.%d', $simulationId, $floor))
                    ?? config('simulation.choice_points');

                $this->assertSame(
                    $tsPoints,
                    $configPoints,
                    "Poin config untuk {$simulationId} floor {$floor} tidak sinkron dengan file TS."
                );
            }
        }
    }

    public function test_every_floor_declares_max_points_of_four(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            for ($floor = 1; $floor <= 5; $floor++) {
                $content = file_get_contents($this->floorPath($simulationId, $floor));

                $this->assertMatchesRegularExpression('/maxPoints: 4,/', $content);
                $this->assertSame(4, max($this->parseChoicePoints($content)));
            }
        }
    }

    /**
     * @return array<string, int>
     */
    private function parseChoicePoints(string $content): array
    {
        preg_match_all(
            '/id: "(safe|neutral|risky)",\s*label: "(?:[^"\\\\]|\\\\.)*",\s*points: (-?\d+)/',
            $content,
            $matches,
            PREG_SET_ORDER
        );

        $points = [];
        foreach ($matches as $match) {
            $points[$match[1]] = (int) $match[2];
        }

        return $points;
    }

    private function floorPath(string $simulationId, int $floor): string
    {
        return resource_path(sprintf('js/features/simulation/data/%s/level-1/floor-%d.ts', $simulationId, $floor));
    }
}
