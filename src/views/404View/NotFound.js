import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('404 Not Found');
    }

    async getHTML() {
        return /*html*/ `
            <h1 class="text-36 font-black">404 Content not found!!!</h1>
        `;
    }
}
