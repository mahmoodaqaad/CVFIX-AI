import { CVData } from "@/types/cv";

export function parseTextToCV(text: string): CVData {
    const lines = text.split("\n").map((line) => line.trim());

    const cvData: CVData = {
        personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            portfolio: "",
        },
        summary: "",
        experience: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
    };

    let currentSection = "";
    let buffer: string[] = [];

    // First pass: extract personal info from top
    for (let i = 0; i < Math.min(10, lines.length); i++) {
        const line = lines[i];
        const lowerLine = line.toLowerCase();

        // Name (usually first non-empty line or line with "name:")
        if (!cvData.personalInfo.fullName) {
            if (lowerLine.startsWith("name:")) {
                cvData.personalInfo.fullName = line.replace(/^name:\s*/i, "").trim();
            } else if (i === 0 && line.length > 3 && line.length < 60 && !line.includes("@")) {
                cvData.personalInfo.fullName = line;
            }
        }

        // Email
        if (lowerLine.includes("email:") || line.includes("@")) {
            const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/);
            if (emailMatch) {
                cvData.personalInfo.email = emailMatch[0];
            }
        }

        // Phone
        if (lowerLine.includes("phone:") || line.match(/[\+\d][\d\s\-\(\)]{8,}/)) {
            const phoneMatch = line.match(/[\+\d][\d\s\-\(\)]{8,}/);
            if (phoneMatch) {
                cvData.personalInfo.phone = phoneMatch[0].trim();
            }
        }

        // LinkedIn
        if (lowerLine.includes("linkedin")) {
            const linkedinMatch = line.match(/linkedin\.com\/[\w\-\/]+/i);
            if (linkedinMatch) {
                cvData.personalInfo.linkedin = linkedinMatch[0];
            }
        }

        // Portfolio/Website
        if (lowerLine.includes("portfolio") || lowerLine.includes("website")) {
            const urlMatch = line.match(/https?:\/\/[\w\-\.\/]+/);
            if (urlMatch) {
                cvData.personalInfo.portfolio = urlMatch[0];
            }
        }

        // Location
        if (lowerLine.includes("location:") || lowerLine.includes("address:")) {
            cvData.personalInfo.location = line.replace(/^(location|address):\s*/i, "").trim();
        }
    }

    // Second pass: parse sections
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lowerLine = line.toLowerCase();

        // Detect section headers
        if (
            lowerLine.match(/^(work\s+)?experience:?$/i) ||
            lowerLine.match(/^(employment|work\s+history):?$/i)
        ) {
            processSection(currentSection, buffer, cvData);
            currentSection = "experience";
            buffer = [];
            continue;
        } else if (lowerLine.match(/^education:?$/i)) {
            processSection(currentSection, buffer, cvData);
            currentSection = "education";
            buffer = [];
            continue;
        } else if (lowerLine.match(/^skills?:?$/i) || lowerLine.match(/^technical\s+skills?:?$/i)) {
            processSection(currentSection, buffer, cvData);
            currentSection = "skills";
            buffer = [];
            continue;
        } else if (lowerLine.match(/^projects?:?$/i)) {
            processSection(currentSection, buffer, cvData);
            currentSection = "projects";
            buffer = [];
            continue;
        } else if (
            lowerLine.match(/^(summary|objective|profile):?$/i)
        ) {
            processSection(currentSection, buffer, cvData);
            currentSection = "summary";
            buffer = [];
            continue;
        } else if (lowerLine.match(/^certifications?:?$/i)) {
            processSection(currentSection, buffer, cvData);
            currentSection = "certifications";
            buffer = [];
            continue;
        } else if (lowerLine.match(/^languages?:?$/i)) {
            processSection(currentSection, buffer, cvData);
            currentSection = "languages";
            buffer = [];
            continue;
        }

        // Add line to current section buffer
        if (currentSection && line) {
            buffer.push(line);
        }
    }

    // Process last section
    processSection(currentSection, buffer, cvData);

    return cvData;
}

function processSection(section: string, lines: string[], cvData: CVData) {
    if (!section || lines.length === 0) return;

    if (section === "summary") {
        cvData.summary = lines.join(" ").trim();
    } else if (section === "experience" || section === "projects") {
        const items = parseExperienceOrProjects(lines);
        if (section === "experience") {
            cvData.experience.push(...items);
        } else {
            // Add projects as experience entries
            cvData.experience.push(...items.map(item => ({
                ...item,
                company: item.company || "Personal Project"
            })));
        }
    } else if (section === "education") {
        cvData.education.push(...parseEducation(lines));
    } else if (section === "skills") {
        cvData.skills.push(...parseSkills(lines));
    } else if (section === "languages") {
        cvData.languages = parseLanguages(lines);
    } else if (section === "certifications") {
        cvData.certifications = parseCertifications(lines);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseExperienceOrProjects(lines: string[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentItem: any = null;

    for (const line of lines) {
        // Check if it's a new item (numbered or bullet point at start)
        if (line.match(/^\d+\.\s+/) || (line.match(/^[•\-]\s+/) && !currentItem)) {
            if (currentItem) {
                items.push(currentItem);
            }
            currentItem = {
                title: line.replace(/^[\d\.\-•]\s+/, "").trim(),
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: [],
            };
        } else if (currentItem) {
            // Check for dates
            const dateMatch = line.match(/(\w+\s+\d{4}|\d{4})\s*[-–]\s*(\w+\s+\d{4}|\d{4}|Present|Current)/i);
            if (dateMatch) {
                currentItem.startDate = dateMatch[1];
                currentItem.endDate = dateMatch[2];
                currentItem.current = /present|current/i.test(dateMatch[2]);
            } else if (line.match(/^[•\-]/)) {
                // Description bullet point
                currentItem.description.push(line.replace(/^[•\-]\s*/, "").trim());
            } else if (!currentItem.company && line.length > 0 && line.length < 100) {
                // Likely company/organization name
                currentItem.company = line;
            } else if (line.length > 0) {
                currentItem.description.push(line);
            }
        }
    }

    if (currentItem) {
        items.push(currentItem);
    }

    return items;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEducation(lines: string[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentItem: any = null;

    for (const line of lines) {
        if (line.match(/^[•\-]/)) {
            if (currentItem) {
                items.push(currentItem);
            }
            currentItem = {
                degree: line.replace(/^[•\-]\s*/, "").trim(),
                institution: "",
                location: "",
                graduationDate: "",
            };
        } else if (currentItem) {
            const dateMatch = line.match(/\d{4}/);
            if (dateMatch && !currentItem.graduationDate) {
                currentItem.graduationDate = dateMatch[0];
            }
            if (!currentItem.institution && line.length > 0 && !line.match(/^\d{4}/)) {
                currentItem.institution = line;
            }
        }
    }

    if (currentItem) {
        items.push(currentItem);
    }

    return items;
}

function parseSkills(lines: string[]): string[] {
    const skills: string[] = [];

    for (const line of lines) {
        // Remove bullet points and split by common delimiters
        const cleaned = line.replace(/^[•\-]\s*/, "");
        const parts = cleaned.split(/[,;|]/).map(s => s.trim()).filter(Boolean);
        skills.push(...parts);
    }

    return skills;
}

function parseLanguages(lines: string[]): string[] {
    const languages: string[] = [];

    for (const line of lines) {
        const cleaned = line.replace(/^[•\-]\s*/, "");
        const parts = cleaned.split(/[,;|]/).map(s => s.trim()).filter(Boolean);
        languages.push(...parts);
    }

    return languages;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCertifications(lines: string[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const certs: any[] = [];

    for (const line of lines) {
        if (line.match(/^[•\-]/)) {
            const cleaned = line.replace(/^[•\-]\s*/, "");
            const dateMatch = cleaned.match(/\d{4}/);
            certs.push({
                name: cleaned.replace(/\d{4}/, "").trim(),
                issuer: "",
                date: dateMatch ? dateMatch[0] : "",
            });
        }
    }

    return certs;
}
