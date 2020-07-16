import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";

import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  UserDetails,
  TokenPayload,
} from "../../../../../../../services/authentication.service";
import { Router } from "@angular/router";

// SWEETALERT 2
// CommonJS
const Swal = require("sweetalert2");

@Component({
  selector: "app-agregar-usuario",
  templateUrl: "./agregar-usuario.component.html",
  styleUrls: ["./agregar-usuario.component.scss"],
})
export class AgregarUsuarioComponent implements OnInit {
  validationForm: FormGroup;
  details: UserDetails;

  constructor(
    public fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.validationForm = fb.group({
      usuario: [null, [Validators.required]],
      password: [null, Validators.required],
      marca: [null, Validators.required],
      region: [null, [Validators.required]],
      user_type: [null, [Validators.required]],
    });

    this.informacionUsuario();
  }

  ngOnInit() {
    // console.log(this.auth.profile);
  }

  // OBTENER INFORMACION DEL USUARIO LOGEADO
  informacionUsuario() {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
        console.log(user);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // VALIDAR USUARIO
  get usuario() {
    return this.validationForm.get("usuario");
  }
  get password() {
    return this.validationForm.get("password");
  }
  get marca() {
    return this.validationForm.get("marca");
  }
  get region() {
    return this.validationForm.get("region");
  }
  get user_type() {
    return this.validationForm.get("user_type");
  }

  //  REGISTRAR USUARIOS
  credentialsRegistro: TokenPayload = {
    id: 0,
    usuario: "",
    password: "",
    user_type: "",
    marca: "",
    region: "",
  };

  registerUsuarios() {
    if (
      this.usuario.status === "VALID" &&
      this.password.status === "VALID" &&
      this.user_type.status == "VALID" &&
      this.region.status == "VALID"
    ) {
      console.log(this.usuario.status);
      console.log("si entro validacion");

      this.validationForm.setValue({
        usuario: this.credentialsRegistro.usuario,
        password: this.credentialsRegistro.password,
        user_type: this.credentialsRegistro.user_type,
        marca: this.details.marca,
        region: this.credentialsRegistro.region,
      });

      console.log(this.credentialsRegistro);
    } else {
      Swal.fire({
        title: "Campos Incompletos!",
        text: "completa todos para continuar",
        icon: "warning",
      });
    }

    // this.auth.register(this.credentialsRegistro).subscribe(
    //   () => {
    //     Swal.fire(
    //       "Se Agrego Correctamente",
    //       "Presiona para continuar..",
    //       "success"
    //     );
    //     this.router.navigateByUrl("/AdminProfile/ListaUsuarios");
    //   },
    //   (err) => {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Something went wrong!",
    //     });
    //     console.error(err);
    //   }
    // );
  }
}
