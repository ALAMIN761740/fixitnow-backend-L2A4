export interface TechnicianProfileInput {
    bio?: string | null;
    experienceYears?: number | null;
    skills?: string[] | null;
}

export interface TechnicianDTO {
    id: string;
    userId: string;
    bio?: string | null;
}
