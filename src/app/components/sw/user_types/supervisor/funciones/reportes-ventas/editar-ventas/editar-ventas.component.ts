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
  selector: "app-editar-ventas",
  templateUrl: "./editar-ventas.component.html",
  styleUrls: ["./editar-ventas.component.scss"],
})
export class EditarVentasComponent implements OnInit {
  public formulario: FormGroup;
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
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }



}
