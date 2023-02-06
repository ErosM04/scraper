<?php
    static $amazonLink =  'https://www.amazon.it';

    function getDOM($link){
        // Use internal libxml errors -- turn on in production, off for debugging
        libxml_use_internal_errors(true);

        if(isset($link) && !empty($link)){
            $dom = new DomDocument;
            $dom->loadHTMLFile($link);
            return new DomXPath($dom);
        }
    }

    function jsonEncode($arr){
        header("Content-type: application/json");
        echo json_encode($arr);
    }

    function printArray($arr){
        foreach($arr as $i => $node){
            foreach($node as $key => $value){
                echo '[' . $i . " : " . $value . '] ';
            }
            echo '<br>';
        }
    }

    function readNodeValue($arr, $index){
        if(isset($arr[$index]))
            return $arr[$index]->nodeValue;
        else 
            return '';
    }
?>