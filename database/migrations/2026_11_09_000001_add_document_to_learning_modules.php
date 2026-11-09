<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('learning_modules')) {
            return;
        }

        Schema::table('learning_modules', function (Blueprint $t) {
            if (! Schema::hasColumn('learning_modules', 'document_path')) {
                $t->string('document_path', 255)->nullable()->after('content');
            }
            if (! Schema::hasColumn('learning_modules', 'document_name')) {
                $t->string('document_name', 200)->nullable()->after('document_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('learning_modules', function (Blueprint $t) {
            if (Schema::hasColumn('learning_modules', 'document_name')) {
                $t->dropColumn('document_name');
            }
            if (Schema::hasColumn('learning_modules', 'document_path')) {
                $t->dropColumn('document_path');
            }
        });
    }
};
