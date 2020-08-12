import { LandingComponent } from './pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './pages/session/session.component';

const routes: Routes = [
  {
    path: 'session/:id',
    component: SessionComponent,
  },
  {
    path: '',
    component: LandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
