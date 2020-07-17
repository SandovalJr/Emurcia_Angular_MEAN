import { Component, OnInit } from "@angular/core";
import { Routes, Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  AuthenticationService,
  UserDetails,
  TokenPayload,
} from "../../../../../../../services/authentication.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.scss"],
})
export class ListaUsuariosComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private http: HttpClient
  ) {
    this.getUsuariosDeCadaMarca();
  }
  details: UserDetails;
  public UsuariosListados: Array<any> = [];

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
    this.UsuariosListados = [];
    // this.loading = false;
    this.auth.ListarUsuarios().subscribe(
      (usuarios) => {
        console.log(usuarios);
        this.UsuariosListados = usuarios;
        this.loading = true;
        // if (usuarios == null || "") {
        // }
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
        });
        console.error(err);
      }
    );
  }
}
