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
  details: UserDetails;
  public fecha;
  // public marca = this.activatedRouter.snapshot.paramMap.get("marca");
  // public region = this.activatedRouter.snapshot.paramMap.get("region");
  // public createdAt = this.activatedRouter.snapshot.paramMap.get("createdAt");

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
    private MessageErrorSvr: MessageErrorsService,
    private auth: AuthenticationService
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
    let mes = f.getMonth();
    let dia = f.getDate();
    // LA FECHA SOLO SE MUESTRA NO SE MANDA AL BACK
    if (mes > 0 && mes < 10) {
      this.fecha = `${dia}-0${mes}-${año}`;
    } else {
      this.fecha = `${dia}-${mes}-${año}`;
    }

    this.formulario = new FormGroup({
      marca: new FormControl(null, []),
      region: new FormControl(null, []),
    });

    // console.log(this.formulario.valid);
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  AgregarVenta() {}
}
