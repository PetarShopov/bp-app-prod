import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DarpaComponent }   from './darpa/darpa.component';
import { WikiRandComponent }   from './wiki-rand/wiki-rand.component';

const routes: Routes = [
  { path: '', redirectTo: '/wiki', pathMatch: 'full' },
  { path: 'wiki', component: WikiRandComponent },
  { path: 'darpa', component: DarpaComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
