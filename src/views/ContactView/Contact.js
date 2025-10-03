import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Contact')
    }

    async getHTML() {
        return /*html*/`
            <h1>Contact Da-Shop</h1>
            <p>If you have any questions or feedback, feel free to reach out to us!</p>
            <form>
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div>
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        `;
    }

}
