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
  selector: "app-agregar-venta-rv",
  templateUrl: "./agregar-venta-rv.component.html",
  styleUrls: ["./agregar-venta-rv.component.scss"],
})
export class AgregarVentaRVComponent implements OnInit {
  public formulario: FormGroup;
  details: UserDetails;
  public fecha;
  // Constante para convertir venta por kilos
  // public marca = this.activatedRouter.snapshot.paramMap.get("marca");
  // public region = this.activatedRouter.snapshot.paramMap.get("region");
  // public createdAt = this.activatedRouter.snapshot.paramMap.get("createdAt");

  credentialsRV: ReporteVentasLoad = {
    id_RV: 0,
    marca: "",
    region: "",
    auto: "",
    Cilidros_Vacios: null,
    Venta_Kilos: 0,
    Precio_Prom: null,
    Importe_Liquidar: 0,
    Recibe_caja_efectivo: null,
    credito_cilindro: 0,
    Importe_credito: 0,
    Cel_Tel_Cliente: "",
    Litros_Consumo: null,
    INV_CIL: null,
    Equiv_KG: null,
    Comentarios: "",
  };

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private MessageErrorSvr: MessageErrorsService,
    private auth: AuthenticationService,
    private RVService: ReporteDeVentasService
  ) {}

  ngOnInit(): void {
    this.creatForm();
    this.informacionUsuario();
  }

  informacionUsuario() {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
        this.credentialsRV.marca = this.details.marca;
        this.credentialsRV.region = this.details.region;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public creatForm() {
    var f = new Date();
    let año = f.getFullYear();
    let mes = f.getMonth() + 1;
    let dia = f.getDate();
    // LA FECHA SOLO SE MUESTRA NO SE MANDA AL BACK
    if (mes > 0 && mes < 10) {
      this.fecha = `${año}-0${mes}-${dia}`;
    } else {
      this.fecha = `${año}-${mes}-${dia}`;
    }

    this.formulario = new FormGroup({
      marca: new FormControl(null, []),
      region: new FormControl(null, []),
      auto: new FormControl(null, [RxwebValidators.required()]),
      Cilidros_Vacios: new FormControl(null, [
        RxwebValidators.numeric(),
        RxwebValidators.required(),
      ]),
      Venta_Kilos: new FormControl(null, [RxwebValidators.numeric()]),
      Precio_Prom: new FormControl(null, [RxwebValidators.required()]),
      Importe_Liquidar: new FormControl(null, []),
      Recibe_caja_efectivo: new FormControl(null, [RxwebValidators.required()]),
      credito_cilindro: new FormControl(null, []),
      Importe_credito: new FormControl(null, []),
      Cel_Tel_Cliente: new FormControl(null, []),
      Litros_Consumo: new FormControl(null, [RxwebValidators.numeric()]),
      INV_CIL: new FormControl(null, [RxwebValidators.required()]),
      Equiv_KG: new FormControl(null, [RxwebValidators.required()]),
      Comentarios: new FormControl(null, [RxwebValidators.alphaNumeric()]),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  AgregarVenta() {
    this.credentialsRV.Venta_Kilos = this.credentialsRV.Cilidros_Vacios * 30;

    this.credentialsRV.Importe_Liquidar =
      this.credentialsRV.Venta_Kilos * this.credentialsRV.Precio_Prom -
      this.credentialsRV.Recibe_caja_efectivo -
      this.credentialsRV.Importe_credito;

    console.log(this.credentialsRV);
    console.log(this.formulario.valid);
    if (this.formulario.valid) {
      this.RVService.registerAuto(this.credentialsRV).subscribe(
        () => {
          Swal.fire(
            "Se Agrego Correctamente",
            "Presiona para continuar..",
            "success"
          );
          this.router.navigateByUrl(
            `/SupervisorProfile/ReportesVentas/${this.details.marca}/${this.details.region}/${this.fecha}`
          );
        },
        (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ya registraste esta venta",
          });
          console.error(err);
        }
      );
    } else {
      Swal.fire({
        title: "Campos Incompletos!",
        text: "completa los necesarios para continuar",
        icon: "warning",
      });
    }
  }
}
