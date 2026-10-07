import React from 'react';
import { Home, BookOpen, ClipboardCheck, Sparkles } from 'lucide-react';
import { Language, AppView } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BottomNavProps {
  lang: Language;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  lang,
  currentView,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dcbfc4]/80 px-2 py-1.5 shadow-lg">
      <nav className="grid grid-cols-4 items-center max-w-md mx-auto" aria-label="Mobile Navigation">
        <button
          id="bottom-nav-home"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'home'
              ? 'text-[#7c113b] font-bold'
              : 'text-[#564146] hover:text-[#7c113b]'
          }`}
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
            {t.nav.home}
          </span>
        </button>

        <button
          id="bottom-nav-learn"
          onClick={() => onNavigate('learn')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'learn'
              ? 'text-[#7c113b] font-bold'
              : 'text-[#564146] hover:text-[#7c113b]'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${currentView === 'learn' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
            {t.nav.learn}
          </span>
        </button>

        <button
          id="bottom-nav-risk"
          onClick={() => onNavigate('screening')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'screening' || currentView === 'result'
              ? 'text-[#7c113b] font-bold'
              : 'text-[#564146] hover:text-[#7c113b]'
          }`}
        >
          <ClipboardCheck className={`w-5 h-5 ${currentView === 'screening' || currentView === 'result' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
            {t.nav.risk}
          </span>
        </button>

        <button
          id="bottom-nav-wellness"
          onClick={() => onNavigate('wellness')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'wellness'
              ? 'text-[#7c113b] font-bold'
              : 'text-[#564146] hover:text-[#7c113b]'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${currentView === 'wellness' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
            {t.nav.wellness}
          </span>
        </button>
      </nav>
    </div>
  );
};
