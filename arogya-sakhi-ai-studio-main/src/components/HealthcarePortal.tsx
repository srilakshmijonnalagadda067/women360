import React, { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  HeartPulse,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types';

interface PortalProps {
  lang: Language;
  onLanguageChange: (language: Language) => void;
}

interface DoctorLoginProps extends PortalProps {
  onBack: () => void;
  onLogin: (email: string, password: string, remember: boolean) => Promise<boolean>;
}

const portalCopy = {
  en: {
    portal: 'Healthcare Professional Portal',
    secure: 'Secure access for authorized healthcare professionals',
    login: 'Healthcare Professional Login',
    email: 'Professional Email',
    emailPlaceholder: 'Enter your professional email',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    remember: 'Remember me',
    forgot: 'Forgot password?',
    loginButton: 'Login to Dashboard',
    loggingIn: 'Logging in…',
    note: 'Access is intended for authorized healthcare professionals.',
    back: '← Back to Login',
    invalid: 'Invalid email or password.',
    sessionError: 'Unable to start a secure session. Please try again.',
    forgotMessage: 'Password reset functionality will be available in the production version.',
    welcome: 'Welcome to the Women360 Healthcare Professional Portal.',
    dashboard: 'Healthcare Professional Dashboard',
    nav: ['Dashboard', 'Participants', 'Screening Results', 'Risk Overview', 'Health Resources', 'Profile'],
    stats: ['Total Screenings', 'Low Risk', 'Moderate Risk', 'High Risk'],
    placeholder: 'Prototype placeholder — no patient data is available.',
    logout: 'Logout',
    userRole: 'Participant Login',
    doctorChoice: 'Healthcare Professional / Doctor Login',
    continueUser: 'Continue to Women360',
    rolePrompt: 'Choose how you want to continue',
    participantDesc: 'Explore Women360 health screening and resources',
    professionalDesc: 'Sign in to the healthcare professional portal',
    demoNote: 'Prototype login only. This portal does not perform medical-license verification.',
    admin: 'Administrator dashboard',
    adminMessage: 'An administrator portal is not configured in this prototype.',
  },
  te: {
    portal: 'ఆరోగ్య సంరక్షణ నిపుణుల పోర్టల్',
    secure: 'అధికారిక ఆరోగ్య సంరక్షణ నిపుణుల కోసం సురక్షిత ప్రవేశం',
    login: 'ఆరోగ్య సంరక్షణ నిపుణుల లాగిన్',
    email: 'వృత్తిపరమైన ఇమెయిల్',
    emailPlaceholder: 'మీ వృత్తిపరమైన ఇమెయిల్‌ను నమోదు చేయండి',
    password: 'పాస్‌వర్డ్',
    passwordPlaceholder: 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
    remember: 'నన్ను గుర్తుంచుకోండి',
    forgot: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    loginButton: 'డ్యాష్‌బోర్డ్‌లోకి లాగిన్ అవ్వండి',
    loggingIn: 'లాగిన్ అవుతోంది…',
    note: 'అధికారిక ఆరోగ్య సంరక్షణ నిపుణుల కోసం మాత్రమే ఈ యాక్సెస్.',
    back: 'లాగిన్‌కు తిరిగి వెళ్లండి',
    invalid: 'ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పు.',
    sessionError: 'సురక్షిత సెషన్ ప్రారంభించలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.',
    forgotMessage: 'పాస్‌వర్డ్ రీసెట్ సదుపాయం ప్రొడక్షన్ వెర్షన్‌లో అందుబాటులో ఉంటుంది.',
    welcome: 'Women360 ఆరోగ్య సంరక్షణ నిపుణుల పోర్టల్‌కు స్వాగతం.',
    dashboard: 'ఆరోగ్య సంరక్షణ నిపుణుల డ్యాష్‌బోర్డ్',
    nav: ['డ్యాష్‌బోర్డ్', 'పాల్గొనేవారు', 'స్క్రీనింగ్ ఫలితాలు', 'రిస్క్ అవలోకనం', 'ఆరోగ్య వనరులు', 'ప్రొఫైల్'],
    stats: ['మొత్తం స్క్రీనింగ్‌లు', 'తక్కువ రిస్క్', 'మోస్తరు రిస్క్', 'అధిక రిస్క్'],
    placeholder: 'ప్రోటోటైప్ నమూనా — రోగుల డేటా అందుబాటులో లేదు.',
    logout: 'లాగ్ అవుట్',
    userRole: 'పాల్గొనేవారి లాగిన్',
    doctorChoice: 'ఆరోగ్య సంరక్షణ నిపుణులు / డాక్టర్ లాగిన్',
    continueUser: 'Women360కు కొనసాగండి',
    rolePrompt: 'మీరు ఎలా కొనసాగాలనుకుంటున్నారో ఎంచుకోండి',
    participantDesc: 'Women360 ఆరోగ్య స్క్రీనింగ్ మరియు వనరులను చూడండి',
    professionalDesc: 'ఆరోగ్య సంరక్షణ నిపుణుల పోర్టల్‌లోకి లాగిన్ అవ్వండి',
    demoNote: 'ప్రోటోటైప్ లాగిన్ మాత్రమే. ఈ పోర్టల్ వైద్య లైసెన్స్‌ను ధృవీకరించదు.',
    admin: 'నిర్వాహక డ్యాష్‌బోర్డ్',
    adminMessage: 'ఈ ప్రోటోటైప్‌లో నిర్వాహక పోర్టల్ కాన్ఫిగర్ చేయబడలేదు.',
  },
} as const;

export const LoginRoleSelection: React.FC<PortalProps & { onSelectDoctor: () => void; onSelectUser: () => void }> = ({
  lang, onLanguageChange, onSelectDoctor, onSelectUser,
}) => {
  const copy = portalCopy[lang];

  return (
    <PortalShell lang={lang} onLanguageChange={onLanguageChange}>
      <section className="w-full max-w-xl rounded-3xl border border-[#ead5da] bg-white p-6 shadow-[0_18px_50px_rgba(124,17,59,0.1)] sm:p-9">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#7c113b]">WOMEN360</p>
        <h1 className="mt-2 text-center font-display text-2xl font-bold text-[#151d22]">{copy.rolePrompt}</h1>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <button type="button" onClick={onSelectUser} className="group rounded-2xl border border-[#dfcbd0] p-5 text-left transition hover:border-[#7c113b] hover:bg-[#fff8fa] focus:outline-none focus:ring-2 focus:ring-[#7c113b]/25">
            <HeartPulse className="h-6 w-6 text-[#7c113b]" />
            <span className="mt-4 block font-bold text-[#34272a]">{copy.userRole}</span>
            <span className="mt-1 block text-sm leading-relaxed text-[#6a5a5e]">{copy.participantDesc}</span>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#7c113b]">{copy.continueUser}<ArrowRight className="h-4 w-4" /></span>
          </button>
          <button type="button" onClick={onSelectDoctor} className="group rounded-2xl border border-[#dfcbd0] p-5 text-left transition hover:border-[#7c113b] hover:bg-[#fff8fa] focus:outline-none focus:ring-2 focus:ring-[#7c113b]/25">
            <ShieldCheck className="h-6 w-6 text-[#7c113b]" />
            <span className="mt-4 block font-bold text-[#34272a]">{copy.doctorChoice}</span>
            <span className="mt-1 block text-sm leading-relaxed text-[#6a5a5e]">{copy.professionalDesc}</span>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#7c113b]">{copy.login}<ArrowRight className="h-4 w-4" /></span>
          </button>
        </div>
      </section>
    </PortalShell>
  );
};

export const DoctorLogin: React.FC<DoctorLoginProps> = ({ lang, onLanguageChange, onBack, onLogin }) => {
  const copy = portalCopy[lang];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<'invalid' | 'session' | ''>('');
  const [forgotMessage, setForgotMessage] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setMessage('');
    setForgotMessage(false);
    setLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      const success = await onLogin(email, password, remember);
      if (!success) setMessage('invalid');
    } catch {
      setMessage('session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalShell lang={lang} onLanguageChange={onLanguageChange}>
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#ead5da] bg-white shadow-[0_18px_55px_rgba(124,17,59,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#7c113b] p-9 text-white lg:flex">
          <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full border-[36px] border-white/10" />
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <HeartPulse className="h-7 w-7 text-[#ffd9e0]" />
            </div>
            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em]">WOMEN360</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight">{copy.portal}</h1>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">{copy.secure}</p>
          </div>
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-relaxed text-white/90">
            <BadgeCheck className="h-5 w-5 shrink-0 text-[#ffd9e0]" />
            <p>{copy.demoNote}</p>
          </div>
        </aside>
        <div className="p-6 sm:p-9 lg:p-10">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6a5259] transition hover:text-[#7c113b]">
            <ArrowLeft className="h-4 w-4" /> {copy.back}
          </button>
          <div className="mt-7 lg:mt-2">
            <p className="text-sm font-bold text-[#7c113b] lg:hidden">{copy.portal}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#151d22]">{copy.login}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6a5a5e]">{copy.secure}</p>
          </div>
          <form onSubmit={submit} className="mt-7 space-y-5">
            <label className="block space-y-1.5 text-sm font-semibold text-[#34272a]">
              <span>{copy.email}</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c727a]" />
                <input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.emailPlaceholder} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] pl-10 pr-3.5 text-sm font-normal text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
              </span>
            </label>
            <label className="block space-y-1.5 text-sm font-semibold text-[#34272a]">
              <span>{copy.password}</span>
              <span className="relative block">
                <input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={copy.passwordPlaceholder} className="h-12 w-full rounded-xl border border-[#dfcbd0] bg-[#fffdfd] px-3.5 pr-12 text-sm font-normal text-[#151d22] placeholder:text-[#9b898e] outline-none transition focus:border-[#7c113b] focus:ring-2 focus:ring-[#7c113b]/15" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? (lang === 'en' ? 'Hide password' : 'పాస్‌వర్డ్ దాచండి') : (lang === 'en' ? 'Show password' : 'పాస్‌వర్డ్ చూపండి')} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#705b62] hover:bg-[#fff4f6] hover:text-[#7c113b]">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-[#514247]">
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 accent-[#7c113b]" />
                {copy.remember}
              </label>
              <button type="button" onClick={() => { setForgotMessage(true); setMessage(''); }} className="font-semibold text-[#7c113b] underline-offset-4 hover:underline">{copy.forgot}</button>
            </div>
            {forgotMessage && <p role="status" className="rounded-xl border border-[#dfcbd0] bg-[#fff8fa] p-3 text-sm leading-relaxed text-[#564146]">{copy.forgotMessage}</p>}
            {message && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">{message === 'invalid' ? copy.invalid : copy.sessionError}</p>}
            <button type="submit" disabled={loading} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7c113b] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#65102f] focus:outline-none focus:ring-2 focus:ring-[#7c113b]/30 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70">
              {loading ? copy.loggingIn : copy.loginButton}
            </button>
            <p className="text-center text-xs leading-relaxed text-[#76666a]">{copy.note}</p>
          </form>
        </div>
      </section>
    </PortalShell>
  );
};

export const AdminDashboardPlaceholder: React.FC<PortalProps> = ({ lang, onLanguageChange }) => {
  const copy = portalCopy[lang];
  return (
    <PortalShell lang={lang} onLanguageChange={onLanguageChange}>
      <section className="w-full max-w-xl rounded-3xl border border-[#ead5da] bg-white p-7 text-center shadow-sm">
        <ShieldCheck className="mx-auto h-9 w-9 text-[#7c113b]" />
        <h1 className="mt-4 font-display text-2xl font-bold text-[#151d22]">{copy.admin}</h1>
        <p className="mt-2 text-sm text-[#564146]">{copy.adminMessage}</p>
      </section>
    </PortalShell>
  );
};

const PortalShell: React.FC<PortalProps & { children: React.ReactNode }> = ({ lang, onLanguageChange, children }) => (
  <div className="flex min-h-screen flex-col bg-[#f6faff] text-[#151d22]">
    <header className="border-b border-[#dcbfc4]/60 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c113b]/30" aria-label="Women360">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7c113b] text-white"><HeartPulse className="h-5 w-5 text-[#ffd9e0]" /></span>
          <span className="font-display text-lg font-bold tracking-tight text-[#7c113b]">WOMEN360</span>
        </a>
        <LanguageToggle lang={lang} onLanguageChange={onLanguageChange} />
      </div>
    </header>
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
    <footer className="py-4 text-center text-xs text-[#76666a]">Women360</footer>
  </div>
);

const LanguageToggle: React.FC<PortalProps> = ({ lang, onLanguageChange }) => (
  <div className="inline-flex items-center rounded-full border border-[#dcbfc4]/80 bg-[#edf5fc] p-1" role="radiogroup" aria-label={lang === 'en' ? 'Language selection' : 'భాష ఎంపిక'}>
    <button type="button" role="radio" aria-checked={lang === 'en'} onClick={() => onLanguageChange('en')} className={`rounded-full px-3 py-1.5 text-xs font-bold ${lang === 'en' ? 'bg-[#7c113b] text-white' : 'text-[#564146]'}`}>English</button>
    <button type="button" role="radio" aria-checked={lang === 'te'} onClick={() => onLanguageChange('te')} className={`rounded-full px-3 py-1.5 text-xs font-bold ${lang === 'te' ? 'bg-[#7c113b] text-white' : 'text-[#564146]'}`}>తెలుగు</button>
  </div>
);
