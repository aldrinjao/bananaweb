import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HarvestComponent } from './harvest/harvest.component';
import { StageComponent } from './stage/stage.component';
import { VarietyComponent } from './variety/variety.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LocationComponent } from './location/location.component';
import { FormComponent } from './form/form.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'variety', component: VarietyComponent },
  { path: 'stage', component: StageComponent },
  { path: 'harvest/:stage', component: HarvestComponent },
  { path: 'location', component: LocationComponent },
  { path: 'form', component: FormComponent },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
