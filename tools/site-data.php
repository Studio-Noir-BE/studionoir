<?php
/**
 * Shared content for the Studio Noir website.
 * Kept in one place so the static renderer and (later) Craft can reuse it.
 */

return [
    'nav' => [
        ['label' => 'diensten',         'url' => 'diensten.html',  'key' => 'diensten'],
        ['label' => 'over Studio Noir', 'url' => 'over.html',      'key' => 'over'],
        ['label' => 'inzichten',        'url' => 'inzichten.html', 'key' => 'inzichten'],
        ['label' => 'contact',          'url' => 'contact.html',   'key' => 'contact'],
    ],

    'socials' => [
        ['label' => 'LinkedIn',  'url' => 'https://www.linkedin.com/'],
        ['label' => 'Instagram', 'url' => 'https://www.instagram.com/'],
        ['label' => 'Facebook',  'url' => 'https://www.facebook.com/'],
    ],

    // Compact cards (home + over)
    'services' => [
        [
            'title' => 'Maatwerk website',
            'desc'  => 'Volledig op maat gebouwd in Craft CMS. Uniek design, flexibele structuur en toekomstgericht.',
            'price' => 'Vanaf €899',
            'url'   => 'diensten-detail.html',
        ],
        [
            'title' => 'Compacte infosite',
            'desc'  => 'Snel online, professioneel en betaalbaar. Ideaal voor starters en kleine ondernemingen.',
            'price' => 'Vanaf €299',
            'url'   => 'diensten.html',
        ],
        [
            'title' => 'SEO & GEO optimalisatie',
            'desc'  => 'Inbegrepen bij elke website. Technische SEO, meta-tags en meer.',
            'badge' => 'Inbegrepen',
            'url'   => 'diensten.html',
        ],
        [
            'title' => 'Hosting & onderhoud',
            'desc'  => 'Snelle, veilige hosting met SSL en maandelijks onderhoud.',
            'url'   => 'diensten.html',
        ],
    ],

    // Expanded blocks (diensten page)
    'services_detail' => [
        [
            'title' => 'Maatwerk website',
            'price' => 'Vanaf €899',
            'desc'  => "Volledig op jouw maat gebouwd in Craft CMS. Een uniek ontwerp en flexibele structuur die perfect aansluiten bij jouw merk, met snelle en veilige technologie.",
            'cta'   => 'Meer info',
            'url'   => 'diensten-detail.html',
        ],
        [
            'title' => 'Compacte infosite',
            'price' => 'Vanaf €299',
            'desc'  => "Eén strakke, professionele landingspagina met alles wat een bezoeker moet weten. Razendsnel en veilig dankzij statische technologie. Wij bezorgen je een preview op aanvraag — op basis van alle info die we over jou kunnen vinden, zonder verplichtingen. Optioneel onderhoudscontract mogelijk.",
            'cta'   => 'Contacteer ons',
            'url'   => 'contact.html',
        ],
        [
            'title' => 'SEO & GEO optimalisatie',
            'price' => 'Inbegrepen*',
            'desc'  => "Zichtbaar zijn in Google én bij AI-zoekmachines zoals ChatGPT en Gemini. Wij zorgen voor een eenmalige, grondige optimalisatie: technisch, inhoudelijk, lokaal én toekomstgericht.",
            'note'  => '* Basis SEO en GEO focus is inbegrepen. Wil je meer dan alleen basis of heb je vragen hierover? Contacteer ons.',
            'cta'   => 'Contacteer ons',
            'url'   => 'contact.html',
        ],
        [
            'title' => 'Hosting & onderhoud',
            'price' => 'Op aanvraag',
            'desc'  => "Webhostingprijs op aanvraag (~€150/j). Onderhoud voor compacte infosites via een maandelijks contract. Voor maatwerk websites beheer je zelf de inhoud via Craft CMS; extra werk wordt in regie aangerekend.",
            'cta'   => 'Contacteer ons',
            'url'   => 'contact.html',
        ],
    ],

    'faq' => [
        ['q' => 'Wat kost een website laten maken bij Studio NOIR?', 'a' => 'Een compacte infosite start vanaf €299, een maatwerk website vanaf €899. De exacte prijs hangt af van je wensen — vraag vrijblijvend een offerte aan.'],
        ['q' => 'Hoe lang duurt het om een website te laten maken?', 'a' => 'Een compacte infosite leveren we doorgaans binnen 1 à 2 weken op. Voor maatwerk rekenen we, afhankelijk van de omvang, op enkele weken.'],
        ['q' => 'Wat is het verschil tussen een infosite en maatwerk?', 'a' => 'Een compacte infosite is sneller en kostenefficiënter — ideaal voor starters die professioneel online willen staan. Maatwerk biedt een uniek design en een volledig flexibele structuur.'],
        ['q' => 'Doet Studio NOIR ook SEO?', 'a' => 'Ja. Bij elke website is een basis SEO- en GEO-optimalisatie inbegrepen: technisch, inhoudelijk én gericht op AI-zoekmachines. Meer diepgaande optimalisatie kan op aanvraag.'],
        ['q' => 'Kan ik mijn website zelf beheren na oplevering?', 'a' => 'Zeker. Maatwerk websites worden gebouwd in Craft CMS, waarmee je zelf eenvoudig teksten, afbeeldingen en pagina\'s beheert — zonder technische kennis.'],
        ['q' => 'Neemt Studio NOIR ook hosting en onderhoud op zich?', 'a' => 'Ja, we voorzien snelle en veilige hosting met SSL en bieden maandelijkse onderhoudscontracten aan, zodat jij je geen zorgen hoeft te maken.'],
        ['q' => 'Hoe begin ik met een website bij Studio NOIR?', 'a' => 'Stuur ons een berichtje of vraag een offerte aan. We bekijken samen je wensen en bezorgen je vrijblijvend een voorstel.'],
    ],
];
