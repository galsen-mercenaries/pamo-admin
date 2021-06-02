// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { AutresComponent } from './autres/autres.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { NewsComponent } from './news/news.component';
import { EditUserComponent } from './utilisateur/components/edit-user/edit-user.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteItemComponent } from './utilisateur/components/delete-item/delete-item.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: [EditUserComponent, DeleteItemComponent],
  declarations: [
    UtilisateurComponent,
    NewsComponent,
    AddNewsComponent,
    AutresComponent,
    EditUserComponent,
    DeleteItemComponent
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class ThemeModule { }
