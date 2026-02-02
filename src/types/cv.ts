export interface CVData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin?: string;
        portfolio?: string;
    };
    summary: string;
    experience: Array<{
        title: string;
        company: string;
        location: string;
        startDate: string;
        endDate: string;
        current: boolean;
        description: string[];
    }>;
    education: Array<{
        degree: string;
        institution: string;
        location: string;
        graduationDate: string;
        gpa?: string;
    }>;
    skills: string[];
    languages?: string[];
    certifications?: Array<{
        name: string;
        issuer: string;
        date: string;
    }>;
    customSections?: Array<{
        title: string;
        items: Array<{
            title: string;
            description: string;
            date?: string;
        }>;
    }>;
}

export const defaultCVData: CVData = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
};
