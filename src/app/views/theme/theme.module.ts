// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UtilisateurComponent } from './utilisateur.component';
import { NewsComponent } from './news.component'
// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { AutresComponent } from './autres/autres.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    UtilisateurComponent,
    NewsComponent,
    AddNewsComponent,
    AutresComponent
  ]
})
export class ThemeModule { }
