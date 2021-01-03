import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { add, isBefore } from "date-fns";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class AuthService {
  public user: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('user')) {
      this.user.next(JSON.parse(localStorage.getItem('user')));
    }
  }

  public register(user) {
    return this.httpClient
      .post("api/auth/email/register", user)
  }

  public login(login) {
    return this.httpClient
      .post("api/auth/email/login", login)
  }

  public setLocalStorage(res) {
    const expires_at = add(new Date(), {
      seconds: Math.floor(parseInt(res.data.token.expires_in) / 1000),
    });
    localStorage.setItem("token", res.data.token.access_token);
    localStorage.setItem("expires", expires_at.toISOString());
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
  }

  public isLoggedIn() {
      return isBefore(new Date(), this.getExpiration());
  }

  public isLoggedOut() {
      return !this.isLoggedIn();
  }

  public getExpiration() {
    const expires_at = localStorage.getItem("expires");
    return new Date(expires_at);
  }

  public saveUser(user) {
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
