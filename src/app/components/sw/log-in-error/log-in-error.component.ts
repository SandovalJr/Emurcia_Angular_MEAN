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
  selector: "app-log-in-error",
  templateUrl: "./log-in-error.component.html",
  styleUrls: ["./log-in-error.component.scss"],
})
export class LogInErrorComponent implements OnInit {
  credentials: TokenPayload = {
    id: 0,
    usuario: "",
    password: "",
    user_type: "",
    region: "",
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private MessageErrorSvr: MessageErrorsService
  ) {}
  public formulario: FormGroup;

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/AdminProfile");
      },
      (err) => {
        console.error(err);
      }
    );
  }

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
}
