import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { NewsComponent } from './news/news.component'
import { AddNewsComponent } from './news/add-news/add-news.component';
import { AutresComponent } from './autres/autres.component';
import { MeetingComponent } from './meeting/meeting.component';
import { PrestataireComponent } from './prestataire/prestataire.component';
import { AddPrestataireComponent } from './prestataire/components/add-prestataire/add-prestataire.component';
import { StructureSanitaireComponent } from './structure-sanitaire/structure-sanitaire.component';
import { AddStructureSanitaireComponent } from './structure-sanitaire/components/add-structure-sanitaire/add-structure-sanitaire.component';
import { EditPrestataireComponent } from './prestataire/components/edit-prestataire/edit-prestataire.component';
import { AddPrestataireStructureComponent } from './prestataire/components/add-prestataire-structure/add-prestataire-structure.component';
import {PrestatraireStructureComponent} from './prestataire/components/prestatraire-structure/prestatraire-structure.component'

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
      },
      {
        path: 'news/add',
        component: AddNewsComponent,
        data: {
          title: 'Ajout Infos'
        }
      },
      {
        path: 'news/edit/:id',
        component: AddNewsComponent,
        data: {
          title: 'Modification Infos'
        }
      },
      {
        path: 'autres',
        component: AutresComponent,
        data: {
          title: 'Autres Services'
        }
      },
      {
        path: 'prestataire',
        component: PrestataireComponent,
        data: {
          title: 'Prestataire'
        }
      },
      {
        path: 'prestataire/add',
        component: AddPrestataireComponent,
        data: {
          title: 'Ajout Prestataire'
        }
      },
      {
        path: 'prestataire/edit/:id',
        component: AddPrestataireComponent,
        data: {
          title: 'Modification Prestataire'
        }
      },
      {
        path: 'meeting',
        component: MeetingComponent,
        data:{
          title: 'Meeting'
        }
      },
      {
        path: 'structure-sanitaire', 
        component: StructureSanitaireComponent,
        data:{
          title: 'Structure Sanitaire'
        }
      },
      {
        path: 'structure-sanitaire/add',
        component: AddStructureSanitaireComponent,
        data:{
          title: 'Ajout Structure'
        }
      },
      {
        path: 'structure-sanitaire/edit/:id',
        component: AddStructureSanitaireComponent,
        data:{
          title: 'Modifier Structure'
        }
      },
      {
        path: 'prestataire/add-structure',
        component: AddPrestataireStructureComponent,
        data: {
          title: 'Ajout Prestataire-Structure'
        }
      },
      {
        path: 'prestataire/structure-sanitaire/:id',
        component: PrestatraireStructureComponent,
        data: {
          title: 'Liste des structures sanitaires'
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
