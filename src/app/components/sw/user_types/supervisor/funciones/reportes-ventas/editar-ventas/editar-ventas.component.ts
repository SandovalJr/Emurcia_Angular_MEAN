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
  ReporteVentasLoad2,
  ReporteDeVentasService,
} from "../.././../../../../../../services/reporteDeVentas.service";
import { MessageErrorsService } from "../../../../../../../../services/messageError.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");
@Component({
  selector: "app-editar-ventas",
  templateUrl: "./editar-ventas.component.html",
  styleUrls: ["./editar-ventas.component.scss"],
})
export class EditarVentasComponent implements OnInit {
  public formulario: FormGroup;
  public id = this.activatedRouter.snapshot.paramMap.get("id");
  public InfoVR: ReporteVentasLoad2;

  credentialsRV: ReporteVentasLoad2 = {
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
    createdAt: "",
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
    this.RegresarInfoDeLaVenta();
  }

  public RegresarInfoDeLaVenta() {
    console.log("id:" + this.id);
    this.RVService.ObtenerInfoId(this.id).subscribe(
      (data) => {
        this.InfoVR = data;
        console.log(this.InfoVR);
        this.credentialsRV.marca = this.InfoVR.marca;
        this.credentialsRV.region = this.InfoVR.region;
        this.credentialsRV.auto = this.InfoVR.auto;
        this.credentialsRV.Cilidros_Vacios = this.InfoVR.Cilidros_Vacios;
        this.credentialsRV.Venta_Kilos = this.InfoVR.Venta_Kilos;
        this.credentialsRV.Precio_Prom = this.InfoVR.Precio_Prom;
        // this.credentialsRV.Importe_Liquidar = this.InfoVR.Importe_Liquidar;
        this.credentialsRV.Recibe_caja_efectivo = this.InfoVR.Recibe_caja_efectivo;
        this.credentialsRV.credito_cilindro = this.InfoVR.credito_cilindro;
        this.credentialsRV.Importe_credito = this.credentialsRV.Importe_credito;
        this.credentialsRV.Cel_Tel_Cliente = this.InfoVR.Cel_Tel_Cliente;
        this.credentialsRV.Litros_Consumo = this.InfoVR.Litros_Consumo;
        this.credentialsRV.INV_CIL = this.InfoVR.INV_CIL;
        this.credentialsRV.Equiv_KG = this.InfoVR.Equiv_KG;
        this.credentialsRV.Comentarios = this.InfoVR.Comentarios;
        this.credentialsRV.createdAt = this.InfoVR.createdAt;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public creatForm() {
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
      createdAt: new FormControl(null, []),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  public EditarInformacion() {
    var f = new Date();
    let año = f.getFullYear();
    let mes = f.getMonth() + 1;
    let dia = f.getDate();
    console.log(mes);

    if (mes > 0 && mes < 10) {
      console.log("entre 0");

      let fechaCom = `${año}-0${mes}-${dia}`;
      this.credentialsRV.Venta_Kilos = this.credentialsRV.Cilidros_Vacios * 30;

      this.credentialsRV.Importe_Liquidar =
        this.credentialsRV.Venta_Kilos * this.credentialsRV.Precio_Prom -
        this.credentialsRV.Recibe_caja_efectivo -
        this.credentialsRV.Importe_credito;

      const id = this.activatedRouter.snapshot.paramMap.get("id");
      // console.log(id);
      if (this.formulario.valid) {
        this.RVService.ActualizarInfoRV(id, this.credentialsRV).subscribe(
          () => {
            Swal.fire(
              "Se Actualizo Correctamente",
              "Presiona para continuar..",
              "success"
            );

            this.router.navigateByUrl(
              `/SupervisorProfile/ReportesVentas/${this.InfoVR.marca}/${this.InfoVR.region}/${fechaCom}`
            );
            console.log(this.credentialsRV);
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al actualizar",
            });
            console.error(err);
          }
        );
      } else {
        Swal.fire({
          title: "Campos Incompletos!",
          text: "completa todos para continuar",
          icon: "warning",
        });
      }
    }
  }
}
