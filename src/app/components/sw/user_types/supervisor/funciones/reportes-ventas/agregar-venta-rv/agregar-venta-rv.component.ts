import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import {
  RxwebValidators,
  ReactiveFormConfig,
  NumericValueType,
} from "@rxweb/reactive-form-validators";
import {
  ReporteVentasDetails,
  ReporteVentasLoad,
  ReporteDeVentasService,
} from "../.././../../../../../../services/reporteDeVentas.service";
import { MessageErrorsService } from "../../../../../../../../services/messageError.service";
@Component({
  selector: "app-agregar-venta-rv",
  templateUrl: "./agregar-venta-rv.component.html",
  styleUrls: ["./agregar-venta-rv.component.scss"],
})
export class AgregarVentaRVComponent implements OnInit {
  public formulario: FormGroup;
  credentialsRV: ReporteVentasLoad = {
    id_RV: 0,
    marca: "",
    region: "",
    auto: "",
    Venta_Kilos: 0,
    Precio_Prom: 0,
    Importe_Liquidar: 0,
    Recibe_caja_efectivo: 0,
    credito_cilindro: 0,
    Importe_credito: 0,
    Cel_Tel_Cliente: "",
    Litros_Consumo: 0,
    INV_CIL: 0,
    Equiv_KG: 0,
    Comentarios: "",
    Cilidros_Vacios: 0,
  };

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private MessageErrorSvr: MessageErrorsService
  ) {}

  ngOnInit(): void {
    this.creatForm();

    // console.log(` la fecha de parametro es:ARV ${createdAt}`);
    // console.log(` la marca de parametro es:ARV ${marca} y la region es ${region}`);
  }

  public creatForm() {
    this.formulario = new FormGroup({
      marca: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.alpha(),
      ]),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  AgregarVenta() {
    const marca = this.activatedRouter.snapshot.paramMap.get("marca");
    const region = this.activatedRouter.snapshot.paramMap.get("region");
    const createdAt = this.activatedRouter.snapshot.paramMap.get("createdAt");
  }
}
