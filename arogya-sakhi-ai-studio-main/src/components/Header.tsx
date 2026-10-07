import React from 'react';
import { HeartPulse, Phone, Globe } from 'lucide-react';
import { Language, AppView } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  currentView,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#dcbfc4]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Women360 Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#7c113b] text-white flex items-center justify-center shadow-sm group-hover:bg-[#630a2d] transition-colors">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd9e0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg sm:text-xl text-[#7c113b] tracking-tight">
                  Women360
                </span>
                <span className="hidden xs:inline-block px-2 py-0.5 text-[11px] font-semibold bg-[#ffd9e0] text-[#7c113b] rounded-full">
                  {lang === 'en' ? 'PCOS Hub' : 'PCOS హబ్'}
                </span>
              </div>
              <p className="text-[11px] text-[#564146] font-medium hidden sm:block">
                {lang === 'en' ? 'Women’s Health & Hormonal Care' : 'మహిళల ఆరోగ్య సంరక్షణ వేదిక'}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-link-home"
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'home'
                  ? 'bg-[#ffd9e0] text-[#7c113b]'
                  : 'text-[#564146] hover:bg-[#edf5fc] hover:text-[#151d22]'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              id="nav-link-learn"
              onClick={() => onNavigate('learn')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'learn'
                  ? 'bg-[#ffd9e0] text-[#7c113b]'
                  : 'text-[#564146] hover:bg-[#edf5fc] hover:text-[#151d22]'
              }`}
            >
              {t.nav.learn}
            </button>
            <button
              id="nav-link-risk"
              onClick={() => onNavigate('screening')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'screening' || currentView === 'result'
                  ? 'bg-[#ffd9e0] text-[#7c113b]'
                  : 'text-[#564146] hover:bg-[#edf5fc] hover:text-[#151d22]'
              }`}
            >
              {t.nav.risk}
            </button>
            <button
              id="nav-link-wellness"
              onClick={() => onNavigate('wellness')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'wellness'
                  ? 'bg-[#ffd9e0] text-[#7c113b]'
                  : 'text-[#564146] hover:bg-[#edf5fc] hover:text-[#151d22]'
              }`}
            >
              {t.nav.wellness}
            </button>
          </nav>

          {/* Right Action Bar: 104 Helpline & Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 104 Helpline Quick Dial */}
            <a
              id="helpline-104-badge"
              href="tel:104"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#b0f0d8]/50 text-[#2b6957] hover:bg-[#b0f0d8] text-xs font-bold transition-colors border border-[#2b6957]/20"
              title="Government Healthcare Helpline 104"
            >
              <Phone className="w-3.5 h-3.5 text-[#2b6957]" />
              <span>104 {lang === 'en' ? 'Helpline' : 'సహాయవాణి'}</span>
            </a>

            {/* Language Switcher Pill */}
            <div
              id="language-switcher"
              className="inline-flex items-center p-1 bg-[#edf5fc] border border-[#dcbfc4]/80 rounded-full shadow-inner"
              role="radiogroup"
              aria-label="Language selection"
            >
              <button
                id="lang-btn-en"
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-[#7c113b] text-white shadow-sm'
                    : 'text-[#564146] hover:text-[#7c113b]'
                }`}
                aria-checked={lang === 'en'}
                role="radio"
              >
                EN
              </button>
              <button
                id="lang-btn-te"
                type="button"
                onClick={() => onLanguageChange('te')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === 'te'
                    ? 'bg-[#7c113b] text-white shadow-sm'
                    : 'text-[#564146] hover:text-[#7c113b]'
                }`}
                aria-checked={lang === 'te'}
                role="radio"
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
