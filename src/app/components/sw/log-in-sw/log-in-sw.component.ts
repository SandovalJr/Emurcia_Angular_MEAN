import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  TokenPayload,
} from "../../../../services/authentication.service";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
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

  constructor(private auth: AuthenticationService, private router: Router) {}

  passFormControl = new FormControl("", [Validators.required]);

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

  ngOnInit(): void {}
}
