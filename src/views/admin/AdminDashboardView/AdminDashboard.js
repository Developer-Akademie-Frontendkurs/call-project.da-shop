import AbstractView from '../../AbstractView.js';
import { isAdminloggedIn } from '../admin.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Admin Dashboard');
        isAdminloggedIn();
    }

    async getHTML() {
        return /*html*/ `
            <h1>Admin Dashboard</h1>
        `;
    }
}
