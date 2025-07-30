import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoutinesComponent } from './pages/routines/routines.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { HabitsComponent } from './pages/habits/habits.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    RoutinesComponent,
    ProgressComponent,
    HabitsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
