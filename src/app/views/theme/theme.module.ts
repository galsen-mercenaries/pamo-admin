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
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ItemsFormulaireComponent } from './autres/components/items-formulaire/items-formulaire.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
import { MeetingComponent } from './meeting/meeting.component';
import { EditMeetingComponent } from './meeting/components/edit-meeting/edit-meeting.component';
import { DeleteMeetingComponent } from './meeting/components/delete-meeting/delete-meeting.component';
import { PrestataireComponent } from './prestataire/prestataire.component';
import { AddPrestataireComponent } from './prestataire/components/add-prestataire/add-prestataire.component';
import { DeletePrestataireComponent } from './prestataire/components/delete-prestataire/delete-prestataire.component';
import { EditPrestataireComponent } from './prestataire/components/edit-prestataire/edit-prestataire.component';
import { StructureSanitaireComponent } from './structure-sanitaire/structure-sanitaire.component';
import { AddStructureSanitaireComponent } from './structure-sanitaire/components/add-structure-sanitaire/add-structure-sanitaire.component';
import { EditStructureSanitaireComponent } from './structure-sanitaire/components/edit-structure-sanitaire/edit-structure-sanitaire.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddPrestataireStructureComponent } from './prestataire/components/add-prestataire-structure/add-prestataire-structure.component';
import { PrestatraireStructureComponent } from './prestataire/components/prestatraire-structure/prestatraire-structure.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  imports: [ 
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxPaginationModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressBarModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [EditUserComponent, DeleteItemComponent, ItemsFormulaireComponent],
  declarations: [
    UtilisateurComponent,
    NewsComponent,
    AddNewsComponent,
    AutresComponent,
    EditUserComponent,
    DeleteItemComponent,
    ItemsFormulaireComponent,
    MeetingComponent,
    EditMeetingComponent,
    DeleteMeetingComponent,
    PrestataireComponent,
    AddPrestataireComponent,
    DeletePrestataireComponent,
    EditPrestataireComponent,
    StructureSanitaireComponent,
    AddStructureSanitaireComponent,
    EditStructureSanitaireComponent,
    AddPrestataireStructureComponent,
    PrestatraireStructureComponent
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class ThemeModule {}
