import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stories' },
  { path: 'stories', component: StoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }