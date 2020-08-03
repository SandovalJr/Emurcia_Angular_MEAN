import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import {
  autosService,
  AutosLoad,
  AutosDetails,
} from "../../../../../../../../services/autos.service";
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
  selector: "app-editar-auto",
  templateUrl: "./editar-auto.component.html",
  styleUrls: ["./editar-auto.component.scss"],
})
export class EditarAutoComponent implements OnInit {
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
    private activatedRouter: ActivatedRoute,
    private autoServicio: autosService,
    private router: Router,
    private auth: AuthenticationService,
    private autoService: autosService,
    private MessageErrorSvr: MessageErrorsService
  ) {
    this.InformacionAutoAEditar();
  }
  detallesAuto: AutosDetails;
  ngOnInit(): void {
    this.creatForm();
  }

  // INFORMACION DEL USUARIO A EDITAR
  InformacionAutoAEditar() {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    // console.log(id);
    this.autoServicio.InfoAutoEdit(id).subscribe(
      (auto) => {
        this.detallesAuto = auto;
        console.log(this.detallesAuto);
        this.credentialsRegistroAuto.Num_eco = this.detallesAuto.Num_eco;
        this.credentialsRegistroAuto.anio = this.detallesAuto.anio;
        this.credentialsRegistroAuto.chofer_ruta = this.detallesAuto.chofer_ruta;
        this.credentialsRegistroAuto.marca_auto = this.detallesAuto.marca_auto;
        this.credentialsRegistroAuto.modelo = this.detallesAuto.modelo;
        this.credentialsRegistroAuto.num_serie = this.detallesAuto.num_serie;
        this.credentialsRegistroAuto.placas = this.detallesAuto.placas;
        this.credentialsRegistroAuto.ubicacion = this.detallesAuto.ubicacion;
        this.credentialsRegistroAuto.marca = this.detallesAuto.marca;
        this.credentialsRegistroAuto.cilindros_piezas = this.detallesAuto.cilindros_piezas;
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
      marca: new FormControl(null, []),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  ActualizarInfoAuto() {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    console.log("para actualizar" + id);
    console.log(this.credentialsRegistroAuto);
    if (this.formulario.valid) {
      console.log("valido");
    } else {
      Swal.fire({
        title: "Campos Incompletos!",
        text: "completa todos para continuar",
        icon: "warning",
      });
    }
  }
}
