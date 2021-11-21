export interface StructureSanitaireModel {
    nom: string;
    structuresanitaireId?: number;
    code?: string;
    ville?: string;
    typePrestataire?: string;
    email?: string;
    adresse?: string;
    longitude?: string;
    latitude?: string;
    is_actif?: boolean;
    is_all_night?: boolean;
    periodicityType?: 'occurency' | 'duration';
    watch_start_date?: string;
    watch_end_date?: string;
    watch_periodicity_value?: string;
}
