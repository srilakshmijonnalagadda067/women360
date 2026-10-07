import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Calendar,
  Sparkles,
  Scissors,
  Activity,
  HeartPulse,
  Moon,
  Users,
  Smile
} from 'lucide-react';
import { Language, UserResponses, QuestionOption, ScreeningParticipantDetails } from '../types';
import { AGE_GROUPS, AgeGroup, SCREENING_BY_AGE } from '../data/screeningData';
import { TRANSLATIONS } from '../data/translations';

interface ScreeningScreenProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  responses: UserResponses;
  onAnswerSelect: (questionId: number, value: string, points: number, optionIndex: number) => void;
  onComplete: (participantDetails: ScreeningParticipantDetails) => void;
  onExit: () => void;
  ageGroup: AgeGroup | null;
  onAgeGroupSelect: (ageGroup: AgeGroup) => void;
}

const participantDetailsTranslations = {
  en: {
    audience: 'Adolescent & Late-Teen Women — 10–19 Years',
    questionnaire: 'Women’s Health Screening Questionnaire',
    heading: 'Participant Details',
    description: 'Please provide the following details before starting the health screening.',
    participantId: 'Participant ID',
    participantIdPlaceholder: 'Enter participant ID',
    date: 'Date',
    name: 'Name',
    namePlaceholder: 'Enter full name',
    dateOfBirth: 'Date of Birth',
    age: 'Age',
    agePlaceholder: 'Enter age',
    schoolCollege: 'School / College',
    schoolCollegePlaceholder: 'Enter school or college name',
    mobile: 'Mobile / WhatsApp (where appropriate)',
    mobilePlaceholder: 'Enter mobile / WhatsApp number',
    preferredLanguage: 'Preferred Language',
    english: 'English / ఇంగ్లీష్',
    telugu: 'Telugu / తెలుగు',
    other: 'Other',
    otherLanguagePlaceholder: 'Enter preferred language',
    invalidAge: 'Please enter an age between 10 and 19 for this screening.',
    backHome: 'Back to Home',
    continue: 'Continue →',
  },
  te: {
    audience: 'కౌమార & టీనేజ్ మహిళలు — 10–19 సంవత్సరాలు',
    questionnaire: 'మహిళల ఆరోగ్య స్క్రీనింగ్ ప్రశ్నావళి',
    heading: 'పాల్గొనేవారి వివరాలు',
    description: 'ఆరోగ్య స్క్రీనింగ్ ప్రారంభించే ముందు క్రింది వివరాలను అందించండి.',
    participantId: 'పాల్గొనేవారి ID',
    participantIdPlaceholder: 'పాల్గొనేవారి ID నమోదు చేయండి',
    date: 'తేదీ',
    name: 'పేరు',
    namePlaceholder: 'పూర్తి పేరు నమోదు చేయండి',
    dateOfBirth: 'పుట్టిన తేదీ',
    age: 'వయస్సు',
    agePlaceholder: 'వయస్సును నమోదు చేయండి',
    schoolCollege: 'పాఠశాల / కళాశాల',
    schoolCollegePlaceholder: 'పాఠశాల లేదా కళాశాల పేరును నమోదు చేయండి',
    mobile: 'మొబైల్ / WhatsApp (అవసరమైనప్పుడు)',
    mobilePlaceholder: 'మొబైల్ / WhatsApp నంబర్ నమోదు చేయండి',
    preferredLanguage: 'ఇష్టమైన భాష',
    english: 'English / ఇంగ్లీష్',
    telugu: 'తెలుగు / Telugu',
    other: 'ఇతర',
    otherLanguagePlaceholder: 'ఇష్టమైన భాషను నమోదు చేయండి',
    invalidAge: 'ఈ స్క్రీనింగ్ కోసం 10 నుండి 19 సంవత్సరాల మధ్య వయస్సును నమోదు చేయండి.',
    backHome: 'హోమ్‌కి వెళ్లండి',
    continue: 'కొనసాగించండి →',
  },
} as const;

export const ScreeningScreen: React.FC<ScreeningScreenProps> = ({
  lang,
  onLanguageChange,
  responses,
  onAnswerSelect,
  onComplete,
  onExit,
  ageGroup,
  onAgeGroupSelect,
}) => {
  const t = TRANSLATIONS[lang];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showAccordion, setShowAccordion] = useState<boolean>(false);
  const [showErrorPrompt, setShowErrorPrompt] = useState<boolean>(false);
  const [adolescentStage, setAdolescentStage] = useState<'details' | 'consent' | 'follow-up' | null>(null);
  const [showTwentyToTwentyNineIntro, setShowTwentyToTwentyNineIntro] = useState<boolean>(false);
  const [participantAge, setParticipantAge] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [participantDate, setParticipantDate] = useState(new Date().toISOString().slice(0, 10));
  const [participantName, setParticipantName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [schoolCollege, setSchoolCollege] = useState('');
  const [mobileContact, setMobileContact] = useState('');
  const [participantPreferredLanguage, setParticipantPreferredLanguage] = useState<'en' | 'te' | 'other'>('en');
  const [participantOtherLanguage, setParticipantOtherLanguage] = useState('');
  const [followUpOtherLanguage, setFollowUpOtherLanguage] = useState('');
  const [consentAcknowledgements, setConsentAcknowledgements] = useState([false, false, false]);
  const [participantConsent, setParticipantConsent] = useState<'obtained' | 'not-applicable' | 'pending' | ''>('');
  const [guardianConsent, setGuardianConsent] = useState<'obtained' | 'not-applicable' | 'pending' | ''>('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [consentValidationError, setConsentValidationError] = useState(false);
  const [followUpMethods, setFollowUpMethods] = useState<string[]>([]);
  const [followUpTime, setFollowUpTime] = useState('');
  const [followUpLanguage, setFollowUpLanguage] = useState<'en' | 'te' | 'other'>('en');
  const [safeContactInstructions, setSafeContactInstructions] = useState('');
  const [participantError, setParticipantError] = useState('');

  const questions = ageGroup ? SCREENING_BY_AGE[ageGroup] : [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];
  const currentAnswer = currentQuestion ? responses[currentQuestion.id] : undefined;
  const isTwentyToTwentyNine = ageGroup === '20-29';
  const isAdolescent = ageGroup === '10-19';
  const isMeasurementStep = Boolean(currentQuestion?.inputType);
  const screeningQuestionCount = 8;
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);
  const heightQuestionId = isAdolescent ? 26 : 111;
  const weightQuestionId = isAdolescent ? 27 : 112;
  const heightCm = Number(responses[heightQuestionId]?.value);
  const weightKg = Number(responses[weightQuestionId]?.value);
  const bmi = heightCm > 0 && weightKg > 0
    ? weightKg / ((heightCm / 100) ** 2)
    : undefined;

  const handleSelectOption = (option: QuestionOption, index: number) => {
    if (currentQuestion.allowMultiple) {
      const selectedValues = currentAnswer?.value
        ? currentAnswer.value.split('|')
        : [];
      const nextValues = option.value === 'prefer-not-to-say'
        ? selectedValues.includes(option.value) ? [] : [option.value]
        : selectedValues.includes('prefer-not-to-say')
          ? [option.value]
          : selectedValues.includes(option.value)
            ? selectedValues.filter((value) => value !== option.value)
            : [...selectedValues, option.value];
      const points = currentQuestion.options
        .filter((item) => nextValues.includes(item.value))
        .reduce((sum, item) => sum + item.points, 0);
      onAnswerSelect(currentQuestion.id, nextValues.join('|'), points, index);
    } else {
      onAnswerSelect(currentQuestion.id, option.value, option.points, index);
    }
    setShowErrorPrompt(false);
  };

  const hasValidAnswer = () => {
    if (currentQuestion.subQuestions?.length) {
      return currentQuestion.subQuestions.every((subQuestion) =>
        Boolean(responses[subQuestion.id]?.value));
    }
    if (!currentAnswer) return false;
    if (currentQuestion.allowMultiple) return currentAnswer.value.length > 0;
    if (currentQuestion.inputType === 'number') {
      const value = Number(currentAnswer.value);
      return currentAnswer.value.trim().length > 0 && Number.isFinite(value) && value > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (!hasValidAnswer()) {
      setShowErrorPrompt(true);
      return;
    }

    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
      setShowErrorPrompt(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete({
        ...(participantId.trim() ? { participantId: participantId.trim() } : {}),
        ...(participantName.trim() ? { participantName: participantName.trim() } : {}),
        ...(dateOfBirth ? { dateOfBirth } : {}),
        ...(participantAge ? { age: Number(participantAge) } : {}),
        ...(schoolCollege.trim() ? { schoolCollege: schoolCollege.trim() } : {}),
        ...(mobileContact.trim() ? { mobileWhatsapp: mobileContact.trim() } : {}),
        preferredLanguage: participantPreferredLanguage === 'other'
          ? participantOtherLanguage.trim() || 'other'
          : participantPreferredLanguage,
        ...(isAdolescent && participantDate ? { screeningDate: participantDate } : {}),
        ...(participantConsent ? { participantConsent } : {}),
        ...(guardianConsent ? { guardianConsent } : {}),
        ...(followUpMethods.length ? { followUpPermissions: [...followUpMethods] } : {}),
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setShowErrorPrompt(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isAdolescent) {
      setAdolescentStage('consent');
    } else {
      onExit();
    }
  };

  if (!ageGroup) {
    return (
      <div className="max-w-2xl mx-auto pb-24 pt-6 sm:pt-10">
        <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
              {lang === 'en' ? 'Select your age group' : 'మీ వయస్సు పరిధిని ఎంచుకోండి'}
            </h1>
            <p className="text-sm text-[#564146] leading-relaxed">
              {lang === 'en' ? 'Choose an available screening for your age group.' : 'మీ వయస్సుకు అందుబాటులో ఉన్న స్క్రీనింగ్‌ను ఎంచుకోండి.'}
            </p>
          </div>
          <div className="grid gap-3">
            {AGE_GROUPS.map((group) => (
              <button
                key={group.value}
                type="button"
                disabled={!group.available}
                onClick={() => {
                  setCurrentStep(0);
                  setAdolescentStage(group.value === '10-19' ? 'details' : null);
                  setShowTwentyToTwentyNineIntro(group.value === '20-29');
                  setParticipantAge('');
                  setParticipantId('');
                  setParticipantDate(new Date().toISOString().slice(0, 10));
                  setParticipantName('');
                  setDateOfBirth('');
                  setSchoolCollege('');
                  setMobileContact('');
                  setParticipantPreferredLanguage(lang);
                  setParticipantOtherLanguage('');
                  setFollowUpOtherLanguage('');
                  setConsentAcknowledgements([false, false, false]);
                  setParticipantConsent('');
                  setGuardianConsent('');
                  setGuardianName('');
                  setGuardianRelationship('');
                  setConsentValidationError(false);
                  setFollowUpMethods([]);
                  setFollowUpTime('');
                  setFollowUpLanguage('en');
                  setSafeContactInstructions('');
                  setParticipantError('');
                  onAgeGroupSelect(group.value);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  group.available
                    ? 'border-[#dcbfc4]/80 bg-[#f6faff] hover:border-[#7c113b] hover:bg-[#ffd9e0]/30'
                    : 'border-[#dcbfc4]/50 bg-[#f6faff]/60 text-[#7b7375] cursor-not-allowed'
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={`font-bold ${group.available ? 'text-[#151d22]' : 'text-[#7b7375]'}`}>
                    {lang === 'en' ? group.labelEn : group.labelTe}
                  </span>
                  {!group.available && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#7b7375]">
                      {lang === 'en' ? 'Coming Soon' : 'త్వరలో'}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-[#fff7f8] border border-[#dcbfc4]/60 p-4 text-xs text-[#564146]">
            {lang === 'en'
              ? 'Coming Soon — clinically reviewed age-specific screening content will be added.'
              : 'త్వరలో — వైద్యపరంగా సమీక్షించిన వయస్సుకు తగిన స్క్రీనింగ్ సమాచారం చేర్చబడుతుంది.'}
          </div>
          <button type="button" onClick={onExit} className="w-full px-5 py-3 rounded-2xl bg-white border border-[#dcbfc4] text-sm font-bold text-[#564146]">
            {lang === 'en' ? 'Back to Home' : 'హోమ్‌కి వెళ్లండి'}
          </button>
        </div>
      </div>
    );
  }

  if (adolescentStage === 'details' && ageGroup === '10-19') {
    const copy = participantDetailsTranslations[lang];
    const parsedAge = Number(participantAge);
    const ageIsValid = Number.isInteger(parsedAge) && parsedAge >= 10 && parsedAge <= 19;

    return (
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:pt-10">
        <header className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7c113b]">Women360</p>
          <h1 className="mt-2 font-display text-xl font-bold text-[#151d22] sm:text-2xl">
            {copy.audience}
          </h1>
          <p className="mt-1 text-sm text-[#564146]">
            {copy.questionnaire}
          </p>
        </header>
        <section className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-[0_12px_36px_rgba(124,17,59,0.08)] sm:p-7">
          <div className="mb-6 border-b border-[#f0e3e6] pb-5">
            <h2 className="font-display text-xl font-bold text-[#7c113b] sm:text-2xl">
              {copy.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#564146]">
              {copy.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <label className="block min-w-0 space-y-1.5">
              <span className="text-sm font-semibold text-[#34272a]">{copy.participantId}</span>
              <input aria-label={copy.participantId} placeholder={copy.participantIdPlaceholder} value={participantId} onChange={(event) => setParticipantId(event.target.value)} maxLength={40} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
            <label className="block min-w-0 space-y-1.5">
              <span className="text-sm font-semibold text-[#34272a]">{copy.date}</span>
              <input aria-label={copy.date} type="date" value={participantDate} onChange={(event) => setParticipantDate(event.target.value)} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
            <label className="block min-w-0 space-y-1.5 sm:col-span-2">
              <span className="text-sm font-semibold text-[#34272a]">{copy.name}</span>
              <input aria-label={copy.name} placeholder={copy.namePlaceholder} value={participantName} onChange={(event) => setParticipantName(event.target.value)} maxLength={100} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
            <label className="block min-w-0 space-y-1.5">
              <span className="text-sm font-semibold text-[#34272a]">{copy.dateOfBirth}</span>
              <input aria-label={copy.dateOfBirth} type="date" max={new Date().toISOString().slice(0, 10)} value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
            <label className="block min-w-0 space-y-1.5">
              <span className="text-sm font-semibold text-[#34272a]">{copy.age}</span>
              <input
                id="participant-age"
                aria-label={copy.age}
                type="number"
                min="10"
                max="19"
                step="1"
                inputMode="numeric"
                placeholder={copy.agePlaceholder}
                value={participantAge}
                onChange={(event) => {
                  setParticipantAge(event.target.value);
                  setParticipantError('');
                }}
                className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15"
              />
            </label>
            <label className="block min-w-0 space-y-1.5 sm:col-span-2">
              <span className="text-sm font-semibold text-[#34272a]">{copy.schoolCollege}</span>
              <input aria-label={copy.schoolCollege} placeholder={copy.schoolCollegePlaceholder} value={schoolCollege} onChange={(event) => setSchoolCollege(event.target.value)} maxLength={120} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
            <label className="block min-w-0 space-y-1.5 sm:col-span-2">
              <span className="text-sm font-semibold text-[#34272a]">{copy.mobile}</span>
              <input aria-label={copy.mobile} type="tel" autoComplete="tel" placeholder={copy.mobilePlaceholder} value={mobileContact} onChange={(event) => setMobileContact(event.target.value)} maxLength={30} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
            <fieldset className="min-w-0 sm:col-span-2">
              <legend className="mb-2 text-sm font-semibold text-[#34272a]">{copy.preferredLanguage}</legend>
              <div className="flex flex-wrap gap-2.5">
                {([
                  ['en', copy.english],
                  ['te', copy.telugu],
                  ['other', copy.other],
                ] as const).map(([value, label]) => (
                  <label key={value} className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${participantPreferredLanguage === value ? 'border-[#7c113b] bg-[#fff4f6] text-[#7c113b] ring-1 ring-[#7c113b]/15' : 'border-[#dfcbd0] bg-white text-[#564146] hover:border-[#c48a9a]'}`}>
                    <input
                      type="radio"
                      name="participant-preferred-language"
                      checked={participantPreferredLanguage === value}
                      onChange={() => {
                        setParticipantPreferredLanguage(value);
                        if (value !== 'other') onLanguageChange(value);
                      }}
                      className="accent-[#7c113b]"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {participantPreferredLanguage === 'other' && (
                <input
                  aria-label={copy.other}
                  placeholder={copy.otherLanguagePlaceholder}
                  value={participantOtherLanguage}
                  onChange={(event) => setParticipantOtherLanguage(event.target.value)}
                  className="mt-3 h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 text-sm text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15"
                />
              )}
            </fieldset>
          </div>
          {participantError && (
            <p role="alert" className="mt-5 text-sm font-semibold text-[#991b1b]">
              {participantError}
            </p>
          )}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#f0e3e6] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={onExit} className="px-4 py-2.5 text-sm font-semibold text-[#6e5960] underline underline-offset-4">
              {copy.backHome}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!ageIsValid) {
                  setParticipantError(lang === 'en'
                    ? participantDetailsTranslations.en.invalidAge
                    : participantDetailsTranslations.te.invalidAge);
                  return;
                }
                setParticipantError('');
                setAdolescentStage('consent');
              }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7c113b] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#65102f] focus:outline-none focus:ring-2 focus:ring-[#7c113b]/30 focus:ring-offset-2 sm:w-auto"
            >
              {copy.continue}
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (adolescentStage === 'consent' && ageGroup === '10-19') {
    const copy = lang === 'en'
      ? {
          title: 'Consent, Assent & Privacy',
          information: 'Important Information',
          awareness: 'This screening is for health awareness only and is not a medical diagnosis. Your information may be used for screening, care navigation and follow-up according to the applicable Women360 privacy/data process.',
          rights: 'Withdrawal and applicable data rights follow the approved Women360 process.',
          prototype: 'This prototype does not provide legally reviewed consent or a legally reviewed Privacy/Data Notice.',
          acknowledgements: [
            'I have been shown the Women360 Privacy/Data Notice.',
            'I understand why my information is being collected and how it may be used.',
            'I understand that this is a health-awareness screening and not a medical diagnosis.',
          ],
          participantConsent: 'Participant assent/consent',
          guardianConsent: 'Parent/Guardian consent (where required)',
          obtained: 'Obtained',
          notApplicable: 'Not applicable',
          pending: 'Pending',
          guardianName: 'Parent/Guardian name (if applicable)',
          relationship: 'Relationship',
          validation: 'Please complete the required consent information before continuing.',
          back: 'Back',
          continue: 'Continue',
        }
      : {
          title: 'సమ్మతి, అంగీకారం & గోప్యత',
          information: 'ముఖ్యమైన సమాచారం',
          awareness: 'ఈ స్క్రీనింగ్ ఆరోగ్య అవగాహన కోసం మాత్రమే మరియు వైద్య నిర్ధారణను అందించదు. మీ సమాచారాన్ని వర్తించే Women360 గోప్యత/డేటా విధానానికి అనుగుణంగా స్క్రీనింగ్, సంరక్షణ మార్గదర్శకత్వం మరియు ఫాలో-అప్ కోసం ఉపయోగించవచ్చు.',
          rights: 'అనుమతి ఉపసంహరణ మరియు వర్తించే డేటా హక్కులు ఆమోదించబడిన Women360 విధానానికి అనుగుణంగా ఉంటాయి.',
          prototype: 'ఈ ప్రోటోటైప్ చట్టపరంగా సమీక్షించబడిన సమ్మతి లేదా గోప్యత/డేటా నోటీసును అందించదు.',
          acknowledgements: [
            'నాకు Women360 గోప్యత/డేటా నోటీసు చూపించబడింది.',
            'నా సమాచారం ఎందుకు సేకరిస్తున్నారో మరియు అది ఎలా ఉపయోగించబడవచ్చో నాకు అర్థమైంది.',
            'ఇది ఆరోగ్య అవగాహన స్క్రీనింగ్ మాత్రమే, వైద్య నిర్ధారణ కాదని నాకు అర్థమైంది.',
          ],
          participantConsent: 'పాల్గొనేవారి అంగీకారం/సమ్మతి',
          guardianConsent: 'తల్లిదండ్రి/సంరక్షకుల సమ్మతి (అవసరమైన చోట)',
          obtained: 'పొందబడింది',
          notApplicable: 'వర్తించదు',
          pending: 'పెండింగ్‌లో ఉంది',
          guardianName: 'తల్లిదండ్రి/సంరక్షకుల పేరు (అవసరమైనట్లయితే)',
          relationship: 'సంబంధం',
          validation: 'కొనసాగించే ముందు అవసరమైన సమ్మతి సమాచారాన్ని పూర్తి చేయండి.',
          back: 'వెనుకకు',
          continue: 'కొనసాగించండి',
        };
    const needsGuardianDetails = guardianConsent === 'obtained' &&
      (!guardianName.trim() || !guardianRelationship.trim());
    const canContinue = consentAcknowledgements.every(Boolean) &&
      participantConsent !== '' &&
      !needsGuardianDetails;
    return (
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:pt-10">
        <section className="space-y-5 rounded-2xl border border-[#dcbfc4] bg-white p-5 shadow-sm sm:p-7">
          <header className="space-y-2 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">WOMEN360 · 10–19</p>
            <h1 className="font-display text-2xl font-bold text-[#151d22] sm:text-3xl">{copy.title}</h1>
          </header>
          <aside className="space-y-2 rounded-xl border border-[#dcbfc4]/60 bg-[#f6faff] p-4 text-sm leading-relaxed text-[#564146]">
            <h2 className="font-bold text-[#7c113b]">{copy.information}</h2>
            <p>{copy.awareness}</p>
            <p>{copy.rights}</p>
            <p className="text-xs text-[#76666a]">{copy.prototype}</p>
          </aside>
          <fieldset className="space-y-2.5">
            {copy.acknowledgements.map((label, index) => (
              <label key={label} className="flex items-start gap-3 rounded-lg px-1 py-1.5 text-sm leading-relaxed text-[#151d22]">
                <input
                  type="checkbox"
                  checked={consentAcknowledgements[index]}
                  onChange={(event) => setConsentAcknowledgements((previous) =>
                    previous.map((checked, itemIndex) => itemIndex === index ? event.target.checked : checked))}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#7c113b]"
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="space-y-2 rounded-xl border border-[#ead9de] p-3.5">
            <legend className="px-1 text-sm font-bold text-[#564146]">{copy.participantConsent}</legend>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {(['obtained', 'not-applicable', 'pending'] as const).map((value) => (
                <label key={value} className="inline-flex items-center gap-2 text-sm text-[#34272a]">
                  <input type="radio" name="participant-consent" value={value} checked={participantConsent === value} onChange={() => { setParticipantConsent(value); setConsentValidationError(false); }} className="h-4 w-4 accent-[#7c113b]" />
                  {value === 'obtained' ? copy.obtained : value === 'not-applicable' ? copy.notApplicable : copy.pending}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="space-y-2 rounded-xl border border-[#ead9de] p-3.5">
            <legend className="px-1 text-sm font-bold text-[#564146]">{copy.guardianConsent}</legend>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {(['obtained', 'not-applicable', 'pending'] as const).map((value) => (
                <label key={value} className="inline-flex items-center gap-2 text-sm text-[#34272a]">
                  <input type="radio" name="guardian-consent" value={value} checked={guardianConsent === value} onChange={() => { setGuardianConsent(value); setConsentValidationError(false); }} className="h-4 w-4 accent-[#7c113b]" />
                  {value === 'obtained' ? copy.obtained : value === 'not-applicable' ? copy.notApplicable : copy.pending}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm font-semibold text-[#564146]">
              <span>{copy.guardianName}</span>
              <input value={guardianName} onChange={(event) => { setGuardianName(event.target.value); setConsentValidationError(false); }} className="h-11 w-full rounded-xl border border-[#dcbfc4] bg-[#fffdfd] px-3 text-sm font-normal text-[#151d22] outline-none focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
            <label className="block space-y-1.5 text-sm font-semibold text-[#564146]">
              <span>{copy.relationship}</span>
              <input value={guardianRelationship} onChange={(event) => { setGuardianRelationship(event.target.value); setConsentValidationError(false); }} className="h-11 w-full rounded-xl border border-[#dcbfc4] bg-[#fffdfd] px-3 text-sm font-normal text-[#151d22] outline-none focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
            </label>
          </div>
          {consentValidationError && (
            <p role="alert" className="text-sm font-semibold text-[#991b1b]">{copy.validation}</p>
          )}
          <div className="flex flex-col gap-3 border-t border-[#f0e3e6] pt-4 sm:flex-row">
            <button type="button" onClick={() => setAdolescentStage('details')} className="min-h-11 rounded-xl border border-[#dcbfc4] bg-white px-5 py-2.5 text-sm font-bold text-[#564146]">
              {copy.back}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!canContinue) {
                  setConsentValidationError(true);
                  return;
                }
                setConsentValidationError(false);
                setAdolescentStage('follow-up');
              }}
              className="min-h-11 flex-1 rounded-xl bg-[#7c113b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#65102f] focus:outline-none focus:ring-2 focus:ring-[#7c113b]/30 focus:ring-offset-2"
            >
              {copy.continue}
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (adolescentStage === 'follow-up' && ageGroup === '10-19') {
    const followUpChoices = [
      ['whatsapp-message', lang === 'en' ? 'WhatsApp message' : 'WhatsApp సందేశం'],
      ['whatsapp-call', lang === 'en' ? 'WhatsApp call' : 'WhatsApp కాల్'],
      ['telephone-call', lang === 'en' ? 'Telephone call' : 'టెలిఫోన్ కాల్'],
      ['home-visit', lang === 'en' ? 'Home visit' : 'ఇంటి సందర్శన'],
      ['no-follow-up', lang === 'en' ? 'No follow-up contact' : 'తదుపరి సంప్రదింపు వద్దు'],
    ] as const;
    return (
      <div className="max-w-2xl mx-auto pb-24 pt-6 sm:pt-10">
        <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">WOMEN360 · 10–19</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
              {lang === 'en' ? 'Permission for Follow-Up Contact' : 'తదుపరి సంప్రదింపుకు అనుమతి'}
            </h1>
            <p className="text-sm text-[#564146]">
              {lang === 'en' ? 'Optional. Your selection does not trigger contact or a home visit.' : 'ఐచ్ఛికం. మీ ఎంపికతో సంప్రదింపు లేదా ఇంటి సందర్శన స్వయంచాలకంగా జరగదు.'}
            </p>
          </div>
          <fieldset className="space-y-2">
            <legend className="font-bold text-[#7c113b]">{lang === 'en' ? 'Preferred contact method(s)' : 'ఇష్టమైన సంప్రదింపు విధానం(లు)'}</legend>
            {followUpChoices.map(([value, label]) => (
              <label key={value} className="flex items-center gap-3 rounded-xl border border-[#dcbfc4]/70 p-3 text-sm text-[#151d22]">
                <input
                  type="checkbox"
                  checked={followUpMethods.includes(value)}
                  onChange={(event) => setFollowUpMethods((previous) => {
                    if (value === 'no-follow-up') return event.target.checked ? [value] : [];
                    const withoutNoFollowUp = previous.filter((item) => item !== 'no-follow-up');
                    return event.target.checked
                      ? [...withoutNoFollowUp, value]
                      : withoutNoFollowUp.filter((item) => item !== value);
                  })}
                  className="h-5 w-5 accent-[#7c113b]"
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          {followUpMethods.includes('home-visit') && (
            <p className="rounded-xl bg-[#fff7f8] p-3 text-sm text-[#564146]">
              {lang === 'en'
                ? 'Home visits must follow approved safeguarding, privacy and staff-safety procedures.'
                : 'ఇంటి సందర్శనలు ఆమోదిత భద్రత, గోప్యత మరియు సిబ్బంది-భద్రత విధానాలకు అనుగుణంగా ఉండాలి.'}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1 text-sm font-semibold text-[#564146]">
              <span>{lang === 'en' ? 'Preferred contact time' : 'ఇష్టమైన సంప్రదింపు సమయం'}</span>
              <select value={followUpTime} onChange={(event) => setFollowUpTime(event.target.value)} className="w-full rounded-xl border border-[#dcbfc4] bg-[#f6faff] px-3 py-2">
                <option value="">{lang === 'en' ? 'No preference' : 'ప్రాధాన్యత లేదు'}</option>
                <option value="morning">{lang === 'en' ? 'Morning' : 'ఉదయం'}</option>
                <option value="afternoon">{lang === 'en' ? 'Afternoon' : 'మధ్యాహ్నం'}</option>
                <option value="evening">{lang === 'en' ? 'Evening' : 'సాయంత్రం'}</option>
              </select>
            </label>
            <label className="block space-y-1 text-sm font-semibold text-[#564146]">
              <span>{lang === 'en' ? 'Preferred language' : 'ఇష్టమైన భాష'}</span>
              <select
                value={followUpLanguage}
                onChange={(event) => {
                  const selectedLanguage = event.target.value as 'en' | 'te' | 'other';
                  setFollowUpLanguage(selectedLanguage);
                  if (selectedLanguage !== 'other') onLanguageChange(selectedLanguage);
                }}
                className="w-full rounded-xl border border-[#dcbfc4] bg-[#f6faff] px-3 py-2"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="other">{lang === 'en' ? 'Other' : 'ఇతర'}</option>
              </select>
            </label>
          </div>
          {followUpLanguage === 'other' && (
            <label className="block space-y-1 text-sm font-semibold text-[#564146]">
              <span>{lang === 'en' ? 'Specify language' : 'భాషను పేర్కొనండి'}</span>
              <input value={followUpOtherLanguage} onChange={(event) => setFollowUpOtherLanguage(event.target.value)} className="w-full rounded-xl border border-[#dcbfc4] bg-[#f6faff] px-3 py-2 font-normal" />
            </label>
          )}
          <label className="block space-y-1 text-sm font-semibold text-[#564146]">
            <span>{lang === 'en' ? 'Safe contact instructions (optional)' : 'సురక్షిత సంప్రదింపు సూచనలు (ఐచ్ఛికం)'}</span>
            <textarea value={safeContactInstructions} onChange={(event) => setSafeContactInstructions(event.target.value)} rows={3} maxLength={300} className="w-full rounded-xl border border-[#dcbfc4] bg-[#f6faff] px-3 py-2 font-normal" />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => setAdolescentStage('consent')} className="px-5 py-3 rounded-2xl bg-white border border-[#dcbfc4] text-sm font-bold text-[#564146]">
              {lang === 'en' ? 'Back to Consent' : 'సమ్మతికి వెనుకకు'}
            </button>
            <button type="button" onClick={() => { setCurrentStep(0); setShowErrorPrompt(false); setAdolescentStage(null); }} className="flex-1 px-5 py-3 rounded-2xl bg-[#7c113b] text-sm font-bold text-white">
              {lang === 'en' ? 'Start 8-Question Screening' : '8 ప్రశ్నల స్క్రీనింగ్ ప్రారంభించండి'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showTwentyToTwentyNineIntro && ageGroup === '20-29') {
    return (
      <div className="max-w-2xl mx-auto pb-24 pt-6 sm:pt-10">
        <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
              {lang === 'en' ? 'Adult Women — 20–29 Years' : 'వయోజన మహిళలు — 20–29 సంవత్సరాలు'}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
              {lang === 'en' ? 'Women360 Adult Health Screening' : 'Women360 వయోజన ఆరోగ్య స్క్రీనింగ్'}
            </h1>
            <p className="text-sm text-[#564146]">
              {lang === 'en' ? 'Answer a few questions about menstrual, hormonal, general and reproductive health · 3–4 minutes' : 'రుతుక్రమ, హార్మోన్ల, సాధారణ మరియు ప్రజనన ఆరోగ్యం గురించి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి · 3–4 నిమిషాలు'}
            </p>
          </div>
          <div className="rounded-2xl bg-[#fff7f8] border border-[#dcbfc4]/60 p-4 text-sm leading-relaxed text-[#564146]">
            {lang === 'en'
              ? 'This screening is for health awareness and does not provide a medical diagnosis. It cannot confirm or rule out a medical condition. If you have concerning, severe, or worsening symptoms, consult a qualified healthcare professional.'
              : 'ఈ స్క్రీనింగ్ ఆరోగ్య అవగాహన కోసం మాత్రమే మరియు వైద్య నిర్ధారణను అందించదు. ఇది ఏదైనా వైద్య పరిస్థితిని నిర్ధారించదు లేదా పూర్తిగా తొలగించదు. ఆందోళన కలిగించే, తీవ్రమైన లేదా కొనసాగుతున్న లక్షణాలు ఉంటే అర్హత కలిగిన ఆరోగ్య నిపుణుడిని సంప్రదించండి.'}
          </div>
          <p className="text-xs text-[#564146]">
            {lang === 'en'
              ? 'Your screening result is saved in this browser on this device so you can view it later from the home page. Do not use this shared device if you do not want the result saved here.'
              : 'తర్వాత హోమ్ పేజీ నుండి చూడటానికి మీ స్క్రీనింగ్ ఫలితం ఈ పరికరంలోని బ్రౌజర్‌లో సేవ్ అవుతుంది. ఇక్కడ ఫలితం సేవ్ కావడం మీకు ఇష్టం లేకపోతే పరికరాన్ని ఇతరులతో పంచుకునేటప్పుడు జాగ్రత్త వహించండి.'}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => { setShowTwentyToTwentyNineIntro(false); onExit(); }} className="px-5 py-3 rounded-2xl bg-white border border-[#dcbfc4] text-sm font-bold text-[#564146]">
              {lang === 'en' ? 'Back to Home' : 'హోమ్‌కి వెళ్లండి'}
            </button>
            <button type="button" onClick={() => setShowTwentyToTwentyNineIntro(false)} className="flex-1 px-5 py-3 rounded-2xl bg-[#7c113b] text-sm font-bold text-white">
              {lang === 'en' ? 'Continue to Questions' : 'ప్రశ్నలకు కొనసాగండి'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24 pt-4 sm:pt-6 space-y-6">
      {isTwentyToTwentyNine && (
        <div className="rounded-2xl bg-white border border-[#dcbfc4]/80 p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
            {lang === 'en' ? 'Adult Women — 20–29 Years · Women360' : 'వయోజన మహిళలు — 20–29 సంవత్సరాలు · Women360'}
          </p>
        </div>
      )}
      {ageGroup === '10-19' && (
        <div className="rounded-2xl bg-white border border-[#dcbfc4]/80 p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
            {lang === 'en'
              ? 'WOMEN360 · Adolescent Women — 10–19 Years'
              : 'WOMEN360 · కౌమార మహిళలు — 10–19 సంవత్సరాలు'}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#564146]">
            {lang === 'en'
              ? '3–4-Minute Health Awareness Screening'
              : '3–4 నిమిషాల ఆరోగ్య అవగాహన స్క్రీనింగ్'}
          </p>
        </div>
      )}
      {/* Top Bar: Back & Exit */}
      <div className="flex items-center justify-between">
        <button
          id="btn-screening-back"
          onClick={handlePrev}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#dcbfc4] text-xs sm:text-sm font-semibold text-[#564146] hover:text-[#7c113b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 0
            ? isAdolescent
              ? lang === 'en' ? 'Back to Consent' : 'సమ్మతికి వెనుకకు'
              : lang === 'en' ? 'Exit to Home' : 'హోమ్‌కి వెళ్లండి'
            : t.screening.btnBack}</span>
        </button>

        <span className="text-xs font-bold text-[#7c113b] bg-[#ffd9e0] px-3 py-1 rounded-full">
          {currentQuestion.badgeEn ? (lang === 'en' ? currentQuestion.badgeEn : currentQuestion.badgeTe) : 'Assessment'}
        </span>
      </div>

      {/* Progress & Stepper Card */}
      <div className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
              {t.screening.stepperTitle}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#151d22]">
              {isMeasurementStep
                ? lang === 'en'
                  ? `Basic measurements · ${currentQuestion.titleEn}`
                  : `ప్రాథమిక కొలతలు · ${currentQuestion.titleTe}`
                : `${lang === 'en' ? 'Question' : 'ప్రశ్న'} ${currentStep + 1} ${lang === 'en' ? 'of' : 'లో'} ${screeningQuestionCount}`}
            </h2>
          </div>
          <span className="text-sm font-bold text-[#7c113b] bg-[#ffd9e0]/80 px-2.5 py-1 rounded-xl">
            {progressPercent}%
          </span>
        </div>

        {/* Continuous Progress Bar */}
        <div className="w-full bg-[#edf5fc] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#7c113b] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step dots indicator */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {questions.filter((question) => !question.inputType).map((q, idx) => {
            const isAnswered = Boolean(responses[q.id]);
            const isCurrent = idx === currentStep;

            return (
              <button
                key={q.id}
                id={`step-indicator-${idx + 1}`}
                onClick={() => {
                  // Only allow jumping back to completed questions or current
                  if (idx <= currentStep || isAnswered) {
                    setCurrentStep(idx);
                    setShowErrorPrompt(false);
                  }
                }}
                className={`h-2 flex-1 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-[#7c113b]'
                    : isAnswered
                    ? 'bg-[#9b2c52]/60 hover:bg-[#9b2c52]'
                    : 'bg-[#edf5fc]'
                }`}
                title={`${lang === 'en' ? 'Question' : 'ప్రశ్న'} ${idx + 1}`}
                aria-label={`${lang === 'en' ? 'Jump to question' : 'ప్రశ్నకు వెళ్లండి'} ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-[#151d22] leading-snug">
            {lang === 'en' ? currentQuestion.titleEn : currentQuestion.titleTe}
          </h1>
          {currentQuestion.descEn && (
            <p className="text-sm text-[#564146] leading-relaxed">
              {lang === 'en' ? currentQuestion.descEn : currentQuestion.descTe}
            </p>
          )}
          {currentQuestion.allowMultiple && (
            <p className="text-sm text-[#564146] leading-relaxed">
              {lang === 'en' ? 'Select all that apply.' : 'వర్తించే అన్నింటినీ ఎంచుకోండి.'}
            </p>
          )}
          {isTwentyToTwentyNine && currentQuestion.id === 105 && (
            <p className="text-sm text-[#564146] leading-relaxed">
              {lang === 'en'
                ? 'PMOS (formerly known as PCOS). This question identifies an awareness area only and does not diagnose a condition.'
                : 'PMOS (గతంలో PCOSగా పిలిచేవారు). ఈ ప్రశ్న అవగాహన అంశాన్ని మాత్రమే గుర్తిస్తుంది; వైద్య నిర్ధారణ కాదు.'}
            </p>
          )}
          {isTwentyToTwentyNine && currentQuestion.id === 108 && currentAnswer?.value === 'planning-pregnancy' && (
            <p className="rounded-xl bg-[#edf5fc] p-3 text-sm text-[#564146]">
              {lang === 'en'
                ? 'Preconception care can help identify health needs before pregnancy. Consider discussing your health, medicines, nutrition, vaccinations and existing conditions with a qualified healthcare professional.'
                : 'గర్భధారణకు ముందు సంరక్షణ ఆరోగ్య అవసరాలను గుర్తించడంలో సహాయపడుతుంది. మీ ఆరోగ్యం, మందులు, పోషకాహారం, టీకాలు మరియు ఇప్పటికే ఉన్న పరిస్థితుల గురించి అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'}
            </p>
          )}
          {isTwentyToTwentyNine && currentQuestion.id === 108 && currentAnswer?.value === 'currently-pregnant' && (
            <p className="rounded-xl bg-[#edf5fc] p-3 text-sm text-[#564146]">
              {lang === 'en'
                ? 'Pregnancy has a different healthcare pathway. Please use pregnancy-specific care with a qualified healthcare professional.'
                : 'గర్భధారణకు ప్రత్యేక ఆరోగ్య సంరక్షణ మార్గం ఉంటుంది. అర్హత కలిగిన ఆరోగ్య నిపుణుడి ద్వారా గర్భధారణకు సంబంధించిన ప్రత్యేక సంరక్షణ పొందండి.'}
            </p>
          )}
        </div>

        {/* Answer Options */}
        {currentQuestion.subQuestions?.length ? (
          <div className="space-y-6">
            {currentQuestion.subQuestions.map((subQuestion) => {
              const subAnswer = responses[subQuestion.id];
              return (
                <fieldset key={subQuestion.id} className="space-y-3">
                  <legend className="font-semibold text-[#151d22]">
                    {lang === 'en' ? subQuestion.titleEn : subQuestion.titleTe}
                  </legend>
                  {(subQuestion.descEn || subQuestion.descTe) && (
                    <p className="text-sm text-[#564146]">
                      {lang === 'en' ? subQuestion.descEn : subQuestion.descTe}
                    </p>
                  )}
                  <div className="space-y-2">
                    {subQuestion.options.map((option, index) => {
                      const selected = subAnswer?.value === option.value;
                      return (
                        <button
                          key={option.value}
                          id={`sub-option-${subQuestion.id}-${option.value}`}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => {
                            onAnswerSelect(subQuestion.id, option.value, option.points, index);
                            setShowErrorPrompt(false);
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            selected
                              ? 'bg-[#ffd9e0]/40 border-[#7c113b] ring-1 ring-[#7c113b]'
                              : 'bg-[#f6faff] border-[#dcbfc4]/70 hover:bg-[#edf5fc]'
                          }`}
                        >
                          <span className={`font-semibold ${selected ? 'text-[#7c113b]' : 'text-[#151d22]'}`}>
                            {lang === 'en' ? option.labelEn : option.labelTe}
                          </span>
                          <span className={`w-6 h-6 rounded-full border flex items-center justify-center ${selected ? 'bg-[#7c113b] border-[#7c113b] text-white' : 'bg-white border-[#dcbfc4]'}`}>
                            {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
          </div>
        ) : currentQuestion.inputType === 'number' ? (
          <label className="block space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0.1"
                step="any"
                inputMode="decimal"
                value={currentAnswer?.value ?? ''}
                onChange={(event) => {
                  onAnswerSelect(currentQuestion.id, event.target.value, 0, -1);
                  setShowErrorPrompt(false);
                }}
                className="w-full rounded-2xl border border-[#dcbfc4] bg-[#f6faff] px-4 py-3 text-base text-[#151d22] focus:border-[#7c113b] focus:outline-none focus:ring-2 focus:ring-[#7c113b]/20"
                aria-label={lang === 'en'
                  ? `${currentQuestion.titleEn} (${currentQuestion.unitEn})`
                  : `${currentQuestion.titleTe} (${currentQuestion.unitTe})`}
              />
              <span className="shrink-0 text-sm font-semibold text-[#564146]">
                {lang === 'en' ? currentQuestion.unitEn : currentQuestion.unitTe}
              </span>
            </div>
          </label>
        ) : (
          <div
            className="space-y-3"
            role={currentQuestion.allowMultiple ? 'group' : 'radiogroup'}
            aria-label={lang === 'en' ? currentQuestion.titleEn : currentQuestion.titleTe}
          >
          {currentQuestion.options.map((option, idx) => {
            const selectedValues = currentAnswer?.value.split('|') ?? [];
            const isSelected = currentQuestion.allowMultiple
              ? selectedValues.includes(option.value)
              : currentAnswer?.value === option.value;

            return (
              <button
                key={option.value}
                id={`option-${currentQuestion.id}-${option.value}`}
                type="button"
                role={currentQuestion.allowMultiple ? 'checkbox' : 'radio'}
                aria-checked={isSelected}
                onClick={() => handleSelectOption(option, idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  isSelected
                    ? 'bg-[#ffd9e0]/40 border-[#7c113b] shadow-xs ring-1 ring-[#7c113b]'
                    : 'bg-[#f6faff] border-[#dcbfc4]/70 hover:bg-[#edf5fc] hover:border-[#7c113b]/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-display text-base font-bold ${
                        isSelected ? 'text-[#7c113b]' : 'text-[#151d22]'
                      }`}
                    >
                      {lang === 'en' ? option.labelEn : option.labelTe}
                    </span>
                  </div>
                  {(option.subEn || option.subTe) && (
                    <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
                      {lang === 'en' ? option.subEn : option.subTe}
                    </p>
                  )}
                </div>

                {/* Selection Indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                    isSelected
                      ? 'bg-[#7c113b] border-[#7c113b] text-white'
                      : 'border-[#dcbfc4] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
          </div>
        )}
        {isTwentyToTwentyNine && currentQuestion.id === 112 && bmi !== undefined && Number.isFinite(bmi) && (
          <div className="rounded-2xl bg-[#edf5fc] p-4 text-sm text-[#564146]">
            <p className="font-bold text-[#7c113b]">
              {lang === 'en' ? `Informational BMI: ${bmi.toFixed(1)}` : `సమాచార BMI: ${bmi.toFixed(1)}`}
            </p>
            <p className="mt-1">
              {lang === 'en'
                ? 'BMI is an informational measurement only. It is not a diagnosis and does not determine your screening result by itself.'
                : 'BMI ఒక సమాచార కొలత మాత్రమే. ఇది వైద్య నిర్ధారణ కాదు మరియు మీ స్క్రీనింగ్ ఫలితాన్ని ఒక్కటే నిర్ణయించదు.'}
            </p>
          </div>
        )}
        {isAdolescent && currentQuestion.id === weightQuestionId && bmi !== undefined && Number.isFinite(bmi) && (
          <div className="rounded-2xl bg-[#edf5fc] p-4 text-sm text-[#564146]">
            <p className="font-bold text-[#7c113b]">
              {lang === 'en' ? `BMI: ${bmi.toFixed(1)}` : `BMI: ${bmi.toFixed(1)}`}
            </p>
            <p className="mt-1">
              {lang === 'en'
                ? 'BMI is shown as a measurement only. For adolescents, BMI should be interpreted using age- and sex-specific growth references by a qualified healthcare professional.'
                : 'BMI కొలతగా మాత్రమే చూపబడుతుంది. కౌమార వయస్సులో BMIని అర్హత కలిగిన ఆరోగ్య నిపుణుడు వయస్సు మరియు లింగానికి తగిన వృద్ధి సూచనల ఆధారంగా అర్థం చేసుకోవాలి.'}
            </p>
          </div>
        )}

        {/* Error prompt if user tries Next without selecting */}
        {showErrorPrompt && !hasValidAnswer() && (
          <div
            id="screening-error-prompt"
            className="flex items-center gap-2 p-3.5 rounded-xl bg-[#fee2e2] text-[#991b1b] text-xs sm:text-sm font-semibold animate-pulse"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{t.screening.selectPrompt}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 flex items-center gap-3 border-t border-[#dcbfc4]/40">
          <button
            id="btn-screening-prev-action"
            type="button"
            onClick={handlePrev}
            className="px-5 py-3.5 rounded-2xl bg-white border border-[#dcbfc4] text-sm font-bold text-[#564146] hover:bg-[#edf5fc] transition-colors"
          >
            {currentStep === 0
              ? isAdolescent
                ? lang === 'en' ? 'Back to Consent' : 'సమ్మతికి వెనుకకు'
                : lang === 'en' ? 'Cancel' : 'రద్దు'
              : t.screening.btnBack}
          </button>

          <button
            id="btn-screening-next-action"
            type="button"
            onClick={handleNext}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold transition-all shadow-md ${
              hasValidAnswer()
                ? 'bg-[#7c113b] hover:bg-[#630a2d] text-white cursor-pointer transform hover:-translate-y-0.5'
                : 'bg-[#dcbfc4] text-white/90 cursor-not-allowed'
            }`}
          >
            <span>
              {currentStep === totalQuestions - 1
                ? t.screening.btnSubmit
                : t.screening.btnNext}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accordion: Why we ask these questions (Medical rationale) */}
      <div className="rounded-2xl bg-white border border-[#dcbfc4]/80 overflow-hidden shadow-xs">
        <button
          id="btn-toggle-accordion-rationale"
          type="button"
          onClick={() => setShowAccordion(!showAccordion)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#edf5fc] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#7c113b]" />
            <span className="text-xs sm:text-sm font-bold text-[#7c113b]">
              {t.screening.accordionTitle}
            </span>
          </div>
          {showAccordion ? (
            <ChevronUp className="w-4 h-4 text-[#7c113b]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#7c113b]" />
          )}
        </button>

        {showAccordion && (
          <div className="p-4 pt-0 text-xs sm:text-sm text-[#564146] leading-relaxed border-t border-[#dcbfc4]/30 bg-[#f6faff]">
            <p>{t.screening.accordionText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
