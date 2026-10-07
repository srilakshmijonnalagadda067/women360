import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Sparkles,
  HeartPulse,
  Calendar,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Activity,
  UserCheck,
  Clock,
  Info
} from 'lucide-react';
import { Language, AppView } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HomeScreenProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
  hasPreviousResult?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  lang,
  onNavigate,
  hasPreviousResult = false,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeEduTab, setActiveEduTab] = useState<'overview' | 'symptoms' | 'myths'>('overview');

  return (
    <div className="pb-24 pt-4 sm:pt-6 space-y-8 sm:space-y-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffd9e0]/80 via-white to-[#edf5fc] border border-[#dcbfc4]/60 p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#dcbfc4] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#7c113b]" />
            <span className="text-xs sm:text-sm font-semibold text-[#7c113b]">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151d22] leading-[1.15]">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-[#564146] leading-relaxed max-w-2xl font-normal">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-start-screening-btn"
              onClick={() => onNavigate('screening')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#7c113b] hover:bg-[#630a2d] text-white text-base font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.hero.startScreening}</span>
              <ArrowRight className="w-5 h-5 text-[#ffd9e0]" />
            </button>

            <button
              id="hero-learn-more-btn"
              onClick={() => onNavigate('learn')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#f6faff] text-[#7c113b] border border-[#dcbfc4] text-base font-bold shadow-xs hover:shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#7c113b]" />
              <span>{t.hero.learnMore}</span>
            </button>

            {hasPreviousResult && (
              <button
                id="hero-view-saved-result-btn"
                onClick={() => onNavigate('result')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#b0f0d8]/60 hover:bg-[#b0f0d8] text-[#2b6957] border border-[#2b6957]/30 text-sm font-bold transition-all"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>{lang === 'en' ? 'View Saved Result' : 'గత ఫలితాన్ని చూడండి'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2 text-xs sm:text-sm text-[#564146]">
            <CheckCircle2 className="w-4 h-4 text-[#2b6957] shrink-0" />
            <span>{t.hero.confidentialNote}</span>
          </div>
        </div>

        {/* Decorative subtle background circle */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#ffd9e0]/40 blur-3xl pointer-events-none" />
      </section>

      {/* 2. Trust & Safety Advisory Card (Prominent Non-Diagnostic Medical Notice) */}
      <section className="rounded-2xl bg-white border border-[#dcbfc4] p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#ffd9e0] text-[#7c113b] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-[#7c113b]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7c113b] flex items-center gap-2">
              <span>{t.advisory.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
              {t.advisory.body}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Three Primary Interactive Service Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
            {t.services.title}
          </h2>
          <p className="text-sm sm:text-base text-[#564146] mt-1">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Learn About PCOS */}
          <div
            id="service-card-learn"
            className="group relative rounded-3xl bg-white border border-[#dcbfc4]/80 p-6 flex flex-col justify-between hover:border-[#7c113b] hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ffd9e0] text-[#7c113b] flex items-center justify-center shadow-xs">
                <BookOpen className="w-6 h-6 text-[#7c113b]" />
              </div>
              <span className="inline-block text-xs font-bold tracking-wide uppercase text-[#7c113b]">
                {t.services.learnCard.tag}
              </span>
              <h3 className="font-display text-xl font-bold text-[#151d22]">
                {t.services.learnCard.title}
              </h3>
              <p className="text-sm text-[#564146] leading-relaxed">
                {t.services.learnCard.desc}
              </p>
            </div>
            <div className="pt-6">
              <button
                id="btn-service-learn"
                onClick={() => onNavigate('learn')}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#edf5fc] group-hover:bg-[#7c113b] group-hover:text-white text-[#7c113b] font-bold text-sm transition-all"
              >
                <span>{t.services.learnCard.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Early Risk Screening */}
          <div
            id="service-card-screening"
            className="group relative rounded-3xl bg-white border-2 border-[#7c113b]/30 p-6 flex flex-col justify-between hover:border-[#7c113b] hover:shadow-lg transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7c113b] text-white flex items-center justify-center shadow-xs">
                <ClipboardCheck className="w-6 h-6 text-[#ffd9e0]" />
              </div>
              <span className="inline-block text-xs font-bold tracking-wide uppercase text-[#7c113b]">
                {t.services.screeningCard.tag}
              </span>
              <h3 className="font-display text-xl font-bold text-[#151d22]">
                {t.services.screeningCard.title}
              </h3>
              <p className="text-sm text-[#564146] leading-relaxed">
                {t.services.screeningCard.desc}
              </p>
            </div>
            <div className="pt-6">
              <button
                id="btn-service-screening"
                onClick={() => onNavigate('screening')}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#7c113b] text-white font-bold text-sm shadow-sm hover:bg-[#630a2d] transition-all"
              >
                <span>{t.services.screeningCard.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#ffd9e0]" />
              </button>
            </div>
          </div>

          {/* Card 3: Personalized Wellness */}
          <div
            id="service-card-wellness"
            className="group relative rounded-3xl bg-white border border-[#dcbfc4]/80 p-6 flex flex-col justify-between hover:border-[#2b6957] hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#b0f0d8] text-[#2b6957] flex items-center justify-center shadow-xs">
                <Sparkles className="w-6 h-6 text-[#2b6957]" />
              </div>
              <span className="inline-block text-xs font-bold tracking-wide uppercase text-[#2b6957]">
                {t.services.wellnessCard.tag}
              </span>
              <h3 className="font-display text-xl font-bold text-[#151d22]">
                {t.services.wellnessCard.title}
              </h3>
              <p className="text-sm text-[#564146] leading-relaxed">
                {t.services.wellnessCard.desc}
              </p>
            </div>
            <div className="pt-6">
              <button
                id="btn-service-wellness"
                onClick={() => onNavigate('wellness')}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#edf5fc] group-hover:bg-[#2b6957] group-hover:text-white text-[#2b6957] font-bold text-sm transition-all"
              >
                <span>{t.services.wellnessCard.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive PCOS Education Preview Tabs */}
      <section className="rounded-3xl bg-white border border-[#dcbfc4]/70 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9e0]/60 text-[#7c113b] text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.educationSection.badge}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
              {t.educationSection.title}
            </h2>
            <p className="text-sm text-[#564146] mt-1">
              {t.educationSection.subtitle}
            </p>
          </div>

          <button
            id="btn-see-full-guide"
            onClick={() => onNavigate('learn')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#7c113b] hover:text-[#630a2d] self-start sm:self-auto"
          >
            <span>{lang === 'en' ? 'Open Full Knowledge Hub' : 'పూర్తి సమాచారం చూడండి'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 border-b border-[#dcbfc4]/40 pb-3" role="tablist">
          <button
            id="tab-edu-overview"
            role="tab"
            aria-selected={activeEduTab === 'overview'}
            onClick={() => setActiveEduTab('overview')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeEduTab === 'overview'
                ? 'bg-[#7c113b] text-white shadow-xs'
                : 'bg-[#edf5fc] text-[#564146] hover:bg-[#dcbfc4]/30'
            }`}
          >
            {t.educationSection.tabs.overview}
          </button>

          <button
            id="tab-edu-symptoms"
            role="tab"
            aria-selected={activeEduTab === 'symptoms'}
            onClick={() => setActiveEduTab('symptoms')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeEduTab === 'symptoms'
                ? 'bg-[#7c113b] text-white shadow-xs'
                : 'bg-[#edf5fc] text-[#564146] hover:bg-[#dcbfc4]/30'
            }`}
          >
            {t.educationSection.tabs.symptoms}
          </button>

          <button
            id="tab-edu-myths"
            role="tab"
            aria-selected={activeEduTab === 'myths'}
            onClick={() => setActiveEduTab('myths')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeEduTab === 'myths'
                ? 'bg-[#7c113b] text-white shadow-xs'
                : 'bg-[#edf5fc] text-[#564146] hover:bg-[#dcbfc4]/30'
            }`}
          >
            {t.educationSection.tabs.myths}
          </button>
        </div>

        {/* Tab Content */}
        {activeEduTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.educationSection.overviewContent.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#edf5fc] p-5 border border-[#dcbfc4]/40 space-y-1.5"
                >
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#7c113b]">
                    {stat.value}
                  </span>
                  <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 bg-[#f6faff] rounded-2xl p-5 border border-[#dcbfc4]/40">
              <h3 className="font-display text-lg font-bold text-[#151d22]">
                {t.educationSection.overviewContent.h3}
              </h3>
              <p className="text-sm text-[#564146] leading-relaxed">
                {t.educationSection.overviewContent.p1}
              </p>
              <p className="text-sm text-[#564146] leading-relaxed">
                {t.educationSection.overviewContent.p2}
              </p>
            </div>
          </div>
        )}

        {activeEduTab === 'symptoms' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.educationSection.symptomsList.map((symptom, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-4 space-y-2 hover:border-[#7c113b] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-[#ffd9e0] text-[#7c113b] flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>
                <h4 className="font-display text-base font-bold text-[#151d22]">
                  {symptom.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
                  {symptom.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeEduTab === 'myths' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.educationSection.mythsList.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-5 space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-[#b91c1c] bg-[#fee2e2] px-2.5 py-1 rounded-md inline-block">
                  {item.myth.split(':')[0]}
                </div>
                <p className="text-sm font-semibold text-[#151d22]">
                  {item.myth.split(':')[1]}
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-[#15803d] bg-[#dcfce7] px-2.5 py-1 rounded-md inline-block">
                  {item.fact.split(':')[0]}
                </div>
                <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
                  {item.fact.split(':')[1]}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Today's Hormone Harmony Habits Preview */}
      <section className="rounded-3xl bg-gradient-to-br from-[#2b6957]/10 via-[#edf5fc] to-white border border-[#b0f0d8] p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2b6957]">
              {lang === 'en' ? 'Daily Rituals' : 'రోజువారీ దినచర్య'}
            </span>
            <h3 className="font-display text-2xl font-bold text-[#151d22]">
              {lang === 'en' ? "Today's Hormone Harmony Habits" : 'నేటి హార్మోన్ల సమతుల్య అలవాట్లు'}
            </h3>
          </div>
          <button
            id="btn-open-wellness-routine"
            onClick={() => onNavigate('wellness')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2b6957] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#1f4e40] transition-colors self-start sm:self-auto"
          >
            <span>{lang === 'en' ? 'View Personalized Wellness Plan' : 'పూర్తి జీవనశైలి ప్రణాళికను చూడండి'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white p-4 border border-[#dcbfc4]/50 space-y-2">
            <span className="text-xs font-bold text-[#7c113b] bg-[#ffd9e0] px-2 py-0.5 rounded-full">
              {lang === 'en' ? 'Plate Harmony' : 'ఆహార క్రమం'}
            </span>
            <p className="text-sm font-semibold text-[#151d22]">
              {lang === 'en' ? 'Fiber & Protein First' : 'పీచు & పప్పులు మొదట తినండి'}
            </p>
            <p className="text-xs text-[#564146]">
              {lang === 'en'
                ? 'Eat salads and dal before rice to smooth insulin spikes.'
                : 'ఇన్సులిన్ అదుపులో ఉండేందుకు అన్నం కంటే ముందు కూరగాయలు, పప్పు తినండి.'}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-[#dcbfc4]/50 space-y-2">
            <span className="text-xs font-bold text-[#2b6957] bg-[#b0f0d8] px-2 py-0.5 rounded-full">
              {lang === 'en' ? 'Gentle Movement' : 'నడక'}
            </span>
            <p className="text-sm font-semibold text-[#151d22]">
              {lang === 'en' ? '15-Min Post-Meal Walk' : 'భోజనం తర్వాత 15 నిమిషాల నడక'}
            </p>
            <p className="text-xs text-[#564146]">
              {lang === 'en'
                ? 'A light stroll clears post-lunch glucose without adrenal stress.'
                : 'భోజనం తర్వాత నెమ్మదిగా నడవడం వల్ల షుగర్ స్థాయిలు సమతుల్యం అవుతాయి.'}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-[#dcbfc4]/50 space-y-2">
            <span className="text-xs font-bold text-[#6b2934] bg-[#ffd9dc] px-2 py-0.5 rounded-full">
              {lang === 'en' ? 'Circadian Reset' : 'రాత్రి విశ్రాంతి'}
            </span>
            <p className="text-sm font-semibold text-[#151d22]">
              {lang === 'en' ? '10:30 PM Sleep Window' : 'రాత్రి 10:30 కల్లా నిద్ర'}
            </p>
            <p className="text-xs text-[#564146]">
              {lang === 'en'
                ? 'Deep sleep regenerates melatonin, vital for ovarian follicles.'
                : 'సమయానికి నిద్రపోవడం హార్మోన్ల పునరుజ్జీవనానికి తోడ్పడుతుంది.'}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Emergency & Helpline Support Card */}
      <section className="rounded-2xl bg-[#edf5fc] border border-[#dcbfc4] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2b6957] text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#151d22]">
              {t.footer.helplineNote}
            </h4>
            <p className="text-xs text-[#564146]">
              {lang === 'en'
                ? 'Government toll-free health consultation & medical assistance available 24/7.'
                : 'ప్రభుత్వ ఉచిత ఆరోగ్య సంప్రదింపులు & వైద్య సహాయం 24/7 అందుబాటులో ఉన్నాయి.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            id="btn-call-104"
            href="tel:104"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2b6957] text-white text-xs font-bold hover:bg-[#1f4e40] transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>104 Call</span>
          </a>
          <a
            id="btn-call-1091"
            href="tel:1091"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#dcbfc4] text-[#7c113b] text-xs font-bold hover:bg-[#ffd9e0] transition-colors"
          >
            <span>1091 Women Help</span>
          </a>
        </div>
      </section>
    </div>
  );
};
