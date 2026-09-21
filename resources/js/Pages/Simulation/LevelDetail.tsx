import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

interface LevelDetailProps {
  simulationId: string;
  level: number;
  maxScore: number;
  unlocked: boolean;
  completed: boolean;
  levelScore?: number;
  floors: {
    floorNumber: number;
    title: string;
    completed: boolean;
    playable: boolean;
    bestPoints?: number;
    maxPoints: number;
  }[];
}

export default function LevelDetail({
  simulationId,
  level,
  maxScore,
  unlocked,
  completed,
  levelScore,
  floors,
}: LevelDetailProps) {
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <Head title={`Level ${level} Locked`} />
          <h1 className="text-3xl font-bold mb-4">Level {level} Terkunci</h1>
          <p className="text-gray-600 mb-6">
            Selesaikan level sebelumnya dengan skor minimal 15 untuk membuka level ini.
          </p>
          <Link
            href={`/simulasi/${simulationId}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Head title={`Level ${level}`} />
      <div className="max-w-3xl">
        <Link
          href={`/simulasi/${simulationId}`}
          className="mb-6 inline-block text-indigo-600 hover:underline"
        >
          ← Kembali ke Detail Simulasi
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Level {level}</h1>
          <div className="text-right">
            {completed && levelScore !== undefined && (
              <p className="text-lg font-semibold">
                Skor Level: {levelScore}/{maxScore}
              </p>
            )}
            {!completed && <p className="text-gray-500">Belum diselesaikan</p>}
          </div>
        </div>

        <div className="space-y-3">
          {floors.map((floor) => (
            <div
              key={floor.floorNumber}
              className={`p-4 border rounded-lg ${floor.playable ? "bg-white" : "bg-gray-100 opacity-50"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    Floor {floor.floorNumber}: {floor.title}
                    {!floor.playable && <span className="ml-2 text-sm text-gray-500">(Locked)</span>}
                  </h2>
                  {floor.completed && floor.bestPoints !== undefined && (
                    <p className="text-sm text-gray-600 mt-1">
                      Best: {floor.bestPoints}/{floor.maxPoints}
                    </p>
                  )}
                </div>
                {floor.playable && (
                  <Link
                    href={`/simulasi/${simulationId}/level/${level}/floor/${floor.floorNumber}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    {floor.completed ? "Mainkan Lagi" : "Mulai"}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}