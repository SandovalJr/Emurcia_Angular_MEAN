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
import { Router, ActivatedRoute } from "@angular/router";
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
  selector: "app-editar-auto-tanque",
  templateUrl: "./editar-auto-tanque.component.html",
  styleUrls: ["./editar-auto-tanque.component.scss"],
})
export class EditarAutoTanqueComponent implements OnInit {
  public formulario: FormGroup;
  public infoUsuario: Auto_TanquesLoad;

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
    private MessageErrorSvr: MessageErrorsService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.InfAutoId();
    this.creatForm();
  }

  public InfAutoId() {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    // console.log(id);
    this.autoTanqueService.ListarInfoAT(id).subscribe(
      (infoUsuario) => {
        this.infoUsuario = infoUsuario;
        this.credentialsRegistroAuto_Tanque.Num_eco = this.infoUsuario.Num_eco;
        this.credentialsRegistroAuto_Tanque.anio = this.infoUsuario.anio;
        this.credentialsRegistroAuto_Tanque.chofer_ruta = this.infoUsuario.chofer_ruta;
        this.credentialsRegistroAuto_Tanque.marca_auto = this.infoUsuario.marca_auto;
        this.credentialsRegistroAuto_Tanque.modelo = this.infoUsuario.modelo;
        this.credentialsRegistroAuto_Tanque.num_serie = this.infoUsuario.num_serie;
        this.credentialsRegistroAuto_Tanque.placas = this.infoUsuario.placas;
        this.credentialsRegistroAuto_Tanque.ubicacion = this.infoUsuario.ubicacion;
        this.credentialsRegistroAuto_Tanque.marca = this.infoUsuario.marca;
        this.credentialsRegistroAuto_Tanque.cilindros_piezas = this.infoUsuario.cilindros_piezas;
        this.credentialsRegistroAuto_Tanque.AutoTanque = this.infoUsuario.AutoTanque;
        this.credentialsRegistroAuto_Tanque.Porcentaje_Salida_Llegada = this.infoUsuario.Porcentaje_Salida_Llegada;
        this.credentialsRegistroAuto_Tanque.observaciones = this.infoUsuario.observaciones;
      },
      (err) => {
        console.log(err);
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
      cilindros_piezas: new FormControl(null, [RxwebValidators.required()]),
      observaciones: new FormControl(null, []),
      AutoTanque: new FormControl(null, [RxwebValidators.required()]),
      Porcentaje_Salida_Llegada: new FormControl(null, [
        RxwebValidators.required(),
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

  public EditarInformacion() {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    console.log(id);
    if (this.formulario.valid) {
      this.autoTanqueService
        .EditarAutosTanques(id, this.credentialsRegistroAuto_Tanque)
        .subscribe(
          () => {
            Swal.fire(
              "Se Actualizo Correctamente",
              "Presiona para continuar..",
              "success"
            );
            this.router.navigateByUrl(
              "/SupervisorProfile/AutoTanque_Listado/" +
                this.credentialsRegistroAuto_Tanque.marca
            );
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
