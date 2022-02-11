import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {UserModel} from '../../../models/user.model';
import {SharedService} from '../../shared/shared.service';
import {DeleteItemComponent} from './components/delete-item/delete-item.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {UtilisateurService} from './user-service/utilisateur.service';

@Component({
    selector: 'app-utilisateur',
    templateUrl: './utilisateur.component.html',
    styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
    users: UserModel[];
    userCount: any;
    roleSelected: '';
    p: number = 1;
    pagelimit: number = 6;

    modalRef: BsModalRef;
    utilisateurForm = this.formBuilder.group({
        nom: '',
        prenom: '',
        email: '',
        numero: '',
        adresse: '',
        password: '',
        role: '',
        specialisation: [''],
        structure_sante: ''
    });
    totalUsers: any;
    roles: any;
    specialisations: any;
    structures: any;
    selectedUser: any;
    userDialogRef: MatDialogRef<EditUserComponent>;
    USER_TABLE_COLUMNS = ['prenom', 'nom', 'email', 'date_creation', 'role', 'numero', 'adresse', 'account_status'];
    constructor(
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        private utilisateurService: UtilisateurService,
        private sharedService: SharedService,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getRoles();
        this.getStructures();
        this.getSpecialisation();
        //this.getUtilisateurs()
        this.getUserPagination(this.pagelimit, 0);
        this.countUsers();
    }

    getRoles() {
        this.sharedService.getRoles().subscribe(data => {
            this.roles = data;
        });
    }

    getSpecialisation() {
        this.sharedService.getSpecialisations().subscribe(data => {
            this.specialisations = data;
        });
    }

    getStructures() {
        this.sharedService.getStructures().subscribe(data => {
            this.structures = data;
        });
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    onRoleChange(value) {
        this.roleSelected = value;
    }

    openDialogUser(user: UserModel, mode?: 'edit' | 'see' | 'create') {
        this.userDialogRef = this.matDialog.open(EditUserComponent, {
            data: {user, mode},
            width: '450px'
        });
        this.userDialogRef.afterClosed().subscribe((res: any) => {
            console.log('res', res);

            if(res?.payload) {
                console.log('resp', res.payload);
                if(mode === 'edit') {
                    this.updateUserList(res?.payload);
                } else if (mode === 'create') {
                    this.getPage(this.p)
                }

            }
        })
    }

    deactiveUser(user: UserModel) {
        const modalRef = this.matDialog.open(DeleteItemComponent, {
            data: {user, role: user.role},
            width: '450px'
        });
        modalRef.afterClosed().subscribe((res: any) => {
            if(res?.payload) {
                user.account_status = false;
            }
        })
    }

    onSubmit() {
        var utilisateur = this.utilisateurForm.value;
        if (utilisateur.role != 'ROLE_MEDECIN') {
            delete utilisateur['specialisation'];
            delete utilisateur['structure'];
        }
        console.log(utilisateur);
        this.utilisateurService.addUtilisateur(utilisateur).subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            }
        );
    }
    getUtilisateurs() {
        this.utilisateurService.getUtilisateurs().subscribe(data => {
            this.users = data;
            console.log(data);
            this.countUserByRole(this.users);
        });
    }

    countUserByRole(data) {
        this.userCount = this.sharedService.groupArrayOfObjects(data, 'role');
        console.log(this.userCount);
    }

    getUserPagination(limit, skip) {
        this.utilisateurService.getUtilisateurPagination(limit, skip).subscribe(res => {
            this.users = res;
            console.log('users', this.users);

        });
    }

    countUsers() {
        this.utilisateurService.CountTotalUser().subscribe(res => {
            this.totalUsers = res.count;
            console.log(res);
        });
    }

    getPage(event) {
        this.p = event;
        var skip = (event - 1) * this.pagelimit;
        this.getUserPagination(this.pagelimit, skip);
    }

    updateUserList(user: UserModel) {
        const index =  this.users.findIndex((res: UserModel) => res.userId === user.userId);
        this.users[index] = Object.assign({}, this.users[index], user, {role: this.users[index].role});
    }
}
