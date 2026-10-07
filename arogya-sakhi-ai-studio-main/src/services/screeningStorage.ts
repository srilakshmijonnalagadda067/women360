import { ScreeningRecord } from '../types';

const STORAGE_KEY = 'women360_screening_records';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isScreeningRecord = (value: unknown): value is ScreeningRecord => {
  if (!isObject(value)) return false;
  const validAnswers = Array.isArray(value.answers) && value.answers.every((answer) =>
    isObject(answer) &&
    typeof answer.questionId === 'number' &&
    typeof answer.questionEn === 'string' &&
    typeof answer.questionTe === 'string' &&
    typeof answer.answerEn === 'string' &&
    typeof answer.answerTe === 'string');
  const validRiskAreas = Array.isArray(value.riskAreas) && value.riskAreas.every((area) =>
    isObject(area) &&
    typeof area.labelEn === 'string' &&
    typeof area.labelTe === 'string' &&
    ['low', 'awareness', 'discussion', 'moderate', 'high'].includes(String(area.status)));
  return typeof value.id === 'string' &&
    (value.ageGroup === '10-19' || value.ageGroup === '20-29') &&
    (value.screeningType === 'ADOLESCENT' || value.screeningType === 'ADULT_20_29') &&
    typeof value.screeningDate === 'string' &&
    typeof value.completedAt === 'string' &&
    ['LOW', 'MODERATE', 'HIGH'].includes(String(value.riskLevel)) &&
    validAnswers &&
    validRiskAreas &&
    (value.participantId === undefined || typeof value.participantId === 'string') &&
    (value.participantName === undefined || typeof value.participantName === 'string') &&
    (value.dateOfBirth === undefined || typeof value.dateOfBirth === 'string') &&
    (value.age === undefined || (typeof value.age === 'number' && Number.isFinite(value.age))) &&
    (value.schoolCollege === undefined || typeof value.schoolCollege === 'string') &&
    (value.mobileWhatsapp === undefined || typeof value.mobileWhatsapp === 'string') &&
    (value.preferredLanguage === undefined || typeof value.preferredLanguage === 'string') &&
    (value.heightCm === undefined || (typeof value.heightCm === 'number' && Number.isFinite(value.heightCm))) &&
    (value.weightKg === undefined || (typeof value.weightKg === 'number' && Number.isFinite(value.weightKg))) &&
    (value.bmi === undefined || (typeof value.bmi === 'number' && Number.isFinite(value.bmi))) &&
    (value.participantConsent === undefined || typeof value.participantConsent === 'string') &&
    (value.guardianConsent === undefined || typeof value.guardianConsent === 'string') &&
    (value.followUpPermissions === undefined ||
      (Array.isArray(value.followUpPermissions) && value.followUpPermissions.every((permission) => typeof permission === 'string')));
};

export function getScreeningRecords(): ScreeningRecord[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      console.error('Women360 screening records are invalid; expected a list.');
      return [];
    }
    return parsed.filter(isScreeningRecord);
  } catch (error) {
    console.error('Unable to read Women360 screening records.', error);
    return [];
  }
}

export function saveScreeningRecord(record: ScreeningRecord): void {
  try {
    const records = getScreeningRecords();
    const nextRecords = [...records];
    const index = nextRecords.findIndex((existing) => existing.id === record.id);

    if (index >= 0) {
      nextRecords[index] = record;
    } else {
      nextRecords.push(record);
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
  } catch (error) {
    console.error('Unable to save the Women360 screening record.', error);
    throw error;
  }
}

export function getScreeningRecordById(id: string): ScreeningRecord | undefined {
  return getScreeningRecords().find((record) => record.id === id);
}

export function deleteScreeningRecord(id: string): boolean {
  try {
    const records = getScreeningRecords();
    const filtered = records.filter((record) => record.id !== id);
    const removed = filtered.length !== records.length;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return removed;
  } catch (error) {
    console.error('Unable to delete the Women360 screening record.', error);
    return false;
  }
}

export function clearScreeningRecords(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Unable to clear the Women360 screening records.', error);
    throw error;
  }
}
