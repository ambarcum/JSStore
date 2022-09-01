const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(date => {
                this.goods = date;
                this.render()
            });
    }

    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }

    _getSum() {
        let summ = 0;
        this.goods.forEach(item => {
            summ += item.price;

        })
        alert(summ);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
        let addToBasketButt = document.querySelectorAll('.item_butt');
        addToBasketButt.forEach(item => {
            let identifier = item.getAttribute('id');
            item.addEventListener('click', this.addToBasket(identifier))
        });
    }



    addToBasket(id) {
        return () => {
            let item = window.basket.goods.find(product => product.id_product == id);
            if (item == undefined) {
                let newProduct = window.products.goods.find(product => product.id_product == id);
                newProduct.quantity = 1;
                // console.log(newProduct);
                window.basket.goods.push(newProduct);
                window.basket.output();

            } else {
                return window.basket.quantityPlus(id)();
            }
        }
    }
}


class ProductItem {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
    }
    render() {
        return `<div class="products_item">
        <img class = "item_img" src="img/${this.id}.jpg" alt="img">
        <h4 class="item_heading">${this.title}</h4>
        <p class="item_price">${this.price}</p>
        <button id = "${this.id}" class="item_butt">Купить</button>
     </div>`

    }

}

class BasketList {
    constructor(container = '.card') {
        this.container = container;
        this.goods = [];
        this._getItems()
            .then(date => {
                this.goods = date.contents;
                this.output()
            })
    }
    _getItems() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });


    }

    output() {
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        for (let product of this.goods) {
            const item = new BasketItem(product, this);
            block.insertAdjacentHTML("beforeend", item.output());
        }
        let basketDelete = document.querySelectorAll('.card_delete');
        basketDelete.forEach(item => {
            let identifier = item.getAttribute('id');
            item.addEventListener('click', this.delItem(identifier));
        });
        let basketAdd = document.querySelectorAll(".card_quantityPlus");
        basketAdd.forEach(item => {
            let itemId = item.getAttribute('id')
            item.addEventListener('click', this.quantityPlus(itemId));
        });
        let quacntityMinus = document.querySelectorAll(".card_quantityMinus");
        quacntityMinus.forEach(item => {
            let itemId = item.getAttribute('id')
            item.addEventListener('click', this.quantityMinus(itemId));
        });
    }

    delItem(id) {
        return () => {
            this.goods = this.goods.filter((item) => {
                return item.id_product != id;
            })

            this.output();
        }
    }

    quantityPlus(id) {
        return () => {
            let product = this.findById(id);
            this.changeQuantity(product, 1);
            this.output();
        }
    }


    quantityMinus(id) {
        return () => {
            let product = this.findById(id);
            if (product.quantity == 1) {
                this.delItem(id)();
                return;
            }

            this.changeQuantity(product, -1);
            this.output();
        }
    }

    changeQuantity(item, val) {
        item.quantity += val;
    }

    findById(id) {
        return this.goods.find(function (item) {
            return item.id_product == id;
        });
    }
}

class BasketItem {
    constructor(product, basket) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;
        this.basket = basket;
        this.totalPrice = this.quantity * this.price;
    }


    output() {
        return `<div class="card_item">
        <img class = "card_img" src="img/${this.id}.jpg" alt="img">
        <h4 class="card_heading">${this.title}</h4>
        <p class="card_price">${this.totalPrice}</p>
        <button id ="${this.id}" class ="card_quantityPlus">+</button>
        <div class = "card_quantity">${this.quantity}</div>
        <button id ="${this.id}" class ="card_quantityMinus">-</button>
       <button id ="${this.id}" class="card_delete">Удалить</button>
     </div>`
    }

}
window.basket = new BasketList();
window.products = new ProductsList();


