<?php
    include 'request.php';
    $categoryListLink = '/b?ie=UTF8&node=13773664031';
    $dom = getDOM($amazonLink . $categoryListLink);
    $links = $dom->query("//div/ul/li/span/a/@href");
    $categories = $dom->query('//div[@class="a-section a-spacing-none"]/ul/li/span/a/span/text()');
    $json;
    
    for ($i = 0; $i < sizeof($categories) - 1; $i++){
        $json[] = [
            'category' => $categories[$i]->nodeValue,
            'link' => $links[$i]->nodeValue
        ];
    }

    jsonEncode($json);
?>