import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function onLoginHandler(auth) {
    cookies.set('auth', auth, {
        path: '/'
    });
}

export function onLogoutHandler(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    cookies.remove('auth', {
        path: '/'
    });
}