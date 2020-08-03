import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { autosService } from "../../../../../../../../services/autos.service";
import {
  AuthenticationService,
  UserDetails,
  TokenPayload,
} from "../../../../../../../../services/authentication.service";
// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

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
  loading: boolean = false;

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
  // OBTENER LA LISTA E INFORMACION DE LOS AUTOS
  GetAutosLista() {
    let marcaempresa = this.activatedRouter.snapshot.paramMap.get("marca");

    this.AutosListados = [];
    this.AutoService.ListarAuto(marcaempresa).subscribe(
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

  // ELIMINAR UN AUTO
  EliminarAuto(id: any) {
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
        this.AutoService.EliminarAuto(id).subscribe(
          (AutoEliminado) => {
            console.log(AutoEliminado);
            window.location.reload();
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo salio mal!",
            });
            console.error(err);
          }
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  EditarInfoAdmin(id: any) {
    console.log(`El id que se debe editar es ${id}`);
    this.router.navigate(["/SupervisorProfile/EditarAuto/", id]);
  }
}
