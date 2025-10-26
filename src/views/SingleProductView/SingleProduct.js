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

        return /*html*/ `
            <h1>${this.product.product_name}</h1>
            <p>${this.product.product_description}</p>
        `;
    }

    /**
     * Fetches product data from the server by product ID and assigns it to the `product` property.
     *
     * @async
     * @param {string|number} productId - The unique identifier of the product to fetch.
     * @returns {Promise<void>} Resolves when the product data has been fetched and assigned.
     */
    async getProduct(productId) {
        const response = await fetch(`http://localhost:8000/products/${productId}`);
        const responseAsJson = await response.json();
        this.product = responseAsJson;
        console.log('product: ', this.product);
    }
}
