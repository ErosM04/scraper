<?php

    include 'request.php';
    $dom = getDOM($amazonLink . '/S-S-COLOR-GO-Riflesssante/dp/B076QP8H6D/ref=sr_1_1?qid=1675272714&s=beauty&sr=1-1&srs=13773664031');
    $shit = $dom->query('//div[@class="imgTagWrapper"]/img/@src');

    foreach($shit as $node)
        echo 'node : ' . $node->nodeValue . '<br><br>';

?>