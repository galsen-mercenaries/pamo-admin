export interface UserModel {
    userId?: number;
    nom: string;
    prenom: string;
    email: string;
    numero?: string;
    adresse?: string;
    role?: any;
    image?: string;
    account_status?: boolean;
    date_creation?: string;
    structuresanitaireId?: number;
}
