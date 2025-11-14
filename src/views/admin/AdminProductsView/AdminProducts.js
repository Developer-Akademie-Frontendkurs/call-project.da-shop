import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    products = [];

    constructor() {
        super();
        this.setTitle('Products');
    }

    async getHTML() {
        return /*html*/ `
           <h1>Products</h1>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia libero obcaecati!</p>
           `;
    }
}
