<?php

namespace Tests\Feature;

use Tests\TestCase;

class FloorContentSyncTest extends TestCase
{
    private const SIMULATIONS = ['phishing', 'bruteforce', 'sqli', 'auth'];

    /**
     * Jumlah floor per level yang wajib ada (harus sinkron dengan simulation.levels).
     *
     * @var array<int, int>
     */
    private const LEVEL_FLOORS = [1 => 5, 2 => 5, 3 => 6, 4 => 7];

    private const CHOICE_IDS = ['safe', 'neutral', 'risky'];

    public function test_floor_content_files_exist_for_every_lab_and_level(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            foreach (self::LEVEL_FLOORS as $level => $floorCount) {
                for ($floor = 1; $floor <= $floorCount; $floor++) {
                    $this->assertFileExists($this->floorPath($simulationId, $level, $floor));
                }
            }
        }
    }

    public function test_floor_content_metadata_matches_registry(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            foreach (self::LEVEL_FLOORS as $level => $floorCount) {
                for ($floor = 1; $floor <= $floorCount; $floor++) {
                    $content = file_get_contents($this->floorPath($simulationId, $level, $floor));

                    $this->assertStringContainsString(sprintf('id: "%s_level_%d_floor_%d"', $simulationId, $level, $floor), $content);
                    $this->assertStringContainsString(sprintf('simulationId: "%s"', $simulationId), $content);
                    $this->assertStringContainsString(sprintf('levelNumber: %d', $level), $content);
                    $this->assertStringContainsString(sprintf('floorNumber: %d', $floor), $content);
                    $this->assertStringContainsString('from "@/features/simulation/types/simulation"', $content);
                }
            }
        }
    }

    public function test_floor_choice_points_config_matches_ts_content_points(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            foreach (self::LEVEL_FLOORS as $level => $floorCount) {
                for ($floor = 1; $floor <= $floorCount; $floor++) {
                    $tsPoints = $this->parseChoicePoints(
                        file_get_contents($this->floorPath($simulationId, $level, $floor))
                    );

                    $this->assertSame(
                        self::CHOICE_IDS,
                        array_keys($tsPoints),
                        "Pilihan di {$simulationId} level {$level} floor {$floor} harus safe/neutral/risky berurutan."
                    );

                    $configPoints = config(sprintf('simulation.floor_choice_points.%s.%d.%d', $simulationId, $level, $floor))
                        ?? config('simulation.choice_points');

                    $this->assertSame(
                        $tsPoints,
                        $configPoints,
                        "Poin config untuk {$simulationId} level {$level} floor {$floor} tidak sinkron dengan file TS."
                    );
                }
            }
        }
    }

    public function test_every_floor_declares_max_points_matching_its_choice_points(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            foreach (self::LEVEL_FLOORS as $level => $floorCount) {
                for ($floor = 1; $floor <= $floorCount; $floor++) {
                    $content = file_get_contents($this->floorPath($simulationId, $level, $floor));
                    $tsPoints = $this->parseChoicePoints($content);

                    $this->assertMatchesRegularExpression('/maxPoints: -?\d+,/', $content);
                    $this->assertSame(
                        max($tsPoints),
                        $this->parseMaxPoints($content),
                        "maxPoints {$simulationId} level {$level} floor {$floor} harus sama dengan poin pilihan tertingginya."
                    );
                }
            }
        }
    }

    public function test_every_floor_has_the_configured_floor_count_for_its_level(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            foreach (self::LEVEL_FLOORS as $level => $floorCount) {
                $expectedFloorCount = config(sprintf('simulation.levels.%s.%d.floorCount', $simulationId, $level - 1));

                $this->assertNotNull(
                    $expectedFloorCount,
                    "Konfigurasi level {$level} untuk {$simulationId} tidak ditemukan."
                );

                $this->assertSame(
                    (int) $expectedFloorCount,
                    $floorCount,
                    "Konten level {$level} {$simulationId} memuat {$floorCount} floor, sedangkan config menyatakan {$expectedFloorCount}."
                );
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

    private function parseMaxPoints(string $content): int
    {
        preg_match('/maxPoints: (-?\d+),/', $content, $matches);

        return (int) ($matches[1] ?? 0);
    }

    private function floorPath(string $simulationId, int $level, int $floor): string
    {
        return resource_path(sprintf('js/features/simulation/data/%s/level-%d/floor-%d.ts', $simulationId, $level, $floor));
    }
}
