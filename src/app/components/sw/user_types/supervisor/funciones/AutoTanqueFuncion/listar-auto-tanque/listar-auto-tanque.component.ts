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
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-listar-auto-tanque",
  templateUrl: "./listar-auto-tanque.component.html",
  styleUrls: ["./listar-auto-tanque.component.scss"],
})
export class ListarAutoTanqueComponent implements OnInit {
  details: UserDetails;
  public AutosListados: Array<any> = [];
  loading: boolean = false;

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
    let region = this.activatedRouter.snapshot.paramMap.get("region");
console.log();

    this.AutosListados = [];
    this.AutoTanqueService.ListarAutoTanques(marcaempresa, region).subscribe(
      (auto) => {
        this.AutosListados = auto;
        console.log(this.AutosListados);
        this.loading = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public Eliminar(id: any) {
    console.log("agarro" + id);

    Swal.fire({
      title: "Seguro que quieres eliminarlo?",
      text: "No podras volver atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a441",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si , Eliminar",
    }).then((result) => {
      if (result.value) {
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
    });
  }

  public GoToEditar(id: any) {
    this.router.navigate(["/SupervisorProfile/Editar_AutoTanque/", id]);
  }

  public GoToVerInfo(id: any) {
    this.router.navigate(["/SupervisorProfile/VerInformacioAutoTanque/", id]);
  }
}
