import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Admin/Employees Dashboard');
    }

    async getHTML() {
        return /*html*/ `
            <h1>Admin/Employees Dashboard</h1>
        `;
    }
}
