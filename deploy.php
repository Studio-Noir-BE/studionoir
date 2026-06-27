<?php

namespace Deployer;

require 'recipe/common.php';

// vars
$hostIp = 'hostIp';
$repository = 'git@github.com:Studio-Noir-BE/boilerplate.git';
$user = 'boilerplate';

$deployPathBase = "/data/sites/web/{$user}/apps/";

// Configuration
set('keep_releases', 3);
set('writable_mode', 'chmod');
set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('repository', $repository);
set('default_stage', 'production');

set('shared_files', [
    '.env',
]);

set('shared_dirs', [
    'storage',
    'translations',
    'web/uploads',
    '/web/cache'
]);

set('writable_dirs', [
    'web/uploads',
]);

set('clear_paths', [
    '.git',
    'src',
    '.gitignore',
    'deploy.php',
    'package.json',
    'yarn.lock',
    'composer.json',
    'composer.lock',
    '.env.example',
]);

// apps
host('production')
    ->setHostname($hostIp)
    ->setRemoteUser($user)
    ->set('deploy_path', $deployPathBase . 'production')
    ->set('branch', 'main')
    ->set('labels', ['stage' => 'production']);

// tasks
desc('Deploy your project');
task('deploy', [
    'deploy:prepare',
    'deploy:vendors',
    'deploy:clear_paths',
    'craft:sync_project_config',
    'craft:clear_caches',
    'deploy:publish',
]);

task('craft:sync_project_config', function() {
    run('cd {{release_path}} && ./craft migrate/all');
    run('cd {{release_path}} && ./craft project-config/apply');
});

task('craft:clear_caches', function() {
    run('cd {{release_path}} && ./craft clear-caches/all');
});

after('deploy:failed', 'deploy:unlock');
