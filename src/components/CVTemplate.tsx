"use client";

import { CVData } from "@/types/cv";
import { Language } from "@/types/language";

interface CVTemplateProps {
    data: CVData;
    language: Language;
}

export function CVTemplate({ data, language }: CVTemplateProps) {
    const isRtl = language === 'ar';

    const t = {
        personalInfo: isRtl ? "المعلومات الشخصية" : "Personal Information",
        summary: isRtl ? "الملخص المهني" : "Professional Summary",
        experience: isRtl ? "الخبرة المهنية والمشاريع" : "Professional Experience & Projects",
        projects: isRtl ? "المشاريع" : "Projects",
        education: isRtl ? "التعليم" : "Education",
        skills: isRtl ? "المهارات" : "Skills",
        certifications: isRtl ? "الشهادات" : "Certifications",
        languages: isRtl ? "اللغات" : "Languages",
        present: isRtl ? "الحالي" : "Present",
        gpa: isRtl ? "المعدل" : "GPA",
        untitled: isRtl ? "بدون عنوان" : "Untitled"
    };

    return (
        <div
            id="cv-template"
            className={`bg-white text-black p-12 max-w-[210mm] mx-auto ${isRtl ? 'rtl' : 'ltr'}`}
            dir={isRtl ? 'rtl' : 'ltr'}
            style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "11pt",
                lineHeight: "1.5",
            }}
        >
            {/* Header - Personal Info */}
            <div className="mb-6 text-center border-b-2 border-gray-800 pb-4">
                <h1 className="text-6xl font-bold mb-2 uppercase tracking-wide">
                    {data.personalInfo.fullName || "YOUR NAME"}
                </h1>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
                    {data.personalInfo.email && (
                        <span>{data.personalInfo.email}</span>
                    )}
                    {data.personalInfo.phone && (
                        <span>• {data.personalInfo.phone}</span>
                    )}
                    {data.personalInfo.location && (
                        <span>• {data.personalInfo.location}</span>
                    )}
                    {data.personalInfo.linkedin && (
                        <span>• {data.personalInfo.linkedin}</span>
                    )}
                    {data.personalInfo.portfolio && (
                        <span>• {data.personalInfo.portfolio}</span>
                    )}
                </div>
            </div>

            {/* Professional Summary */}
            {data.summary && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-2 border-b border-gray-400">
                        {t.summary}
                    </h2>
                    <p className="text-justify whitespace-pre-wrap">{data.summary}</p>
                </div>
            )}

            {/* Experience & Projects */}
            {data.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-2 border-b border-gray-400">
                        {data.experience.some(exp => exp.company && exp.company !== "Personal Project")
                            ? t.experience
                            : t.projects}
                    </h2>
                    {data.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-base">{exp.title || t.untitled}</h3>
                                {(exp.startDate || exp.endDate) && (
                                    <span className="text-sm text-gray-600 shrink-0">
                                        {exp.startDate} {exp.startDate && exp.endDate && "-"} {exp.current ? t.present : exp.endDate}
                                    </span>
                                )}
                            </div>
                            {exp.company && (
                                <div className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">{exp.company}</span>
                                    {exp.location && <span> • {exp.location}</span>}
                                </div>
                            )}
                            {exp.description.length > 0 && (
                                <ul className={`list-disc list-outside ${isRtl ? 'mr-5' : 'ml-5'} space-y-1`}>
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-sm">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-2 border-b border-gray-400">
                        {t.education}
                    </h2>
                    {data.education.map((edu, index) => (
                        <div key={index} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-base">{edu.degree}</h3>
                                <span className="text-sm text-gray-600 shrink-0">
                                    {edu.graduationDate}
                                </span>
                            </div>
                            <div className="text-sm text-gray-700">
                                <span className="font-semibold">{edu.institution}</span>
                                {edu.location && <span> • {edu.location}</span>}
                                {edu.gpa && <span> • {t.gpa}: {edu.gpa}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-2 border-b border-gray-400">
                        {t.skills}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="text-sm bg-gray-100 px-3 py-2 rounded"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-2 border-b border-gray-400">
                        {t.certifications}
                    </h2>
                    {data.certifications.map((cert, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-sm">{cert.name}</h3>
                                <span className="text-sm text-gray-600 shrink-0">{cert.date}</span>
                            </div>
                            <p className="text-sm text-gray-700">{cert.issuer}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
                <div className="mb-6  p-2">
                    <h2 className="text-lg font-bold uppercase mb-2 border-b border-gray-400">
                        {t.languages}
                    </h2>
                    <p className="text-sm py-2">{data.languages.join(" • ")}</p>
                </div>
            )}

            {/* Custom Sections */}
            {data.customSections?.map((section, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-2 border-b border-gray-400">
                        {section.title}
                    </h2>
                    {section.items.map((item, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-base">{item.title}</h3>
                                {item.date && (
                                    <span className="text-sm text-gray-600 shrink-0">{item.date}</span>
                                )}
                            </div>
                            <p className="text-sm text-justify text-gray-700 whitespace-pre-wrap">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
