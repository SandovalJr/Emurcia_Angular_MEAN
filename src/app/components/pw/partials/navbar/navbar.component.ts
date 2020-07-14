import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  TokenPayload,
} from "../../../../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthenticationService, private router: Router) {}
  credentials: TokenPayload = {
    id: 0,
    usuario: "",
    password: "",
    user_type: "",
    marca: "",
    region: "",
  };
  ngOnInit(): void {}

  IrSistema() {
    if (this.auth.IsAdmin() == 1) {
      this.router.navigateByUrl("/AdminProfile/Inicio");
    } else if (this.auth.IsSupervisor() === 2) {
      this.router.navigateByUrl("/SupervisorProfile/Inicio_Supervisor");
    } else if (this.auth.IsVendedor() === 3) {
      this.router.navigateByUrl("/VendedorProfile/Inicio_Vendedor");
    } else {
      this.router.navigateByUrl("/loginError");
    }
  }
}
