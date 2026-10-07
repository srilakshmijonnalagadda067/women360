export type Language = 'en' | 'te';
export type AppView = 'home' | 'learn' | 'screening' | 'result' | 'wellness';

export interface QuestionOption {
  value: string;
  points: number;
  labelEn: string;
  labelTe: string;
  subEn?: string;
  subTe?: string;
  factorTextEn?: string;
  factorTextTe?: string;
  signal?: 'moderate' | 'high' | 'discussion';
}

export interface ScreeningQuestion {
  id: number;
  badgeEn: string;
  badgeTe: string;
  icon: string;
  titleEn: string;
  titleTe: string;
  descEn: string;
  descTe: string;
  options: QuestionOption[];
  allowMultiple?: boolean;
  inputType?: 'number';
  unitEn?: string;
  unitTe?: string;
  subQuestions?: Array<{
    id: number;
    titleEn: string;
    titleTe: string;
    descEn?: string;
    descTe?: string;
    options: QuestionOption[];
  }>;
}

export interface UserResponses {
  [questionId: number]: {
    value: string;
    points: number;
    optionIndex: number;
  };
}

export type RiskTier = 'lower' | 'moderate' | 'higher';

export interface RiskResult {
  score: number;
  maxScore: number;
  tier: RiskTier;
  tierLabelEn: string;
  tierLabelTe: string;
  descriptionEn: string;
  descriptionTe: string;
  factors: Array<{
    titleEn: string;
    titleTe: string;
    responseEn: string;
    responseTe: string;
    points: number;
  }>;
  ageGroup: string;
  completedAt?: string;
  screeningAssessment?: {
    categories: Array<{
      categoryEn: string;
      categoryTe: string;
      status: 'low' | 'moderate' | 'high' | 'discussion' | 'awareness';
      messageEn: string;
      messageTe: string;
      nextStepEn?: string;
      nextStepTe?: string;
    }>;
    bmi?: number;
    pregnancyPath?: 'preconception' | 'pregnancy';
  };
}

export type ScreeningRiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface ScreeningAnswer {
  questionId: number;
  questionEn: string;
  questionTe: string;
  answerEn: string;
  answerTe: string;
}

export interface ScreeningRiskArea {
  labelEn: string;
  labelTe: string;
  status: NonNullable<RiskResult['screeningAssessment']>['categories'][number]['status'];
}

export interface ScreeningRecord {
  id: string;
  participantId?: string;
  participantName?: string;
  dateOfBirth?: string;
  age?: number;
  ageGroup: '10-19' | '20-29';
  schoolCollege?: string;
  mobileWhatsapp?: string;
  preferredLanguage?: string;
  screeningDate: string;
  screeningType: 'ADOLESCENT' | 'ADULT_20_29';
  answers: ScreeningAnswer[];
  riskLevel: ScreeningRiskLevel;
  riskAreas: ScreeningRiskArea[];
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  participantConsent?: string;
  guardianConsent?: string;
  followUpPermissions?: string[];
  completedAt: string;
}

export interface ScreeningParticipantDetails {
  participantId?: string;
  participantName?: string;
  dateOfBirth?: string;
  age?: number;
  schoolCollege?: string;
  mobileWhatsapp?: string;
  preferredLanguage?: string;
  screeningDate?: string;
  participantConsent?: string;
  guardianConsent?: string;
  followUpPermissions?: string[];
}
