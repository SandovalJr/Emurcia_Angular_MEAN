import { Component, OnInit } from "@angular/core";
import { Routes, Router } from "@angular/router";

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.scss"],
})
export class ListaUsuariosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  GoToAgregarUsuario() {
    this.router.navigate(["AdminProfile/AgregarUsuario"]);
  }
}
