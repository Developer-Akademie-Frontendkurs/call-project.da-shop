import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Admin Dashboard');
    }

    async getHTML() {
        return /*html*/ `
            <h1>Admin Dashboard</h1>
        `;
    }
}
