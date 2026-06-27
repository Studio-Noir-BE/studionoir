<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

/**
 * Blitz config.php
 *
 * This file exists only as a template for the Blitz settings.
 * It does nothing on its own.
 *
 * Don't edit this file, instead copy it to 'craft/config' as 'blitz.php'
 * and make your changes there to override default settings.
 *
 * Once copied to 'craft/config', this file will be multi-environment aware as
 * well, so you can have different settings groups for each environment, just as
 * you do for 'general.php'
 */

use craft\helpers\App;

return [
    '*' => [
        // With this setting enabled, Blitz will begin caching pages according to the included/excluded URI patterns. Disable this setting to prevent Blitz from caching any new pages.
        'cachingEnabled' => filter_var(App::env('BLITZ_ENABLED'), FILTER_VALIDATE_BOOLEAN),
        
        // With this setting enabled, Blitz will log detailed messages to `storage/logs/blitz.log`.
        'debug' => filter_var(App::env('BLITZ_DEBUG'), FILTER_VALIDATE_BOOLEAN),

        // With this setting enabled, Blitz will provide template performance hints in a utility.
        'hintsEnabled' => filter_var(App::env('BLITZ_HINTS'), FILTER_VALIDATE_BOOLEAN),
    ],
];