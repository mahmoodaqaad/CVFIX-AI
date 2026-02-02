"use client";

import { CVData } from "@/types/cv";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Language, translations } from "@/types/language";

interface CVFormProps {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
    language: Language;
}

export function CVForm({ cvData, setCvData, language }: CVFormProps) {
    const [activeSection, setActiveSection] = useState<string | null>("personal");
    const t = translations[language];
    const isRtl = language === 'ar';

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCvData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value },
        }));
    };

    const handleArrayChange = (
        section: "experience" | "education" | "certifications" | "customSections",
        index: number,
        field: string,
        value: any
    ) => {
        setCvData((prev) => {
            const newData = { ...prev };
            const list = newData[section] as any[];
            if (section === 'customSections') {
                // Special handling for custom sections if needed, but for now generic works
                list[index] = { ...list[index], [field]: value };
            } else {
                list[index] = { ...list[index], [field]: value };
            }
            return newData;
        });
    };

    const handleSplittedArrayChange = (
        section: "experience",
        index: number,
        value: string
    ) => {
        setCvData((prev) => {
            const newData = { ...prev };
            // Split by new line and filter empty
            newData[section][index].description = value.split('\n').filter(line => line.trim() !== '');
            return newData;
        });
    }


    const addItem = (section: "experience" | "education" | "certifications" | "customSections") => {
        setCvData((prev) => {
            const newData = { ...prev };
            if (section === "experience") {
                newData.experience.push({
                    title: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: [],
                });
            } else if (section === "education") {
                newData.education.push({
                    degree: "",
                    institution: "",
                    location: "",
                    graduationDate: "",
                    gpa: "",
                });
            } else if (section === "certifications") {
                newData.certifications = newData.certifications || [];
                newData.certifications.push({
                    name: "",
                    issuer: "",
                    date: ""
                });
            } else if (section === "customSections") {
                newData.customSections = newData.customSections || [];
                newData.customSections.push({
                    title: language === 'ar' ? "قسم جديد" : "New Section",
                    items: []
                });
            }
            return newData;
        });
    };

    const removeItem = (section: "experience" | "education" | "certifications" | "customSections", index: number) => {
        setCvData((prev) => {
            const newData = { ...prev };
            (newData[section] as any[]).splice(index, 1);
            return newData;
        });
    };

    // Custom Section Item Handlers
    const addCustomItem = (sectionIndex: number) => {
        setCvData(prev => {
            const newData = { ...prev };
            if (newData.customSections) {
                newData.customSections[sectionIndex].items.push({
                    title: "",
                    description: "",
                    date: ""
                });
            }
            return newData;
        });
    }

    const removeCustomItem = (sectionIndex: number, itemIndex: number) => {
        setCvData(prev => {
            const newData = { ...prev };
            if (newData.customSections) {
                newData.customSections[sectionIndex].items.splice(itemIndex, 1);
            }
            return newData;
        });
    }

    const handleCustomItemChange = (sectionIndex: number, itemIndex: number, field: string, value: string) => {
        setCvData(prev => {
            const newData = { ...prev };
            if (newData.customSections) {
                newData.customSections[sectionIndex].items[itemIndex] = {
                    ...newData.customSections[sectionIndex].items[itemIndex],
                    [field]: value
                };
            }
            return newData;
        });
    }


    return (
        <div className="space-y-4" dir={isRtl ? "rtl" : "ltr"}>
            {/* Personal Info */}
            <div className="border border-border rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleSection("personal")}
                    className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
                >
                    <span className="font-semibold">{t.labels.personalInfo}</span>
                    {activeSection === "personal" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeSection === "personal" && (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-card">
                        <input
                            name="fullName"
                            placeholder={t.placeholders.fullName}
                            value={cvData.personalInfo.fullName}
                            onChange={handlePersonalInfoChange}
                            className="p-2 border rounded"
                        />
                        <input
                            name="email"
                            placeholder={t.placeholders.email}
                            value={cvData.personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            className="p-2 border rounded"
                        />
                        <input
                            name="phone"
                            placeholder={t.placeholders.phone}
                            value={cvData.personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            className="p-2 border rounded"
                        />
                        <input
                            name="location"
                            placeholder={t.placeholders.location}
                            value={cvData.personalInfo.location}
                            onChange={handlePersonalInfoChange}
                            className="p-2 border rounded"
                        />
                        <input
                            name="linkedin"
                            placeholder={t.placeholders.linkedin}
                            value={cvData.personalInfo.linkedin || ""}
                            onChange={handlePersonalInfoChange}
                            className="p-2 border rounded"
                        />
                        <input
                            name="portfolio"
                            placeholder={t.placeholders.portfolio}
                            value={cvData.personalInfo.portfolio || ""}
                            onChange={handlePersonalInfoChange}
                            className="p-2 border rounded"
                        />
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="border border-border rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleSection("summary")}
                    className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
                >
                    <span className="font-semibold">{t.labels.summary}</span>
                    {activeSection === "summary" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeSection === "summary" && (
                    <div className="p-4 bg-card">
                        <textarea
                            value={cvData.summary}
                            onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                            className="w-full h-32 p-2 border rounded"
                            placeholder={t.placeholders.summary}
                        />
                    </div>
                )}
            </div>

            {/* Experience */}
            <div className="border border-border rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleSection("experience")}
                    className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
                >
                    <span className="font-semibold">{t.labels.experience}</span>
                    {activeSection === "experience" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeSection === "experience" && (
                    <div className="p-4 bg-card space-y-4">
                        {cvData.experience.map((exp, index) => (
                            <div key={index} className="border p-4 rounded relative bg-background">
                                <button
                                    onClick={() => removeItem("experience", index)}
                                    className={`absolute top-2 text-destructive hover:bg-destructive/10 p-1 rounded ${isRtl ? 'left-2' : 'right-2'}`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                    <input
                                        placeholder={t.placeholders.jobTitle}
                                        value={exp.title}
                                        onChange={(e) => handleArrayChange("experience", index, "title", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder={t.placeholders.company}
                                        value={exp.company}
                                        onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder={t.placeholders.startDate}
                                        value={exp.startDate}
                                        onChange={(e) => handleArrayChange("experience", index, "startDate", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder={t.placeholders.endDate}
                                        value={exp.endDate}
                                        onChange={(e) => handleArrayChange("experience", index, "endDate", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder={t.placeholders.location}
                                        value={exp.location}
                                        onChange={(e) => handleArrayChange("experience", index, "location", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                </div>
                                <textarea
                                    placeholder={t.placeholders.description}
                                    value={exp.description.join('\n')}
                                    onChange={(e) => handleSplittedArrayChange("experience", index, e.target.value)}
                                    className="w-full h-24 p-2 border rounded text-sm"
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => addItem("experience")}
                            className="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-primary/50 text-primary hover:bg-primary/5 rounded"
                        >
                            <Plus className="w-4 h-4" /> {t.buttons.addExperience}
                        </button>
                    </div>
                )}
            </div>

            {/* Education */}
            <div className="border border-border rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleSection("education")}
                    className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
                >
                    <span className="font-semibold">{t.labels.education}</span>
                    {activeSection === "education" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeSection === "education" && (
                    <div className="p-4 bg-card space-y-4">
                        {cvData.education.map((edu, index) => (
                            <div key={index} className="border p-4 rounded relative bg-background">
                                <button
                                    onClick={() => removeItem("education", index)}
                                    className={`absolute top-2 text-destructive hover:bg-destructive/10 p-1 rounded ${isRtl ? 'left-2' : 'right-2'}`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <input
                                        placeholder={t.placeholders.degree}
                                        value={edu.degree}
                                        onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder={t.placeholders.institution}
                                        value={edu.institution}
                                        onChange={(e) => handleArrayChange("education", index, "institution", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder={t.placeholders.graduationDate}
                                        value={edu.graduationDate}
                                        onChange={(e) => handleArrayChange("education", index, "graduationDate", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        placeholder={t.placeholders.gpa}
                                        value={edu.gpa || ""}
                                        onChange={(e) => handleArrayChange("education", index, "gpa", e.target.value)}
                                        className="p-2 border rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem("education")}
                            className="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-primary/50 text-primary hover:bg-primary/5 rounded"
                        >
                            <Plus className="w-4 h-4" /> {t.buttons.addEducation}
                        </button>
                    </div>
                )}
            </div>

            {/* Skills */}
            <div className="border border-border rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleSection("skills")}
                    className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
                >
                    <span className="font-semibold">{t.labels.skills}</span>
                    {activeSection === "skills" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeSection === "skills" && (
                    <div className="p-4 bg-card">
                        <textarea
                            value={cvData.skills.join(", ")}
                            onChange={(e) => setCvData(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()) }))}
                            className="w-full h-32 p-2 border rounded"
                            placeholder={t.placeholders.skills}
                        />
                    </div>
                )}
            </div>

            {/* Custom Sections */}
            <div className="border border-border rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleSection("custom")}
                    className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
                >
                    <span className="font-semibold">{t.labels.customSections}</span>
                    {activeSection === "custom" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeSection === "custom" && (
                    <div className="p-4 bg-card space-y-6">
                        {cvData.customSections?.map((section, sIndex) => (
                            <div key={sIndex} className="border p-4 rounded relative bg-background">
                                <button
                                    onClick={() => removeItem("customSections", sIndex)}
                                    className={`absolute top-2 text-destructive hover:bg-destructive/10 p-1 rounded ${isRtl ? 'left-2' : 'right-2'}`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">{t.labels.sectionTitle}</label>
                                    <input
                                        value={section.title}
                                        onChange={(e) => handleArrayChange("customSections", sIndex, "title", e.target.value)}
                                        className="w-full p-2 border rounded font-semibold"
                                        placeholder="e.g., Volunteering, Awards"
                                    />
                                </div>

                                <div className={`space-y-3 ${isRtl ? 'mr-4 border-r-2 pr-4' : 'ml-4 border-l-2 pl-4'} border-muted`}>
                                    {section.items.map((item, iIndex) => (
                                        <div key={iIndex} className="relative group">
                                            <button
                                                onClick={() => removeCustomItem(sIndex, iIndex)}
                                                className={`absolute ${isRtl ? '-right-8' : '-left-8'} top-1 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 p-1 rounded`}
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                            <div className="grid grid-cols-1 gap-2 mb-2">
                                                <input
                                                    placeholder={t.placeholders.itemTitle}
                                                    value={item.title}
                                                    onChange={(e) => handleCustomItemChange(sIndex, iIndex, "title", e.target.value)}
                                                    className="p-2 border rounded text-sm font-medium"
                                                />
                                                <input
                                                    placeholder={t.placeholders.dateSubtitle}
                                                    value={item.date || ""}
                                                    onChange={(e) => handleCustomItemChange(sIndex, iIndex, "date", e.target.value)}
                                                    className="p-2 border rounded text-sm"
                                                />
                                                <textarea
                                                    placeholder={t.placeholders.description}
                                                    value={item.description}
                                                    onChange={(e) => handleCustomItemChange(sIndex, iIndex, "description", e.target.value)}
                                                    className="p-2 border rounded text-sm h-16"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addCustomItem(sIndex)}
                                        className="text-sm text-primary hover:underline flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> {t.buttons.addItem}
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem("customSections")}
                            className="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-primary/50 text-primary hover:bg-primary/5 rounded"
                        >
                            <Plus className="w-4 h-4" /> {t.buttons.addCustomSection}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}
