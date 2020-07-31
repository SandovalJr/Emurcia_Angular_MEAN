import { RouterModule, Routes } from "@angular/router";
import { Component } from "@angular/core";

// PAGINA WEB
import { PwComponent } from "../components/pw/pw.component";
// Log In
import { LogInSWComponent } from "../components/sw/log-in-sw/log-in-sw.component";
import { LogInErrorComponent } from "../components/sw/log-in-error/log-in-error.component";

// TIPOS DE USUARIOS
import { AdministradorComponent } from "../components/sw/user_types/administrador/administrador.component";
import { SupervisorComponent } from "../components/sw/user_types/supervisor/supervisor.component";
import { VendedorComponent } from "../components/sw/user_types/vendedor/vendedor.component";

// SERVICIOS
import { AuthGuardService } from "../../services/auth-guard.service";

// ADMIN
import { InicioAdminComponent } from "../components/sw/user_types/administrador/inicio-admin/inicio-admin.component";
import { ListaUsuariosComponent } from "../components/sw/user_types/administrador/funciones/lista-usuarios/lista-usuarios.component";
import { AgregarUsuarioComponent } from "../components/sw/user_types/administrador/funciones/agregar-usuario/agregar-usuario.component";
import { EditarUsuarioComponent } from "../components/sw/user_types/administrador/funciones/editar-usuario/editar-usuario.component";

// SUPERVISOR
import { InicioSupervisorComponent } from "../components/sw/user_types/supervisor/inicio-supervisor/inicio-supervisor.component";
import { ListarAutosComponent } from "../components/sw/user_types/supervisor/funciones/autosFunciones/listar-autos/listar-autos.component";
import { AgregarAutoComponent } from "../components/sw/user_types/supervisor/funciones/autosFunciones/agregar-auto/agregar-auto.component";
import { EditarAutoComponent } from "../components/sw/user_types/supervisor/funciones/autosFunciones/editar-auto/editar-auto.component";
// VENDEDOR
import { IniciovendedorComponent } from "../components/sw/user_types/vendedor/iniciovendedor/iniciovendedor.component";

// ERROR 404
import { ErrorNoExistePaginaComponent } from "../components/errors/error-no-existe-pagina/error-no-existe-pagina.component";

const routes: Routes = [
  { path: "", component: PwComponent },
  { path: "login", component: LogInSWComponent },
  { path: "loginError", component: LogInErrorComponent },
  { path: "Home", component: PwComponent },
  // ADMINISTRADOR
  {
    path: "AdminProfile",
    component: AdministradorComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "Inicio",
        component: InicioAdminComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "ListaUsuarios",
        component: ListaUsuariosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "AgregarUsuario",
        component: AgregarUsuarioComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "EditarUsuario/:id",
        component: EditarUsuarioComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },

  // SUPERVISOR
  {
    path: "SupervisorProfile",
    component: SupervisorComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "Inicio_Supervisor",
        component: InicioSupervisorComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "Autos_Listado/:marca",
        component: ListarAutosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "AgregarAuto",
        component: AgregarAutoComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  // VENDEDOR
  {
    path: "VendedorProfile",
    component: VendedorComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "Inicio_Vendedor",
        component: IniciovendedorComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },

  // { path: "**", component: PwComponent },
  // SIEMPRE RUTA DEFAULT ERROR
  { path: "notFound", component: ErrorNoExistePaginaComponent },
  { path: "**", pathMatch: "full", redirectTo: "notFound" },
];

export const APP_ROUTES = RouterModule.forRoot(routes);
