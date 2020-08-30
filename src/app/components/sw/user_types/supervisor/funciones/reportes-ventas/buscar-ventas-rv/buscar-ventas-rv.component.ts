import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import {
  RxwebValidators,
  ReactiveFormConfig,
  NumericValueType,
} from "@rxweb/reactive-form-validators";
import {
  AuthenticationService,
  UserDetails,
} from "../../../../../../../../services/authentication.service";
import {
  ReporteVentasLoad,
  ReporteDeVentasService,
} from "../.././../../../../../../services/reporteDeVentas.service";
import { MessageErrorsService } from "../../../../../../../../services/messageError.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");
@Component({
  selector: "app-buscar-ventas-rv",
  templateUrl: "./buscar-ventas-rv.component.html",
  styleUrls: ["./buscar-ventas-rv.component.scss"],
})
export class BuscarVentasRVComponent implements OnInit {
  public formulario: FormGroup;
  credentialsRV: any = {
    fecha: "",
  };
  public VentasData: Array<any> = [];
  pageActual: number = 1;
  BuscadorDeVentas: any;
  loading: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private MessageErrorSvr: MessageErrorsService,
    private auth: AuthenticationService,
    private RVService: ReporteDeVentasService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formulario = new FormGroup({
      fecha: new FormControl(null, [RxwebValidators.required()]),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  public BuscarVentas() {
    let marcaempresa = this.activatedRouter.snapshot.paramMap.get("marca");
    let region = this.activatedRouter.snapshot.paramMap.get("region");
    // console.log(marcaempresa + region);
    // console.log(this.credentialsRV.fecha);

    this.RVService.ObtenerInformacionFecha(
      marcaempresa,
      region,
      this.credentialsRV.fecha
    ).subscribe(
      (data) => {
        this.VentasData = data;
        this.loading = true;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }



  public ElimiarVenta(id: any) {
    this.RVService.EliminarVenta(id).subscribe(
      () => {
        window.location.reload();
        // console.log("Eliminado con exito");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public EditarVenta(id: any) {
    this.router.navigateByUrl(`SupervisorProfile/Editar_Venta/${id}`);
  }

  public VerVentaInfor(id: any) {
    this.router.navigateByUrl(`SupervisorProfile/Ver_Venta/${id}`);
  }
}
