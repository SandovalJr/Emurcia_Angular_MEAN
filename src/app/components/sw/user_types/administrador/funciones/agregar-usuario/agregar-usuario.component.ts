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
} from "../../../../../../../services/authentication.service";

@Component({
  selector: "app-agregar-usuario",
  templateUrl: "./agregar-usuario.component.html",
  styleUrls: ["./agregar-usuario.component.scss"],
})
export class AgregarUsuarioComponent implements OnInit {
  validationForm: FormGroup;
  details: UserDetails;

  constructor(public fb: FormBuilder, private auth: AuthenticationService) {
    this.validationForm = fb.group({
      usuario: [null, [Validators.required]],
      password: [null, Validators.required],
      marca: [null, Validators.required],
      region: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }

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

}
