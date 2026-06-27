<?php

use craft\helpers\App;

return [
    // Enable exception logging
    'enabled' => APP::env('BUGSNAG_ENABLED'),

    // Project Server API key
    'serverApiKey' => APP::env('BUGSNAG_SERVER_KEY'),

    // Project Browser API key
    'browserApiKey' => APP::env('BUGSNAG_BROWSER_KEY'),

    // Release stage
    'releaseStage' => APP::env('CRAFT_ENVIRONMENT'),

    // App version
    'appVersion' => '',

    // Release stages to log exceptions in
    'notifyReleaseStages' => ['production'],

    // Sensitive attributes to filter out, like 'password'
    'filters' => [],

    // Metadata to send with every request
    'metaData' => [],

    // Blacklist certain exception types like 404s
    'blacklist' => [],
];