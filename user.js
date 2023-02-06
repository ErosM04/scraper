function getcategories(){
    fetch('http://localhost/scraper/categories_scraper.php')
    .then((response) => response.json())
    .then((data) => {
        createElement('h1', 'Categorie:');

        for (const key in data) {
            createElement('button', data[key]['category'], data[key]['link']);
            createElement('br');
            createElement('br');
        }
    })
}

function getProducts(link){
    fetch('http://localhost/scraper/products_list_scraper.php?catlink=' + link)
        .then((response) => response.json())
        .then((data) => {
            document.body.innerHTML = '';

            for (const element in data) {
                createElement('img', data[element]['img']);
                createElement('h3', data[element]['product']);
                createElement('h4', data[element]['price'] + '€');
                createElement('h4', data[element]['stars'] + ' stelle');
                createElement('a', 'Compra', data[element]['link']);
                createElement('br');
                createElement('br');
                document.body.appendChild(document.createElement('hr'));
                createElement('br');
                createElement('br');
            }
        });
}

function createElement(type, data, link, append = true){
    var el = document.createElement(type);

    if(type == 'img')
        el.src = data;
    else if(type.substring(0,1) == 'h')
        el.innerHTML = data;
    else if(type == 'a'){
        el.innerHTML = data;
        link.replace('\/', '/');
        el.href = 'https://www.amazon.it' + link;
    }else if(type = 'button'){
        el.innerHTML = data;
        el.setAttribute('onclick', 'getProducts("' + link +'")')
    }

    if(append)
        document.body.appendChild(el);
    
    return el;
}

getcategories();

/*
img : "https://m.media-amazon.com/images/I/51aphEGSOzL._AC_UL320_.jpg"
link : "/Maybelline-Correttore-Cancella-Occhiaie-Confezione/dp/B00NPXEEC4/ref=ice_ac_b_dpb?qid=1675678472&rdc=1&s=beauty&sr=1-1&srs=13773664031"
price : "7,19"
product : "Maybelline New York Correttore Liquido Il Cancella Età, con Bacche di Goji e Haloxyl, Copre Occhiaie e Piccole Rughe, 02 Nude, 6,8 ml"
stars : "4.4"
*/