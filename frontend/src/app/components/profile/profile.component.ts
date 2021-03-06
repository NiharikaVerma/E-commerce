import { Component, OnInit } from '@angular/core';
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {ResponseModel, UserService} from "../../Services/user.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import { pipe } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myUser: any;

  constructor(private authService: SocialAuthService,
              private userService: UserService,
              private router: Router) { }


  ngOnInit(): void {
    this.userService.userData$
      .pipe(
          map(user => {
            if(user instanceof SocialUser || user.type == 'social') {

              return {
                ...user,
                email: 'test@test.com'
              };
            }
            else {
              return user;
            }
          })
      ).subscribe((data: ResponseModel | SocialUser) =>{
        this.myUser = data;
    });

    // this.authService.authState.pipe(map(user => {
    //   if(user instanceof SocialUser) {
    //
    //     return {
    //       ...user,
    //       email: 'test@test.com',
    //     };
    //   }
    //   else {
    //     return user;
    //   }
    // })).subscribe((user: SocialUser) => {
    //   if(user != null){
    //     this.myUser = user;
    //   }
    //   else {
    //     return;
    //   }
    // })


  }

  logout() {
    this.userService.logout();
  }
}
