import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import {
  autosService,
  AutosLoad,
} from "../../../../../../../../services/autos.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AuthenticationService,
  UserDetails,
} from "../../../../../../../../services/authentication.service";
import { MessageErrorsService } from "../../../../../../../../services/messageError.service";
import {
  RxwebValidators,
  ReactiveFormConfig,
  NumericValueType,
} from "@rxweb/reactive-form-validators";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-agregar-auto",
  templateUrl: "./agregar-auto.component.html",
  styleUrls: ["./agregar-auto.component.scss"],
})
export class AgregarAutoComponent implements OnInit {
  details: UserDetails;
  private MessageErrorSvr: MessageErrorsService;
  formulario: FormGroup;
  constructor(private autoService: autosService, private router: Router) {}

  ngOnInit(): void {
    this.creatForm();
  }

  public creatForm() {
    this.formulario = new FormGroup({
      Num_eco: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.numeric(),
      ]),
      año: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.numeric(),
      ]),
      ubicacion: new FormControl(null, [RxwebValidators.required()]),
      num_serie: new FormControl(null, [RxwebValidators.required()]),
      marca_auto: new FormControl(null, [RxwebValidators.required()]),
      modelo: new FormControl(null, [RxwebValidators.required()]),
      placas: new FormControl(null, [RxwebValidators.required()]),
      chofer_ruta: new FormControl(null, [RxwebValidators.required()]),
      cilindros_piezas: new FormControl(null, [RxwebValidators.required()]),
      marca: new FormControl(null, [RxwebValidators.required()]),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  addAuto() {

  }

}
