# Women360 age-wise screening

## Available questionnaires

- **10–19 — Adolescent Women:** Eight screening sections condensed from the doctor-provided source questionnaire: menarche, menstrual regularity, period pain, menstrual bleeding, PMOS/PCOS-related signals, menstrual hygiene/possible irritation, food variety/physical activity, and stress/wellbeing. Sections 6 and 7 each collect two source-based answers on one screen. Height and weight follow the eight questions.
- **20–29 — Adult Women:** Eight adult-focused questions covering cycle length, period duration, heavy bleeding, pain impact, PMOS-related signals, anaemia-related awareness, monitored health history, and reproductive/preconception health. Height and weight follow the questions. The UI uses **Adult Women — 20–29 Years**.
- **30–44, 45–59 and 60+:** Coming Soon. No screening questions are configured.

Both screenings are bilingual English/Telugu and use one question per screen, required-answer validation, progress, and back/next navigation. The adolescent flow includes optional participant details, consent/assent/privacy acknowledgements and optional follow-up preferences before the questionnaire. These values remain in the active component session and are not written to the saved result or browser storage. Selecting follow-up preferences does not initiate contact or trigger home visits.

## Results and BMI

Results use response-level categories rather than total scores; overall status prioritizes high, then moderate, then low. The condensed adolescent questionnaire is a prototype for clinical review and validation, not a clinically validated instrument or diagnosis. It presents areas for awareness, recommended next steps, a PMOS/PCOS health message, and an important disclaimer.

BMI is calculated as weight in kg divided by height in metres squared. Adolescent BMI is shown only as a measurement and requires age- and sex-specific growth-reference interpretation by a qualified professional; adult BMI categories are not applied. Adult BMI is informational and does not determine risk.

Results include the selected age group, answers, height, weight, calculated BMI, categories and completion timestamp. They are saved in browser local storage for the existing saved-result action and remain local to that browser/device; there is no user account association.

## Evidence, consent and review

The result includes bilingual evidence cards with short summaries, source organization, topic and official-source links. Evidence summaries are educational and are not medical advice.

The adolescent participant details and consent/follow-up interface is prototype-only. It does not provide legal consent compliance or replace the organisation's applicable privacy/data notice, approved assent, guardian consent, safeguarding or follow-up procedures. Avoid using optional personal data fields until the applicable privacy notice and data handling process are approved.

The current application has no login, role-based dashboard, or configuration/admin review area. The result explicitly marks doctor/clinical review as pending; no clinical validation is claimed.
