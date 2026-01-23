export function isAdminloggedIn() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const adminCookie = cookies.find(cookie => cookie.startsWith('admin='));
    if (!adminCookie || adminCookie.split('=')[1] !== 'true') {
        window.location.href = '/admin/login';
    }
}
