function getCategories(){
    fetch('http://localhost/scraper/categories_scraper.php')
    .then((response) => response.json())
    .then((data) => {
        let container = createElement('div');
        let div = createElement('div');
        let btn = document.createElement('button');
        let caret = document.createElement('span');
        let list = document.createElement('ul');
        let text = document.createElement('p');
        text.innerHTML = 'Categorie';
        text.style.fontSize = 32;

        container.className = 'centred';
        div.className = 'dropdown';
        btn.className = 'btn btn-primary dropdown-toggle selector';
        btn.setAttribute('type', 'button');
        btn.setAttribute('data-toggle', 'dropdown');
        caret.className = 'caret';
        list.className = 'dropdown-menu';
        
        container.appendChild(div);
        div.appendChild(btn);
        btn.appendChild(text);
        btn.appendChild(caret);
        div.appendChild(list);

        for (const key in data) {
            var li = createElement('li', 0, 0, false);
            list.appendChild(li);
            let voice = document.createElement('a');
            voice.setAttribute('onclick', 'getProducts("' + data[key]['link'] +'")');
            voice.innerHTML = data[key]['category'];
            li.appendChild(voice);
        }
    })
}

function getProducts(link){
    fetch('http://localhost/scraper/products_list_scraper.php?catlink=' + link)
        .then((response) => response.json())
        .then((data) => {
            document.body.innerHTML = '';
            createElement('br');

            for (const element in data) {
                let container = createElement('div');
                container.className = 'align-content';
                container.appendChild(createElement('img', data[element]['img'], 0, false));
                let dataContainer = createElement('div', 0, 0, false);
                container.appendChild(dataContainer);
                dataContainer.appendChild(createElement('h3', data[element]['product'], 0, false));
                let price = createElement('h4', data[element]['price'] + '€', 0, false);
                price.className = 'price';
                dataContainer.appendChild(price);
                let str = createElement('h4', data[element]['stars'] + '\t', 0, false);
                str.appendChild(createElement('img', 'star-icon.png', 0, false));
                dataContainer.appendChild(str);
                dataContainer.appendChild(createElement('a', 'Compra', data[element]['link'], false));
                createElement('br');
                createElement('hr');
                createElement('br');
            }
        });
}

function createElement(type, data, link, append = true){
    var el = document.createElement(type);

    if(type == 'img')
        el.src = data;
    else if(type.substring(0,1) == 'h' && Number.isInteger(parseInt(type.substring(1,2))))
        el.innerHTML = data;
    else if(type == 'a'){
        el.innerHTML = data;
        link.replace('\/', '/');
        el.href = 'https://www.amazon.it' + link;
    }else if(type == 'button'){
        el.innerHTML = data;
        el.setAttribute('onclick', 'getProducts("' + link +'")')
    }

    if(append)
        document.body.appendChild(el);
    
    return el;
}

getCategories();

/*
img : "https://m.media-amazon.com/images/I/51aphEGSOzL._AC_UL320_.jpg"
link : "/Maybelline-Correttore-Cancella-Occhiaie-Confezione/dp/B00NPXEEC4/ref=ice_ac_b_dpb?qid=1675678472&rdc=1&s=beauty&sr=1-1&srs=13773664031"
price : "7,19"
product : "Maybelline New York Correttore Liquido Il Cancella Età, con Bacche di Goji e Haloxyl, Copre Occhiaie e Piccole Rughe, 02 Nude, 6,8 ml"
stars : "4.4"
*/