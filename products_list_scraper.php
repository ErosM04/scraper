<?php
    if(isset($_GET['catlink'])){
        include 'request.php';
        
        $dom = getDOM(
            $amazonLink . $_GET['catlink'] . '&srs=' . $_GET['srs'] . '&bbn=' . $_GET['bbn'] . '&dc=' . $_GET['dc'] . '&qid=' . $_GET['qid'] . '&ref=' . $_GET['ref']);
        $products = $dom->query('//h2/a/span/text()');
        $productsLinks = $dom->query('//div[@class="a-section a-spacing-base"]/div/span/a/@href');
        $imgLinks = $dom->query('//span/a/div/img/@src');
        $prices = $dom->query('//a/span/span/span[@class="a-price-whole"]/text()');
        $stars = $dom->query('//span/a/i/span/text()');
        $json = array();

        for ($i = 0; $i < sizeof($products); $i++){
            if(isset($stars[$i]))
                $stars[$i]->nodeValue = floatval(str_replace(',', '.', substr($stars[$i]->nodeValue, 0, 3)));

            $json[] = [
                'product' => readNodeValue($products, $i),
                'link' => readNodeValue($productsLinks, $i),
                'img' => readNodeValue($imgLinks, $i),
                'price' => readNodeValue($prices, $i),
                'stars' => readNodeValue($stars, $i)
            ];
        }

        jsonEncode($json);
    }
?>