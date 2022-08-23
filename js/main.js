const products = [
    { id: 1, title: 'Laptop', price: 30000 },
    { id: 2, title: 'Mouse', price: 2000 },
    { id: 3, title: 'Keyboard', price: 2500 },
    { id: 4, title: 'Phone', price: 20000 }
];

const renderProduct = (product) =>
    `<div class="products_item">
    <img class = "item_img" src="img/${product.id}.jpg" alt="img">
    <h4 class="item_heading">${product.title}</h4>
    <p class="item_price">${product.price}</p>
    <button class="item_butt">Купить</button>
 </div>`


const renderPage = (list) => {
    const productsList = list.map(product => renderProduct(product));
    document.querySelector('.products').innerHTML = productsList.join('');
}

renderPage(products);