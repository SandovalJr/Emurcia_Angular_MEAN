import { RouterModule, Routes } from "@angular/router";

// PAGINA WEB
import { PwComponent } from "../components/pw/pw.component";
// Log In
import { LogInSWComponent } from "../components/sw/log-in-sw/log-in-sw.component";

// perfil
import { AdministradorComponent } from "../components/sw/user_types/administrador/administrador.component";
import { SupervisorComponent } from "../components/sw/user_types/supervisor/supervisor.component";
import { VendedorComponent } from "../components/sw/user_types/vendedor/vendedor.component";
// SERVICIOS
import { AuthGuardService } from "../../services/auth-guard.service";

const routes: Routes = [
  { path: "", component: PwComponent },
  { path: "login", component: LogInSWComponent },
  { path: "Home", component: PwComponent },
  {
    path: "AdminProfile",
    component: AdministradorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "SupervisorProfile",
    component: SupervisorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "VendedorProfile",
    component: VendedorComponent,
    canActivate: [AuthGuardService],
  },

  { path: "**", component: PwComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes);
