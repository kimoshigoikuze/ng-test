import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookComponent} from './components/book/book.component';
import {LandingComponent} from './components/landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'page/:page', component: LandingComponent},
  {path: 'book/:id', component: BookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
