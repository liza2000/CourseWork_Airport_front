import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './client/main/main.component';
import { EmployerComponent } from './employer/employer.component';
import { BookComponent } from './client/book/book.component';
import { RegistrationComponent } from './employer/registration/registration.component';
import { LandingComponent } from './employer/landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeControlComponent } from './admin/employee-control/employee-control.component';
import { AircraftControlComponent } from './admin/aircraft-control/aircraft-control.component';
import { LendSheduleControlComponent } from './admin/land-shedule-control/lend-shedule-control.component';
import { CompaniesControlComponent } from './admin/companies-control/companies-control.component';
import {FlightControlComponent} from './admin/flight-control/flight-control.component';
import { ChangeBookComponent } from './client/change-book/change-book.component';
import {FlightsSearchService} from './services/flights-search.service';
import {BetweenComponentsService} from './services/betweenComponents.service';
import {HttpClientModule} from '@angular/common/http';
import {BookTicketsService} from './services/book-tickets.service';
import {RegistrationService} from './services/registration.service';
import {LandService} from './services/land.service';
const appRoutes: Routes = [
  {
  path: 'main',
   component: MainComponent
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employer',
    component: EmployerComponent
  },
  {
   path: 'admin',
   component: AdminComponent
  },
  {
    path: 'change-book',
    component: ChangeBookComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    EmployerComponent,
    BookComponent,
    RegistrationComponent,
    LandingComponent,
    AdminComponent,
    EmployeeControlComponent,
    AircraftControlComponent,
    LendSheduleControlComponent,
    CompaniesControlComponent,
    FlightControlComponent,
    ChangeBookComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
  HttpClientModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [FlightsSearchService, BetweenComponentsService, BookTicketsService, RegistrationService, LandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
