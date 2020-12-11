import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DemoMaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WelcomeComponent } from './welcome/welcome.component';
import { VarietyComponent } from './variety/variety.component';
import { StageComponent } from './stage/stage.component';
import { ResultComponent } from './result/result.component';
import { MaterialElevationDirective } from './material-elevation.directive';
import { HarvestComponent } from './harvest/harvest.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LocationComponent } from './location/location.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MzdTimelineModule } from 'ngx-mzd-timeline';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    VarietyComponent,
    StageComponent,
    ResultComponent,
    MaterialElevationDirective,
    HarvestComponent,
    LocationComponent,
    FormComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    DemoMaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MzdTimelineModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
