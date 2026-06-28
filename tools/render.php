<?php
/**
 * Static site renderer for the Studio Noir public website.
 *
 * Renders the pure-Twig templates in templates/figma/ to static HTML in docs/,
 * injecting the hashed CSS/JS produced by `vite build` (read from the Vite
 * manifest) and copying the built assets + images.
 *
 * Usage:  php tools/render.php
 * Requires: twig/twig (composer install in tools/) and a prior `npm run build`.
 */

require __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$root      = dirname(__DIR__);
$dist      = $root . '/web/dist-site';
$docs      = $root . '/docs';
$templates = $root . '/templates';

/* ---- Load the Vite manifest to resolve hashed asset names ---------------- */
$manifestPath = $dist . '/.vite/manifest.json';
if (!is_file($manifestPath)) {
    $manifestPath = $dist . '/manifest.json'; // fallback (older Vite)
}
if (!is_file($manifestPath)) {
    fwrite(STDERR, "Vite manifest not found. Run `npm run build` first.\n");
    exit(1);
}
$manifest = json_decode(file_get_contents($manifestPath), true);
$entry    = $manifest['src/js/site.js'] ?? null;
if (!$entry) {
    fwrite(STDERR, "No 'src/js/site.js' entry in the Vite manifest.\n");
    exit(1);
}
$assets = [
    'css' => array_map(fn ($f) => 'assets/' . basename($f), $entry['css'] ?? []),
    'js'  => ['assets/' . basename($entry['file'])],
];

/* ---- Twig environment ---------------------------------------------------- */
$loader = new FilesystemLoader($templates);
$twig   = new Environment($loader, ['autoescape' => 'html']);

$site = require __DIR__ . '/site-data.php';

/* ---- Pages --------------------------------------------------------------- */
$pages = [
    'index.html'            => ['tpl' => 'figma/pages/home.twig',             'title' => 'Websites met karakter', 'navActive' => '',          'headerTheme' => 'light'],
    'diensten.html'         => ['tpl' => 'figma/pages/diensten.twig',         'title' => 'Onze diensten',         'navActive' => 'diensten',  'headerTheme' => 'light'],
    'diensten-detail.html'  => ['tpl' => 'figma/pages/diensten-detail.twig',  'title' => 'Maatwerk website',      'navActive' => 'diensten',  'headerTheme' => 'light'],
    'over.html'             => ['tpl' => 'figma/pages/over.twig',             'title' => 'Over Studio Noir',      'navActive' => 'over',      'headerTheme' => 'light'],
    'inzichten.html'        => ['tpl' => 'figma/pages/inzichten.twig',        'title' => 'Inzichten',             'navActive' => 'inzichten', 'headerTheme' => 'dark'],
    'inzichten-detail.html' => ['tpl' => 'figma/pages/inzichten-detail.twig', 'title' => 'Inzicht',               'navActive' => 'inzichten', 'headerTheme' => 'light'],
    'contact.html'          => ['tpl' => 'figma/pages/contact.twig',          'title' => 'Contact',               'navActive' => 'contact',   'headerTheme' => 'dark'],
    'privacy.html'          => ['tpl' => 'figma/pages/privacy.twig',          'title' => 'Privacy Policy',        'navActive' => '',          'headerTheme' => 'dark'],
    'voorwaarden.html'      => ['tpl' => 'figma/pages/voorwaarden.twig',      'title' => 'Algemene voorwaarden',  'navActive' => '',          'headerTheme' => 'dark'],
];

/* ---- Output dir ---------------------------------------------------------- */
function rrm(string $path): void
{
    if (is_dir($path) && !is_link($path)) {
        foreach (scandir($path) as $f) {
            if ($f === '.' || $f === '..') continue;
            rrm("$path/$f");
        }
        @rmdir($path);
    } elseif (file_exists($path)) {
        @unlink($path);
    }
}

/* Clean previously generated output so stale hashed assets don't pile up. */
rrm($docs . '/assets');
rrm($docs . '/img');
foreach (glob($docs . '/*.html') ?: [] as $f) {
    @unlink($f);
}
if (!is_dir($docs)) {
    mkdir($docs, 0755, true);
}

function rcopy(string $src, string $dst): void
{
    if (!is_dir($src)) return;
    @mkdir($dst, 0755, true);
    foreach (scandir($src) as $f) {
        if ($f === '.' || $f === '..') continue;
        $s = "$src/$f";
        $d = "$dst/$f";
        is_dir($s) ? rcopy($s, $d) : copy($s, $d);
    }
}

/* Copy built assets + public files into docs/ */
rcopy($dist . '/assets', $docs . '/assets');
rcopy($dist . '/img', $docs . '/img');

$count = 0;
foreach ($pages as $out => $cfg) {
    $context = array_merge([
        'site'            => $site,
        'assets'          => $assets,
        'assetBase'       => '',
        'title'           => $cfg['title'],
        'navActive'       => $cfg['navActive'],
        'headerTheme'     => $cfg['headerTheme'],
        'services_detail' => $site['services_detail'],
    ], $cfg['extra'] ?? []);

    $html = $twig->render($cfg['tpl'], $context);
    file_put_contents($docs . '/' . $out, $html);
    $count++;
    echo "  ✓ $out\n";
}

/* GitHub Pages: disable Jekyll so files/dirs starting with _ are served */
file_put_contents($docs . '/.nojekyll', '');

echo "\nRendered $count pages to docs/\n";
