<?php

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// Sanitize: resolve path and ensure it stays within public/
$publicDir = realpath(__DIR__.'/public');
$requestedPath = realpath(__DIR__.'/public'.$uri);

if ($uri !== '/' && $requestedPath !== false && str_starts_with($requestedPath, $publicDir) && is_file($requestedPath)) {
    return false;
}

require_once __DIR__.'/public/index.php';
