import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileDown,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Stethoscope,
  PhoneCall,
  Calendar,
  Activity,
  HeartPulse,
  Info,
  ChevronRight
} from 'lucide-react';
import { Language, RiskResult } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DoctorPrepModal } from './DoctorPrepModal';

interface ResultScreenProps {
  lang: Language;
  result: RiskResult;
  saveError?: boolean;
  onRetake: () => void;
  onViewWellness: () => void;
}

interface EvidenceCard {
  titleEn: string;
  titleTe: string;
  summaryEn: string;
  summaryTe: string;
  organizationEn: string;
  organizationTe: string;
  topicEn: string;
  topicTe: string;
  url: string;
  additionalUrl?: string;
}

const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    titleEn: 'Menstrual Health',
    titleTe: 'రుతుక్రమ ఆరోగ్యం',
    summaryEn: 'Persistent irregularity, very heavy or prolonged bleeding, and significant pain may need professional evaluation.',
    summaryTe: 'కొనసాగే క్రమరాహిత్యం, చాలా ఎక్కువ లేదా దీర్ఘకాలిక రక్తస్రావం మరియు తీవ్రమైన నొప్పికి నిపుణుల పరిశీలన అవసరం కావచ్చు.',
    organizationEn: 'ACOG — American College of Obstetricians and Gynecologists',
    organizationTe: 'ACOG — అమెరికన్ కాలేజ్ ఆఫ్ ఆబ్స్టెట్రిషియన్స్ అండ్ గైనకాలజిస్ట్స్',
    topicEn: 'Menstruation and abnormal uterine bleeding',
    topicTe: 'రుతుస్రావం మరియు అసాధారణ గర్భాశయ రక్తస్రావం',
    url: 'https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding',
  },
  {
    titleEn: 'PMOS / PCOS-related Health Information',
    titleTe: 'PMOS / PCOS సంబంధిత ఆరోగ్య సమాచారం',
    summaryEn: 'PMOS/PCOS may involve reproductive, hormonal and metabolic features. Screening signals may prompt discussion but cannot diagnose it.',
    summaryTe: 'PMOS/PCOSలో ప్రజనన, హార్మోన్ల మరియు మెటబాలిక్ లక్షణాలు ఉండవచ్చు. స్క్రీనింగ్ సంకేతాలు చర్చకు దారితీయవచ్చు కానీ నిర్ధారణ చేయలేవు.',
    organizationEn: '2023 International Evidence-based Guideline for PCOS',
    organizationTe: 'PCOS కోసం 2023 అంతర్జాతీయ ఆధార-ఆధారిత మార్గదర్శకం',
    topicEn: 'Evidence-based PCOS guideline',
    topicTe: 'ఆధార-ఆధారిత PCOS మార్గదర్శకం',
    url: 'https://www.monash.edu/medicine/mchri/pcos/guideline',
  },
  {
    titleEn: 'Anaemia Awareness',
    titleTe: 'రక్తహీనత అవగాహన',
    summaryEn: 'Tiredness, weakness, dizziness or shortness of breath can be associated with anaemia but do not confirm it. Heavy bleeding is worth discussing.',
    summaryTe: 'అలసట, బలహీనత, తలతిరగడం లేదా ఊపిరి ఇబ్బంది రక్తహీనతతో సంబంధం కలిగి ఉండవచ్చు కానీ నిర్ధారించవు. అధిక రక్తస్రావం గురించి చర్చించడం మంచిది.',
    organizationEn: 'World Health Organization',
    organizationTe: 'ప్రపంచ ఆరోగ్య సంస్థ',
    topicEn: 'Anaemia',
    topicTe: 'రక్తహీనత',
    url: 'https://www.who.int/health-topics/anaemia',
  },
  {
    titleEn: 'Nutrition & Healthy Diet',
    titleTe: 'పోషకాహారం & ఆరోగ్యకరమైన ఆహారం',
    summaryEn: 'A varied diet can include vegetables and fruits, pulses/beans, staple foods and sources of protein. Avoid restrictive or crash diets.',
    summaryTe: 'వైవిధ్యమైన ఆహారంలో కూరగాయలు, పండ్లు, పప్పులు/బీన్స్, ప్రధాన ఆహార పదార్థాలు మరియు ప్రోటీన్ వనరులు ఉండవచ్చు. అతిగా పరిమితి చేసే లేదా క్రాష్ డైట్లను నివారించండి.',
    organizationEn: 'World Health Organization',
    organizationTe: 'ప్రపంచ ఆరోగ్య సంస్థ',
    topicEn: 'Healthy diet',
    topicTe: 'ఆరోగ్యకరమైన ఆహారం',
    url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
  },
  {
    titleEn: 'Physical Activity',
    titleTe: 'శారీరక చురుకుదనం',
    summaryEn: 'Regular physical activity supports overall health and wellbeing. Choose activity appropriate to your circumstances; avoid extreme exercise goals.',
    summaryTe: 'క్రమమైన శారీరక చురుకుదనం మొత్తం ఆరోగ్యం మరియు శ్రేయస్సుకు తోడ్పడుతుంది. మీ పరిస్థితులకు తగిన కార్యకలాపాలను ఎంచుకోండి; అతిగా వ్యాయామ లక్ష్యాలను నివారించండి.',
    organizationEn: 'World Health Organization',
    organizationTe: 'ప్రపంచ ఆరోగ్య సంస్థ',
    topicEn: 'Guidelines on Physical Activity and Sedentary Behaviour',
    topicTe: 'శారీరక చురుకుదనం మరియు నిశ్చల ప్రవర్తన మార్గదర్శకాలు',
    url: 'https://www.who.int/publications/i/item/9789240015128',
  },
  {
    titleEn: 'Preconception Health',
    titleTe: 'గర్భధారణకు ముందు ఆరోగ్యం',
    summaryEn: 'People planning pregnancy may discuss health conditions, medicines, nutrition, vaccinations and other needs with a qualified professional beforehand.',
    summaryTe: 'గర్భధారణను ప్లాన్ చేసేవారు ముందుగానే ఆరోగ్య పరిస్థితులు, మందులు, పోషకాహారం, టీకాలు మరియు ఇతర అవసరాల గురించి అర్హత కలిగిన నిపుణుడితో చర్చించవచ్చు.',
    organizationEn: 'World Health Organization',
    organizationTe: 'ప్రపంచ ఆరోగ్య సంస్థ',
    topicEn: 'Preconception care policy brief',
    topicTe: 'గర్భధారణకు ముందు సంరక్షణ విధాన సంక్షిప్తం',
    url: 'https://www.who.int/docs/default-source/mca-documents/maternal-nb/preconception_care_policy_brief.pdf',
  },
  {
    titleEn: 'Adolescent Menstrual Health',
    titleTe: 'కౌమార రుతుక్రమ ఆరోగ్యం',
    summaryEn: 'For adolescents, menstrual patterns are an important part of health awareness. Persistent concerns should be discussed with a qualified professional.',
    summaryTe: 'కౌమార వయస్సులో రుతుక్రమ విధానాలు ఆరోగ్య అవగాహనలో ముఖ్యమైన భాగం. కొనసాగే ఆందోళనలను అర్హత కలిగిన నిపుణుడితో చర్చించాలి.',
    organizationEn: 'ACOG — American College of Obstetricians and Gynecologists',
    organizationTe: 'ACOG — అమెరికన్ కాలేజ్ ఆఫ్ ఆబ్స్టెట్రిషియన్స్ అండ్ గైనకాలజిస్ట్స్',
    topicEn: 'Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign',
    topicTe: 'బాలికలు మరియు కౌమారవయస్కుల్లో రుతుస్రావం: రుతుచక్రాన్ని ముఖ్య ఆరోగ్య సూచికగా ఉపయోగించడం',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign',
  },
];

const ADOLESCENT_EVIDENCE_CARDS: EvidenceCard[] = [
  {
    titleEn: 'Adolescent Menstrual Health',
    titleTe: 'కౌమార రుతుక్రమ ఆరోగ్యం',
    summaryEn: 'Menstrual patterns are an important part of adolescent health awareness. Persistent concerns can be discussed with a qualified healthcare professional.',
    summaryTe: 'రుతుక్రమ విధానాలు కౌమార ఆరోగ్య అవగాహనలో ముఖ్యమైన భాగం. కొనసాగే ఆందోళనలను అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించవచ్చు.',
    organizationEn: 'ACOG — American College of Obstetricians and Gynecologists',
    organizationTe: 'ACOG — అమెరికన్ కాలేజ్ ఆఫ్ ఆబ్స్టెట్రిషియన్స్ అండ్ గైనకాలజిస్ట్స్',
    topicEn: 'Menstruation in Girls and Adolescents',
    topicTe: 'బాలికలు మరియు కౌమారవయస్కుల్లో రుతుస్రావం',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign',
  },
  {
    titleEn: 'Menstrual Pain & Bleeding',
    titleTe: 'రుతుక్రమ నొప్పి & రక్తస్రావం',
    summaryEn: 'Persistent or severe pain, very heavy bleeding or bleeding that disrupts everyday activities may need medical evaluation. This awareness summary is not a diagnosis.',
    summaryTe: 'కొనసాగే లేదా తీవ్రమైన నొప్పి, చాలా ఎక్కువ రక్తస్రావం లేదా రోజువారీ పనులకు అంతరాయం కలిగించే రక్తస్రావానికి వైద్య పరిశీలన అవసరం కావచ్చు. ఈ అవగాహన సారాంశం నిర్ధారణ కాదు.',
    organizationEn: 'ACOG — American College of Obstetricians and Gynecologists',
    organizationTe: 'ACOG — అమెరికన్ కాలేజ్ ఆఫ్ ఆబ్స్టెట్రిషియన్స్ అండ్ గైనకాలజిస్ట్స్',
    topicEn: 'Abnormal uterine bleeding',
    topicTe: 'అసాధారణ గర్భాశయ రక్తస్రావం',
    url: 'https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding',
  },
  {
    titleEn: 'PMOS/PCOS-related Signals',
    titleTe: 'PMOS/PCOS సంబంధిత సంకేతాలు',
    summaryEn: 'PMOS/PCOS may involve reproductive, hormonal and metabolic features. A screening questionnaire can highlight discussion points but cannot diagnose a condition.',
    summaryTe: 'PMOS/PCOSలో ప్రజనన, హార్మోన్ల మరియు మెటబాలిక్ లక్షణాలు ఉండవచ్చు. స్క్రీనింగ్ ప్రశ్నావళి చర్చించాల్సిన అంశాలను చూపగలదు కానీ పరిస్థితిని నిర్ధారించదు.',
    organizationEn: '2023 International Evidence-based Guideline for PCOS',
    organizationTe: 'PCOS కోసం 2023 అంతర్జాతీయ ఆధార-ఆధారిత మార్గదర్శకం',
    topicEn: 'Evidence-based PCOS guideline',
    topicTe: 'ఆధార-ఆధారిత PCOS మార్గదర్శకం',
    url: 'https://www.monash.edu/medicine/mchri/pcos/guideline',
  },
  {
    titleEn: 'Menstrual Hygiene',
    titleTe: 'రుతుస్రావ పరిశుభ్రత',
    summaryEn: 'The questionnaire asks about changing menstrual products and possible irritation. Follow the product instructions and discuss persistent or concerning symptoms with a healthcare professional.',
    summaryTe: 'ప్రశ్నావళి రుతుస్రావ ఉత్పత్తులు మార్చడం మరియు సాధ్యమైన చికాకు గురించి అడుగుతుంది. ఉత్పత్తి సూచనలను పాటించి, కొనసాగే లేదా ఆందోళనకరమైన లక్షణాలను ఆరోగ్య నిపుణుడితో చర్చించండి.',
    organizationEn: 'ACOG — American College of Obstetricians and Gynecologists',
    organizationTe: 'ACOG — అమెరికన్ కాలేజ్ ఆఫ్ ఆబ్స్టెట్రిషియన్స్ అండ్ గైనకాలజిస్ట్స్',
    topicEn: 'Adolescent menstrual health awareness',
    topicTe: 'కౌమార రుతుక్రమ ఆరోగ్య అవగాహన',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign',
  },
  {
    titleEn: 'Nutrition & Physical Activity',
    titleTe: 'పోషకాహారం & శారీరక చురుకుదనం',
    summaryEn: 'A varied diet can include fruits and vegetables, pulses/beans and protein sources. Regular, appropriate physical activity supports general wellbeing; avoid restrictive diets or extreme exercise goals.',
    summaryTe: 'వైవిధ్యమైన ఆహారంలో పండ్లు, కూరగాయలు, పప్పులు/బీన్స్ మరియు ప్రోటీన్ వనరులు ఉండవచ్చు. తగిన క్రమమైన శారీరక చురుకుదనం సాధారణ శ్రేయస్సుకు తోడ్పడుతుంది; పరిమిత ఆహారం లేదా అతివ్యాయామ లక్ష్యాలను నివారించండి.',
    organizationEn: 'World Health Organization',
    organizationTe: 'ప్రపంచ ఆరోగ్య సంస్థ',
    topicEn: 'Healthy diet and physical activity guidance',
    topicTe: 'ఆరోగ్యకరమైన ఆహారం మరియు శారీరక చురుకుదనం మార్గదర్శకం',
    url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
    additionalUrl: 'https://www.who.int/publications/i/item/9789240015128',
  },
  {
    titleEn: 'Stress & Wellbeing',
    titleTe: 'ఒత్తిడి & శ్రేయస్సు',
    summaryEn: 'Supportive relationships and access to appropriate help matter for adolescent wellbeing. If stress persists or affects daily activities, speak with a trusted adult or qualified professional.',
    summaryTe: 'కౌమార శ్రేయస్సుకు సహాయక సంబంధాలు మరియు తగిన సహాయం అందుబాటులో ఉండటం ముఖ్యం. ఒత్తిడి కొనసాగితే లేదా దైనందిన పనులను ప్రభావితం చేస్తే నమ్మకమైన పెద్దవారితో లేదా అర్హత కలిగిన నిపుణుడితో మాట్లాడండి.',
    organizationEn: 'World Health Organization',
    organizationTe: 'ప్రపంచ ఆరోగ్య సంస్థ',
    topicEn: 'Adolescent mental health',
    topicTe: 'కౌమార మానసిక శ్రేయస్సు',
    url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health',
  },
];

const EvidenceSection: React.FC<{ lang: Language; adolescent?: boolean }> = ({ lang, adolescent = false }) => {
  const cards = adolescent ? ADOLESCENT_EVIDENCE_CARDS : EVIDENCE_CARDS;
  return (
  <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-6 sm:p-8 space-y-4">
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
        {lang === 'en' ? 'Evidence-based health information' : 'ఆధార-ఆధారిత ఆరోగ్య సమాచారం'}
      </p>
      <h2 className="mt-1 font-display text-xl font-bold text-[#151d22]">
        {lang === 'en' ? 'Evidence & Women’s Health Information' : 'ఆధారాలు & మహిళల ఆరోగ్య సమాచారం'}
      </h2>
      <p className="mt-1 text-sm text-[#564146]">
        {lang === 'en' ? 'Sources reviewed for Women360 health education' : 'Women360 ఆరోగ్య విద్య కోసం పరిశీలించిన మూలాలు'}
      </p>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {cards.map((card) => (
        <article key={card.titleEn} className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-4 space-y-2">
          <h3 className="font-bold text-[#151d22]">{lang === 'en' ? card.titleEn : card.titleTe}</h3>
          <p className="text-sm leading-relaxed text-[#564146]">{lang === 'en' ? card.summaryEn : card.summaryTe}</p>
          <div className="text-xs leading-relaxed text-[#564146]">
            <p><span className="font-semibold">{lang === 'en' ? 'Source' : 'మూలం'}:</span> {lang === 'en' ? card.organizationEn : card.organizationTe}</p>
            <p><span className="font-semibold">{lang === 'en' ? 'Topic' : 'విషయం'}:</span> {lang === 'en' ? card.topicEn : card.topicTe}</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href={card.url} target="_blank" rel="noreferrer" className="inline-flex text-sm font-bold text-[#7c113b] underline underline-offset-2">
              {lang === 'en' ? 'Read official source' : 'అధికారిక మూలాన్ని చదవండి'}
            </a>
            {card.additionalUrl && (
              <a href={card.additionalUrl} target="_blank" rel="noreferrer" className="inline-flex text-sm font-bold text-[#7c113b] underline underline-offset-2">
                {lang === 'en' ? 'Read physical activity source' : 'శారీరక చురుకుదనం మూలాన్ని చదవండి'}
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
  );
};

export const ResultScreen: React.FC<ResultScreenProps> = ({
  lang,
  result,
  saveError = false,
  onRetake,
  onViewWellness,
}) => {
  const t = TRANSLATIONS[lang];
  const isAdolescentScreening = result.ageGroup === '10-19';
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState<boolean>(false);

  // Styling based on risk tier
  const tierConfig = {
    lower: {
      color: '#2b6957',
      bgLight: '#b0f0d8/30',
      badgeBg: '#b0f0d8',
      badgeText: '#002118',
      borderColor: '#2b6957',
      icon: CheckCircle2,
    },
    moderate: {
      color: '#c2410c',
      bgLight: '#ffedd5',
      badgeBg: '#fed7aa',
      badgeText: '#7c2d12',
      borderColor: '#ea580c',
      icon: AlertTriangle,
    },
    higher: {
      color: '#7c113b',
      bgLight: '#ffd9e0/40',
      badgeBg: '#ffd9e0',
      badgeText: '#7c113b',
      borderColor: '#7c113b',
      icon: AlertCircle,
    },
  }[result.tier];

  const TierIcon = tierConfig.icon;
  const isTwentyToTwentyNine = result.ageGroup === '20-29';
  const assessment = result.screeningAssessment;

  if (isTwentyToTwentyNine && assessment) {
    const statusLabel = {
      low: lang === 'en' ? 'Low signal' : 'తక్కువ సంకేతం',
      moderate: lang === 'en' ? 'Moderate signal' : 'మోస్తరు సంకేతం',
      high: lang === 'en' ? 'High signal' : 'అధిక సంకేతం',
      discussion: lang === 'en' ? 'Discuss with a professional' : 'నిపుణుడితో చర్చించండి',
      awareness: lang === 'en' ? 'Awareness only' : 'అవగాహన కోసం మాత్రమే',
    };
    return (
      <div className="max-w-3xl mx-auto pb-24 pt-4 sm:pt-6 space-y-6">
        <div id="result-disclaimer-banner" className="rounded-2xl bg-[#fee2e2]/70 border-2 border-[#dc2626]/30 p-4 sm:p-5 text-sm font-semibold leading-relaxed text-[#7f1d1d]">
          {lang === 'en'
            ? 'This screening is for health awareness and does not provide a medical diagnosis. It cannot confirm or rule out a medical condition. If you have concerning, severe, or worsening symptoms, consult a qualified healthcare professional.'
            : 'ఈ స్క్రీనింగ్ ఆరోగ్య అవగాహన కోసం మాత్రమే మరియు వైద్య నిర్ధారణను అందించదు. ఇది ఏదైనా వైద్య పరిస్థితిని నిర్ధారించదు లేదా పూర్తిగా తొలగించదు. ఆందోళన కలిగించే, తీవ్రమైన లేదా కొనసాగుతున్న లక్షణాలు ఉంటే అర్హత కలిగిన ఆరోగ్య నిపుణుడిని సంప్రదించండి.'}
        </div>
        {saveError && (
          <div role="alert" className="rounded-xl border border-[#c2410c]/40 bg-[#ffedd5] p-3 text-sm text-[#7c2d12]">
            {lang === 'en'
              ? 'This result could not be saved in this browser. You can still review it during this visit.'
              : 'ఈ ఫలితాన్ని ఈ బ్రౌజర్‌లో సేవ్ చేయలేకపోయాము. ఈ సందర్శనలో మీరు దీన్ని చూడవచ్చు.'}
          </div>
        )}
        <section className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 shadow-sm space-y-6">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dcbfc4]/40 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
                {lang === 'en' ? 'WOMEN360 · ADULT WOMEN — 20–29 YEARS' : 'WOMEN360 · వయోజన మహిళలు — 20–29 సంవత్సరాలు'}
              </p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
                {lang === 'en' ? 'Women360 Health Profile' : 'Women360 ఆరోగ్య ప్రొఫైల్'}
              </h1>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-bold ${
              result.tier === 'higher'
                ? 'border-[#7c113b] bg-[#ffd9e0] text-[#7c113b]'
                : result.tier === 'moderate'
                  ? 'border-[#ea580c] bg-[#ffedd5] text-[#7c2d12]'
                  : 'border-[#2b6957] bg-[#b0f0d8]/50 text-[#2b6957]'
            }`}>
              <TierIcon className="h-5 w-5" />
              {result.tierLabelEn && lang === 'en' ? result.tierLabelEn : result.tierLabelTe}
            </div>
          </header>
          <p className="text-sm leading-relaxed text-[#564146]">
            {lang === 'en'
              ? 'Your Women360 screening profile suggests areas that may need attention. This result identifies areas that may benefit from awareness, monitoring, or professional guidance. It does not diagnose a medical condition. Pregnancy intentions and BMI do not determine the overall screening level.'
              : 'మీ Women360 స్క్రీనింగ్ ప్రొఫైల్ దృష్టి అవసరమయ్యే అంశాలను సూచించవచ్చు. అవగాహన, పర్యవేక్షణ లేదా నిపుణుల మార్గదర్శకత్వం అవసరమయ్యే అంశాలను ఇది గుర్తిస్తుంది. ఇది వైద్య పరిస్థితిని నిర్ధారించదు. గర్భధారణ ఉద్దేశాలు మరియు BMI మొత్తం స్క్రీనింగ్ స్థాయిని నిర్ణయించవు.'}
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#151d22]">
            {lang === 'en' ? 'Areas to review' : 'పరిశీలించాల్సిన అంశాలు'}
          </h2>
          <div className="grid gap-3">
            {assessment.categories.map((category) => (
              <article key={category.categoryEn} className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-bold text-[#151d22]">
                    {lang === 'en' ? category.categoryEn : category.categoryTe}
                  </h3>
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${
                    category.status === 'high'
                      ? 'bg-[#ffd9e0] text-[#7c113b]'
                      : category.status === 'moderate'
                        ? 'bg-[#ffedd5] text-[#7c2d12]'
                        : category.status === 'discussion'
                          ? 'bg-[#e0e7ff] text-[#3730a3]'
                          : 'bg-[#b0f0d8]/60 text-[#2b6957]'
                  }`}>
                    {statusLabel[category.status]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#564146]">
                  {lang === 'en' ? category.messageEn : category.messageTe}
                </p>
                {(category.nextStepEn || category.nextStepTe) && (
                  <p className="text-sm font-semibold text-[#7c113b]">
                    {lang === 'en' ? category.nextStepEn : category.nextStepTe}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {assessment.bmi !== undefined && (
          <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold text-[#151d22]">
              {lang === 'en' ? 'BMI' : 'BMI'}
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-[#7c113b]">{assessment.bmi.toFixed(1)}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#564146]">
              {lang === 'en'
                ? 'BMI is informational only and does not determine risk on its own.'
                : 'BMI సమాచారానికి మాత్రమే; ఇది ఒక్కటే రిస్క్‌ను నిర్ణయించదు.'}
            </p>
          </section>
        )}

        <EvidenceSection lang={lang} />

        <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-5 sm:p-6 space-y-3">
          <h2 className="font-display text-lg font-bold text-[#151d22]">
            {lang === 'en' ? 'Your responses' : 'మీ సమాధానాలు'}
          </h2>
          {result.factors.map((factor, index) => (
            <div key={`${factor.titleEn}-${index}`} className="border-b border-[#dcbfc4]/40 pb-2 last:border-0">
              <p className="text-sm font-semibold text-[#151d22]">{lang === 'en' ? factor.titleEn : factor.titleTe}</p>
              <p className="text-sm text-[#564146]">{lang === 'en' ? factor.responseEn : factor.responseTe}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={onRetake} className="flex-1 rounded-2xl bg-[#7c113b] px-5 py-3 text-sm font-bold text-white">
            {lang === 'en' ? 'Start a new screening' : 'కొత్త స్క్రీనింగ్ ప్రారంభించండి'}
          </button>
        </div>
      </div>
    );
  }

  if (isAdolescentScreening && assessment) {
    const statusLabel = {
      low: lang === 'en' ? 'Low signal' : 'తక్కువ సంకేతం',
      moderate: lang === 'en' ? 'Moderate signal' : 'మోస్తరు సంకేతం',
      high: lang === 'en' ? 'High signal' : 'అధిక సంకేతం',
      discussion: lang === 'en' ? 'Discuss with a professional' : 'నిపుణుడితో చర్చించండి',
      awareness: lang === 'en' ? 'Awareness only' : 'అవగాహన కోసం మాత్రమే',
    };
    const tierLabel = {
      lower: lang === 'en' ? 'Low Risk' : 'తక్కువ రిస్క్',
      moderate: lang === 'en' ? 'Moderate Risk' : 'మోస్తరు రిస్క్',
      higher: lang === 'en' ? 'High Risk' : 'అధిక రిస్క్',
    }[result.tier];
    return (
      <div className="max-w-3xl mx-auto pb-24 pt-4 sm:pt-6 space-y-6">
        <div id="result-disclaimer-banner" className="rounded-2xl bg-[#fee2e2]/70 border-2 border-[#dc2626]/30 p-4 sm:p-5 text-sm font-semibold leading-relaxed text-[#7f1d1d]">
          {lang === 'en'
            ? 'This screening is for health awareness and does not provide a medical diagnosis. It cannot confirm or rule out a medical condition. If you have concerning, severe, or worsening symptoms, consult a qualified healthcare professional.'
            : 'ఈ స్క్రీనింగ్ ఆరోగ్య అవగాహన కోసం మాత్రమే మరియు వైద్య నిర్ధారణను అందించదు. ఇది ఏదైనా వైద్య పరిస్థితిని నిర్ధారించదు లేదా లేదని చెప్పదు. ఆందోళనకరమైన, తీవ్రమైన లేదా మరింత ఎక్కువయ్యే లక్షణాలు ఉంటే అర్హత కలిగిన ఆరోగ్య నిపుణుడిని సంప్రదించండి.'}
        </div>
        {saveError && (
          <div role="alert" className="rounded-xl border border-[#c2410c]/40 bg-[#ffedd5] p-3 text-sm text-[#7c2d12]">
            {lang === 'en'
              ? 'This result could not be saved in this browser. You can still review it during this visit.'
              : 'ఈ ఫలితాన్ని ఈ బ్రౌజర్‌లో సేవ్ చేయలేకపోయాము. ఈ సందర్శనలో మీరు దీన్ని చూడవచ్చు.'}
          </div>
        )}
        <section className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 shadow-sm space-y-5">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dcbfc4]/40 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
                {lang === 'en' ? 'SCREENING RESULT · WOMEN360 · ADOLESCENT WOMEN — 10–19 YEARS' : 'స్క్రీనింగ్ ఫలితం · WOMEN360 · కౌమార మహిళలు — 10–19 సంవత్సరాలు'}
              </p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
                {lang === 'en' ? 'Your Women360 Health Profile' : 'మీ Women360 ఆరోగ్య ప్రొఫైల్'}
              </h1>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-bold ${
              result.tier === 'higher'
                ? 'border-[#7c113b] bg-[#ffd9e0] text-[#7c113b]'
                : result.tier === 'moderate'
                  ? 'border-[#ea580c] bg-[#ffedd5] text-[#7c2d12]'
                  : 'border-[#2b6957] bg-[#b0f0d8]/50 text-[#2b6957]'
            }`}>
              <TierIcon className="h-5 w-5" />
              {tierLabel}
            </div>
          </header>
          <p className="text-sm leading-relaxed text-[#564146]">
            {lang === 'en'
              ? 'What this means: this category-based result highlights areas that may benefit from awareness, monitoring, or professional guidance. It is not a clinically validated score, diagnosis, or prediction. BMI does not affect the overall result.'
              : 'దీని అర్థం: విభాగాల ఆధారిత ఈ ఫలితం అవగాహన, పర్యవేక్షణ లేదా నిపుణుల మార్గదర్శకత్వం అవసరమయ్యే అంశాలను చూపుతుంది. ఇది వైద్యపరంగా ధృవీకరించిన స్కోరు, నిర్ధారణ లేదా అంచనా కాదు. BMI మొత్తం ఫలితాన్ని ప్రభావితం చేయదు.'}
          </p>
          {result.completedAt && (
            <p className="text-xs text-[#564146]">
              {lang === 'en' ? 'Completed: ' : 'పూర్తయిన సమయం: '}
              {new Date(result.completedAt).toLocaleString(lang === 'en' ? 'en-IN' : 'te-IN')}
            </p>
          )}
        </section>

        <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#151d22]">
            {lang === 'en' ? 'Areas reviewed' : 'పరిశీలించిన అంశాలు'}
          </h2>
          <div className="grid gap-3">
            {assessment.categories.map((category) => (
              <article key={category.categoryEn} className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-bold text-[#151d22]">
                    {lang === 'en' ? category.categoryEn : category.categoryTe}
                  </h3>
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${
                    category.status === 'high'
                      ? 'bg-[#ffd9e0] text-[#7c113b]'
                      : category.status === 'moderate'
                        ? 'bg-[#ffedd5] text-[#7c2d12]'
                        : category.status === 'discussion'
                          ? 'bg-[#e0e7ff] text-[#3730a3]'
                          : 'bg-[#b0f0d8]/60 text-[#2b6957]'
                  }`}>
                    {statusLabel[category.status]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#564146]">
                  {lang === 'en' ? category.messageEn : category.messageTe}
                </p>
                {(category.nextStepEn || category.nextStepTe) && (
                  <p className="text-sm font-semibold text-[#7c113b]">
                    {lang === 'en' ? category.nextStepEn : category.nextStepTe}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {assessment.bmi !== undefined && (
          <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold text-[#151d22]">
              {lang === 'en' ? 'Informational BMI' : 'సమాచార BMI'}
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-[#7c113b]">{assessment.bmi.toFixed(1)}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#564146]">
              {lang === 'en'
                  ? 'BMI is shown as a measurement only. For adolescents, BMI should be interpreted using age- and sex-specific growth references by a qualified healthcare professional.'
                  : 'BMI కొలతగా మాత్రమే చూపబడుతుంది. కౌమార వయస్సులో BMIని అర్హత కలిగిన ఆరోగ్య నిపుణుడు వయస్సు మరియు లింగానికి తగిన వృద్ధి సూచనల ఆధారంగా అర్థం చేసుకోవాలి.'}
            </p>
          </section>
        )}

        <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-5 sm:p-6 space-y-3">
          <h2 className="font-display text-lg font-bold text-[#151d22]">
            {lang === 'en' ? 'PMOS/PCOS Health Information' : 'PMOS/PCOS ఆరోగ్య సమాచారం'}
          </h2>
          <p className="text-sm leading-relaxed text-[#564146]">
            {lang === 'en'
                ? 'PMOS/PCOS may require long-term management. Healthy lifestyle habits, balanced nutrition, physical activity and stress management can support overall wellbeing and symptom management. A qualified healthcare professional can provide individual guidance. Screening signals do not confirm PMOS/PCOS.'
                : 'PMOS/PCOSకు దీర్ఘకాలిక నిర్వహణ అవసరం కావచ్చు. ఆరోగ్యకరమైన జీవనశైలి అలవాట్లు, సమతుల్య పోషకాహారం, శారీరక చురుకుదనం మరియు ఒత్తిడి నిర్వహణ మొత్తం శ్రేయస్సు మరియు లక్షణాల నిర్వహణకు తోడ్పడవచ్చు. అర్హత కలిగిన ఆరోగ్య నిపుణుడు వ్యక్తిగత మార్గదర్శకత్వం అందించగలరు. స్క్రీనింగ్ సంకేతాలు PMOS/PCOSని నిర్ధారించవు.'}
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-5 sm:p-6 space-y-3">
          <h2 className="font-display text-lg font-bold text-[#151d22]">
            {lang === 'en' ? 'Recommended Next Steps' : 'సిఫార్సు చేసిన తదుపరి చర్యలు'}
          </h2>
          <ul className="space-y-2 text-sm text-[#564146]">
            {(lang === 'en'
                ? [
                    'Personalized health education',
                    'Nutritionist consultation when appropriate',
                    'Lifestyle and stress-management guidance',
                    'Women Care Navigator support',
                    'Gynecologist or appropriate specialist consultation when indicated',
                    'Follow-up and health tracking',
                  ]
                : [
                    'వ్యక్తిగత ఆరోగ్య విద్య',
                    'తగినప్పుడు పోషకాహార నిపుణుల సంప్రదింపు',
                    'జీవనశైలి మరియు ఒత్తిడి నిర్వహణ మార్గదర్శకం',
                    'Women Care Navigator సహాయం',
                    'అవసరమైనప్పుడు గైనకాలజిస్ట్ లేదా తగిన నిపుణుల సంప్రదింపు',
                    'తదుపరి సంప్రదింపు మరియు ఆరోగ్య పర్యవేక్షణ',
                  ]).map((nextStep) => (
                    <li key={nextStep} className="flex gap-2">
                      <span aria-hidden="true">☐</span>
                      <span>{nextStep}</span>
                    </li>
                  ))}
          </ul>
        </section>

        <EvidenceSection lang={lang} adolescent />

        <section className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-5 sm:p-6 space-y-3">
          <h2 className="font-display text-lg font-bold text-[#151d22]">
            {lang === 'en' ? 'Your responses' : 'మీ సమాధానాలు'}
          </h2>
          {result.factors.map((factor, index) => (
            <div key={`${factor.titleEn}-${index}`} className="border-b border-[#dcbfc4]/40 pb-2 last:border-0">
              <p className="text-sm font-semibold text-[#151d22]">{lang === 'en' ? factor.titleEn : factor.titleTe}</p>
              <p className="text-sm text-[#564146]">{lang === 'en' ? factor.responseEn : factor.responseTe}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-[#dcbfc4]/70 bg-[#fff7f8] p-4 space-y-2 text-sm text-[#564146]">
          <p className="font-bold text-[#7c113b]">
            {lang === 'en' ? 'Condensed prototype screening — for clinical review and validation.' : 'సంక్షిప్త ప్రోటోటైప్ స్క్రీనింగ్ — వైద్య సమీక్ష మరియు ధృవీకరణ కోసం.'}
          </p>
          <p>{lang === 'en'
            ? 'Doctor Review / Clinical Review: Pending. This prototype has not been clinically validated.'
            : 'డాక్టర్ సమీక్ష / వైద్య సమీక్ష: పెండింగ్‌లో ఉంది. ఈ ప్రోటోటైప్ వైద్యపరంగా ధృవీకరించబడలేదు.'}</p>
        </section>
        <div className="rounded-2xl border-2 border-[#dc2626]/30 bg-[#fee2e2]/70 p-4 text-sm font-semibold leading-relaxed text-[#7f1d1d]">
          {lang === 'en'
            ? 'Important: This is a screening/awareness questionnaire and is not a medical diagnosis. Any concerning or persistent symptom should be discussed with a qualified healthcare professional.'
            : 'ముఖ్యమైనది: ఇది స్క్రీనింగ్/అవగాహన ప్రశ్నావళి మాత్రమే; వైద్య నిర్ధారణ కాదు. ఆందోళనకరమైన లేదా కొనసాగే ఏ లక్షణమైనా అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించాలి.'}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={onRetake} className="flex-1 rounded-2xl bg-[#7c113b] px-5 py-3 text-sm font-bold text-white">
            {lang === 'en' ? 'Start a new screening' : 'కొత్త స్క్రీనింగ్ ప్రారంభించండి'}
          </button>
          <button type="button" onClick={onViewWellness} className="flex-1 rounded-2xl bg-white border border-[#dcbfc4] px-5 py-3 text-sm font-bold text-[#7c113b]">
            {lang === 'en' ? 'View wellness resources' : 'శ్రేయస్సు వనరులను చూడండి'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-24 pt-4 sm:pt-6 space-y-8">
      {/* 1. Mandatory Medical Safety Disclaimer Banner (Prominent Header Notice) */}
      <div
        id="result-disclaimer-banner"
        className="rounded-2xl bg-[#fee2e2]/70 border-2 border-[#dc2626]/30 p-4 sm:p-5 flex items-start gap-3.5 shadow-xs"
      >
        <AlertCircle className="w-5 h-5 text-[#b91c1c] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#b91c1c]">
            {lang === 'en' ? 'MANDATORY MEDICAL SAFETY NOTICE' : 'ముఖ్యమైన వైద్య హెచ్చరిక'}
          </p>
          <p className="text-xs sm:text-sm text-[#7f1d1d] font-semibold leading-relaxed">
            {isAdolescentScreening
              ? lang === 'en'
                ? 'This screening is for awareness and education only. It does not diagnose PCOS or any other medical condition. Consult a qualified healthcare professional for evaluation.'
                : 'ఈ స్క్రీనింగ్ అవగాహన మరియు విద్య కోసం మాత్రమే. ఇది PCOS లేదా ఇతర వైద్య పరిస్థితులను నిర్ధారించదు. మూల్యాంకనం కోసం అర్హత కలిగిన ఆరోగ్య నిపుణుడిని సంప్రదించండి.'
              : t.result.disclaimer}
          </p>
        </div>
      </div>

      {/* 2. Primary Score & Risk Indicator Card */}
      <div className="rounded-3xl bg-white border border-[#dcbfc4] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dcbfc4]/40 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c113b]">
              {isAdolescentScreening
                ? lang === 'en' ? 'WOMEN360 HEALTH SCREENING' : 'WOMEN360 ఆరోగ్య స్క్రీనింగ్'
                : t.result.headerBadge}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#151d22]">
              {isAdolescentScreening
                ? lang === 'en' ? 'Your Screening Summary' : 'మీ స్క్రీనింగ్ సారాంశం'
                : t.result.title}
            </h1>
          </div>

          {/* Dynamic Risk Tier Badge */}
          {!isAdolescentScreening && <div
            id="result-tier-badge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-sm sm:text-base self-start sm:self-auto"
            style={{
              backgroundColor: tierConfig.badgeBg,
              color: tierConfig.badgeText,
              borderColor: tierConfig.borderColor,
            }}
          >
            <TierIcon className="w-5 h-5" />
            <span>{lang === 'en' ? result.tierLabelEn : result.tierLabelTe}</span>
          </div>}
        </div>

        {/* Dynamic Score Display (e.g. "Score: 6 / 13") */}
        {isAdolescentScreening ? (
          <div className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-6 text-sm leading-relaxed text-[#564146]">
            {lang === 'en'
              ? 'This questionnaire does not have a clinically validated score or risk threshold. Review your answers as discussion prompts with a qualified healthcare professional; this result is not a diagnosis.'
              : 'ఈ ప్రశ్నావళికి వైద్యపరంగా ధృవీకరించిన స్కోరు లేదా రిస్క్ పరిమితి లేదు. మీ సమాధానాలను అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి; ఈ ఫలితం వైద్య నిర్ధారణ కాదు.'}
          </div>
        ) : <div className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-[#564146] tracking-wider">
              {t.result.scoreLabel}
            </span>
            <div className="flex items-baseline justify-center sm:justify-start gap-2">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#7c113b]">
                {result.score}
              </span>
              <span className="text-base sm:text-lg font-semibold text-[#564146]">
                / {result.maxScore} {lang === 'en' ? 'points' : 'పాయింట్లు'}
              </span>
            </div>
            <p className="text-xs text-[#564146]">
              {t.result.scoreOutOf}
            </p>
          </div>

          <div className="max-w-md text-xs sm:text-sm text-[#564146] leading-relaxed bg-white p-4 rounded-xl border border-[#dcbfc4]/40">
            {lang === 'en' ? result.descriptionEn : result.descriptionTe}
          </div>
        </div>}

        {/* 3-State Segmented Risk Indicator Gauge */}
        {!isAdolescentScreening && <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#564146]">
            <span>{t.result.scaleTitle}</span>
            <span className="text-[#7c113b]">
              {lang === 'en' ? `Active Tier: ${result.tier.toUpperCase()}` : `ప్రస్తుత స్థాయి: ${result.tierLabelTe}`}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Segment 1: Lower (0-3) */}
            <div
              className={`p-3 rounded-2xl border text-center transition-all ${
                result.tier === 'lower'
                  ? 'bg-[#b0f0d8]/50 border-[#2b6957] ring-2 ring-[#2b6957] shadow-sm'
                  : 'bg-[#edf5fc] border-[#dcbfc4]/40 opacity-70'
              }`}
            >
              <div className="text-[11px] font-bold text-[#2b6957] uppercase">
                {lang === 'en' ? '0 - 3 pts' : '0 - 3 పాయింట్లు'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#151d22] mt-0.5">
                {t.result.riskBadge.lower}
              </div>
            </div>

            {/* Segment 2: Moderate (4-7) */}
            <div
              className={`p-3 rounded-2xl border text-center transition-all ${
                result.tier === 'moderate'
                  ? 'bg-[#fed7aa]/50 border-[#ea580c] ring-2 ring-[#ea580c] shadow-sm'
                  : 'bg-[#edf5fc] border-[#dcbfc4]/40 opacity-70'
              }`}
            >
              <div className="text-[11px] font-bold text-[#ea580c] uppercase">
                {lang === 'en' ? '4 - 7 pts' : '4 - 7 పాయింట్లు'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#151d22] mt-0.5">
                {t.result.riskBadge.moderate}
              </div>
            </div>

            {/* Segment 3: Higher (8-13) */}
            <div
              className={`p-3 rounded-2xl border text-center transition-all ${
                result.tier === 'higher'
                  ? 'bg-[#ffd9e0]/60 border-[#7c113b] ring-2 ring-[#7c113b] shadow-sm'
                  : 'bg-[#edf5fc] border-[#dcbfc4]/40 opacity-70'
              }`}
            >
              <div className="text-[11px] font-bold text-[#7c113b] uppercase">
                {lang === 'en' ? '8 - 13 pts' : '8 - 13 పాయింట్లు'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#151d22] mt-0.5">
                {t.result.riskBadge.higher}
              </div>
            </div>
          </div>
        </div>}

        {/* Action Buttons: View Wellness & Retake */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-[#dcbfc4]/40">
          <button
            id="btn-result-view-wellness"
            onClick={onViewWellness}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#7c113b] hover:bg-[#630a2d] text-white text-sm sm:text-base font-bold shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#ffd9e0]" />
            <span>{t.result.viewWellnessBtn}</span>
            <ArrowRight className="w-4 h-4 text-[#ffd9e0]" />
          </button>

          {!isAdolescentScreening && <button
            id="btn-result-doctor-prep"
            onClick={() => setIsDoctorModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-[#7c113b] text-[#7c113b] hover:bg-[#ffd9e0]/40 text-sm font-bold shadow-xs transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span>{t.result.doctorPrepBtn}</span>
          </button>}

          <button
            id="btn-result-retake"
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#edf5fc] hover:bg-[#dcbfc4]/30 text-[#564146] text-sm font-bold transition-colors"
            title={t.result.retakeBtn}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.result.retakeBtn}</span>
          </button>
        </div>
      </div>

      {/* 3. Key Factors from Your Assessment */}
      <div className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#151d22]">
            {t.result.factorsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#564146]">
            {isAdolescentScreening
              ? lang === 'en'
                ? 'Your responses are shown below for review; they are not a diagnosis or validated risk score.'
                : 'మీ సమాధానాలు పరిశీలన కోసం క్రింద చూపబడ్డాయి; ఇవి వైద్య నిర్ధారణ లేదా ధృవీకరించిన రిస్క్ స్కోరు కాదు.'
              : t.result.factorsSubtitle}
          </p>
        </div>

        <div className="space-y-2.5">
          {result.factors.map((factor, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/50"
            >
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-[#151d22]">
                  {lang === 'en' ? factor.titleEn : factor.titleTe}
                </p>
                <p className="text-xs text-[#564146]">
                  {lang === 'en' ? `Logged Response: ${factor.responseEn}` : `ఎంపిక: ${factor.responseTe}`}
                </p>
              </div>

              {!isAdolescentScreening && <div className="shrink-0">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    factor.points > 0
                      ? 'bg-[#ffd9e0] text-[#7c113b]'
                      : 'bg-[#edf5fc] text-[#564146]'
                  }`}
                >
                  +{factor.points} {lang === 'en' ? 'pts' : 'పాయింట్లు'}
                </span>
              </div>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. What Your Result Means & Next Steps */}
      <div className="rounded-3xl bg-white border border-[#dcbfc4]/80 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#151d22]">
          {t.result.nextStepsTitle}
        </h2>

        {isAdolescentScreening ? (
          <p className="text-sm leading-relaxed text-[#564146]">
            {lang === 'en'
              ? 'If any symptom is persistent, severe, or concerning, discuss it with a qualified healthcare professional. Seek urgent care for severe or sudden symptoms.'
              : 'ఏదైనా లక్షణం నిరంతరంగా, తీవ్రంగా లేదా ఆందోళనకరంగా ఉంటే అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి. తీవ్రమైన లేదా అకస్మాత్తు లక్షణాలు ఉంటే తక్షణ వైద్య సహాయం పొందండి.'}
          </p>
        ) : <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.result.nextStepsList.map((stepItem, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#f6faff] border border-[#dcbfc4]/60 p-5 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-[#7c113b] text-white flex items-center justify-center font-display font-bold text-sm">
                  {stepItem.step}
                </span>
                <h3 className="font-display text-base font-bold text-[#151d22]">
                  {stepItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#564146] leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            </div>
          ))}
        </div>}
      </div>

      {/* 5. Free Health Advisory Support Helpline Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#2b6957]/10 via-[#edf5fc] to-white border border-[#2b6957]/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#2b6957] text-white flex items-center justify-center shrink-0 shadow-xs">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#151d22]">
              {t.result.helplineCardTitle}
            </h3>
            <p className="text-xs text-[#564146]">
              {t.result.helpline104Desc}
            </p>
          </div>
        </div>

        <a
          id="btn-call-104-result"
          href="tel:104"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2b6957] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#1f4e40] transition-colors self-stretch sm:self-auto"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{lang === 'en' ? 'Call 104 Toll-Free' : '104 కి కాల్ చేయండి'}</span>
        </a>
      </div>

      {/* Doctor Visit Prep Modal Dialog */}
      {!isAdolescentScreening && <DoctorPrepModal
        lang={lang}
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        userScore={result.score}
        userTier={lang === 'en' ? result.tierLabelEn : result.tierLabelTe}
      />}
    </div>
  );
};
