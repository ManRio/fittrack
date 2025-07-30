import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoutinesComponent } from './pages/routines/routines.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { HabitsComponent } from './pages/habits/habits.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'routines', component: RoutinesComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'habits', component: HabitsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' },
];
