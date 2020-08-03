import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { autosService } from "../../../../../../../../services/autos.service";
import {
  AuthenticationService,
  UserDetails,
  TokenPayload,
} from "../../../../../../../../services/authentication.service";

@Component({
  selector: "app-listar-autos",
  templateUrl: "./listar-autos.component.html",
  styleUrls: ["./listar-autos.component.scss"],
})
export class ListarAutosComponent implements OnInit {
  constructor(
    private router: Router,
    private AutoService: autosService,
    private auth: AuthenticationService,
    private activatedRouter: ActivatedRoute
  ) {}
  public AutosListados: Array<any> = [];
  details: UserDetails;
  Buscador_Autos: any;
  pageActual: number = 1;

  ngOnInit(): void {
    this.GetAutosLista();
  }

  GoToAgregarAuto() {
    this.router.navigate(["SupervisorProfile/AgregarAuto"]);
  }

  // detalles del usuario para obtener la marca
  informacionUsuario() {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
        // console.log(user);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  GetAutosLista() {
    let marcaempresa = this.activatedRouter.snapshot.paramMap.get("marca");

    this.AutosListados = [];
    this.AutoService.ListarAuto(marcaempresa).subscribe(
      (auto) => {
        this.AutosListados = auto;
        console.log(this.AutosListados);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
