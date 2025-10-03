let products = [];

async function _init() {
    await getProducts();
    renderProducts();
}

async function getProducts() {
    const request = await fetch('http://localhost:3000/products');
    products = await request.json();
    console.log(products);
}

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    for (let productIndex = 0; productIndex < products.length; productIndex++) {
        const product = products[productIndex];

        productsContainer.innerHTML += /*html*/ `
        <div class="card w-96 bg-base-100 card-md shadow-sm">
            <div class="card-body">
                <h2 class="card-title">${product.product_name}</h2>
                <p>${product.product_short_description}</p>
                <div class="justify-end card-actions">
                    <button class="btn btn-primary">${product.price} €</button>
                </div>
            </div>
        </div>
        `;
    }
}
