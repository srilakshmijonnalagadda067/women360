import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Scissors,
  TrendingDown,
  Activity,
  Moon,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface LearnScreenProps {
  lang: Language;
  onStartScreening: () => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({
  lang,
  onStartScreening,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'symptoms' | 'spectrum' | 'myths' | 'consult'>('overview');

  const symptomIcons = [Calendar, Sparkles, Scissors, TrendingDown, Activity, Moon];

  return (
    <div className="max-w-4xl mx-auto pb-24 pt-4 sm:pt-6 space-y-8">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#ffd9e0]/80 via-white to-[#edf5fc] border border-[#dcbfc4] p-6 sm:p-10 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#dcbfc4] text-xs sm:text-sm font-bold text-[#7c113b]">
          <BookOpen className="w-4 h-4 text-[#7c113b]" />
          <span>{t.educationSection.badge}</span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#151d22]">
          {t.educationSection.title}
        </h1>

        <p className="text-sm sm:text-base text-[#564146] leading-relaxed max-w-2xl">
          {t.educationSection.subtitle}
        </p>

        <div className="pt-2">
          <button
            id="btn-learn-start-screening"
            onClick={onStartScreening}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#7c113b] text-white text-sm font-bold shadow-md hover:bg-[#630a2d] transition-all transform hover:-translate-y-0.5"
          >
            <span>{t.hero.startScreening}</span>
            <ArrowRight className="w-4 h-4 text-[#ffd9e0]" />
          </button>
        </div>
      </div>

      {/* 2. Educational Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#dcbfc4]/60 pb-3" role="tablist">
        <button
          id="btn-subtab-overview"
          role="tab"
          aria-selected={activeSubTab === 'overview'}
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'overview'
              ? 'bg-[#7c113b] text-white shadow-xs'
              : 'bg-white border border-[#dcbfc4]/80 text-[#564146] hover:bg-[#edf5fc]'
          }`}
        >
          {t.educationSection.tabs.overview}
        </button>

        <button
          id="btn-subtab-symptoms"
          role="tab"
          aria-selected={activeSubTab === 'symptoms'}
          onClick={() => setActiveSubTab('symptoms')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'symptoms'
              ? 'bg-[#7c113b] text-white shadow-xs'
              : 'bg-white border border-[#dcbfc4]/80 text-[#564146] hover:bg-[#edf5fc]'
          }`}
        >
          {t.educationSection.tabs.symptoms}
        </button>

        <button
          id="btn-subtab-spectrum"
          role="tab"
          aria-selected={activeSubTab === 'spectrum'}
          onClick={() => setActiveSubTab('spectrum')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'spectrum'
              ? 'bg-[#7c113b] text-white shadow-xs'
              : 'bg-white border border-[#dcbfc4]/80 text-[#564146] hover:bg-[#edf5fc]'
          }`}
        >
          {t.educationSection.tabs.spectrum}
        </button>

        <button
          id="btn-subtab-myths"
          role="tab"
          aria-selected={activeSubTab === 'myths'}
          onClick={() => setActiveSubTab('myths')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'myths'
              ? 'bg-[#7c113b] text-white shadow-xs'
              : 'bg-white border border-[#dcbfc4]/80 text-[#564146] hover:bg-[#edf5fc]'
          }`}
        >
          {t.educationSection.tabs.myths}
        </button>

        <button
          id="btn-subtab-consult"
          role="tab"
          aria-selected={activeSubTab === 'consult'}
          onClick={() => setActiveSubTab('consult')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'consult'
              ? 'bg-[#7c113b] text-white shadow-xs'
              : 'bg-white border border-[#dcbfc4]/80 text-[#564146] hover:bg-[#edf5fc]'
          }`}
        >
          {t.educationSection.tabs.whenToConsult}
        </button>
      </div>

      {/* 3. Tab Content View */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.educationSection.overviewContent.stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-[#dcbfc4] p-6 text-center space-y-2 shadow-xs"
              >
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#7c113b]">
                  {stat.value}
                </span>
                <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#151d22]">
              {t.educationSection.overviewContent.h3}
            </h3>
            <p className="text-sm sm:text-base text-[#564146] leading-relaxed">
              {t.educationSection.overviewContent.p1}
            </p>
            <p className="text-sm sm:text-base text-[#564146] leading-relaxed">
              {t.educationSection.overviewContent.p2}
            </p>
          </div>
        </div>
      )}

      {activeSubTab === 'symptoms' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.educationSection.symptomsList.map((symptom, idx) => {
            const IconComp = symptomIcons[idx] || Sparkles;

            return (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-[#dcbfc4] p-6 space-y-3 shadow-xs hover:border-[#7c113b] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#ffd9e0] text-[#7c113b] flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#564146] bg-[#edf5fc] px-2.5 py-1 rounded-full">
                    {lang === 'en' ? `Sign #${idx + 1}` : `లక్షణం ${idx + 1}`}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#151d22]">
                  {symptom.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
                  {symptom.desc}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {activeSubTab === 'spectrum' && (
        <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#b0f0d8] text-[#2b6957] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#2b6957]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#151d22]">
                {t.educationSection.spectrumNotice.title}
              </h3>
              <p className="text-sm sm:text-base text-[#564146] leading-relaxed">
                {t.educationSection.spectrumNotice.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#dcbfc4]/40">
            <div className="p-4 rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 space-y-2">
              <h4 className="font-bold text-sm text-[#7c113b]">
                {lang === 'en' ? 'Insulin-Resistant PCOS' : 'ఇన్సులిన్ రెసిస్టెంట్ PCOS'}
              </h4>
              <p className="text-xs text-[#564146] leading-relaxed">
                {lang === 'en'
                  ? 'Cells resist insulin, leading to elevated insulin levels that stimulate the ovaries to produce extra testosterone.'
                  : 'శరీర కణాలు ఇన్సులిన్‌ను సరిగ్గా ఉపయోగించకపోవడం వల్ల టెస్టోస్టెరాన్ హార్మోన్ ఉత్పత్తి పెరుగుతుంది.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 space-y-2">
              <h4 className="font-bold text-sm text-[#2b6957]">
                {lang === 'en' ? 'Lean PCOS' : 'లీన్ PCOS (తక్కువ బరువు)'}
              </h4>
              <p className="text-xs text-[#564146] leading-relaxed">
                {lang === 'en'
                  ? 'Affects individuals within normal BMI range, driven predominantly by adrenal stress or localized ovarian androgen sensitivity.'
                  : 'సాధారణ లేదా తక్కువ బరువు ఉన్నవారిలో కూడా అడ్రినల్ ఒత్తిడి వల్ల హార్మోన్ అసమతుల్యత ఏర్పడవచ్చు.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'myths' && (
        <div className="space-y-4">
          {t.educationSection.mythsList.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-[#dcbfc4] p-6 space-y-3 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#fee2e2] text-[#b91c1c] flex items-center justify-center shrink-0 text-xs font-bold">
                  ✕
                </div>
                <div>
                  <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider">
                    {item.myth.split(':')[0]}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#151d22] mt-0.5">
                    {item.myth.split(':')[1]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pl-11 pt-2 border-t border-[#dcbfc4]/30">
                <div>
                  <span className="text-xs font-bold text-[#15803d] uppercase tracking-wider">
                    {item.fact.split(':')[0]}
                  </span>
                  <p className="text-xs sm:text-sm text-[#564146] leading-relaxed mt-0.5">
                    {item.fact.split(':')[1]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'consult' && (
        <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-[#dcbfc4]/40 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#ffd9e0] text-[#7c113b] flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-[#7c113b]" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#151d22]">
                {t.educationSection.tabs.whenToConsult}
              </h3>
              <p className="text-xs text-[#564146]">
                {lang === 'en'
                  ? 'Key clinical indicators that warrant speaking with a certified Gynecologist.'
                  : 'గైనకాలజిస్ట్‌ను తప్పనిసరిగా సంప్రదించాల్సిన ముఖ్యమైన పరిస్థితులు.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {t.educationSection.whenToSeeDoctor.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60"
              >
                <div className="w-6 h-6 rounded-full bg-[#ffd9e0] text-[#7c113b] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-[#151d22] font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#7c113b] to-[#630a2d] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-display text-xl font-bold text-white">
            {lang === 'en' ? 'Ready to check your personal risk indicators?' : 'మీ వ్యక్తిగత రిస్క్ స్థాయిని పరీక్షించుకోవడానికి సిద్ధంగా ఉన్నారా?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#ffd9e0]">
            {lang === 'en'
              ? 'Complete our 8-step assessment in under 3 minutes.'
              : 'కేవలం 3 నిమిషాల్లో 8 ప్రశ్నల స్క్రీనింగ్‌ను పూర్తి చేయండి.'}
          </p>
        </div>

        <button
          id="btn-learn-bottom-cta"
          onClick={onStartScreening}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#7c113b] text-sm font-bold shadow-sm hover:bg-[#ffd9e0] transition-colors shrink-0"
        >
          <span>{t.hero.startScreening}</span>
          <ArrowRight className="w-4 h-4 text-[#7c113b]" />
        </button>
      </div>
    </div>
  );
};
