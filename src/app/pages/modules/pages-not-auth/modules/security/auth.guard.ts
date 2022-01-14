import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/shared/services/authentication.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authenticationService.isAccessTokenInvalido()) {
            return this.authenticationService.obterNovoAccessToken().then(() => {
                if (this.authenticationService.isAccessTokenInvalido()) {
                    this.router.navigate(['/login'], { queryParams: { from: state.url } });
                    return false;
                }
                else {
                    return this.verificar(route);
                }
            });
        }
        else {
            return this.verificar(route);
        }
    }

    private verificar(route: ActivatedRouteSnapshot): boolean {
        if (route.data.roles && !this.authenticationService.temQualquerPermissao(route.data.roles)) {
            this.router.navigate(['/404']);
            return false;
        }
        else {
            return true;
        }
    }
}