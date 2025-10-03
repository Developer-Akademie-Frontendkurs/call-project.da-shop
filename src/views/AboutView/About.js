import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('About')
    }

    async getHTML() {
        return /*html*/`
            <h1>About Da-Shop</h1>
            <p>Da-Shop is committed to providing a seamless shopping experience for our customers. Our platform offers a
                wide range of products, from fashion to home goods, all curated with sustainability in mind.</p>
            <p>Founded in 2020, we have quickly grown to become a trusted name in the e-commerce industry, thanks to our
                dedication to quality and customer satisfaction.</p>
            <p>Join us on our journey to make shopping more enjoyable and eco-friendly!</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, voluptatem provident eum voluptas nobis
                vitae ex sequi deserunt dolore mollitia placeat at, rerum minus! Et officiis magni dicta porro placeat.</p>

            <p>Thank you for choosing Da-Shop!</p>
        `;
    }

}
