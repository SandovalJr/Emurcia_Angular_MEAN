import { RouterModule, Routes } from "@angular/router";

// PAGINA WEB
import { PwComponent } from "../components/pw/pw.component";
// Log In
import { LogInSWComponent } from "../components/sw/log-in-sw/log-in-sw.component";
import { LogInErrorComponent } from "../components/sw/log-in-error/log-in-error.component";

// perfil
import { AdministradorComponent } from "../components/sw/user_types/administrador/administrador.component";
import { SupervisorComponent } from "../components/sw/user_types/supervisor/supervisor.component";
import { VendedorComponent } from "../components/sw/user_types/vendedor/vendedor.component";
// SERVICIOS
import { AuthGuardService } from "../../services/auth-guard.service";

// ADMIN
import { InicioAdminComponent } from "../components/sw/user_types/administrador/inicio-admin/inicio-admin.component";
import { Component } from "@angular/core";
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
        path: "inicio",
        component: InicioAdminComponent,
      },
    ],
  },

  // SUPERVISOR
  {
    path: "SupervisorProfile",
    component: SupervisorComponent,
    canActivate: [AuthGuardService],
  },
  // VENDEDOR
  {
    path: "VendedorProfile",
    component: VendedorComponent,
    canActivate: [AuthGuardService],
  },

  { path: "**", component: PwComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes);
