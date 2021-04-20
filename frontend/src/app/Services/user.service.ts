import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {__values} from "tslib";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth: boolean = false;
  private SERVER_URL : string = environment.SERVER_URL;
  private user : any;
  authState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
  // @ts-ignore
  userData$: BehaviorSubject<SocialUser | ResponseModel> = new BehaviorSubject<SocialUser | ResponseModel>(null);


  constructor(private SocialAuthService: SocialAuthService,
              private httpClient: HttpClient) {

    this.SocialAuthService.authState.subscribe((user: SocialUser) => {
      if (user !== null) {
        this.auth = true;
        this.authState$.next(this.auth);
        this.userData$.next(user);
      }
    });
  }
  // Login User with Email and Password
    loginUser(email: string , password: string) {

      this.httpClient.post(`${this.SERVER_URL}/auth/login`, {email, password})
        // @ts-ignore
        .subscribe((data: ResponseModel) => {
          this.auth = data.auth;
          this.authState$.next(this.auth);
          this.userData$.next(data);
        });
    }

  // Google Authentication
  googleLogin() : void {
    this.SocialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() : void {
    this.SocialAuthService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }
}

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}
