import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, take, pluck, switchMap } from "rxjs/operators";
import { Routes, Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  AuthenticationService,
  UserDetails,
  TokenPayload,
} from "../../../../../../../services/authentication.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.scss"],
})
export class ListaUsuariosComponent implements OnInit {
  loading: boolean = false;
  term: any;
  pageActual: number = 1;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private http: HttpClient
  ) {
    this.getUsuariosDeCadaMarca();
  }
  details: UserDetails;
  public UsuariosListados: Array<any> = [];

  ngOnInit(): void {
    // this.informacionUsuario();
  }

  GoToAgregarUsuario() {
    this.router.navigate(["AdminProfile/AgregarUsuario"]);
  }

  getUsuariosDeCadaMarca() {
    this.UsuariosListados = [];
    // this.loading = false;
    this.auth.ListarUsuarios().subscribe(
      (usuarios) => {
        // console.log(usuarios);
        this.UsuariosListados = usuarios;
        this.loading = true;
        // if (usuarios == null || "") {
        // }
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
  }

  EliminarUsuario(id: any) {
    Swal.fire({
      title: "Seguro que quieres eliminarlo?",
      text: "No podras volver atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a441",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.auth.eliminarUsuario(id).subscribe(
          (userEliminado) => {
            // console.log(userEliminado);
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

  EditarUsuario(id: any) {
    console.log(`El id que se debe editar es ${id}`);
    this.router.navigate(["/AdminProfile/EditarUsuario/", id]);
  }




}
