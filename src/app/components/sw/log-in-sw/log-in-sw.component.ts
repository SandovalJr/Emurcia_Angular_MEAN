import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  TokenPayload,
} from "../../../../services/authentication.service";
import { Router } from "@angular/router";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import {
  RxwebValidators,
  ReactiveFormConfig,
  NumericValueType,
} from "@rxweb/reactive-form-validators";

// servicio
import { MessageErrorsService } from "../../../../services/messageError.service";
@Component({
  selector: "app-log-in-sw",
  templateUrl: "./log-in-sw.component.html",
  styleUrls: ["./log-in-sw.component.scss"],
})
export class LogInSWComponent implements OnInit {
  credentials: TokenPayload = {
    id: 0,
    usuario: "",
    password: "",
    user_type: "",
    region: "",
  };
  public formulario: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private MessageErrorSvr: MessageErrorsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  public createForm() {
    this.formulario = new FormGroup({
      usuario: new FormControl(null, [RxwebValidators.required()]),
      password: new FormControl(null, [RxwebValidators.required()]),
    });
  }

  public ValidateForm(control: string) {
    // console.log(this.formulario.controls[control].errors);
    if (!this.formulario.controls[control].touched) return { error: undefined };

    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/AdminProfile/Inicio");
      },
      (err) => {
        this.router.navigateByUrl("/loginError");

        console.error(err);
      }
    );
  }
}
