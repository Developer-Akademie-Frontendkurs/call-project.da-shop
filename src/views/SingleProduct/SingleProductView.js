import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
    product = {};
    productId = null;

    constructor(params) {
        super(params);
        console.log('params: ', params);
        this.setTitle('Single Product');
        this.productId = params.id;
    }



    async getHTML() {
         if (!this.product.product_name) {
            await this.getProduct(this.productId);
        }

        return /*html*/`
            <h1>${this.product.product_name}</h1>
            <p>${this.product.product_description}</p>
        `;
    }

    async getProduct(productId) {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const responseAsJson = await response.json();
        this.product = responseAsJson;
        console.log('product: ', this.product);
    }
}
