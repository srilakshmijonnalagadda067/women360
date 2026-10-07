/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ScreeningScreen } from './components/ScreeningScreen';
import { ResultScreen } from './components/ResultScreen';
import { WellnessScreen } from './components/WellnessScreen';
import { LearnScreen } from './components/LearnScreen';
import {
  Language,
  AppView,
  UserResponses,
  RiskResult,
  RiskTier,
  ScreeningAnswer,
  ScreeningParticipantDetails,
  ScreeningRecord,
} from './types';
import { SCREENING_BY_AGE, AgeGroup } from './data/screeningData';
import { TRANSLATIONS } from './data/translations';
import { HeartPulse, PhoneCall, ShieldCheck } from 'lucide-react';
import {
  AdminDashboardPlaceholder,
  DoctorLogin,
  LoginRoleSelection,
} from './components/HealthcarePortal';
import { DoctorDashboard } from './components/DoctorDashboard';
import { getScreeningRecords, saveScreeningRecord } from './services/screeningStorage';
import {
  authenticateHealthcareProfessional,
  clearAuthenticationSession,
  getStoredRole,
  HEALTHCARE_ROLE,
  saveHealthcareSession,
} from './auth/healthcareAuth';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<AppView>('home');
  const [routePath, setRoutePath] = useState(() => window.location.pathname);
  const [authRole, setAuthRole] = useState<string | null>(() => getStoredRole());
  const [screeningRecords, setScreeningRecords] = useState<ScreeningRecord[]>(() => getScreeningRecords());
  const [responses, setResponses] = useState<UserResponses>({});
  const [result, setResult] = useState<RiskResult | null>(null);
  const [resultSaveError, setResultSaveError] = useState(false);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);

  const t = TRANSLATIONS[lang];
  const savedResultKey = 'women360-screening-result-v1';

  const navigateRoute = (path: string) => {
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setRoutePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => setRoutePath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if ((routePath === '/doctor-dashboard' || routePath.startsWith('/doctor-dashboard/')) &&
      authRole !== HEALTHCARE_ROLE) {
      navigateRoute('/doctor-login');
    }
    if (routePath === '/admin-dashboard' && authRole !== 'ADMIN') {
      navigateRoute(authRole === HEALTHCARE_ROLE ? '/doctor-dashboard' : '/login');
    }
  }, [routePath, authRole]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(savedResultKey);
      if (saved) setResult(JSON.parse(saved) as RiskResult);
    } catch (error) {
      console.error('Unable to load the saved Women360 screening result.', error);
      setResultSaveError(true);
    }
  }, []);

  // Scroll to top upon view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
    document.title = lang === 'en'
      ? 'Women360 - Women’s Health Screening'
      : 'Women360 - మహిళల ఆరోగ్య స్క్రీనింగ్';
  }, [lang]);

  // Handle option selection in screening
  const handleAnswerSelect = (
    questionId: number,
    value: string,
    points: number,
    optionIndex: number
  ) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: { value, points, optionIndex },
    }));
  };

  // Calculate score and evaluate risk
  const calculateResult = (): RiskResult => {
    let totalScore = 0;
    const factors: RiskResult['factors'] = [];

    const questions = ageGroup ? SCREENING_BY_AGE[ageGroup] : [];
    type SignalStatus = NonNullable<RiskResult['screeningAssessment']>['categories'][number]['status'];
    const answer = (id: number) => responses[id]?.value ?? '';
    const has = (id: number, values: string[]) => values.includes(answer(id));
    const statusOrder: Record<SignalStatus, number> = {
      low: 0, awareness: 0, discussion: 0, moderate: 1, high: 2,
    };
    const highestStatus = (...statuses: SignalStatus[]): SignalStatus =>
      statuses.reduce((highest, status) =>
        statusOrder[status] > statusOrder[highest] ? status : highest, 'low');
    const category = (
      categoryEn: string,
      categoryTe: string,
      status: SignalStatus,
      messageEn: string,
      messageTe: string,
      nextStepEn?: string,
      nextStepTe?: string,
    ) => ({ categoryEn, categoryTe, status, messageEn, messageTe, nextStepEn, nextStepTe });
    const heightId = ageGroup === '10-19' ? 26 : 111;
    const weightId = ageGroup === '10-19' ? 27 : 112;
    const heightCm = Number(answer(heightId));
    const weightKg = Number(answer(weightId));
    const bmiValue = heightCm > 0 && weightKg > 0
      ? weightKg / ((heightCm / 100) ** 2)
      : undefined;
    const responseFactors: RiskResult['factors'] = questions.flatMap((question) => {
      if (question.subQuestions?.length) {
        return question.subQuestions.flatMap((subQuestion) => {
          const subResponse = responses[subQuestion.id];
          if (!subResponse) return [];
          const choice = subQuestion.options.find((option) => option.value === subResponse.value);
          return [{
            titleEn: subQuestion.titleEn,
            titleTe: subQuestion.titleTe,
            responseEn: choice?.labelEn ?? subResponse.value,
            responseTe: choice?.labelTe ?? subResponse.value,
            points: 0,
          }];
        });
      }
      const response = responses[question.id];
      if (!response) return [];
      const values = question.allowMultiple ? response.value.split('|') : [response.value];
      const choices = question.options.filter((option) => values.includes(option.value));
      return [{
        titleEn: question.titleEn,
        titleTe: question.titleTe,
        responseEn: question.inputType
          ? `${response.value} ${question.unitEn ?? ''}`.trim()
          : choices.map((choice) => choice.labelEn).join(', '),
        responseTe: question.inputType
          ? `${response.value} ${question.unitTe ?? ''}`.trim()
          : choices.map((choice) => choice.labelTe).join(', '),
        points: 0,
      }];
    });
    const createSignalResult = (
      tier: RiskTier,
      categories: NonNullable<RiskResult['screeningAssessment']>['categories'],
      pregnancyPath?: 'preconception' | 'pregnancy',
    ): RiskResult => {
      const labels: Record<RiskTier, [string, string]> = {
        lower: ['Low Risk', 'తక్కువ రిస్క్'],
        moderate: ['Moderate Risk', 'మోస్తరు రిస్క్'],
        higher: ['High Risk', 'అధిక రిస్క్'],
      };
      return {
        score: 0,
        maxScore: 0,
        ageGroup: ageGroup ?? 'Not selected',
        tier,
        tierLabelEn: labels[tier][0],
        tierLabelTe: labels[tier][1],
        descriptionEn: 'Your Women360 screening profile suggests areas that may need attention. This is awareness support only, not a diagnosis.',
        descriptionTe: 'మీ Women360 స్క్రీనింగ్ ప్రొఫైల్ దృష్టి అవసరమయ్యే అంశాలను సూచించవచ్చు. ఇది అవగాహన సహాయం మాత్రమే, నిర్ధారణ కాదు.',
        factors: responseFactors,
        screeningAssessment: {
          categories,
          bmi: bmiValue && Number.isFinite(bmiValue) ? Number(bmiValue.toFixed(1)) : undefined,
          pregnancyPath,
        },
        completedAt: new Date().toISOString(),
      };
    };

    if (ageGroup === '10-19') {
      const menstrual = highestStatus(
        has(2, ['frequently-irregular', 'sometimes-skipped', 'sometimes-irregular']) ? 'moderate' : 'low',
        has(3, ['very-severe']) ? 'high' : has(3, ['moderate', 'severe']) ? 'moderate' : 'low',
        has(4, ['very-heavy']) ? 'high' : has(4, ['heavy']) ? 'moderate' : 'low',
      );
      const hygiene: SignalStatus = has(61, ['frequently-delay'])
        ? 'moderate'
        : has(61, ['sometimes-delay']) ? 'awareness' : 'low';
      const irritation: SignalStatus = has(62, ['frequently'])
        ? 'high'
        : has(62, ['sometimes']) ? 'moderate' : 'low';
      const hormonal: SignalStatus = has(5, ['yes']) ? 'moderate' : has(5, ['not-sure']) ? 'awareness' : 'low';
      const nutrition: SignalStatus = has(71, ['rarely']) ? 'moderate' : 'low';
      const activity: SignalStatus = has(72, ['rarely']) ? 'moderate' : has(72, ['sometimes']) ? 'awareness' : 'low';
      const wellbeing: SignalStatus = has(8, ['almost-daily', 'frequently'])
        ? 'moderate'
        : has(8, ['sometimes']) ? 'awareness' : 'low';
      const firstPeriodStatus: SignalStatus = 'awareness';
      const categories = [
        category('Menstrual Health', 'రుతుక్రమ ఆరోగ్యం', highestStatus(menstrual, firstPeriodStatus),
          menstrual === 'low'
            ? 'Your answers do not indicate a menstrual health area for follow-up at this time.'
            : 'Your answers indicate a menstrual health area that may benefit from professional attention, particularly if it persists or affects daily activities.',
          menstrual === 'low'
            ? 'మీ సమాధానాల్లో ప్రస్తుతం తదుపరి పరిశీలన అవసరమయ్యే రుతుక్రమ ఆరోగ్య అంశం కనిపించలేదు.'
            : 'మీ సమాధానాలు నిపుణుల దృష్టి అవసరమయ్యే రుతుక్రమ ఆరోగ్య అంశాన్ని సూచిస్తున్నాయి, ముఖ్యంగా అది కొనసాగితే లేదా దైనందిన పనులను ప్రభావితం చేస్తే.',
          menstrual === 'low' ? undefined : 'Discuss persistent or disruptive symptoms with a qualified healthcare professional.',
          menstrual === 'low' ? undefined : 'లక్షణాలు కొనసాగితే లేదా దైనందిన పనులను ప్రభావితం చేస్తే అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'),
        category('Menstrual Hygiene', 'రుతుస్రావ పరిశుభ్రత', highestStatus(hygiene, irritation),
          irritation === 'high'
            ? 'Frequent unusual irritation, itching, burning or discharge may need professional attention.'
            : hygiene === 'low' && irritation === 'low'
              ? 'No menstrual hygiene or irritation concern was selected.'
              : 'Your answers flag menstrual-product changing practices or occasional irritation for review.',
          irritation === 'high'
            ? 'తరచుగా అసాధారణ చికాకు, దురద, మంట లేదా స్రావం ఉంటే నిపుణుల దృష్టి అవసరం కావచ్చు.'
            : hygiene === 'low' && irritation === 'low'
              ? 'రుతుస్రావ పరిశుభ్రత లేదా చికాకు సంబంధిత ఆందోళన ఎంపిక కాలేదు.'
              : 'మీ సమాధానాలు రుతుస్రావ ఉత్పత్తి మార్చే అలవాట్లు లేదా అప్పుడప్పుడు వచ్చే చికాకును పరిశీలించాల్సిన అంశంగా సూచిస్తున్నాయి.',
          irritation !== 'low' ? 'Discuss persistent symptoms with a qualified healthcare professional.' : undefined,
          irritation !== 'low' ? 'కొనసాగే లక్షణాల గురించి అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.' : undefined),
        category('PMOS/PCOS-related signals', 'PMOS/PCOS సంబంధిత సంకేతాలు', hormonal,
          hormonal === 'low' ? 'No listed PMOS/PCOS-related signal was selected.' : 'A reported symptom is a signal for awareness only and does not diagnose PMOS/PCOS.',
          hormonal === 'low' ? 'జాబితాలోని PMOS/PCOS సంబంధిత సంకేతం ఎంపిక కాలేదు.' : 'తెలిపిన లక్షణం అవగాహన కోసం మాత్రమే; ఇది PMOS/PCOS నిర్ధారణ కాదు.',
          hormonal === 'low' ? undefined : 'If this change persists or concerns you, discuss it with a qualified healthcare professional.',
          hormonal === 'low' ? undefined : 'ఈ మార్పు కొనసాగితే లేదా ఆందోళన కలిగిస్తే అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'),
        category('Diet & Nutrition', 'ఆహారం & పోషకాహారం', nutrition,
          nutrition === 'low' ? 'Your reported food variety is not flagged for additional awareness.' : 'Consider a varied, balanced diet. Avoid restrictive eating, fasting for weight loss or body-shape goals.',
          nutrition === 'low' ? 'మీరు తెలిపిన ఆహార వైవిధ్యం అదనపు అవగాహన అవసరంగా సూచించబడలేదు.' : 'వైవిధ్యమైన, సమతుల్య ఆహారాన్ని పరిగణించండి. పరిమిత ఆహారం, బరువు తగ్గడానికి ఉపవాసం లేదా శరీర ఆకృతి లక్ష్యాలను నివారించండి.'),
        category('Lifestyle & Physical Activity', 'జీవనశైలి & శారీరక చురుకుదనం', activity,
          activity === 'low' ? 'Your reported activity is not flagged for additional awareness.' : 'Consider manageable, supportive physical activity as part of general wellbeing; avoid extreme exercise goals.',
          activity === 'low' ? 'మీరు తెలిపిన శారీరక చురుకుదనం అదనపు అవగాహన అవసరంగా సూచించబడలేదు.' : 'సాధారణ శ్రేయస్సు కోసం సాధ్యమైన, సహాయక శారీరక చురుకుదనాన్ని పరిగణించండి; అతిగా వ్యాయామ లక్ష్యాలను నివారించండి.'),
        category('Stress & Wellbeing', 'ఒత్తిడి & శ్రేయస్సు', wellbeing,
          wellbeing === 'low' ? 'Your answers do not indicate frequent recent stress.' : 'You reported recent stress. Consider talking with a trusted person and seeking professional support if it persists or affects daily life.',
          wellbeing === 'low' ? 'ఇటీవల తరచుగా ఒత్తిడి ఉన్నట్లు మీ సమాధానాలు సూచించలేదు.' : 'ఇటీవల ఒత్తిడి ఉందని తెలిపారు. అది కొనసాగితే లేదా దైనందిన జీవితాన్ని ప్రభావితం చేస్తే నమ్మకమైన వ్యక్తితో మాట్లాడి, నిపుణుల సహాయం పొందండి.',
          wellbeing === 'low' ? undefined : 'Your wellbeing may benefit from support. Consider talking with a trusted adult, parent/guardian, school/college counsellor, or qualified healthcare professional.',
          wellbeing === 'low' ? undefined : 'మీ శ్రేయస్సుకు సహాయం ఉపయోగకరంగా ఉండవచ్చు. నమ్మకమైన పెద్దవారు, తల్లిదండ్రులు/సంరక్షకులు, పాఠశాల/కళాశాల కౌన్సిలర్ లేదా అర్హత కలిగిన ఆరోగ్య నిపుణుడితో మాట్లాడండి.'),
        category('Basic Measurements', 'ప్రాథమిక కొలతలు', 'awareness',
          'BMI is shown as a measurement only. For adolescents, it should be interpreted using age- and sex-specific growth references by a qualified healthcare professional.',
          'BMI కొలతగా మాత్రమే చూపబడుతుంది. కౌమార వయస్సులో దీనిని అర్హత కలిగిన ఆరోగ్య నిపుణుడు వయస్సు మరియు లింగానికి తగిన వృద్ధి సూచనలతో అర్థం చేసుకోవాలి.'),
      ];
      const tierStatuses = [menstrual, hygiene, irritation, hormonal, nutrition, activity, wellbeing];
      const tier: RiskTier = tierStatuses.includes('high')
        ? 'higher'
        : tierStatuses.includes('moderate') ? 'moderate' : 'lower';
      return createSignalResult(tier, categories);
    }

    if (ageGroup === '20-29') {
      const cycle: SignalStatus = has(101, ['under-21', 'over-35']) ? 'moderate' : 'low';
      const duration: SignalStatus = has(102, ['over-7']) ? 'moderate' : 'low';
      const bleeding: SignalStatus = has(103, ['often']) ? 'high' : has(103, ['sometimes']) ? 'moderate' : 'low';
      const pain: SignalStatus = has(104, ['a-lot']) ? 'high' : has(104, ['moderately']) ? 'moderate' : 'low';
      const hormonal: SignalStatus = has(105, ['yes']) ? 'moderate' : has(105, ['not-sure']) ? 'awareness' : 'low';
      const anaemia: SignalStatus = has(106, ['often']) ? 'high' : has(106, ['sometimes']) ? 'moderate' : 'low';
      const healthHistory: SignalStatus = has(107, ['yes']) ? 'awareness' : has(107, ['not-sure']) ? 'awareness' : 'low';
      const reproductive: SignalStatus = 'awareness';
      const categories = [
        category('Menstrual Health', 'రుతుక్రమ ఆరోగ్యం', highestStatus(cycle, duration, bleeding, pain),
          'Cycle pattern, period duration, bleeding and impact of pain are summarized for awareness; persistent or disruptive symptoms may need professional evaluation.',
          'సైకిల్ విధానం, పీరియడ్ వ్యవధి, రక్తస్రావం మరియు నొప్పి ప్రభావం అవగాహన కోసం సారాంశం చేయబడ్డాయి; కొనసాగే లేదా అంతరాయం కలిగించే లక్షణాలకు నిపుణుల పరిశీలన అవసరం కావచ్చు.',
          highestStatus(cycle, duration, bleeding, pain) === 'low' ? undefined : 'Discuss persistent or disruptive symptoms with a qualified healthcare professional.',
          highestStatus(cycle, duration, bleeding, pain) === 'low' ? undefined : 'కొనసాగే లేదా అంతరాయం కలిగించే లక్షణాల గురించి అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'),
        category('PMOS (formerly known as PCOS)-related signals', 'PMOS (గతంలో PCOSగా పిలిచేవారు) సంబంధిత సంకేతాలు', hormonal,
          hormonal === 'low' ? 'No listed PMOS-related signal was selected.' : 'Reported symptoms are awareness signals only and do not diagnose PMOS/PCOS.',
          hormonal === 'low' ? 'జాబితాలోని PMOS సంబంధిత సంకేతం ఎంపిక కాలేదు.' : 'తెలిపిన లక్షణాలు అవగాహన సంకేతాలు మాత్రమే; PMOS/PCOS నిర్ధారణ కాదు.',
          hormonal === 'low' ? undefined : 'Discuss persistent symptoms or concerns with a qualified healthcare professional.',
          hormonal === 'low' ? undefined : 'కొనసాగే లక్షణాలు లేదా ఆందోళనలను అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'),
        category('Anaemia-related awareness signal', 'రక్తహీనత సంబంధిత అవగాహన సంకేతం', anaemia,
          anaemia === 'low' ? 'No frequent symptom signal was selected; symptoms alone cannot confirm or rule out anaemia.' : 'Reported symptoms may warrant professional attention; they do not confirm anaemia.',
          anaemia === 'low' ? 'తరచుగా వచ్చే లక్షణ సంకేతం ఎంపిక కాలేదు; లక్షణాలు మాత్రమే రక్తహీనతను నిర్ధారించలేవు లేదా లేదని చెప్పలేవు.' : 'తెలిపిన లక్షణాలకు నిపుణుల దృష్టి అవసరం కావచ్చు; అవి రక్తహీనతను నిర్ధారించవు.',
          anaemia === 'low' ? undefined : 'Discuss persistent fatigue, weakness, dizziness, or breathlessness with a qualified healthcare professional.',
          anaemia === 'low' ? undefined : 'కొనసాగే అలసట, బలహీనత, తలతిరగడం లేదా ఊపిరి ఇబ్బందిని అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'),
        category('Health History', 'ఆరోగ్య చరిత్ర', healthHistory,
          has(107, ['yes']) ? 'You reported a health condition requiring regular monitoring. Continue regular follow-up with your healthcare professional.' : 'This response is included for health-history awareness only.',
          has(107, ['yes']) ? 'క్రమం తప్పకుండా పర్యవేక్షించాల్సిన ఆరోగ్య పరిస్థితి ఉందని తెలిపారు. మీ ఆరోగ్య నిపుణుడితో క్రమం తప్పకుండా ఫాలో-అప్ కొనసాగించండి.' : 'ఈ సమాధానం ఆరోగ్య చరిత్ర అవగాహన కోసం మాత్రమే చేర్చబడింది.',
          has(107, ['yes']) ? 'Please continue regular follow-up with your healthcare professional.' : undefined,
          has(107, ['yes']) ? 'దయచేసి మీ ఆరోగ్య నిపుణుడితో క్రమం తప్పకుండా ఫాలో-అప్ కొనసాగించండి.' : undefined),
        category('Reproductive & Preconception Health', 'ప్రజనన & గర్భధారణకు ముందు ఆరోగ్యం', reproductive,
          'Your response identifies the appropriate awareness pathway; it is not a pregnancy screening.',
          'మీ సమాధానం తగిన అవగాహన మార్గాన్ని సూచిస్తుంది; ఇది గర్భధారణ స్క్రీనింగ్ కాదు.'),
        category('Basic Measurements', 'ప్రాథమిక కొలతలు', 'awareness',
          'BMI is an informational measurement only and does not determine the screening result.',
          'BMI సమాచార కొలత మాత్రమే; ఇది స్క్రీనింగ్ ఫలితాన్ని నిర్ణయించదు.'),
      ];
      let pregnancyPath: 'preconception' | 'pregnancy' | undefined;
      if (has(108, ['planning-pregnancy'])) {
        pregnancyPath = 'preconception';
        categories[4] = category('Preconception Health', 'గర్భధారణకు ముందు ఆరోగ్యం', 'awareness',
          'Preconception care can help identify health needs before pregnancy. Consider discussing your health, medicines, nutrition, vaccinations and existing conditions with a qualified healthcare professional.',
          'గర్భధారణకు ముందు సంరక్షణ ఆరోగ్య అవసరాలను గుర్తించడంలో సహాయపడుతుంది. మీ ఆరోగ్యం, మందులు, పోషకాహారం, టీకాలు మరియు ఇప్పటికే ఉన్న పరిస్థితుల గురించి అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.');
      } else if (has(108, ['currently-pregnant'])) {
        pregnancyPath = 'pregnancy';
        categories[4] = category('Pregnancy Care Pathway', 'గర్భధారణ సంరక్షణ మార్గం', 'awareness',
          'Pregnancy has a different healthcare pathway. Please use pregnancy-specific care with a qualified healthcare professional.',
          'గర్భధారణకు ప్రత్యేక ఆరోగ్య సంరక్షణ మార్గం ఉంటుంది. అర్హత కలిగిన ఆరోగ్య నిపుణుడి ద్వారా గర్భధారణకు సంబంధించిన సంరక్షణ పొందండి.');
      }
      const tierStatuses = [cycle, duration, bleeding, pain, hormonal, anaemia];
      const tier: RiskTier = tierStatuses.includes('high')
        ? 'higher'
        : tierStatuses.includes('moderate') ? 'moderate' : 'lower';
      return createSignalResult(tier, categories, pregnancyPath);
    }

    if (ageGroup === '20-29') {
      const answer = (id: number) => responses[100 + id]?.value;
      type SignalStatus = NonNullable<RiskResult['screeningAssessment']>['categories'][number]['status'];
      const statusFor = (id: number, moderate: string[] = [], high: string[] = [], discussion: string[] = [], awareness: string[] = []): SignalStatus => {
        const value = answer(id);
        if (value && high.includes(value)) return 'high';
        if (value && moderate.includes(value)) return 'moderate';
        if (value && discussion.includes(value)) return 'discussion';
        if (value && awareness.includes(value)) return 'awareness';
        return 'low';
      };
      const priority: Record<SignalStatus, number> = {
        low: 0, awareness: 0, discussion: 0, moderate: 1, high: 2,
      };
      const worst = (...statuses: SignalStatus[]): SignalStatus =>
        statuses.reduce((current, status) => priority[status] > priority[current] ? status : current, 'low');
      const statusMessage = (status: SignalStatus, areaEn: string, areaTe: string) => {
        const copy: Record<SignalStatus, [string, string, string?, string?]> = {
          low: ['No higher-priority awareness signal was selected in this area.', 'ఈ అంశంలో అధిక ప్రాధాన్యత గల అవగాహన సంకేతం ఎంపిక కాలేదు.'],
          awareness: ['This response is for awareness only and does not assign a risk level.', 'ఈ సమాధానం అవగాహన కోసం మాత్రమే; రిస్క్ స్థాయిని కేటాయించదు.'],
          discussion: ['This response is flagged for professional discussion; it is not a diagnosis.', 'ఈ సమాధానం నిపుణుడితో చర్చించాల్సిన అంశంగా సూచించబడింది; ఇది వైద్య నిర్ధారణ కాదు.', 'Discuss this with a qualified healthcare professional.', 'దీనిని అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'],
          moderate: ['Your response indicates a moderate awareness signal in this area.', 'ఈ అంశంలో మీ సమాధానం మోస్తరు అవగాహన సంకేతాన్ని సూచిస్తుంది.', 'Discuss persistent or concerning symptoms with a qualified healthcare professional.', 'లక్షణాలు కొనసాగితే లేదా ఆందోళన కలిగిస్తే అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'],
          high: ['Your response indicates a signal in this area that should be discussed with a healthcare professional.', 'ఈ అంశంలో మీ సమాధానం ఆరోగ్య నిపుణుడితో చర్చించాల్సిన సంకేతాన్ని సూచిస్తుంది.', 'Please discuss this with a qualified healthcare professional.', 'దీనిని అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.'],
        };
        const [messageEn, messageTe, nextStepEn, nextStepTe] = copy[status];
        return { categoryEn: areaEn, categoryTe: areaTe, status, messageEn, messageTe, nextStepEn, nextStepTe };
      };
      const menstrualStatus = worst(
        statusFor(1, ['under-21', 'over-35', 'varies'], [], ['no-periods']),
        statusFor(2, ['over-7']),
        statusFor(3, ['sometimes'], ['often']),
        statusFor(4, ['moderately'], ['a-lot', 'extremely']),
      );
      const categories: NonNullable<RiskResult['screeningAssessment']>['categories'] = [
        statusMessage(menstrualStatus, 'Menstrual Health', 'రుతుక్రమ ఆరోగ్యం'),
        statusMessage(statusFor(5, ['yes'], [], [], ['not-sure', 'prefer-not']), 'PMOS (formerly known as PCOS)-related Signals', 'PMOS (గతంలో PCOSగా పిలిచేవారు) సంబంధిత సంకేతాలు'),
        statusMessage(statusFor(6, ['often', 'very-often']), 'Anaemia-related Awareness', 'రక్తహీనత సంబంధిత అవగాహన'),
        statusMessage(statusFor(7, ['sometimes', 'rarely'], [], [], ['not-sure']), 'Nutrition', 'పోషకాహారం'),
        statusMessage(statusFor(8, ['1-2-days', 'rarely'], [], [], ['not-sure']), 'Physical Activity', 'శారీరక చురుకుదనం'),
        statusMessage(statusFor(9, ['often', 'very-often'], [], [], ['prefer-not']), 'Emotional Wellbeing', 'మానసిక శ్రేయస్సు'),
        statusMessage('awareness', 'Basic Measurements', 'ప్రాథమిక కొలతలు'),
      ];
      const heightCm = Number(answer(11));
      const weightKg = Number(answer(12));
      const bmi = weightKg / ((heightCm / 100) ** 2);
      const pregnancyChoice = answer(10);
      const pregnancyPath = pregnancyChoice === 'planning-pregnancy'
        ? 'preconception'
        : pregnancyChoice === 'currently-pregnant'
          ? 'pregnancy'
          : undefined;
      if (pregnancyPath === 'preconception') {
        categories.push({
          categoryEn: 'Preconception Awareness',
          categoryTe: 'గర్భధారణకు ముందు అవగాహన',
          status: 'awareness',
          messageEn: 'You indicated that you are planning pregnancy.',
          messageTe: 'మీరు గర్భధారణను ప్లాన్ చేస్తున్నట్లు తెలిపారు.',
          nextStepEn: 'Discuss preconception care with a qualified healthcare professional.',
          nextStepTe: 'గర్భధారణకు ముందు సంరక్షణ గురించి అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.',
        });
      } else if (pregnancyPath === 'pregnancy') {
        categories.push({
          categoryEn: 'Pregnancy Care Pathway',
          categoryTe: 'గర్భధారణ సంరక్షణ మార్గం',
          status: 'awareness',
          messageEn: 'Pregnancy has a different healthcare pathway.',
          messageTe: 'గర్భధారణకు ప్రత్యేక ఆరోగ్య సంరక్షణ మార్గం ఉంటుంది.',
          nextStepEn: 'Please use pregnancy-specific care with a qualified healthcare professional.',
          nextStepTe: 'అర్హత కలిగిన ఆరోగ్య నిపుణుడి ద్వారా గర్భధారణకు సంబంధించిన ప్రత్యేక సంరక్షణ పొందండి.',
        });
      }
      const overallStatus = worst(
        statusFor(1, ['under-21', 'over-35', 'varies']),
        statusFor(2, ['over-7']),
        statusFor(3, ['sometimes'], ['often']),
        statusFor(4, ['moderately'], ['a-lot', 'extremely']),
        statusFor(5, ['yes']),
        statusFor(6, ['often', 'very-often']),
        statusFor(7, ['sometimes', 'rarely']),
        statusFor(8, ['1-2-days', 'rarely']),
        statusFor(9, ['often', 'very-often']),
      );
      const tier: RiskTier = overallStatus === 'high' ? 'higher' : overallStatus === 'moderate' ? 'moderate' : 'lower';
      return {
        score: 0,
        maxScore: 0,
        ageGroup,
        tier,
        tierLabelEn: tier === 'higher' ? 'High Risk' : tier === 'moderate' ? 'Moderate Risk' : 'Low Risk',
        tierLabelTe: tier === 'higher' ? 'అధిక రిస్క్' : tier === 'moderate' ? 'మోస్తరు రిస్క్' : 'తక్కువ రిస్క్',
        descriptionEn: 'Screening awareness signals only; not a diagnosis.',
        descriptionTe: 'ఇవి స్క్రీనింగ్ అవగాహన సంకేతాలు మాత్రమే; వైద్య నిర్ధారణ కాదు.',
        factors: questions.filter((question) => responses[question.id]).map((question) => {
          const response = responses[question.id];
          const selectedOption = question.options.find((option) => option.value === response.value);
          return {
            titleEn: question.titleEn,
            titleTe: question.titleTe,
            responseEn: selectedOption?.labelEn ?? `${response.value} ${question.unitEn ?? ''}`.trim(),
            responseTe: selectedOption?.labelTe ?? `${response.value} ${question.unitTe ?? ''}`.trim(),
            points: 0,
          };
        }),
        screeningAssessment: {
          categories,
          bmi: Number.isFinite(bmi) ? Number(bmi.toFixed(1)) : undefined,
          pregnancyPath,
        },
      };
    }

    if (ageGroup === '10-19') {
      type SignalStatus = NonNullable<RiskResult['screeningAssessment']>['categories'][number]['status'];
      const value = (id: number) => responses[id]?.value ?? '';
      const selected = (id: number, choices: string[]) => choices.includes(value(id));
      const countSelected = (ids: number[], choices: string[]) =>
        ids.filter((id) => selected(id, choices)).length;
      const statusForConcernCount = (count: number, moderateAt: number, highAt: number): SignalStatus =>
        count >= highAt ? 'high' : count >= moderateAt ? 'moderate' : 'low';
      const menstrualStatus: SignalStatus = [
        selected(2, ['frequently-irregular', 'sometimes-skipped']),
        selected(3, ['severe', 'very-severe']),
        selected(4, ['over-7-days']),
        selected(5, ['very-heavy']),
      ].filter(Boolean).length >= 2
        ? 'high'
        : [
            selected(2, ['sometimes-irregular']),
            selected(3, ['moderate']),
            selected(4, ['6-7-days']),
            selected(5, ['heavy']),
          ].some(Boolean) || selected(2, ['frequently-irregular', 'sometimes-skipped']) ||
            selected(3, ['severe', 'very-severe']) || selected(4, ['over-7-days']) ||
            selected(5, ['very-heavy'])
          ? 'moderate'
          : 'low';

      const hormonalConcernCount = countSelected([6, 7, 8, 9], ['yes']);
      const hormonalStatus: SignalStatus = hormonalConcernCount >= 3
        ? 'high'
        : hormonalConcernCount >= 2
          ? 'moderate'
          : hormonalConcernCount === 1 ? 'discussion' : 'low';
      const lifestyleConcernCount = [
        selected(11, ['sometimes-skip', 'frequently-skip', 'irregular']),
        selected(12, ['1-3-days', 'rarely']),
        selected(13, ['1-3-days', 'rarely']),
        selected(14, ['3-5-times', 'almost-daily']),
        selected(15, ['rarely']),
        selected(16, ['frequently-irregular']),
        selected(17, ['under-4']),
      ].filter(Boolean).length;
      const lifestyleStatus = statusForConcernCount(lifestyleConcernCount, 2, 4);
      const hygieneSymptoms = selected(22, ['sometimes', 'frequently']);
      const hygienePracticeConcern = selected(18, ['sometimes-delay', 'frequently-delay']) ||
        selected(20, ['sometimes', 'rarely']) || selected(21, ['unwrapped']);
      const hygieneStatus: SignalStatus = hygieneSymptoms
        ? 'discussion'
        : hygienePracticeConcern ? 'awareness' : 'low';
      const stressConcern = selected(23, ['frequently', 'almost-daily']);
      const copingConcern = selected(25, ['nothing-specific']);
      const stressStatus: SignalStatus = stressConcern ? 'moderate' : 'low';
      const category = (
        categoryEn: string,
        categoryTe: string,
        status: SignalStatus,
        messageEn: string,
        messageTe: string,
        nextStepEn?: string,
        nextStepTe?: string,
      ) => ({ categoryEn, categoryTe, status, messageEn, messageTe, nextStepEn, nextStepTe });

      const categories: NonNullable<RiskResult['screeningAssessment']>['categories'] = [
        category(
          'Menstrual Health',
          'రుతుక్రమ ఆరోగ్యం',
          menstrualStatus,
          menstrualStatus === 'low'
            ? 'No higher-priority menstrual health signal was selected in your answers.'
            : 'Your answers include menstrual symptoms worth discussing with a qualified healthcare professional, especially if they persist or affect daily activities.',
          menstrualStatus === 'low'
            ? 'మీ సమాధానాల్లో అధిక ప్రాధాన్యత గల రుతుక్రమ ఆరోగ్య సంకేతం ఎంపిక కాలేదు.'
            : 'మీ సమాధానాల్లో అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించదగిన రుతుక్రమ లక్షణాలు ఉన్నాయి, ముఖ్యంగా అవి కొనసాగితే లేదా రోజువారీ పనులను ప్రభావితం చేస్తే.',
          menstrualStatus === 'low' ? undefined : 'Discuss persistent or disruptive symptoms with a qualified healthcare professional.',
          menstrualStatus === 'low' ? undefined : 'లక్షణాలు కొనసాగితే లేదా రోజువారీ పనులను ప్రభావితం చేస్తే అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.',
        ),
        category(
          'PMOS/PCOS & Hormonal Signals',
          'PMOS/PCOS & హార్మోన్ల సంకేతాలు',
          hormonalStatus,
          hormonalConcernCount === 0
            ? 'No listed hormonal signal was selected. Family history is recorded for awareness only and does not raise this category.'
            : `${hormonalConcernCount} listed hormonal signal${hormonalConcernCount === 1 ? '' : 's'} selected. These answers do not diagnose PMOS/PCOS.`,
          hormonalConcernCount === 0
            ? 'జాబితాలోని హార్మోన్ల సంకేతాలు ఎంపిక కాలేదు. కుటుంబ చరిత్ర అవగాహన కోసం మాత్రమే నమోదు చేయబడుతుంది; ఈ విభాగ స్థాయిని పెంచదు.'
            : `${hormonalConcernCount} హార్మోన్ల సంకేతాలు ఎంపికయ్యాయి. ఈ సమాధానాలు PMOS/PCOSని నిర్ధారించవు.`,
          hormonalConcernCount > 0 ? 'If these changes persist or concern you, discuss them with a qualified healthcare professional.' : undefined,
          hormonalConcernCount > 0 ? 'ఈ మార్పులు కొనసాగితే లేదా ఆందోళన కలిగిస్తే అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.' : undefined,
        ),
        category(
          'Diet & Lifestyle',
          'ఆహారం & జీవనశైలి',
          lifestyleStatus,
          lifestyleConcernCount === 0
            ? 'No listed diet or lifestyle awareness signals were selected.'
            : `${lifestyleConcernCount} diet or lifestyle ${lifestyleConcernCount === 1 ? 'area was' : 'areas were'} selected for awareness; focus on practical, supportive habits rather than restrictive changes.`,
          lifestyleConcernCount === 0
            ? 'జాబితాలోని ఆహారం లేదా జీవనశైలి అవగాహన సంకేతాలు ఎంపిక కాలేదు.'
            : `${lifestyleConcernCount} ఆహారం లేదా జీవనశైలి అంశాలు అవగాహన కోసం ఎంపికయ్యాయి; కఠినమైన మార్పులకంటే సాధ్యమైన, సహాయక అలవాట్లపై దృష్టి పెట్టండి.`,
        ),
        category(
          'Menstrual Hygiene',
          'రుతుస్రావ పరిశుభ్రత',
          hygieneStatus,
          hygieneSymptoms
            ? 'You reported itching, burning, unusual discharge, or persistent irritation. A healthcare professional can advise on these symptoms.'
            : hygienePracticeConcern
              ? 'Your answers suggest a menstrual-product routine or hygiene topic to review. Follow product instructions and seek professional advice for symptoms or concerns.'
              : 'No unusual irritation, discharge, or menstrual-hygiene practice signal was selected.',
          hygieneStatus === 'discussion'
            ? 'దురద, మంట, అసాధారణ స్రావం లేదా నిరంతర చికాకును మీరు తెలిపారు. ఈ లక్షణాలపై ఆరోగ్య నిపుణుడు సలహా ఇవ్వగలరు.'
            : hygienePracticeConcern
              ? 'మీ సమాధానాలు రుతుస్రావ ఉత్పత్తి వినియోగం లేదా పరిశుభ్రతకు సంబంధించిన అంశాన్ని సూచిస్తున్నాయి. ఉత్పత్తి సూచనలను పాటించండి; లక్షణాలు లేదా సందేహాలు ఉంటే నిపుణుడి సలహా పొందండి.'
              : 'అసాధారణ చికాకు, స్రావం లేదా రుతుస్రావ పరిశుభ్రత సంకేతం ఎంపిక కాలేదు.',
          hygieneStatus === 'discussion' ? 'Please discuss persistent symptoms with a qualified healthcare professional.' : undefined,
          hygieneStatus === 'discussion' ? 'లక్షణాలు కొనసాగితే అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.' : undefined,
        ),
        category(
          'Stress & Wellbeing',
          'ఒత్తిడి & శ్రేయస్సు',
          stressStatus,
          stressConcern
            ? 'You reported frequent recent stress. Consider supportive coping strategies and talking with a trusted person; seek professional support if needed.'
            : 'Your answers did not indicate frequent recent stress.',
          stressConcern
            ? 'ఇటీవల తరచుగా ఒత్తిడి ఉందని తెలిపారు. సహాయక పద్ధతులను ప్రయత్నించండి, నమ్మకమైన వ్యక్తితో మాట్లాడండి; అవసరమైతే నిపుణుల సహాయం పొందండి.'
            : 'మీ సమాధానాల్లో ఇటీవల తరచుగా ఒత్తిడి ఉన్నట్లు సూచించలేదు.',
          stressConcern
            ? copingConcern
              ? 'Try a supportive coping activity and talk with someone you trust; consider professional support if the stress continues.'
              : 'Continue using supportive coping strategies and reach out for help if stress continues or affects daily life.'
            : undefined,
          stressConcern
            ? copingConcern
              ? 'సహాయక ఒత్తిడి-నిర్వహణ పద్ధతిని ప్రయత్నించండి, నమ్మకమైన వ్యక్తితో మాట్లాడండి; ఒత్తిడి కొనసాగితే నిపుణుల సహాయం పరిగణించండి.'
              : 'సహాయక పద్ధతులను కొనసాగించండి; ఒత్తిడి కొనసాగితే లేదా రోజువారీ పనులను ప్రభావితం చేస్తే సహాయం పొందండి.'
            : undefined,
        ),
        category(
          'Basic Measurements',
          'ప్రాథమిక కొలతలు',
          'awareness',
          'Height and weight are shown for information only. Adolescent BMI needs age- and sex-specific growth-chart interpretation and does not affect your result.',
          'ఎత్తు మరియు బరువు సమాచారానికి మాత్రమే చూపబడతాయి. కౌమార BMIకి వయస్సు మరియు లింగానికి తగిన వృద్ధి చార్ట్‌లతో అర్థం చేసుకోవాలి; ఇది మీ ఫలితాన్ని ప్రభావితం చేయదు.',
        ),
      ];
      const tierStatuses = [menstrualStatus, hormonalStatus, lifestyleStatus, stressStatus];
      const tier: RiskTier = tierStatuses.includes('high')
        ? 'higher'
        : tierStatuses.includes('moderate')
          ? 'moderate'
          : 'lower';
      const heightCm = Number(value(26));
      const weightKg = Number(value(27));
      const bmi = heightCm > 0 && weightKg > 0
        ? weightKg / ((heightCm / 100) ** 2)
        : undefined;
      const factors: RiskResult['factors'] = questions.flatMap((question) => {
        const response = responses[question.id];
        if (!response) return [];
        const optionValues = question.allowMultiple ? response.value.split('|') : [response.value];
        const selectedOptions = question.options.filter((option) => optionValues.includes(option.value));
        return [{
          titleEn: question.titleEn,
          titleTe: question.titleTe,
          responseEn: question.inputType
            ? `${response.value} ${question.unitEn ?? ''}`.trim()
            : selectedOptions.map((option) => option.labelEn).join(', '),
          responseTe: question.inputType
            ? `${response.value} ${question.unitTe ?? ''}`.trim()
            : selectedOptions.map((option) => option.labelTe).join(', '),
          points: 0,
        }];
      });
      const labels: Record<RiskTier, [string, string]> = {
        lower: ['Low Risk', 'తక్కువ రిస్క్'],
        moderate: ['Moderate Risk', 'మోస్తరు రిస్క్'],
        higher: ['High Risk', 'అధిక రిస్క్'],
      };
      return {
        score: 0,
        maxScore: 0,
        ageGroup,
        tier,
        tierLabelEn: labels[tier][0],
        tierLabelTe: labels[tier][1],
        descriptionEn: 'Category-based screening signals only; not a medical diagnosis. BMI and family history do not determine this result.',
        descriptionTe: 'విభాగాల ఆధారిత స్క్రీనింగ్ సంకేతాలు మాత్రమే; వైద్య నిర్ధారణ కాదు. BMI మరియు కుటుంబ చరిత్ర ఈ ఫలితాన్ని నిర్ణయించవు.',
        factors,
        screeningAssessment: {
          categories,
          bmi: bmi && Number.isFinite(bmi) ? Number(bmi.toFixed(1)) : undefined,
        },
      };
    }

    questions.forEach((q) => {
      const resp = responses[q.id];
      if (resp) {
        totalScore += resp.points;
        const selectedOptions = q.allowMultiple
          ? resp.value.split('|').flatMap((value) => q.options.filter((option) => option.value === value))
          : [];
        const opt = q.options[resp.optionIndex] || q.options.find((o) => o.value === resp.value);
        const responseEn = q.allowMultiple
          ? selectedOptions.map((option) => option.labelEn).join(', ')
          : opt
            ? `${opt.labelEn} (${opt.subEn || ''})`
            : resp.value;
        const responseTe = q.allowMultiple
          ? selectedOptions.map((option) => option.labelTe).join(', ')
          : opt
            ? `${opt.labelTe} (${opt.subTe || ''})`
            : q.unitEn && q.unitTe
              ? `${resp.value} ${q.unitEn}`
              : resp.value;
        factors.push({
          titleEn: q.titleEn,
          titleTe: q.titleTe,
          responseEn: q.unitEn ? `${resp.value} ${q.unitEn}` : responseEn,
          responseTe: q.unitTe ? `${resp.value} ${q.unitTe}` : responseTe,
          points: resp.points,
        });
      }
    });

    let tier: RiskTier = 'lower';
    let tierLabelEn = t.result.riskBadge.lower;
    let tierLabelTe = TRANSLATIONS.te.result.riskBadge.lower;
    let descEn = t.result.tierExpl.lower;
    let descTe = TRANSLATIONS.te.result.tierExpl.lower;

    const maxScore = questions.reduce((sum, q) => sum + Math.max(0, ...q.options.map((o) => o.points)), 0);
    const moderateThreshold = Math.max(2, Math.ceil(maxScore * 0.35));
    const higherThreshold = Math.max(moderateThreshold + 1, Math.ceil(maxScore * 0.65));

    if (totalScore >= higherThreshold) {
      tier = 'higher';
      tierLabelEn = t.result.riskBadge.higher;
      tierLabelTe = TRANSLATIONS.te.result.riskBadge.higher;
      descEn = t.result.tierExpl.higher;
      descTe = TRANSLATIONS.te.result.tierExpl.higher;
    } else if (totalScore >= moderateThreshold) {
      tier = 'moderate';
      tierLabelEn = t.result.riskBadge.moderate;
      tierLabelTe = TRANSLATIONS.te.result.riskBadge.moderate;
      descEn = t.result.tierExpl.moderate;
      descTe = TRANSLATIONS.te.result.tierExpl.moderate;
    }

    return {
      score: totalScore,
      maxScore,
      ageGroup: ageGroup || 'Not selected',
      tier,
      tierLabelEn,
      tierLabelTe,
      descriptionEn: descEn,
      descriptionTe: descTe,
      factors,
    };
  };

  const handleScreeningComplete = (participantDetails: ScreeningParticipantDetails) => {
    const computed = { ...calculateResult(), completedAt: new Date().toISOString() };
    setResult(computed);
    setResultSaveError(false);
    try {
      window.localStorage.setItem(savedResultKey, JSON.stringify(computed));
    } catch (error) {
      console.error('Unable to save the Women360 screening result on this device.', error);
      setResultSaveError(true);
    }

    if (ageGroup === '10-19' || ageGroup === '20-29') {
      const questions = SCREENING_BY_AGE[ageGroup];
      const answers: ScreeningAnswer[] = questions.flatMap((question) => {
        const definitions = question.subQuestions?.length
          ? question.subQuestions.map((subQuestion) => ({
              id: subQuestion.id,
              questionEn: subQuestion.titleEn,
              questionTe: subQuestion.titleTe,
              options: subQuestion.options,
            }))
          : [{
              id: question.id,
              questionEn: question.titleEn,
              questionTe: question.titleTe,
              options: question.options,
            }];
        return definitions.flatMap((definition) => {
          const answer = responses[definition.id];
          if (!answer) return [];
          const selectedValues = question.allowMultiple
            ? answer.value.split('|')
            : [answer.value];
          const selectedOptions = definition.options.filter((option) => selectedValues.includes(option.value));
          const displayEn = question.inputType
            ? `${answer.value} ${question.unitEn ?? ''}`.trim()
            : selectedOptions.map((option) => option.labelEn).join(', ') || answer.value;
          const displayTe = question.inputType
            ? `${answer.value} ${question.unitTe ?? ''}`.trim()
            : selectedOptions.map((option) => option.labelTe).join('、') || answer.value;
          return [{
            questionId: definition.id,
            questionEn: definition.questionEn,
            questionTe: definition.questionTe,
            answerEn: displayEn,
            answerTe: displayTe,
          }];
        });
      });
      const heightQuestionId = ageGroup === '10-19' ? 26 : 111;
      const weightQuestionId = ageGroup === '10-19' ? 27 : 112;
      const heightCm = Number(responses[heightQuestionId]?.value);
      const weightKg = Number(responses[weightQuestionId]?.value);
      const assessment = computed.screeningAssessment;
      const riskLevel: ScreeningRecord['riskLevel'] = computed.tier === 'lower'
        ? 'LOW'
        : computed.tier === 'moderate'
          ? 'MODERATE'
          : 'HIGH';
      const record: ScreeningRecord = {
        id: typeof window.crypto?.randomUUID === 'function'
          ? window.crypto.randomUUID()
          : `screening-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        ...participantDetails,
        ageGroup,
        screeningDate: participantDetails.screeningDate || new Date().toISOString().slice(0, 10),
        screeningType: ageGroup === '10-19' ? 'ADOLESCENT' : 'ADULT_20_29',
        answers,
        riskLevel,
        riskAreas: assessment?.categories
          .filter((category) => ['moderate', 'high', 'discussion'].includes(category.status))
          .map((category) => ({
            labelEn: category.categoryEn,
            labelTe: category.categoryTe,
            status: category.status,
          })) ?? [],
        ...(heightCm > 0 && Number.isFinite(heightCm) ? { heightCm } : {}),
        ...(weightKg > 0 && Number.isFinite(weightKg) ? { weightKg } : {}),
        ...(assessment?.bmi && Number.isFinite(assessment.bmi) ? { bmi: assessment.bmi } : {}),
        completedAt: computed.completedAt,
      };
      try {
        saveScreeningRecord(record);
        setScreeningRecords(getScreeningRecords());
      } catch (error) {
        console.error('Unable to save the completed Women360 screening record.', error);
        setResultSaveError(true);
      }
    }
    setView('result');
  };

  // Retake screening clears session answers and starts again
  const handleRetakeScreening = () => {
    setResponses({});
    setAgeGroup(null);
    setView('screening');
  };

  const handleNavigate = (newView: AppView) => {
    if (newView === 'screening') {
      setResponses({});
      setAgeGroup(null);
    }
    setView(newView);
  };

  if (routePath === '/' || routePath === '/login') {
    return (
      <LoginRoleSelection
        lang={lang}
        onLanguageChange={setLang}
        onSelectDoctor={() => navigateRoute('/doctor-login')}
        onSelectUser={() => navigateRoute('/participant')}
      />
    );
  }

  if (routePath === '/doctor-login') {
    return (
      <DoctorLogin
        lang={lang}
        onLanguageChange={setLang}
        onBack={() => navigateRoute('/login')}
        onLogin={async (email, password, remember) => {
          const valid = await authenticateHealthcareProfessional(email, password);
          if (!valid) return false;
          saveHealthcareSession(remember);
          setAuthRole(HEALTHCARE_ROLE);
          navigateRoute('/doctor-dashboard');
          return true;
        }}
      />
    );
  }

  if (routePath === '/doctor-dashboard' || routePath.startsWith('/doctor-dashboard/')) {
    if (authRole !== HEALTHCARE_ROLE) return null;
    return (
      <DoctorDashboard
        lang={lang}
        onLanguageChange={setLang}
        path={routePath}
        records={screeningRecords}
        onNavigate={navigateRoute}
        onLogout={() => {
          clearAuthenticationSession();
          setAuthRole(null);
          navigateRoute('/login');
        }}
      />
    );
  }

  if (routePath === '/admin-dashboard') {
    return <AdminDashboardPlaceholder lang={lang} onLanguageChange={setLang} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f6faff] text-[#151d22]">
      {/* Top Fixed / Sticky Navigation Bar */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        currentView={view}
        onNavigate={handleNavigate}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {view === 'home' && (
          <HomeScreen
            lang={lang}
            onNavigate={handleNavigate}
            hasPreviousResult={Boolean(result)}
          />
        )}

        {view === 'learn' && (
          <LearnScreen
            lang={lang}
            onStartScreening={() => handleNavigate('screening')}
          />
        )}

        {view === 'screening' && (
          <ScreeningScreen
            lang={lang}
            onLanguageChange={setLang}
            responses={responses}
            onAnswerSelect={handleAnswerSelect}
            onComplete={handleScreeningComplete}
            onExit={() => setView('home')}
            ageGroup={ageGroup}
            onAgeGroupSelect={(group) => { setAgeGroup(group); setResponses({}); }}
          />
        )}

        {view === 'result' && result && (
          <ResultScreen
            lang={lang}
            result={result}
            saveError={resultSaveError}
            onRetake={handleRetakeScreening}
            onViewWellness={() => setView('wellness')}
          />
        )}

        {view === 'wellness' && (
          <WellnessScreen
            lang={lang}
            onNavigateScreening={() => setView('screening')}
            userResult={result}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#dcbfc4]/80 py-8 pb-20 md:pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#dcbfc4]/40 pb-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7c113b] text-white flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-[#ffd9e0]" />
              </div>
              <div>
                <span className="font-display font-bold text-base text-[#7c113b]">
                  Women360
                </span>
                <p className="text-xs text-[#564146]">
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Helpline quick dial buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                id="footer-call-104"
                href="tel:104"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#b0f0d8]/60 text-[#2b6957] hover:bg-[#b0f0d8] text-xs font-bold transition-colors border border-[#2b6957]/30"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>104 {lang === 'en' ? "Health Helpline" : 'వైద్య సహాయవాణి'}</span>
              </a>

              <a
                id="footer-call-1091"
                href="tel:1091"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffd9e0]/60 text-[#7c113b] hover:bg-[#ffd9e0] text-xs font-bold transition-colors border border-[#dcbfc4]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>1091 {lang === 'en' ? "Women Safety" : 'మహిళా రక్షణ'}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#564146] text-center sm:text-left">
            <p>{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('home')}
                className="hover:text-[#7c113b] transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => setView('learn')}
                className="hover:text-[#7c113b] transition-colors"
              >
                {t.nav.learn}
              </button>
              <button
                onClick={() => setView('screening')}
                className="hover:text-[#7c113b] transition-colors"
              >
                {t.nav.risk}
              </button>
              <button
                onClick={() => setView('wellness')}
                className="hover:text-[#7c113b] transition-colors"
              >
                {t.nav.wellness}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        lang={lang}
        currentView={view}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
