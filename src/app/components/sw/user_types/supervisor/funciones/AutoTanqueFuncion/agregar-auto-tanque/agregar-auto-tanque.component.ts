import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import {
  auto_Tanques_Service,
  Auto_TanquesLoad,
} from "../../../../../../../../services/auto_tanque.service";
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
  selector: "app-agregar-auto-tanque",
  templateUrl: "./agregar-auto-tanque.component.html",
  styleUrls: ["./agregar-auto-tanque.component.scss"],
})
export class AgregarAutoTanqueComponent implements OnInit {
  public formulario: FormGroup;
  details: UserDetails;

  credentialsRegistroAuto_Tanque: Auto_TanquesLoad = {
    id_autoTanque: 0,
    Num_eco: null,
    anio: null,
    ubicacion: "",
    num_serie: "",
    marca_auto: "",
    modelo: "",
    placas: "",
    chofer_ruta: "",
    cilindros_piezas: null,
    observaciones: "",
    AutoTanque: null,
    Porcentaje_Salida_Llegada: null,
    marca: "",
  };
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private autoTanqueService: auto_Tanques_Service,
    private MessageErrorSvr: MessageErrorsService
  ) {
    this.informacionUsuario();
  }

  ngOnInit(): void {
    this.creatForm();
  }

  // detalles del usuario para obtener la marca
  informacionUsuario() {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
        this.credentialsRegistroAuto_Tanque.marca = this.details.marca;
      },
      (err) => {
        console.error(err);
      }
    );
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
      cilindros_piezas: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.alphaNumeric(),
      ]),
      observaciones: new FormControl(null, []),
      AutoTanque: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.alphaNumeric(),
      ]),
      Porcentaje_Salida_Llegada: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.alphaNumeric(),
      ]),
      marca: new FormControl(null, []),
    });
  }
  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  public addAutoTanque() {
    if (this.formulario.valid) {
      this.autoTanqueService
        .registerAuto(this.credentialsRegistroAuto_Tanque)
        .subscribe(
          () => {
            Swal.fire(
              "Se Agrego Correctamente",
              "Presiona para continuar..",
              "success"
            );
            this.router.navigateByUrl(
              "/SupervisorProfile/AutoTanque_Listado/" + this.details.marca
            );
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
    } else {
      Swal.fire({
        title: "Campos Incompletos!",
        text: "completa todos para continuar",
        icon: "warning",
      });
    }
  }
}
