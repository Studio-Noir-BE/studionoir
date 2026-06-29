<?php

use craft\helpers\App;

return [
    'checkDevServer' => true,
	'devServerInternal' => 'http://localhost:3000',
	'devServerPublic' => App::env('PRIMARY_SITE_URL') . ':3000',
	'serverPublic' => '/dist/',
	'useDevServer' => App::env('CRAFT_ENVIRONMENT') === 'dev',
    'manifestPath' => '@webroot/dist/.vite/manifest.json',
    'errorEntry' => 'src/js/app.js',
    'cacheKeySuffix' => '',
    'includeReactRefreshShim' => false,
    'includeModulePreloadShim' => true,
    'criticalPath' => '@webroot/dist/criticalcss',
    'criticalSuffix' =>'_critical.min.css',
];