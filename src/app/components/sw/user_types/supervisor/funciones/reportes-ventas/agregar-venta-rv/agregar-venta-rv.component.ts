import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import {
  RxwebValidators,
  ReactiveFormConfig,
  NumericValueType,
} from "@rxweb/reactive-form-validators";
import { MessageErrorsService } from "../../../../../../../../services/messageError.service";
@Component({
  selector: "app-agregar-venta-rv",
  templateUrl: "./agregar-venta-rv.component.html",
  styleUrls: ["./agregar-venta-rv.component.scss"],
})
export class AgregarVentaRVComponent implements OnInit {
  public formulario: FormGroup;
  // credentialsRV: AutosLoad = {
  //   id_auto: 0,
  //   Num_eco: null,
  //   anio: null,
  //   ubicacion: "",
  //   num_serie: "",
  //   marca_auto: "",
  //   modelo: "",
  //   placas: "",
  //   chofer_ruta: "",
  //   cilindros_piezas: null,
  //   marca: "",
  // };

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
      Num_eco: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.numeric(),
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
