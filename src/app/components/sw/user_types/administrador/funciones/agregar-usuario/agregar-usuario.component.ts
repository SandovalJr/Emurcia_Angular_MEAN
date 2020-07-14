import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-usuario",
  templateUrl: "./agregar-usuario.component.html",
  styleUrls: ["./agregar-usuario.component.scss"],
})
export class AgregarUsuarioComponent implements OnInit {
  validationForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.validationForm = fb.group({
      usuario: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get usuario() {
    return this.validationForm.get("usuario");
  }
  get password() {
    return this.validationForm.get("password");
  }
}
