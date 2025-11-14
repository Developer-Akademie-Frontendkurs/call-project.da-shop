import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Single Product');
    }

    async getHTML() {
        return /*html*/ `
           <h1>Single Product</h1>
           <img src="https://picsum.photos/id/1020/600/400" alt="">
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia libero obcaecati!</p>
           `;
    }
}
