<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\ConfigController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class);
Route::apiResource('templates', TemplateController::class)->only(['index', 'store']);
Route::get('audit-log', [AuditLogController::class, 'index']);
Route::get('config', [ConfigController::class, 'index']);
