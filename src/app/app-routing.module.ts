import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
import { UserComponent } from './components/user/user.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stories' },
  { path: 'stories', component: StoriesComponent },
  { path: 'user/:id', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }