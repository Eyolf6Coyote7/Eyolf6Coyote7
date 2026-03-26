<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class ConfigController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'app_name' => config('app.name'),
            'app_env' => config('app.env'),
            'debug' => config('app.debug'),
            'timezone' => config('app.timezone'),
            'locale' => config('app.locale'),
            'db_connection' => config('database.default'),
            'cache_driver' => config('cache.default'),
        ]);
    }
}
