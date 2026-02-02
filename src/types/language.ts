export type Language = 'ar' | 'en';

export const translations = {
    ar: {
        hero: {
            tag: "مولد السيرة الذاتية بالذكاء الاصطناعي",
            title: "حول نصك إلى CV احترافي",
            subtitle: "الصق معلومات سيرتك الذاتية واحصل على ملف PDF منسق بنظام ATS جاهز للتحميل"
        },
        buttons: {
            aiImport: "استيراد بالذكاء الاصطناعي",
            manualEntry: "إدخال يدوي",
            generate: "إنشاء السيرة الذاتية",
            processing: "جاري المعالجة...",
            download: "تحميل PDF",
            editData: "تعديل البيانات",
            clearAll: "مسح الكل",
            addExperience: "إضافة خبرة",
            addEducation: "إضافة تعليم",
            addItem: "إضافة عنصر",
            addCustomSection: "إضافة قسم مخصص"
        },
        labels: {
            cvInfo: "معلومات السيرة الذاتية (النص)",
            manualEntryTitle: "نموذج الإدخال اليدوي",
            preview: "معاينة السيرة الذاتية",
            personalInfo: "المعلومات الشخصية",
            summary: "الملخص المهني",
            experience: "الخبرة",
            education: "التعليم",
            skills: "المهارات",
            customSections: "أقسام مخصصة",
            sectionTitle: "عنوان القسم",
        },
        placeholders: {
            textInput: `الصق معلومات سيرتك الذاتية هنا...

مثال:
أحمد محمد
ahmed@email.com | 0501234567 | الرياض، السعودية

الخبرة العملية:
مطور برمجيات - شركة التقنية
يناير 2022 - الحالي
- تطوير تطبيقات ويب باستخدام React و Node.js
- إدارة قواعد البيانات وتحسين الأداء
`,
            fullName: "الاسم الرباعي",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
            location: "الموقع (المدينة، الدولة)",
            linkedin: "لينكد إن (اختياري)",
            portfolio: "معرض الأعمال (اختياري)",
            summary: "اكتب ملخصاً موجزاً عن خلفيتك المهنية...",
            jobTitle: "المسمى الوظيفي",
            company: "اسم الشركة",
            startDate: "تاريخ البدء",
            endDate: "تاريخ الانتهاء",
            description: "الوصف (نقطة واحدة في كل سطر)",
            degree: "الدرجة العلمية",
            institution: "المؤسسة التعليمية",
            graduationDate: "تاريخ التخرج",
            gpa: "المعدل (اختياري)",
            skills: "React, TypeScript, Node.js (افصل بفاصلة)",
            itemTitle: "عنوان العنصر (مثال: جائزة أفضل مطور)",
            dateSubtitle: "التاريخ / عنوان فرعي (اختياري)"
        },
        confirm: {
            reset: "هل أنت متأكد من مسح جميع البيانات؟"
        }
    },
    en: {
        hero: {
            tag: "AI-Powered CV Generator",
            title: "Transform Text to Pro CV",
            subtitle: "Paste your CV details and get an ATS-friendly PDF ready to download"
        },
        buttons: {
            aiImport: "AI Import",
            manualEntry: "Manual Entry",
            generate: "Generate CV",
            processing: "Processing...",
            download: "Download PDF",
            editData: "Edit Data",
            clearAll: "Clear All",
            addExperience: "Add Experience",
            addEducation: "Add Education",
            addItem: "Add Item",
            addCustomSection: "Add Custom Section"
        },
        labels: {
            cvInfo: "CV Information (Text)",
            manualEntryTitle: "Manual Entry Form",
            preview: "CV Preview",
            personalInfo: "Personal Information",
            summary: "Professional Summary",
            experience: "Experience",
            education: "Education",
            skills: "Skills",
            customSections: "Custom Sections",
            sectionTitle: "Section Title",
        },
        placeholders: {
            textInput: `Paste your CV details here...

Example:
Ahmed Mohamed
ahmed@email.com | 0501234567 | Riyadh, KSA

Experience:
Software Engineer - Tech Company
Jan 2022 - Present
- Developed web apps using React and Node.js
- Managed databases and optimized performance
`,
            fullName: "Full Name",
            email: "Email",
            phone: "Phone",
            location: "Location",
            linkedin: "LinkedIn (Optional)",
            portfolio: "Portfolio (Optional)",
            summary: "Write a brief summary about your professional background...",
            jobTitle: "Job Title",
            company: "Company Name",
            startDate: "Start Date",
            endDate: "End Date",
            description: "Description (one bullet per line)",
            degree: "Degree",
            institution: "Institution",
            graduationDate: "Graduation Date",
            gpa: "GPA (Optional)",
            skills: "React, TypeScript, Node.js (comma separated)",
            itemTitle: "Item Title (e.g. Best Developer Award)",
            dateSubtitle: "Date / Subtitle (Optional)"
        },
        confirm: {
            reset: "Are you sure you want to reset all data?"
        }
    }
};
