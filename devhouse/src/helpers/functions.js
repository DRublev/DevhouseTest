import Cookies from 'universal-cookie';
import { isGenericTypeAnnotation } from '@babel/types';

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