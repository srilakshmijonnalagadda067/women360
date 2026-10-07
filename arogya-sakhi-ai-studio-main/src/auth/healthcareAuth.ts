export const HEALTHCARE_ROLE = 'HEALTHCARE_PROFESSIONAL';
const SESSION_KEY = 'women360-auth-session-v1';

// Prototype verifier; replace this function with the production authentication API.
export async function authenticateHealthcareProfessional(
  email: string,
  password: string,
): Promise<boolean> {
  return email.trim().toLowerCase() === 'doctor@women360.demo' &&
    password === 'Doctor@123';
}

export function getStoredRole(): string | null {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) ??
      window.localStorage.getItem(SESSION_KEY);
  } catch (error) {
    console.error('Unable to read the Women360 authentication session.', error);
    return null;
  }
}

export function saveHealthcareSession(remember: boolean): void {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(SESSION_KEY);
    const storage = remember ? window.localStorage : window.sessionStorage;
    storage.setItem(SESSION_KEY, HEALTHCARE_ROLE);
  } catch (error) {
    console.error('Unable to save the Women360 healthcare session.', error);
    throw error;
  }
}

export function clearAuthenticationSession(): void {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Unable to clear the Women360 authentication session.', error);
    throw error;
  }
}
