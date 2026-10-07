import React from 'react';
import { X, Printer, CheckCircle2, FileText, Stethoscope, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DoctorPrepModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  userScore: number;
  userTier: string;
}

export const DoctorPrepModal: React.FC<DoctorPrepModalProps> = ({
  lang,
  isOpen,
  onClose,
  userScore,
  userTier,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#dcbfc4] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#7c113b] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-[#ffd9e0]" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold leading-tight">
                {t.doctorGuideModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#ffd9e0]/90 mt-0.5">
                {t.doctorGuideModal.subtitle}
              </p>
            </div>
          </div>

          <button
            id="btn-close-doctor-modal"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Quick Screening Summary Chip */}
          <div className="rounded-2xl bg-[#ffd9e0]/40 border border-[#dcbfc4] p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#7c113b] uppercase tracking-wider">
                {lang === 'en' ? 'Screening Summary' : 'స్క్రీనింగ్ సారాంశం'}
              </span>
              <p className="text-sm font-bold text-[#151d22]">
                {lang === 'en' ? `Women360 Risk Score: ${userScore}/13 (${userTier})` : `Women360 రిస్క్ స్కోరు: ${userScore}/13 (${userTier})`}
              </p>
            </div>
            <span className="text-xs bg-white px-2.5 py-1 rounded-full border border-[#dcbfc4] text-[#564146] font-medium">
              Rotterdam Aligned
            </span>
          </div>

          {/* Section 1: Questions to Ask */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#7c113b] flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>
                {lang === 'en' ? 'Key Questions to Ask Your Doctor' : 'వైద్యుడిని అడగవలసిన ముఖ్యమైన ప్రశ్నలు'}
              </span>
            </h4>
            <div className="space-y-2.5">
              {t.doctorGuideModal.questionsToAsk.map((q, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f6faff] border border-[#dcbfc4]/50">
                  <span className="w-5 h-5 rounded-full bg-[#ffd9e0] text-[#7c113b] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#151d22] font-medium leading-relaxed">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: What to Bring */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#2b6957] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {lang === 'en' ? 'What to Bring to Your Appointment' : 'మీ వెంట తీసుకెళ్లవలసిన వివరాలు'}
              </span>
            </h4>
            <ul className="space-y-2">
              {t.doctorGuideModal.whatToBring.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#564146]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b6957] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Diagnostic Safety Warning */}
          <div className="rounded-xl bg-[#edf5fc] border border-[#dcbfc4]/80 p-3.5 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#7c113b] shrink-0 mt-0.5" />
            <p className="text-xs text-[#564146] leading-relaxed">
              {t.result.disclaimer}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#edf5fc] border-t border-[#dcbfc4]/60 flex items-center justify-between gap-3">
          <button
            id="btn-print-doctor-guide"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#dcbfc4] text-xs sm:text-sm font-bold text-[#151d22] hover:bg-[#ffd9e0]/40 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#7c113b]" />
            <span>{t.doctorGuideModal.printBtn}</span>
          </button>

          <button
            id="btn-modal-close-action"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#7c113b] text-white text-xs sm:text-sm font-bold hover:bg-[#630a2d] transition-colors"
          >
            {t.doctorGuideModal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
