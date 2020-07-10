import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.url[0], state);

    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl("/");
      return false;
    }

    if (route.url[0].path === "AdminProfile" && this.auth.IsAdmin() === 0) {
      return true;
    }

    if (route.url[0].path === "AdminProfile" && this.auth.IsAdmin() === 7) {
      if (this.auth.IsSupervisor() === 2) {
        this.router.navigateByUrl("/SupervisorProfile/Inicio_Supervisor");
      } else if (this.auth.IsVendedor() === 3) {
        this.router.navigateByUrl("/VendedorProfile/Inicio_Vendedor");
      } else {
        this.router.navigateByUrl("/loginError");
      }
    }

    return true;
  }
}
