import { Injectable } from "@angular/core"; 
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "./user/user.service";
import { Observable } from "rxjs";


@Injectable()
export class IdentityGuard implements CanActivate{

    constructor(
       private _router      : Router,
       private _userService : UserService
    ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let identity = this._userService.getIdentity();
        console.log('guarddd');

        if(identity && identity.id){
            return true;
        }else{
            this._router.navigate(['/inicio'])
            return false;
        }   
    }

}