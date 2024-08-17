import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Comprueba si hay un token de autenticación
  }

  login(token: string) {
    localStorage.setItem('authToken', token); // Guarda el token en localStorage
  }

  logout() {
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
  }
}
