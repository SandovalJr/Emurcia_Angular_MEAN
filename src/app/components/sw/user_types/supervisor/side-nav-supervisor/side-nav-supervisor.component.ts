import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import {
  AuthenticationService,
  UserDetails,
} from "../../../../../../services/authentication.service";

@Component({
  selector: "app-side-nav-supervisor",
  templateUrl: "./side-nav-supervisor.component.html",
  styleUrls: ["./side-nav-supervisor.component.scss"],
})
export class SideNavSupervisorComponent implements OnInit {
  details: UserDetails;

  mobileQuery: MediaQueryList;
  fillerNav = [
    {
      name: "Inicio Supervisor",
      route: "/SupervisorProfile/Inicio_Supervisor",
      icon: "home",
    },
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public auths: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;
  ngOnInit(): void {
    this.auths.profile().subscribe(
      (user) => {
        this.details = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
