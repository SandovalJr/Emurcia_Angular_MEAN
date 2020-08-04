import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import {
  AuthenticationService,
  UserDetails,
} from "../../../../../../services/authentication.service";
import { Routes, Router } from "@angular/router";
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
    public auths: AuthenticationService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.auths.profile().subscribe(
      (user) => {
        this.details = user;
      },
      (err) => {
        console.error(err);
      }
    );
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

  Autos(marca: any) {
    console.log(`La marca que va a pasar ${marca}`);
    this.router.navigate(["/SupervisorProfile/Autos_Listado", marca]);
  }
  AutoTanque(marca: any) {
    console.log(marca);
    this.router.navigate(["/SupervisorProfile/AutoTanque_Listado", marca]);
  }
}
