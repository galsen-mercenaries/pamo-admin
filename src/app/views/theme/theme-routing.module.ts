import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilisateurComponent } from './utilisateur.component';
import { NewsComponent } from './news.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'utilisateur',
        component: UtilisateurComponent,
        data: {
          title: 'utilisateur'
        }
      },
      {
        path: 'news',
        component: NewsComponent,
        data: {
          title: 'news'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
