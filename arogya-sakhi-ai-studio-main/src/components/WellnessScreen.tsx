import React, { useState } from 'react';
import {
  Sparkles,
  Apple,
  Activity,
  Moon,
  Heart,
  Stethoscope,
  CheckCircle,
  Printer,
  RotateCcw,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Coffee,
  Sun
} from 'lucide-react';
import { Language, RiskResult } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WellnessScreenProps {
  lang: Language;
  onNavigateScreening: () => void;
  userResult?: RiskResult | null;
}

export const WellnessScreen: React.FC<WellnessScreenProps> = ({
  lang,
  onNavigateScreening,
  userResult,
}) => {
  const t = TRANSLATIONS[lang];
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [activePillarId, setActivePillarId] = useState<string>('nutrition');

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const totalTasks = t.wellness.tasks.length;

  const pillarIcons = {
    nutrition: Apple,
    movement: Activity,
    sleep: Moon,
    stress: Heart,
    clinical: Stethoscope,
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 pt-4 sm:pt-6 space-y-8">
      {/* 1. Page Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#b0f0d8]/50 via-white to-[#edf5fc] border border-[#b0f0d8] p-6 sm:p-10 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#b0f0d8] text-xs sm:text-sm font-bold text-[#2b6957]">
          <Sparkles className="w-4 h-4 text-[#2b6957]" />
          <span>{t.wellness.badge}</span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#151d22]">
          {t.wellness.title}
        </h1>

        <p className="text-sm sm:text-base text-[#564146] leading-relaxed max-w-2xl">
          {t.wellness.subtitle}
        </p>

        {userResult && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#dcbfc4] text-xs font-bold text-[#7c113b]">
            <span>
              {userResult.ageGroup === '10-19'
                ? lang === 'en'
                  ? 'General wellbeing information; not a personalized risk score.'
                  : 'సాధారణ శ్రేయస్సు సమాచారం; వ్యక్తిగత రిస్క్ స్కోరు కాదు.'
                : lang === 'en'
                  ? `Customized for your ${userResult.tierLabelEn} profile (Score: ${userResult.score}/${userResult.maxScore})`
                  : `మీ ${userResult.tierLabelTe} ఫలితం ఆధారంగా రూపొందించబడింది (స్కోర్: ${userResult.score}/${userResult.maxScore})`}
            </span>
          </div>
        )}
      </div>

      {/* Safety Notice Banner */}
      <div className="rounded-2xl bg-white border border-[#dcbfc4] p-4 flex items-start gap-3 shadow-xs">
        <AlertCircle className="w-5 h-5 text-[#2b6957] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
          {t.wellness.disclaimerNotice}
        </p>
      </div>

      {/* 2. Five Pillars of Balance (Interactive Bento & Details) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#151d22]">
              {lang === 'en' ? 'The 5 Pillars of Hormonal Balance' : 'హార్మోన్ల సమతుల్యతకు 5 ముఖ్య స్తంభాలు'}
            </h2>
            <p className="text-xs sm:text-sm text-[#564146]">
              {lang === 'en'
                ? 'Select a pillar to view science-backed routines.'
                : 'వివరాలు చూడటానికి ఏదైనా అంశాన్ని ఎంచుకోండి.'}
            </p>
          </div>

          <button
            id="btn-print-wellness"
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#dcbfc4] text-xs font-bold text-[#564146] hover:bg-[#edf5fc] transition-colors"
          >
            <Printer className="w-4 h-4 text-[#7c113b]" />
            <span>{lang === 'en' ? 'Print Guide' : 'ప్రింట్ చేయండి'}</span>
          </button>
        </div>

        {/* Pillar Selection Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {t.wellness.pillars.map((pillar) => {
            const IconComponent = pillarIcons[pillar.id as keyof typeof pillarIcons] || Sparkles;
            const isSelected = activePillarId === pillar.id;

            return (
              <button
                key={pillar.id}
                id={`btn-pillar-${pillar.id}`}
                onClick={() => setActivePillarId(pillar.id)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                  isSelected
                    ? 'bg-[#7c113b] text-white border-[#7c113b] shadow-md ring-2 ring-[#7c113b]/30'
                    : 'bg-white text-[#151d22] border-[#dcbfc4]/80 hover:bg-[#f6faff] hover:border-[#7c113b]/40'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white/20 text-[#ffd9e0]' : 'bg-[#ffd9e0] text-[#7c113b]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#edf5fc] text-[#564146]'
                    }`}
                  >
                    {pillar.tag}
                  </span>
                </div>
                <span className="font-display text-xs sm:text-sm font-bold line-clamp-1">
                  {pillar.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card Detail */}
        {(() => {
          const activePillar = t.wellness.pillars.find((p) => p.id === activePillarId) || t.wellness.pillars[0];
          const IconComp = pillarIcons[activePillar.id as keyof typeof pillarIcons] || Sparkles;

          return (
            <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-start gap-4 border-b border-[#dcbfc4]/40 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#ffd9e0] text-[#7c113b] flex items-center justify-center shrink-0">
                  <IconComp className="w-6 h-6 text-[#7c113b]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#7c113b] uppercase tracking-wider">
                    {activePillar.tag}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#151d22]">
                    {activePillar.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#564146] mt-0.5">
                    {activePillar.summary}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePillar.points.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#ffd9e0] text-[#7c113b] text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-[#7c113b]">
                        {point.split(':')[0]}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#564146] leading-relaxed pl-7">
                      {point.includes(':') ? point.split(':')[1] : point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* 3. Daily Hormone Balance Interactive Checklist */}
      <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dcbfc4]/40 pb-4">
          <div>
            <span className="text-xs font-bold text-[#2b6957] uppercase tracking-wider">
              {lang === 'en' ? 'Interactive Daily Planner' : 'రోజువారీ దినచర్య'}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#151d22]">
              {t.wellness.checklistTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#564146] mt-0.5">
              {t.wellness.checklistDesc}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b0f0d8]/50 text-[#2b6957] border border-[#2b6957]/30 text-xs font-bold self-start sm:self-auto">
            <CheckCircle className="w-4 h-4" />
            <span>
              {completedCount} / {totalTasks} {lang === 'en' ? 'Completed' : 'పూర్తయ్యాయి'}
            </span>
          </div>
        </div>

        {/* Task Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.wellness.tasks.map((task) => {
            const isDone = Boolean(completedTasks[task.id]);

            return (
              <button
                key={task.id}
                id={`task-check-${task.id}`}
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                  isDone
                    ? 'bg-[#b0f0d8]/30 border-[#2b6957] text-[#002118]'
                    : 'bg-[#f6faff] border-[#dcbfc4]/70 hover:bg-[#edf5fc]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                    isDone
                      ? 'bg-[#2b6957] border-[#2b6957] text-white'
                      : 'border-[#dcbfc4] bg-white'
                  }`}
                >
                  {isDone && <CheckCircle className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isDone ? 'bg-[#2b6957] text-white' : 'bg-[#ffd9e0] text-[#7c113b]'
                    }`}
                  >
                    {task.time}
                  </span>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDone ? 'line-through text-[#564146]' : 'font-medium text-[#151d22]'
                    }`}
                  >
                    {task.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Traditional Kitchen Wisdom Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#ffd9dc]/60 via-[#edf5fc] to-white border border-[#dcbfc4] p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Coffee className="w-5 h-5 text-[#7c113b]" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#151d22]">
            {t.wellness.herbalNoteTitle}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
          {t.wellness.herbalNoteBody}
        </p>
      </div>

      {/* 5. Call to Action: Retake Screening or View Risk */}
      <div className="rounded-2xl bg-white border border-[#dcbfc4] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-display text-base font-bold text-[#151d22]">
            {lang === 'en' ? 'Need to evaluate your risk factors again?' : 'మీ రిస్క్ అంశాలను మళ్లీ తనిఖీ చేయాలనుకుంటున్నారా?'}
          </h4>
          <p className="text-xs text-[#564146]">
            {lang === 'en'
              ? 'Choose an available age-group screening to begin.'
              : 'ప్రారంభించడానికి అందుబాటులో ఉన్న వయస్సు స్క్రీనింగ్‌ను ఎంచుకోండి.'}
          </p>
        </div>

        <button
          id="btn-wellness-start-screening"
          onClick={onNavigateScreening}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7c113b] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#630a2d] transition-colors shrink-0"
        >
          <ClipboardCheck className="w-4 h-4 text-[#ffd9e0]" />
          <span>{t.hero.startScreening}</span>
        </button>
      </div>
    </div>
  );
};
