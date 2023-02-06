import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/Cadastro/cadastro.component';
import { PacientesComponent } from './components/Pacientes/pacientes.component';
import { ProcedimentoComponent } from './components/Procedimento/procedimento.component';

const routes: Routes = [
  {path: '', component: CadastroComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'procedimentos', component: ProcedimentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
