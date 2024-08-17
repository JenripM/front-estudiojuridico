import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AppTrabajadoresComponent } from './trabajadores/trabajadores.component';
import { AppTrabajadorRegistrarComponent } from './trabajadores/registrar/registrar.component';

import { CasosRegistrarComponent } from './casosjuridicos/registrar/registrar.component';
import { CasosEditarComponent } from './casosjuridicos/editar/editar.component';
import { CasosCasoComponent } from './casosjuridicos/caso/caso.component';
import { CasosEliminarComponent } from './casosjuridicos/eliminar/eliminar.component';
import { CasosjuridicosComponent } from './casosjuridicos/casosjuridicos.component';
import { ActividadesRegistrarComponent } from './casosjuridicos/actividades/registrar/registrar.component';
import { ActividadesEliminarComponent } from './casosjuridicos/actividades/eliminar/eliminar.component';
import { ActividadesEditarComponent } from './casosjuridicos/actividades/editar/editar.component';
import { CargoComponent } from './cargo/cargo.component';
import { MatIconModule } from '@angular/material/icon';
import { EditarComponent } from './trabajadores/editar/editar.component';
import { EliminarComponent } from './trabajadores/eliminar/eliminar.component';
import { RolesUsuarioComponent } from './roles-usuario/roles-usuario.component';
import { UsuarioRegistrarComponent } from './roles-usuario/registrar/registrar.component';
import { UsuarioEliminarComponent } from './roles-usuario/eliminar/eliminar.component';
import { UsuarioEditarComponent } from './roles-usuario/editar/editar.component';
import { AppDocumentosComponent } from './documentos/documentos.component';
import { RegistrarComponent } from './documentos/registrar/registrar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    AppTrabajadorRegistrarComponent,
    CasosRegistrarComponent,
    UsuarioRegistrarComponent,
    UsuarioEliminarComponent,
    UsuarioEditarComponent,
    CasosEditarComponent,
    CasosCasoComponent,
    CasosEliminarComponent,
    ActividadesRegistrarComponent,
    ActividadesEliminarComponent,
    ActividadesEditarComponent,
    CargoComponent,
    EditarComponent,
    EliminarComponent,
    MatIconModule,
  ],
  declarations: [
    AppBadgeComponent,
    AppChipsComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent,
    AppTrabajadoresComponent,
    CasosjuridicosComponent,
    RolesUsuarioComponent,
    AppDocumentosComponent,


  ],
})
export class UicomponentsModule {}
