<?php

use craft\helpers\App;

return [
    '*' => [
        'enabled' => false,
        'enableCpProtection' => false,
        'loginPath' => 'knock-knock/who-is-there',
        'template' => '',
        'forcedRedirect' => '',
        'password' => 'password123',
        'siteSettings' => [],
        'checkInvalidLogins' => false,
        'invalidLoginWindowDuration' => '3600',
        'maxInvalidLogins' => 10,
        'allowIps' => ['83.134.188.108'],
        'denyIps' => [],
        'useRemoteIp' => false,
        'protectedUrls' => [],
        'unprotectedUrls' => [],
    ],
    'staging' => [
        'enabled' => true,
        'useRemoteIp' => true
    ],
];