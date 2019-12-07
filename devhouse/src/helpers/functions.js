import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function onLoginHandler(auth) {
    cookies.set('auth', auth, {
        path: '/'
    });

    window.location.href = window.location.origin + '/';
}

export function onLogoutHandler(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    cookies.remove('auth', {
        path: '/'
    });

    window.location.href = window.location.origin + '/';
}