<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BadgeDefinition;
use App\Models\LearningModule;
use App\Models\QuizQuestion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

/**
 * CRUD generik untuk Materi, Kuis, dan Badge (FR-13, FR-03, FR-10, FR-12, FR-14).
 * Satu controller + satu halaman React (Admin/Content) melayani ketiganya.
 */
class ContentController extends Controller
{
    private function definitions(): array
    {
        $attacks = ['phishing', 'bruteforce', 'sqli', 'auth'];
        $levels = ['Beginner', 'Intermediate', 'Advanced'];

        return [
            'materi' => [
                'model' => LearningModule::class,
                'title' => 'Kelola Materi',
                'description' => 'Tambah dan ubah materi pembelajaran, lengkap dengan tingkat Beginner, Intermediate, atau Advanced.',
                'columns' => ['sort_order', 'title', 'attack_type', 'difficulty', 'status'],
                'order' => ['sort_order', 'asc'],
                'fields' => [
                    ['name' => 'title', 'label' => 'Judul', 'type' => 'text', 'rules' => 'required|string|max:200'],
                    ['name' => 'attack_type', 'label' => 'Jenis serangan', 'type' => 'select', 'options' => $attacks, 'rules' => 'required|in:' . implode(',', $attacks)],
                    ['name' => 'difficulty', 'label' => 'Level', 'type' => 'select', 'options' => $levels, 'rules' => 'required|in:' . implode(',', $levels)],
                    ['name' => 'summary', 'label' => 'Ringkasan', 'type' => 'textarea', 'rules' => 'nullable|string|max:500'],
                    ['name' => 'content', 'label' => 'Isi materi', 'type' => 'textarea', 'rules' => 'nullable|string'],
                    ['name' => 'document', 'label' => 'Dokumen materi (opsional)', 'type' => 'file', 'help' => 'PDF, Word, atau PowerPoint. Maksimal 10 MB.', 'rules' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240'],
                    ['name' => 'sort_order', 'label' => 'Urutan', 'type' => 'number', 'rules' => 'required|integer|min:0'],
                    ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['draft', 'published'], 'rules' => 'required|in:draft,published'],
                ],
            ],
            'kuis' => [
                'model' => QuizQuestion::class,
                'title' => 'Kelola Kuis',
                'description' => 'Kelola soal pilihan ganda. Jawaban benar harus sama persis dengan salah satu pilihan.',
                'columns' => ['question', 'attack_type', 'difficulty'],
                'order' => ['id', 'desc'],
                'fields' => [
                    ['name' => 'attack_type', 'label' => 'Jenis serangan', 'type' => 'select', 'options' => $attacks, 'rules' => 'required|in:' . implode(',', $attacks)],
                    ['name' => 'difficulty', 'label' => 'Level', 'type' => 'select', 'options' => $levels, 'rules' => 'required|in:' . implode(',', $levels)],
                    ['name' => 'question', 'label' => 'Pertanyaan', 'type' => 'textarea', 'rules' => 'required|string|max:1000'],
                    ['name' => 'options', 'label' => 'Pilihan jawaban', 'type' => 'lines', 'help' => 'Satu pilihan per baris, minimal 2.', 'rules' => 'required|array|min:2|max:6'],
                    ['name' => 'correct_answer', 'label' => 'Jawaban benar', 'type' => 'text', 'help' => 'Tulis persis sama dengan salah satu pilihan.', 'rules' => 'required|string|max:300'],
                    ['name' => 'explanation', 'label' => 'Penjelasan', 'type' => 'textarea', 'rules' => 'nullable|string|max:1000'],
                ],
            ],
            'badge' => [
                'model' => BadgeDefinition::class,
                'title' => 'Kelola Badge',
                'description' => 'Kelola daftar badge beserta kriteria untuk mendapatkannya.',
                'columns' => ['name', 'description', 'criteria'],
                'order' => ['id', 'asc'],
                'fields' => [
                    ['name' => 'name', 'label' => 'Nama badge', 'type' => 'text', 'rules' => 'required|string|max:100'],
                    ['name' => 'description', 'label' => 'Deskripsi', 'type' => 'text', 'rules' => 'required|string|max:300'],
                    ['name' => 'criteria', 'label' => 'Kriteria', 'type' => 'text', 'rules' => 'required|string|max:300'],
                ],
            ],
        ];
    }

    private function def(string $resource): array
    {
        $defs = $this->definitions();
        abort_unless(isset($defs[$resource]), 404);

        return $defs[$resource];
    }

    public function index(string $resource): Response
    {
        $def = $this->def($resource);
        $model = $def['model'];
        [$col, $dir] = $def['order'];

        $items = $model::query()->orderBy($col, $dir)->limit(200)->get()->map(function ($row) use ($def) {
            $data = $row->toArray();
            foreach ($def['fields'] as $f) {
                $name = $f['name'];
                if ($f['type'] === 'lines') {
                    $data[$name] = implode("\n", (array) ($data[$name] ?? []));
                } elseif (array_key_exists($name, $data) && $data[$name] === null) {
                    $data[$name] = '';
                }
            }

            // Path file bersifat internal, jangan dikirim ke browser
            unset($data['document_path']);
            if (array_key_exists('document_name', $data) && $data['document_name'] === null) {
                $data['document_name'] = '';
            }

            return $data;
        })->values();

        return Inertia::render('Admin/Content', [
            'resource' => [
                'key' => $resource,
                'title' => $def['title'],
                'description' => $def['description'],
                'columns' => $def['columns'],
                'fields' => collect($def['fields'])
                    ->map(fn ($f) => collect($f)->only(['name', 'label', 'type', 'options', 'help'])->all())
                    ->all(),
            ],
            'items' => $items,
        ]);
    }

    public function store(Request $request, string $resource): RedirectResponse
    {
        $def = $this->def($resource);
        $model = $def['model'];
        $model::create($this->validated($request, $resource, $def));

        return back();
    }

    public function update(Request $request, string $resource, int $id): RedirectResponse
    {
        $def = $this->def($resource);
        $model = $def['model'];
        $row = $model::findOrFail($id);
        $row->update($this->validated($request, $resource, $def, $row));

        return back();
    }

    public function destroy(string $resource, int $id): RedirectResponse
    {
        $def = $this->def($resource);
        $model = $def['model'];
        $row = $model::findOrFail($id);

        if (! empty($row->document_path)) {
            Storage::disk('local')->delete($row->document_path);
        }

        $row->delete();

        return back();
    }

    /** Unduh dokumen materi (hanya admin, file disimpan privat). */
    public function document(int $id)
    {
        $row = LearningModule::findOrFail($id);

        abort_unless($row->document_path && Storage::disk('local')->exists($row->document_path), 404);

        return Storage::disk('local')->download($row->document_path, $row->document_name ?: 'dokumen');
    }

    private function validated(Request $request, string $resource, array $def, $existing = null): array
    {
        $rules = [];

        foreach ($def['fields'] as $f) {
            $name = $f['name'];

            if ($f['type'] === 'file') {
                $rules[$name] = $f['rules'];
                continue;
            }

            if ($f['type'] === 'lines') {
                $raw = preg_split('/\r\n|\r|\n/', (string) $request->input($name, ''));
                $lines = array_values(array_filter(array_map('trim', $raw), fn ($l) => $l !== ''));
                $request->merge([$name => $lines]);
                $rules[$name . '.*'] = ['string', 'max:300'];
            }

            $rules[$name] = $f['rules'];
        }

        $data = $request->validate($rules);

        if ($resource === 'kuis' && ! in_array($data['correct_answer'], $data['options'], true)) {
            throw ValidationException::withMessages([
                'correct_answer' => 'Jawaban benar harus sama persis dengan salah satu pilihan.',
            ]);
        }

        // Proses unggahan dokumen (field bertipe file)
        foreach ($def['fields'] as $f) {
            if ($f['type'] !== 'file') {
                continue;
            }

            unset($data[$f['name']]);
            $file = $request->file($f['name']);

            if ($file) {
                if ($existing && $existing->document_path) {
                    Storage::disk('local')->delete($existing->document_path);
                }
                $data['document_path'] = $file->store('materi-documents', 'local');
                $data['document_name'] = mb_substr($file->getClientOriginalName(), 0, 200);
            } elseif ($existing && $request->boolean('remove_document')) {
                if ($existing->document_path) {
                    Storage::disk('local')->delete($existing->document_path);
                }
                $data['document_path'] = null;
                $data['document_name'] = null;
            }
        }

        return $data;
    }
}
