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
    console.log(this.credentialsRegistro);

    // this.auth.register(this.credentialsRegistro).subscribe(
    //   () => {
    //     this.router.navigateByUrl("Home");
    //   },
    //   (err) => {
    //     console.error(err);
    //     console.log("tuvo error");
    //   }
    // );
  }
}
