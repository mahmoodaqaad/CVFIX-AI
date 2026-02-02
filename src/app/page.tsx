"use client";

import { FileText, Download, Eye, PenTool, Eraser, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CVData, defaultCVData } from "@/types/cv";
import { parseTextToCV } from "@/lib/cvParser";
import { generatePDF } from "@/lib/pdfGenerator";
import { CVTemplate } from "@/components/CVTemplate";
import { CVForm } from "@/components/CVForm";
import { Language, translations } from "@/types/language";

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [showPreview, setShowPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputMode, setInputMode] = useState<"ai" | "manual">("ai");
  const [language, setLanguage] = useState<Language>("ar");

  const t = translations[language];

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Parse the text into structured CV data
    const parsedData = parseTextToCV(inputText);
    setCvData(parsedData);
    setShowPreview(true);
    setIsProcessing(false);

    // Scroll to preview
    setTimeout(() => {
      document.getElementById("cv-preview")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF("cv-template", `${cvData.personalInfo.fullName || "resume"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("حدث خطأ في إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
    }
  };

  const switchToManual = () => {
    setInputMode("manual");
    setShowPreview(true);
    // scroll to form
    setTimeout(() => {
      document.getElementById("cv-form-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  const resetData = () => {
    if (confirm(t.confirm.reset)) {
      setCvData(defaultCVData);
      setInputText("");
      setShowPreview(false);
      setInputMode("ai");
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  }

  return (
    <div className={cn("min-h-full bg-gray-50 pb-20", language === 'ar' ? 'rtl' : 'ltr')} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 relative">

        {/* Language Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium text-sm">{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-700 mb-4">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">{t.hero.tag}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            {t.hero.title}
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Mode Toggle & Main Card */}
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6 gap-2">
            <button
              onClick={() => setInputMode("ai")}
              className={cn(
                "px-4 py-2 rounded font-medium transition-all flex items-center gap-2 border",
                inputMode === "ai"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
            >
              <FileText className="w-4 h-4" />
              {t.buttons.aiImport}
            </button>
            <button
              onClick={() => {
                setInputMode("manual");
                setShowPreview(true);
              }}
              className={cn(
                "px-4 py-2 rounded font-medium transition-all flex items-center gap-2 border",
                inputMode === "manual"
                  ? "bg-white text-blue-600 border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
            >
              <PenTool className="w-4 h-4" />
              {t.buttons.manualEntry}
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm p-6" id="cv-form-section">
            {/* Input Section */}
            {inputMode === "ai" ? (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t.labels.cvInfo}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.placeholders.textInput}
                  className="w-full h-80 px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-sm"
                  dir="auto"
                />
                <button
                  onClick={handleGenerate}
                  disabled={!inputText.trim() || isProcessing}
                  className={cn(
                    "w-full mt-4 py-3 rounded font-bold transition-all",
                    "bg-blue-600 text-white hover:bg-blue-700",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.buttons.processing}
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      {t.buttons.generate}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-bold text-gray-800">
                    {t.labels.manualEntryTitle}
                  </label>
                  <button onClick={resetData} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm flex items-center gap-1 border border-transparent hover:border-red-100">
                    <Eraser className="w-4 h-4" /> {t.buttons.clearAll}
                  </button>
                </div>
                <CVForm cvData={cvData} setCvData={setCvData} language={language} />
              </div>
            )}
          </div>
        </div>

        {/* CV Preview Section */}
        {showPreview && (
          <div
            id="cv-preview"
            className="max-w-5xl mx-auto mt-10"
          >
            <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                  <Eye className="w-5 h-5 text-gray-600" />
                  {t.labels.preview}
                </h2>
                <div className="flex gap-2">
                  {inputMode === "ai" && (
                    <button
                      onClick={switchToManual}
                      className="px-3 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2 font-medium text-sm"
                    >
                      <PenTool className="w-4 h-4" />
                      {t.buttons.editData}
                    </button>
                  )}
                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-all flex items-center gap-2 font-medium text-sm"
                  >
                    <Download className="w-4 h-4" />
                    {t.buttons.download}
                  </button>
                </div>
              </div>

              {/* CV Template Preview */}
              <div className="border border-gray-300 rounded overflow-hidden">
                <CVTemplate data={cvData} language={language} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
