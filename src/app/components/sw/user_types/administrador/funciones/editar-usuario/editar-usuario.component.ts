import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  UserDetails,
  TokenPayload,
} from "../../../../../../../services/authentication.service";
import { Router } from "@angular/router";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");
@Component({
  selector: "app-editar-usuario",
  templateUrl: "./editar-usuario.component.html",
  styleUrls: ["./editar-usuario.component.scss"],
})
export class EditarUsuarioComponent implements OnInit {
  validationForm: FormGroup;
  details: UserDetails;
  credentialsRegistro: TokenPayload = {
    id: 0,
    usuario: "",
    password: "",
    user_type: "",
    marca: "",
    region: "",
  };

  constructor(
    public fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.validationForm = fb.group({
      usuario: [null, [Validators.required]],
      password: [null, Validators.required],
      marca: [null, Validators.required],
      region: [null, [Validators.required]],
      user_type: [null, [Validators.required]],
    });
    this.InformacionDeElUsuarioAEditar();
  }
  ngOnInit(): void {}
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

  InformacionDeElUsuarioAEditar() {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    console.log(`metodo de editar usuario envio id ${id}`);

    this.auth.InfoUserEdit(id).subscribe(
      (user) => {
        this.details = user;
        // console.log("user:");
        // console.log(user);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
