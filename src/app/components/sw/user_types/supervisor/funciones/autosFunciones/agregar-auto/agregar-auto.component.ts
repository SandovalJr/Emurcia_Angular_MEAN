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
  public formulario: FormGroup;

  credentialsRegistroAuto: AutosLoad = {
    id_auto: 0,
    Num_eco: null,
    anio: null,
    ubicacion: "",
    num_serie: "",
    marca_auto: "",
    modelo: "",
    placas: "",
    chofer_ruta: "",
    cilindros_piezas: null,
    marca: "",
  };

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private autoService: autosService,
    private MessageErrorSvr: MessageErrorsService
  ) {
    this.informacionUsuario();
  }

  ngOnInit(): void {
    this.creatForm();
  }

  public creatForm() {
    this.formulario = new FormGroup({
      Num_eco: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.numeric(),
      ]),
      anio: new FormControl(null, [
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

  // VALIDAR USUARIO
  // get Num_eco() {
  //   return this.formulario.get("Num_eco");
  // }
  // get anio() {
  //   return this.formulario.get("anio");
  // }
  // get ubicacion() {
  //   return this.formulario.get("ubicacion");
  // }
  // get num_serie() {
  //   return this.formulario.get("num_serie");
  // }
  // get marca_auto() {
  //   return this.formulario.get("marca_auto");
  // }
  // get modelo() {
  //   return this.formulario.get("modelo");
  // }
  // get placas() {
  //   return this.formulario.get("placas");
  // }
  // get chofer_ruta() {
  //   return this.formulario.get("chofer_ruta");
  // }
  // get cilindros_piezas() {
  //   return this.formulario.get("cilindros_piezas");
  // }
  // get marca() {
  //   return this.formulario.get("marca");
  // }

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

  addAuto() {
    this.formulario.setValue({
      Num_eco: this.credentialsRegistroAuto.Num_eco,
      anio: this.credentialsRegistroAuto.anio,
      ubicacion: this.credentialsRegistroAuto.ubicacion,
      num_serie: this.credentialsRegistroAuto.num_serie,
      marca_auto: this.credentialsRegistroAuto.marca_auto,
      modelo: this.credentialsRegistroAuto.modelo,
      placas: this.credentialsRegistroAuto.placas,
      chofer_ruta: this.credentialsRegistroAuto.chofer_ruta,
      cilindros_piezas: this.credentialsRegistroAuto.cilindros_piezas,
      marca: this.details.marca,
    });

    console.log(this.credentialsRegistroAuto);

    this.autoService.registerAuto(this.credentialsRegistroAuto).subscribe(
      () => {
        Swal.fire(
          "Se Agrego Correctamente",
          "Presiona para continuar..",
          "success"
        );
        this.router.navigateByUrl("/Inicio_Supervisor");
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Auto ya existente",
        });
        console.error(err);
      }
    );
  }
}
