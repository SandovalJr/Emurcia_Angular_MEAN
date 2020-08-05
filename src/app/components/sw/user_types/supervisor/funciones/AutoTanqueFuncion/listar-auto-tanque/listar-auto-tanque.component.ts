import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  auto_Tanques_Service,
  Auto_TanquesLoad,
} from "../../../../../../../../services/auto_tanque.service";
import {
  AuthenticationService,
  UserDetails,
} from "../../../../../../../../services/authentication.service";

@Component({
  selector: "app-listar-auto-tanque",
  templateUrl: "./listar-auto-tanque.component.html",
  styleUrls: ["./listar-auto-tanque.component.scss"],
})
export class ListarAutoTanqueComponent implements OnInit {
  details: UserDetails;
  public AutosListados: Array<any> = [];
  Buscador_AutosTanques: any;
  pageActual: number = 1;
  constructor(
    private router: Router,
    private AutoTanqueService: auto_Tanques_Service,
    private auth: AuthenticationService,
    private activatedRouter: ActivatedRoute
  ) {
    this.informacionUsuario();
    this.ListarAutosTanques();
  }

  ngOnInit(): void {}
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

  public ListarAutosTanques() {
    let marcaempresa = this.activatedRouter.snapshot.paramMap.get("marca");

    this.AutosListados = [];
    this.AutoTanqueService.ListarAutoTanques(marcaempresa).subscribe(
      (auto) => {
        this.AutosListados = auto;
        console.log(this.AutosListados);
        // this.loading = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public Eliminar(id: any) {
    this.AutoTanqueService.EliminarAutoTanque(id).subscribe(
      () => {
        window.location.reload();
        // console.log("Eliminado con exito");
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
