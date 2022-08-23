class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //              block.innerHTML += item.render();
        }
    }
    _getSum() {
        let summ = 0;
        this.goods.forEach(item => {
            summ += item.price;

        })
        alert(summ);
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="products_item">
        <img class = "item_img" src="img/${this.id}.jpg" alt="img">
        <h4 class="item_heading">${this.title}</h4>
        <p class="item_price">${this.price}</p>
        <button class="item_butt">Купить</button>
     </div>`
    }
}

let list = new ProductList();
list._getSum();


class Card {
    addItem() {

    }
    deliteItem() {

    }
    render() {

    }
}

class Carditem extends ProductItem { // благодаря наследованию мы получаем метод render.
    quantity() { //количество товара

    }
}


/*const products = [
    { id: 1, title: 'Laptop', price: 30000 },
    { id: 2, title: 'Mouse', price: 2000 },
    { id: 3, title: 'Keyboard', price: 2500 },
    { id: 4, title: 'Phone', price: 20000 }
];

const renderProduct = (product) =>
    `<div class="products_item">
    <img class = "item_img" src="img/${this.id}.jpg" alt="img">
    <h4 class="item_heading">${this.title}</h4>
    <p class="item_price">${this.price}</p>
    <button class="item_butt">Купить</button>
 </div>`


const renderPage = (list) => {
    const productsList = list.map(product => renderProduct(product));
    document.querySelector('.products').innerHTML = productsList.join('');
}

renderPage(products);*/