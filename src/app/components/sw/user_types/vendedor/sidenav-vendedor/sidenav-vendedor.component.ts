import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import {
  AuthenticationService,
  UserDetails,
} from "../../../../../../services/authentication.service";

@Component({
  selector: "app-sidenav-vendedor",
  templateUrl: "./sidenav-vendedor.component.html",
  styleUrls: ["./sidenav-vendedor.component.scss"],
})
export class SidenavVendedorComponent implements OnInit {
  details: UserDetails;

  mobileQuery: MediaQueryList;
  fillerNav = [
    {
      name: "Inicio Vendedor",
      route: "/VendedorProfile/Inicio_Vendedor",
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

  // detalles de el usuario (inforamcion)
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
