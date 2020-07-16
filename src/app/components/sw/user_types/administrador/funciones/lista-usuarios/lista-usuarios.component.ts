import { Component, OnInit } from "@angular/core";
import { Routes, Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  AuthenticationService,
  UserDetails,
  TokenPayload,
} from "../../../../../../../services/authentication.service";

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.scss"],
})
export class ListaUsuariosComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private http: HttpClient
  ) {
    this.getUsuariosDeCadaMarca();
  }
  details: UserDetails;
  UsuariosListados: any = [];

  ngOnInit(): void {
    this.informacionUsuario();
  }

  GoToAgregarUsuario() {
    this.router.navigate(["AdminProfile/AgregarUsuario"]);
  }

  informacionUsuario() {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
        // console.log(user);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  credentials: TokenPayload = {
    id: 0,
    usuario: "",
    password: "",
    user_type: "",
    marca: "",
    region: "",
  };

  getUsuariosDeCadaMarca() {

    this.auth.ListarUsuarios().subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
  }
}
