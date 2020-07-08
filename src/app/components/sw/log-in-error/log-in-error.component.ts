import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  TokenPayload,
} from "../../../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-log-in-error',
  templateUrl: './log-in-error.component.html',
  styleUrls: ['./log-in-error.component.scss']
})
export class LogInErrorComponent implements OnInit {
  credentials: TokenPayload = {
    id: 0,
    usuario: "",
    password: "",
    user_type: "",
    region: "",
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

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
  }

}
