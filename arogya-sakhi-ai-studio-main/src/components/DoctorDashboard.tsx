import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  BookOpen,
  ChartNoAxesCombined,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldAlert,
  UserRound,
  Users,
} from 'lucide-react';
import { Language, ScreeningRecord, ScreeningRiskLevel } from '../types';

interface DoctorDashboardProps {
  lang: Language;
  onLanguageChange: (language: Language) => void;
  path: string;
  records: ScreeningRecord[];
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

const dashboardCopy = {
  en: {
    dashboard: 'Healthcare Professional Dashboard',
    nav: ['Dashboard', 'Participants', 'Screening Results', 'Risk Overview', 'Health Resources', 'Profile'],
    welcome: 'Welcome to the Women360 Healthcare Professional Portal.',
    awarenessDisclaimer: 'Women360 screening results are for health awareness and care navigation only and do not provide a medical diagnosis.',
    screeningRisk: 'Screening Risk Level',
    total: 'Total Screenings',
    low: 'Low Risk',
    moderate: 'Moderate Risk',
    high: 'High Risk',
    byAge: 'Screenings by Age Group',
    age10: '10–19',
    age20: '20–29',
    recent: 'Recent Screenings',
    participants: 'Participants',
    results: 'Screening Results',
    overview: 'Risk Overview',
    resources: 'Health Resources',
    profile: 'Profile',
    participantId: 'Participant ID',
    name: 'Name',
    age: 'Age',
    ageGroup: 'Age Group',
    date: 'Screening Date',
    risk: 'Risk Level',
    riskAreas: 'Risk Areas',
    action: 'Action',
    view: 'View',
    noRecords: 'No screening records available yet.',
    noMatches: 'No screening records match these filters.',
    allAgeGroups: 'All age groups',
    allRiskLevels: 'All risk levels',
    searchPlaceholder: 'Search by participant ID, name, or age group',
    search: 'Search',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    riskDistribution: 'Risk Distribution',
    riskByAge: 'Risk by Age Group',
    lowShort: 'Low',
    moderateShort: 'Moderate',
    highShort: 'High',
    noRiskData: 'No screening data available yet.',
    resourceCategories: [
      'Women’s Health Awareness',
      'Menstrual Health',
      'PMOS / PCOS Awareness',
      'Nutrition & Lifestyle',
      'Adolescent Women’s Health',
      'Screening Guidance',
    ],
    resourcePlaceholder: 'Resource content will be added after clinical review.',
    professional: 'Healthcare Professional',
    email: 'Email',
    role: 'Role',
    verification: 'Professional verification is not implemented in this prototype.',
    logout: 'Logout',
    detail: 'Screening Record',
    participantDetails: 'Participant Details',
    screeningInformation: 'Screening Information',
    riskAreasHeading: 'Risk Areas',
    measurements: 'Measurements',
    answers: 'Submitted Answers',
    consentPrivacy: 'Consent & Follow-Up',
    dob: 'Date of Birth',
    school: 'School / College',
    mobile: 'Mobile / WhatsApp',
    preferredLanguage: 'Preferred Language',
    screeningType: 'Screening Type',
    completionTime: 'Completed',
    participantConsent: 'Participant assent/consent',
    guardianConsent: 'Parent/Guardian consent',
    followUp: 'Follow-up contact permissions',
    obtained: 'Obtained',
    notApplicable: 'Not applicable',
    pending: 'Pending',
    height: 'Height',
    weight: 'Weight',
    bmi: 'BMI (informational)',
    adolescentBmi: 'For participants under 20, BMI should be interpreted using age- and sex-specific growth references by a qualified healthcare professional.',
    informational: 'Measurements are informational and do not determine the overall screening risk.',
    notProvided: 'Not provided',
    adolescent: 'Adolescent',
    adult: 'Adult 20–29',
    back: 'Back',
    missingRecord: 'This screening record could not be found.',
    status: 'Status',
  },
  te: {
    dashboard: 'ఆరోగ్య సంరక్షణ నిపుణుల డ్యాష్‌బోర్డ్',
    nav: ['డ్యాష్‌బోర్డ్', 'పాల్గొనేవారు', 'స్క్రీనింగ్ ఫలితాలు', 'రిస్క్ అవలోకనం', 'ఆరోగ్య వనరులు', 'ప్రొఫైల్'],
    welcome: 'Women360 ఆరోగ్య సంరక్షణ నిపుణుల పోర్టల్‌కు స్వాగతం.',
    awarenessDisclaimer: 'Women360 స్క్రీనింగ్ ఫలితాలు ఆరోగ్య అవగాహన మరియు సంరక్షణ మార్గదర్శకత్వం కోసం మాత్రమే; ఇవి వైద్య నిర్ధారణను అందించవు.',
    screeningRisk: 'స్క్రీనింగ్ రిస్క్ స్థాయి',
    total: 'మొత్తం స్క్రీనింగ్‌లు',
    low: 'తక్కువ రిస్క్',
    moderate: 'మోస్తరు రిస్క్',
    high: 'అధిక రిస్క్',
    byAge: 'వయస్సు పరిధి ప్రకారం స్క్రీనింగ్‌లు',
    age10: '10–19',
    age20: '20–29',
    recent: 'ఇటీవలి స్క్రీనింగ్‌లు',
    participants: 'పాల్గొనేవారు',
    results: 'స్క్రీనింగ్ ఫలితాలు',
    overview: 'రిస్క్ అవలోకనం',
    resources: 'ఆరోగ్య వనరులు',
    profile: 'ప్రొఫైల్',
    participantId: 'పాల్గొనేవారి ID',
    name: 'పేరు',
    age: 'వయస్సు',
    ageGroup: 'వయస్సు పరిధి',
    date: 'స్క్రీనింగ్ తేదీ',
    risk: 'రిస్క్ స్థాయి',
    riskAreas: 'రిస్క్ అంశాలు',
    action: 'చర్య',
    view: 'చూడండి',
    noRecords: 'ఇంకా స్క్రీనింగ్ రికార్డులు లేవు.',
    noMatches: 'ఈ ఫిల్టర్‌లకు సరిపడే స్క్రీనింగ్ రికార్డులు లేవు.',
    allAgeGroups: 'అన్ని వయస్సు పరిధులు',
    allRiskLevels: 'అన్ని రిస్క్ స్థాయిలు',
    searchPlaceholder: 'పాల్గొనేవారి ID, పేరు లేదా వయస్సు పరిధి ద్వారా వెతకండి',
    search: 'వెతకండి',
    sortNewest: 'కొత్తవి ముందు',
    sortOldest: 'పాతవి ముందు',
    riskDistribution: 'రిస్క్ పంపిణీ',
    riskByAge: 'వయస్సు పరిధి ప్రకారం రిస్క్',
    lowShort: 'తక్కువ',
    moderateShort: 'మోస్తరు',
    highShort: 'అధిక',
    noRiskData: 'ఇంకా స్క్రీనింగ్ డేటా అందుబాటులో లేదు.',
    resourceCategories: [
      'మహిళల ఆరోగ్య అవగాహన',
      'రుతుక్రమ ఆరోగ్యం',
      'PMOS / PCOS అవగాహన',
      'పోషణ & జీవనశైలి',
      'కౌమార మహిళల ఆరోగ్యం',
      'స్క్రీనింగ్ మార్గదర్శకం',
    ],
    resourcePlaceholder: 'వైద్య సమీక్ష తర్వాత వనరుల సమాచారం జోడించబడుతుంది.',
    professional: 'ఆరోగ్య సంరక్షణ నిపుణులు',
    email: 'ఇమెయిల్',
    role: 'పాత్ర',
    verification: 'ఈ ప్రోటోటైప్‌లో నిపుణుల ధృవీకరణ అమలు చేయబడలేదు.',
    logout: 'లాగ్ అవుట్',
    detail: 'స్క్రీనింగ్ రికార్డు',
    participantDetails: 'పాల్గొనేవారి వివరాలు',
    screeningInformation: 'స్క్రీనింగ్ సమాచారం',
    riskAreasHeading: 'రిస్క్ అంశాలు',
    measurements: 'కొలతలు',
    answers: 'సమర్పించిన సమాధానాలు',
    consentPrivacy: 'సమ్మతి & తదుపరి సంప్రదింపు',
    dob: 'పుట్టిన తేదీ',
    school: 'పాఠశాల / కళాశాల',
    mobile: 'మొబైల్ / WhatsApp',
    preferredLanguage: 'ఇష్టమైన భాష',
    screeningType: 'స్క్రీనింగ్ రకం',
    completionTime: 'పూర్తి చేసిన సమయం',
    participantConsent: 'పాల్గొనేవారి అంగీకారం/సమ్మతి',
    guardianConsent: 'తల్లిదండ్రి/సంరక్షకుల సమ్మతి',
    followUp: 'తదుపరి సంప్రదింపు అనుమతులు',
    obtained: 'పొందబడింది',
    notApplicable: 'వర్తించదు',
    pending: 'పెండింగ్‌లో ఉంది',
    height: 'ఎత్తు',
    weight: 'బరువు',
    bmi: 'BMI (సమాచారానికి మాత్రమే)',
    adolescentBmi: '20 సంవత్సరాల కంటే తక్కువ వయస్సు ఉన్నవారికి, BMIని అర్హత కలిగిన ఆరోగ్య నిపుణుడు వయస్సు మరియు లింగానికి తగిన వృద్ధి సూచనలతో అర్థం చేసుకోవాలి.',
    informational: 'కొలతలు సమాచారానికి మాత్రమే; మొత్తం స్క్రీనింగ్ రిస్క్‌ను నిర్ణయించవు.',
    notProvided: 'అందించలేదు',
    adolescent: 'కౌమార వయస్సు',
    adult: 'వయోజనులు 20–29',
    back: 'వెనుకకు',
    missingRecord: 'ఈ స్క్రీనింగ్ రికార్డు కనుగొనబడలేదు.',
    status: 'స్థితి',
  },
} as const;

const riskLabel = (risk: ScreeningRiskLevel, lang: Language): string => {
  const labels = {
    LOW: ['Low Risk', 'తక్కువ రిస్క్'],
    MODERATE: ['Moderate Risk', 'మోస్తరు రిస్క్'],
    HIGH: ['High Risk', 'అధిక రిస్క్'],
  } as const;
  return labels[risk]?.[lang === 'en' ? 0 : 1] ?? (lang === 'en' ? 'Unknown' : 'తెలియదు');
};

const followUpLabels: Record<string, [string, string]> = {
  'whatsapp-message': ['WhatsApp message', 'WhatsApp సందేశం'],
  'whatsapp-call': ['WhatsApp call', 'WhatsApp కాల్'],
  'telephone-call': ['Telephone call', 'టెలిఫోన్ కాల్'],
  'home-visit': ['Home visit', 'ఇంటి సందర్శన'],
  'no-follow-up': ['No follow-up contact', 'తదుపరి సంప్రదింపు వద్దు'],
};

const riskClasses: Record<ScreeningRiskLevel, string> = {
  LOW: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  MODERATE: 'border-amber-200 bg-amber-50 text-amber-800',
  HIGH: 'border-rose-200 bg-rose-50 text-rose-800',
};

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  lang,
  onLanguageChange,
  path,
  records,
  onNavigate,
  onLogout,
}) => {
  const copy = dashboardCopy[lang];
  const [searchText, setSearchText] = useState('');
  const [ageFilter, setAgeFilter] = useState<'all' | ScreeningRecord['ageGroup']>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | ScreeningRiskLevel>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sortedRecords = useMemo(() => [...records].sort((first, second) =>
    (new Date(first.screeningDate).getTime() - new Date(second.screeningDate).getTime()) *
    (sortOrder === 'newest' ? -1 : 1)), [records, sortOrder]);
  const filteredRecords = useMemo(() => sortedRecords.filter((record) => {
    const query = searchText.trim().toLowerCase();
    const matchesSearch = !query ||
      (record.participantId ?? '').toLowerCase().includes(query) ||
      (record.participantName ?? '').toLowerCase().includes(query) ||
      record.ageGroup.includes(query);
    return matchesSearch &&
      (ageFilter === 'all' || record.ageGroup === ageFilter) &&
      (riskFilter === 'all' || record.riskLevel === riskFilter);
  }), [sortedRecords, searchText, ageFilter, riskFilter]);

  const counts = useMemo(() => ({
    LOW: records.filter((record) => record.riskLevel === 'LOW').length,
    MODERATE: records.filter((record) => record.riskLevel === 'MODERATE').length,
    HIGH: records.filter((record) => record.riskLevel === 'HIGH').length,
    age10: records.filter((record) => record.ageGroup === '10-19').length,
    age20: records.filter((record) => record.ageGroup === '20-29').length,
  }), [records]);

  const section = resolveSection(path);
  const activeDetail = section === 'record'
    ? records.find((record) => record.id === decodeURIComponent(path.slice('/doctor-dashboard/records/'.length)))
    : undefined;
  const navigate = (nextPath: string) => {
    setMobileNavOpen(false);
    onNavigate(nextPath);
  };

  const menu = [
    { path: '/doctor-dashboard', label: copy.nav[0], icon: LayoutDashboard },
    { path: '/doctor-dashboard/participants', label: copy.nav[1], icon: Users },
    { path: '/doctor-dashboard/screening-results', label: copy.nav[2], icon: ClipboardList },
    { path: '/doctor-dashboard/risk-overview', label: copy.nav[3], icon: ChartNoAxesCombined },
    { path: '/doctor-dashboard/resources', label: copy.nav[4], icon: BookOpen },
    { path: '/doctor-dashboard/profile', label: copy.nav[5], icon: UserRound },
  ];

  const openRecord = (record: ScreeningRecord) =>
    navigate(`/doctor-dashboard/records/${encodeURIComponent(record.id)}`);

  const renderRecordsTable = (rows: ScreeningRecord[], includeName: boolean, includeAreas: boolean) => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#ead5da] text-xs uppercase tracking-wide text-[#6c5b60]">
            <th className="px-3 py-3 font-bold">{copy.participantId}</th>
            {includeName && <th className="px-3 py-3 font-bold">{copy.name}</th>}
            <th className="px-3 py-3 font-bold">{copy.age}</th>
            <th className="px-3 py-3 font-bold">{copy.ageGroup}</th>
            <th className="px-3 py-3 font-bold">{copy.date}</th>
            <th className="px-3 py-3 font-bold">{copy.screeningRisk}</th>
            {includeAreas && <th className="px-3 py-3 font-bold">{copy.riskAreas}</th>}
            <th className="px-3 py-3 font-bold">{copy.action}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((record) => (
            <tr key={record.id} className="border-b border-[#f0e5e8] last:border-0">
              <td className="px-3 py-3 font-semibold text-[#34272a]">{record.participantId || '—'}</td>
              {includeName && <td className="px-3 py-3 text-[#514247]">{record.participantName || '—'}</td>}
              <td className="px-3 py-3 text-[#514247]">{record.age ?? '—'}</td>
              <td className="px-3 py-3 text-[#514247]">{record.ageGroup === '10-19' ? copy.age10 : copy.age20}</td>
              <td className="px-3 py-3 text-[#514247]">{formatDate(record.screeningDate, lang)}</td>
              <td className="px-3 py-3"><RiskBadge level={record.riskLevel} label={riskLabel(record.riskLevel, lang)} /></td>
              {includeAreas && <td className="max-w-48 px-3 py-3 text-[#514247]">{record.riskAreas.length ? record.riskAreas.map((area) => lang === 'en' ? area.labelEn : area.labelTe).join(', ') : '—'}</td>}
              <td className="px-3 py-3">
                <button type="button" onClick={() => openRecord(record)} className="rounded-lg px-2.5 py-1.5 font-bold text-[#7c113b] hover:bg-[#fff3f6]">{copy.view}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEmpty = (message: string) => (
    <div className="rounded-xl border border-dashed border-[#dcbfc4] bg-[#fffdfd] px-5 py-10 text-center text-sm text-[#6d5a60]">
      {message}
    </div>
  );

  const renderFilterBar = () => (
    <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
      <label className="relative block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a777d]" />
        <input value={searchText} onChange={(event) => setSearchText(event.target.value)} aria-label={copy.search} placeholder={copy.searchPlaceholder} className="h-11 w-full rounded-xl border border-[#dfcbd0] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
      </label>
      <select aria-label={copy.ageGroup} value={ageFilter} onChange={(event) => setAgeFilter(event.target.value as typeof ageFilter)} className="h-11 rounded-xl border border-[#dfcbd0] bg-white px-3 text-sm text-[#514247]">
        <option value="all">{copy.allAgeGroups}</option>
        <option value="10-19">{copy.age10}</option>
        <option value="20-29">{copy.age20}</option>
      </select>
      <select aria-label={copy.risk} value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as typeof riskFilter)} className="h-11 rounded-xl border border-[#dfcbd0] bg-white px-3 text-sm text-[#514247]">
        <option value="all">{copy.allRiskLevels}</option>
        <option value="LOW">{copy.low}</option>
        <option value="MODERATE">{copy.moderate}</option>
        <option value="HIGH">{copy.high}</option>
      </select>
      <select aria-label={copy.date} value={sortOrder} onChange={(event) => setSortOrder(event.target.value as typeof sortOrder)} className="h-11 rounded-xl border border-[#dfcbd0] bg-white px-3 text-sm text-[#514247]">
        <option value="newest">{copy.sortNewest}</option>
        <option value="oldest">{copy.sortOldest}</option>
      </select>
    </div>
  );

  const renderDashboard = () => (
    <>
      <section className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm sm:p-7">
        <p className="text-sm font-bold text-[#7c113b]">{copy.welcome}</p>
        <p className="mt-3 rounded-xl border border-[#dfcbd0] bg-[#fff8fa] p-3 text-xs leading-relaxed text-[#564146]">{copy.awarenessDisclaimer}</p>
      </section>
      <section aria-label={copy.screeningRisk} className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: copy.total, value: records.length, icon: ClipboardList },
          { label: copy.low, value: counts.LOW, icon: HeartPulse },
          { label: copy.moderate, value: counts.MODERATE, icon: Activity },
          { label: copy.high, value: counts.HIGH, icon: ShieldAlert },
        ].map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#66565b]">{label}</p>
              <Icon className="h-5 w-5 text-[#7c113b]" />
            </div>
            <p className="mt-4 text-3xl font-bold text-[#7c113b]">{value}</p>
          </article>
        ))}
      </section>
      <section className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg font-bold text-[#151d22]">{copy.byAge}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[[copy.age10, counts.age10], [copy.age20, counts.age20]].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#f6faff] p-4">
                <p className="text-sm font-semibold text-[#66565b]">{label}</p>
                <p className="mt-2 text-2xl font-bold text-[#7c113b]">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <section className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-[#151d22]">{copy.recent}</h2>
            <button type="button" onClick={() => navigate('/doctor-dashboard/screening-results')} className="text-sm font-bold text-[#7c113b] hover:underline">{copy.results}</button>
          </div>
          {records.length
            ? renderRecordsTable(sortedRecords.slice(0, 6), false, false)
            : renderEmpty(copy.noRecords)}
        </section>
      </section>
    </>
  );

  const renderRiskOverview = () => {
    const total = records.length;
    const riskRows: Array<{ level: ScreeningRiskLevel; label: string; count: number }> = [
      { level: 'LOW', label: copy.low, count: counts.LOW },
      { level: 'MODERATE', label: copy.moderate, count: counts.MODERATE },
      { level: 'HIGH', label: copy.high, count: counts.HIGH },
    ];
    return (
      <div className="space-y-5">
        <section className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="font-display text-lg font-bold text-[#151d22]">{copy.riskDistribution}</h2>
          <div className="mt-5 space-y-4">
            {riskRows.map(({ level, label, count }) => (
              <div key={level}>
                <div className="mb-1.5 flex justify-between gap-3 text-sm">
                  <span className="font-semibold text-[#514247]">{label}</span><span className="font-bold text-[#34272a]">{count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#f0e5e8]">
                  <div className={`h-full rounded-full ${level === 'LOW' ? 'bg-emerald-600' : level === 'MODERATE' ? 'bg-amber-500' : 'bg-rose-700'}`} style={{ width: `${total ? (count / total) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
          {!records.length && <p className="mt-5 text-sm text-[#6d5a60]">{copy.noRiskData}</p>}
        </section>
        <section className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="font-display text-lg font-bold text-[#151d22]">{copy.riskByAge}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { label: copy.age10, group: '10-19' as const },
              { label: copy.age20, group: '20-29' as const },
            ].map(({ label, group }) => (
              <div key={group} className="rounded-xl border border-[#ead5da] p-4">
                <h3 className="font-bold text-[#7c113b]">{label}</h3>
                <div className="mt-3 space-y-2 text-sm text-[#514247]">
                  {riskRows.map(({ level, label: riskText }) => (
                    <div key={level} className="flex justify-between gap-3">
                      <span>{riskText}</span>
                      <span className="font-bold">{records.filter((record) => record.ageGroup === group && record.riskLevel === level).length}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {!records.length && <p className="mt-5 text-sm text-[#6d5a60]">{copy.noRiskData}</p>}
        </section>
      </div>
    );
  };

  const renderRecordDetail = (record: ScreeningRecord) => {
    const optionalValue = (value?: string | number) =>
      value === undefined || value === '' ? copy.notProvided : String(value);
    const consentLabel = (value?: string) => {
      if (value === 'obtained') return copy.obtained;
      if (value === 'not-applicable') return copy.notApplicable;
      if (value === 'pending') return copy.pending;
      return value ? optionalValue(value) : copy.notProvided;
    };
    return (
      <div className="space-y-5">
        <button type="button" onClick={() => navigate('/doctor-dashboard/screening-results')} className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-bold text-[#7c113b] hover:bg-[#fff3f6]">
          <ArrowLeft className="h-4 w-4" />{copy.back}
        </button>
        <section className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold text-[#151d22]">{copy.detail}</h2>
              <p className="mt-1 text-sm text-[#6d5a60]">{record.participantId || '—'}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#6d5a60]">{copy.screeningRisk}</p>
              <RiskBadge level={record.riskLevel} label={riskLabel(record.riskLevel, lang)} />
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-[#fff8fa] p-3 text-xs leading-relaxed text-[#564146]">{copy.awarenessDisclaimer}</p>
        </section>
        <DetailSection title={copy.consentPrivacy}>
          <DetailItem label={copy.participantId} value={optionalValue(record.participantId)} />
          <DetailItem label={copy.name} value={optionalValue(record.participantName)} />
          <DetailItem label={copy.dob} value={record.dateOfBirth ? formatDate(record.dateOfBirth, lang) : copy.notProvided} />
          <DetailItem label={copy.age} value={optionalValue(record.age)} />
          <DetailItem label={copy.ageGroup} value={record.ageGroup === '10-19' ? copy.age10 : copy.age20} />
          <DetailItem label={copy.school} value={optionalValue(record.schoolCollege)} />
          <DetailItem label={copy.mobile} value={optionalValue(record.mobileWhatsapp)} />
          <DetailItem label={copy.preferredLanguage} value={optionalValue(record.preferredLanguage)} />
        </DetailSection>
        <DetailSection title={copy.screeningInformation}>
          <DetailItem label={copy.date} value={formatDate(record.screeningDate, lang)} />
          <DetailItem label={copy.ageGroup} value={record.ageGroup === '10-19' ? copy.age10 : copy.age20} />
          <DetailItem label={copy.screeningType} value={record.screeningType === 'ADOLESCENT' ? copy.adolescent : copy.adult} />
          <DetailItem label={copy.completionTime} value={new Date(record.completedAt).toLocaleString(lang === 'en' ? 'en-IN' : 'te-IN')} />
        </DetailSection>
        <DetailSection title={copy.screeningRisk}>
          <DetailItem label={copy.screeningRisk} value={riskLabel(record.riskLevel, lang)} />
        </DetailSection>
        {record.riskAreas.length > 0 && (
          <DetailSection title={copy.riskAreasHeading}>
            <div className="space-y-2">
              {record.riskAreas.map((area, index) => (
                <div key={`${area.labelEn}-${index}`} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f8f6f7] p-3 text-sm">
                  <span className="font-semibold text-[#34272a]">{lang === 'en' ? area.labelEn : area.labelTe}</span>
                  <span className="text-xs font-semibold capitalize text-[#66565b]">{copy.status}: {localizedStatus(area.status, lang)}</span>
                </div>
              ))}
            </div>
          </DetailSection>
        )}
        {(record.heightCm !== undefined || record.weightKg !== undefined || record.bmi !== undefined) && (
          <DetailSection title={copy.measurements}>
            {record.heightCm !== undefined && <DetailItem label={copy.height} value={`${record.heightCm} cm`} />}
            {record.weightKg !== undefined && <DetailItem label={copy.weight} value={`${record.weightKg} kg`} />}
            {record.bmi !== undefined && <DetailItem label={copy.bmi} value={record.bmi.toFixed(1)} />}
            <p className="mt-2 rounded-lg bg-[#f6faff] p-3 text-xs leading-relaxed text-[#564146]">
              {record.ageGroup === '10-19' ? copy.adolescentBmi : copy.informational}
            </p>
          </DetailSection>
        )}
        {(record.participantConsent !== undefined || record.guardianConsent !== undefined || Boolean(record.followUpPermissions?.length)) && (
          <DetailSection title={copy.participantDetails}>
            {record.participantConsent !== undefined && <DetailItem label={copy.participantConsent} value={consentLabel(record.participantConsent)} />}
            {record.guardianConsent !== undefined && <DetailItem label={copy.guardianConsent} value={consentLabel(record.guardianConsent)} />}
            {record.followUpPermissions?.length ? (
              <div className="grid gap-2 border-b border-[#f0e5e8] py-2 last:border-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <span className="text-sm font-semibold text-[#66565b]">{copy.followUp}</span>
                <span className="text-sm text-[#34272a]">{record.followUpPermissions.map((method) => followUpLabels[method]?.[lang === 'en' ? 0 : 1] ?? method).join(', ')}</span>
              </div>
            ) : null}
          </DetailSection>
        )}
        <DetailSection title={copy.answers}>
          {record.answers.length ? (
            <div className="divide-y divide-[#f0e5e8]">
              {record.answers.map((answer) => (
                <div key={answer.questionId} className="grid gap-1 py-3 sm:grid-cols-2 sm:gap-5">
                  <p className="text-sm font-semibold text-[#514247]">{lang === 'en' ? answer.questionEn : answer.questionTe}</p>
                  <p className="text-sm text-[#34272a]">{lang === 'en' ? answer.answerEn : answer.answerTe}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-[#6d5a60]">{copy.noRecords}</p>}
        </DetailSection>
      </div>
    );
  };

  const pageTitle = section === 'dashboard' ? copy.nav[0]
    : section === 'participants' ? copy.participants
      : section === 'results' ? copy.results
        : section === 'risk' ? copy.overview
          : section === 'resources' ? copy.resources
            : section === 'profile' ? copy.profile : copy.detail;

  return (
    <div className="min-h-screen bg-[#f6faff] text-[#151d22]">
      <header className="border-b border-[#dcbfc0]/60 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c113b] text-white"><HeartPulse className="h-5 w-5 text-[#ffd9e0]" /></div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7c113b]">WOMEN360</p>
              <h1 className="mt-0.5 font-display text-lg font-bold text-[#151d22] sm:text-xl">{copy.dashboard}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle lang={lang} onLanguageChange={onLanguageChange} />
            <button type="button" onClick={onLogout} className="inline-flex items-center gap-2 rounded-xl border border-[#dfcbd0] bg-white px-3 py-2 text-sm font-semibold text-[#6a5259] hover:border-[#7c113b] hover:text-[#7c113b]">
              <LogOut className="h-4 w-4" /><span className="hidden sm:inline">{copy.logout}</span>
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="min-w-0">
          <button type="button" onClick={() => setMobileNavOpen((open) => !open)} className="mb-2 flex w-full items-center justify-between rounded-xl border border-[#ead5da] bg-white px-4 py-3 text-left text-sm font-bold text-[#514247] lg:hidden">
            {copy.nav[0]} <span aria-hidden="true">{mobileNavOpen ? '−' : '+'}</span>
          </button>
          <nav aria-label={copy.dashboard} className={`${mobileNavOpen ? 'flex' : 'hidden'} gap-2 overflow-x-auto pb-1 lg:flex lg:flex-col`}>
            {menu.map(({ path: itemPath, label, icon: Icon }, index) => {
              const active = (section === 'dashboard' && index === 0) ||
                (section === 'participants' && index === 1) ||
                (section === 'results' && index === 2) ||
                (section === 'risk' && index === 3) ||
                (section === 'resources' && index === 4) ||
                (section === 'profile' && index === 5);
              return (
                <button key={itemPath} type="button" onClick={() => navigate(itemPath)} aria-current={active ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition lg:w-full ${active ? 'bg-[#7c113b] text-white shadow-sm' : 'bg-white text-[#564146] hover:bg-[#fff0f3]'}`}>
                  <Icon className="h-4 w-4" />{label}
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0">
          <h2 className="mb-4 font-display text-xl font-bold text-[#151d22]">{pageTitle}</h2>
          {section === 'dashboard' && renderDashboard()}
          {(section === 'participants' || section === 'results') && (
            <section className="rounded-2xl border border-[#ead5da] bg-white p-4 shadow-sm sm:p-6">
              {renderFilterBar()}
              {filteredRecords.length
                ? renderRecordsTable(filteredRecords, section === 'participants', section === 'results')
                : renderEmpty(records.length ? copy.noMatches : copy.noRecords)}
            </section>
          )}
          {section === 'risk' && renderRiskOverview()}
          {section === 'resources' && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {copy.resourceCategories.map((category) => (
                <article key={category} className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm">
                  <BookOpen className="h-5 w-5 text-[#7c113b]" />
                  <h3 className="mt-3 font-bold text-[#34272a]">{category}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6d5a60]">{copy.resourcePlaceholder}</p>
                </article>
              ))}
            </div>
          )}
          {section === 'profile' && (
            <section className="max-w-2xl rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#f0e5e8] pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f3] text-[#7c113b]"><UserRound className="h-5 w-5" /></div>
                <h3 className="font-display text-lg font-bold text-[#34272a]">{copy.professional}</h3>
              </div>
              <DetailItem label={copy.email} value="doctor@women360.demo" />
              <DetailItem label={copy.role} value={copy.professional} />
              <p className="mt-4 rounded-xl bg-[#fff8fa] p-3 text-sm leading-relaxed text-[#564146]">{copy.verification}</p>
            </section>
          )}
          {section === 'record' && (activeDetail
            ? renderRecordDetail(activeDetail)
            : <section className="rounded-2xl border border-[#ead5da] bg-white p-6 shadow-sm">{renderEmpty(copy.missingRecord)}</section>)}
        </main>
      </div>
    </div>
  );
};

function resolveSection(path: string): 'dashboard' | 'participants' | 'results' | 'risk' | 'resources' | 'profile' | 'record' {
  if (path.startsWith('/doctor-dashboard/records/')) return 'record';
  if (path === '/doctor-dashboard/participants') return 'participants';
  if (path === '/doctor-dashboard/screening-results') return 'results';
  if (path === '/doctor-dashboard/risk-overview') return 'risk';
  if (path === '/doctor-dashboard/resources') return 'resources';
  if (path === '/doctor-dashboard/profile') return 'profile';
  return 'dashboard';
}

const formatDate = (date: string, lang: Language) => {
  const parsed = new Date(`${date.slice(0, 10)}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString(lang === 'en' ? 'en-IN' : 'te-IN');
};

const localizedStatus = (status: string, lang: Language) => {
  if (lang === 'en') return status;
  const translations: Record<string, string> = {
    low: 'తక్కువ',
    awareness: 'అవగాహన కోసం మాత్రమే',
    discussion: 'చర్చించాలి',
    moderate: 'మోస్తరు',
    high: 'అధిక',
  };
  return translations[status] ?? status;
};

const RiskBadge: React.FC<{ level: ScreeningRiskLevel; label: string }> = ({ level, label }) => (
  <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-bold ${riskClasses[level] ?? 'border-slate-200 bg-slate-50 text-slate-700'}`}>
    {label}
  </span>
);

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-2xl border border-[#ead5da] bg-white p-5 shadow-sm sm:p-6">
    <h2 className="mb-3 border-b border-[#f0e5e8] pb-3 font-display text-lg font-bold text-[#7c113b]">{title}</h2>
    {children}
  </section>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="grid gap-1 border-b border-[#f0e5e8] py-2 last:border-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-5">
    <span className="text-sm font-semibold text-[#66565b]">{label}</span>
    <span className="break-words text-sm text-[#34272a]">{value}</span>
  </div>
);

const LanguageToggle: React.FC<{ lang: Language; onLanguageChange: (language: Language) => void }> = ({ lang, onLanguageChange }) => (
  <div className="inline-flex items-center rounded-full border border-[#dcbfc4]/80 bg-[#edf5fc] p-1" role="radiogroup" aria-label={lang === 'en' ? 'Language selection' : 'భాష ఎంపిక'}>
    <button type="button" role="radio" aria-checked={lang === 'en'} onClick={() => onLanguageChange('en')} className={`rounded-full px-3 py-1.5 text-xs font-bold ${lang === 'en' ? 'bg-[#7c113b] text-white' : 'text-[#564146]'}`}>English</button>
    <button type="button" role="radio" aria-checked={lang === 'te'} onClick={() => onLanguageChange('te')} className={`rounded-full px-3 py-1.5 text-xs font-bold ${lang === 'te' ? 'bg-[#7c113b] text-white' : 'text-[#564146]'}`}>తెలుగు</button>
  </div>
);
