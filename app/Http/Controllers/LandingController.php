<?php

namespace App\Http\Controllers;

use App\Support\LabCatalog;
use Illuminate\View\View;

class LandingController extends Controller
{
    public function __invoke(): View
    {
        return view('landing', [
            'labs' => LabCatalog::all(),
        ]);
    }
}
