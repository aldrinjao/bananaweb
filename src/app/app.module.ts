import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

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
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { LocationComponent } from './location/location.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MzdTimelineModule } from 'ngx-mzd-timeline';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthService } from './shared/services/auth.service';
import { Auth2Service } from './shared/services/auth2.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';


import { PwaService } from './shared/services/pwa.service';
import { UpdateService } from './shared/services/update.service';
import { FarmService } from './shared/services/farm.service';

import { PromptComponent } from './prompt/prompt.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { NotesComponent } from './notes/notes.component';
import { DialoghtmlComponent } from './location/dialoghtml/dialoghtml.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FarmviewComponent } from './components/farmview/farmview.component';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();


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
    NotfoundComponent,
    SplashScreenComponent,
    PromptComponent,
    LoginComponent,
    RegisterComponent,
    NotesComponent,
    DialoghtmlComponent,
    SignInComponent,
    DashboardComponent,
    SignUpComponent,
    FarmviewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MzdTimelineModule

  ],
  providers: [
    AuthService,
    Auth2Service,
    UpdateService,
    FarmService,
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true },
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
