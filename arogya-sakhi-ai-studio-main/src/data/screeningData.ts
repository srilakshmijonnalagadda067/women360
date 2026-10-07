import { ScreeningQuestion } from '../types';

export type AgeGroup = '10-19' | '20-29' | '30-44' | '45-59' | '60+';

export const AGE_GROUPS: {
  value: AgeGroup;
  labelEn: string;
  labelTe: string;
  available: boolean;
}[] = [
  { value: '10-19', labelEn: '10–19 · Adolescent Women', labelTe: '10–19 · కౌమార మహిళలు', available: true },
  { value: '20-29', labelEn: '20–29 · Adult Women', labelTe: '20–29 · వయోజన మహిళలు', available: true },
  { value: '30-44', labelEn: '30–44', labelTe: '30–44', available: false },
  { value: '45-59', labelEn: '45–59', labelTe: '45–59', available: false },
  { value: '60+', labelEn: '60+', labelTe: '60+', available: false },
];

const option = (value: string, labelEn: string, labelTe: string, points = 0) => ({
  value,
  points,
  labelEn,
  labelTe,
});

const question = (
  id: number,
  badgeEn: string,
  badgeTe: string,
  titleEn: string,
  titleTe: string,
  options: ScreeningQuestion['options'],
  units?: { en: string; te: string },
  subQuestions?: NonNullable<ScreeningQuestion['subQuestions']>,
): ScreeningQuestion => ({
  id,
  badgeEn,
  badgeTe,
  icon: 'health_and_safety',
  titleEn,
  titleTe,
  descEn: '',
  descTe: '',
  options,
  ...(subQuestions ? { subQuestions } : {}),
  ...(units ? { inputType: 'number' as const, unitEn: units.en, unitTe: units.te } : {}),
});

const teenMenstrual = ['Menstrual Health', 'రుతుక్రమ ఆరోగ్యం'] as const;
const teenSignals = ['PMOS/PCOS-related signals', 'PMOS/PCOS సంబంధిత సంకేతాలు'] as const;
const adultMenstrual = ['Menstrual Health', 'రుతుక్రమ ఆరోగ్యం'] as const;
const adultSignals = ['PMOS (formerly known as PCOS)', 'PMOS (గతంలో PCOSగా పిలిచేవారు)'] as const;
const measurements = ['Basic Measurements', 'ప్రాథమిక కొలతలు'] as const;

export const ADOLESCENT_QUESTIONS: ScreeningQuestion[] = [
  question(1, ...teenMenstrual, 'At what age did you have your first period (menarche)?', 'మీకు మొదటి పీరియడ్ ఏ వయసులో వచ్చింది?', [
    option('before-10', 'Before 10 years', '10 సంవత్సరాల కంటే ముందు'),
    option('10-11', '10–11 years', '10–11 సంవత్సరాలు'),
    option('12-13', '12–13 years', '12–13 సంవత్సరాలు'),
    option('14-15', '14–15 years', '14–15 సంవత్సరాలు'),
    option('16-plus', '16 years or later', '16 సంవత్సరాలు లేదా ఆ తర్వాత'),
    option('dont-remember', "Don't remember", 'గుర్తు లేదు'),
  ]),
  question(2, ...teenMenstrual, 'Are your periods usually regular?', 'మీ పీరియడ్స్ సాధారణంగా క్రమబద్ధంగా వస్తాయా?', [
    option('regular', 'Yes – usually regular', 'అవును – సాధారణంగా క్రమబద్ధంగా'),
    option('sometimes-irregular', 'Sometimes irregular', 'కొన్నిసార్లు క్రమం తప్పుతాయి'),
    option('frequently-irregular', 'Frequently irregular or delayed', 'తరచుగా క్రమం తప్పుతాయి లేదా ఆలస్యం అవుతాయి'),
    option('sometimes-skipped', 'Periods sometimes skipped', 'కొన్నిసార్లు పీరియడ్స్ రావు'),
  ]),
  question(3, ...teenMenstrual, 'Do you experience pain during menstruation?', 'పీరియడ్స్ సమయంలో మీకు నొప్పి ఉంటుందా?', [
    option('none', 'No or very little pain', 'నొప్పి లేదు లేదా చాలా తక్కువ'),
    option('mild', 'Mild pain', 'స్వల్ప నొప్పి'),
    option('moderate', 'Moderate pain — affects routine', 'మోస్తరు నొప్పి — దినచర్యను ప్రభావితం చేస్తుంది'),
    option('severe', 'Severe pain — affects school/college/daily activities', 'తీవ్రమైన నొప్పి — చదువు/దైనందిన పనులను ప్రభావితం చేస్తుంది'),
    option('very-severe', 'Very severe pain or regularly need pain medicine', 'చాలా తీవ్రమైన నొప్పి లేదా తరచుగా నొప్పి మందులు అవసరం'),
  ]),
  question(4, ...teenMenstrual, 'How would you describe your menstrual bleeding?', 'పీరియడ్స్ సమయంలో రక్తస్రావం ఎలా ఉంటుంది?', [
    option('light', 'Light', 'తక్కువ'),
    option('moderate', 'Moderate', 'మోస్తరు'),
    option('heavy', 'Heavy', 'ఎక్కువ'),
    option('very-heavy', 'Very heavy or interferes with daily activities', 'చాలా ఎక్కువ లేదా దైనందిన పనులకు అంతరాయం కలిగిస్తుంది'),
    option('not-sure', 'Not sure', 'ఖచ్చితంగా తెలియదు'),
  ]),
  question(5, ...teenSignals, 'Have you noticed any of these changes: persistent acne, unusual/excessive facial or body hair, or significant hair thinning/loss?', 'ఈ మార్పుల్లో ఏవైనా గమనించారా: నిరంతర మొటిమలు, ముఖం లేదా శరీరంపై అసాధారణంగా/అధికంగా రోమాలు పెరగడం, లేదా జుట్టు గణనీయంగా పలచబడటం/రాలడం?', [
    option('no', 'No', 'లేదు'),
    option('yes', 'Yes', 'అవును'),
    option('not-sure', 'Not sure', 'ఖచ్చితంగా తెలియదు'),
  ]),
  question(
    6,
    'Menstrual Hygiene',
    'రుతుస్రావ పరిశుభ్రత',
    'Menstrual hygiene and possible irritation',
    'రుతుస్రావ పరిశుభ్రత మరియు చికాకు',
    [],
    undefined,
    [
      {
        id: 61,
        titleEn: 'How regularly do you change your menstrual product during your period?',
        titleTe: 'పీరియడ్స్ సమయంలో ఉపయోగించే ఉత్పత్తిని ఎంత క్రమం తప్పకుండా మారుస్తారు?',
        options: [
          option('regularly', 'Regularly', 'క్రమం తప్పకుండా'),
          option('sometimes-delay', 'Sometimes I delay changing', 'కొన్నిసార్లు మార్చడం ఆలస్యం చేస్తాను'),
          option('frequently-delay', 'Frequently delay changing', 'తరచుగా మార్చడం ఆలస్యం చేస్తాను'),
          option('not-sure', 'Not sure', 'ఖచ్చితంగా తెలియదు'),
        ],
      },
      {
        id: 62,
        titleEn: 'During menstruation, do you experience unusual itching, burning, foul-smelling discharge or persistent irritation?',
        titleTe: 'పీరియడ్స్ సమయంలో అసాధారణ దురద, మంట, దుర్వాసనతో కూడిన స్రావం లేదా నిరంతర చికాకు ఉంటుందా?',
        options: [
          option('no', 'No', 'లేదు'),
          option('sometimes', 'Sometimes', 'కొన్నిసార్లు'),
          option('frequently', 'Frequently', 'తరచుగా'),
          option('not-sure', 'Not sure', 'ఖచ్చితంగా తెలియదు'),
        ],
      },
    ],
  ),
  question(
    7,
    'Diet & Physical Activity',
    'ఆహారం & శారీరక చురుకుదనం',
    'Food variety and physical activity',
    'ఆహార వైవిధ్యం మరియు శారీరక చురుకుదనం',
    [],
    undefined,
    [
      {
        id: 71,
        titleEn: 'How often do you eat fruits, vegetables and protein-rich foods?',
        titleTe: 'పండ్లు, కూరగాయలు మరియు ప్రోటీన్ అధికంగా ఉన్న ఆహారాన్ని ఎంత తరచుగా తీసుకుంటారు?',
        descEn: 'Examples: dal/pulses, eggs, milk/curd, paneer, soy, nuts, fish or chicken.',
        descTe: 'ఉదాహరణలు: పప్పులు, గుడ్లు, పాలు/పెరుగు, పనీర్, సోయా, గింజలు, చేపలు లేదా చికెన్.',
        options: [
          option('daily', 'Daily', 'ప్రతిరోజూ'),
          option('4-6-days', '4–6 days a week', 'వారానికి 4–6 రోజులు'),
          option('1-3-days', '1–3 days a week', 'వారానికి 1–3 రోజులు'),
          option('rarely', 'Rarely', 'అరుదుగా'),
        ],
      },
      {
        id: 72,
        titleEn: 'How often do you engage in physical activity?',
        titleTe: 'మీరు ఎంత తరచుగా శారీరక శ్రమ చేస్తారు?',
        options: [
          option('regular', 'Regularly — 30+ minutes most days', 'క్రమం తప్పకుండా — చాలా రోజుల్లో 30+ నిమిషాలు'),
          option('sometimes', 'Sometimes — 1–2 times a week', 'కొన్నిసార్లు — వారానికి 1–2 సార్లు'),
          option('rarely', 'Rarely — little or no exercise', 'అరుదుగా — తక్కువ లేదా వ్యాయామం లేదు'),
        ],
      },
    ],
  ),
  question(8, 'Stress & Wellbeing', 'ఒత్తిడి & శ్రేయస్సు', 'Have you experienced significant stress recently?', 'ఇటీవల మీకు గణనీయమైన ఒత్తిడి కలిగిందా?', [
    option('no', 'No', 'లేదు'),
    option('sometimes', 'Sometimes', 'కొన్నిసార్లు'),
    option('frequently', 'Frequently', 'తరచుగా'),
    option('almost-daily', 'Almost every day', 'దాదాపు ప్రతిరోజూ'),
  ]),
  question(26, ...measurements, 'Height', 'ఎత్తు', [], { en: 'cm', te: 'సెం.మీ.' }),
  question(27, ...measurements, 'Weight', 'బరువు', [], { en: 'kg', te: 'కిలోలు' }),
];

export const ADULT_QUESTIONS: ScreeningQuestion[] = [
  question(101, ...adultMenstrual, 'How many days are there usually from the first day of one period to the first day of your next period?', 'ఒక పీరియడ్ మొదటి రోజు నుంచి తదుపరి పీరియడ్ మొదటి రోజు వరకు సాధారణంగా ఎన్ని రోజులు ఉంటాయి?', [
    option('under-21', 'Less than 21 days', '21 రోజుల కంటే తక్కువ'),
    option('21-35', '21–35 days', '21–35 రోజులు'),
    option('over-35', 'More than 35 days', '35 రోజుల కంటే ఎక్కువ'),
    option('varies', 'It varies a lot / Not sure', 'చాలా మారుతూ ఉంటుంది / ఖచ్చితంగా తెలియదు'),
    option('no-periods', 'I do not have periods', 'నాకు పీరియడ్స్ రావు'),
  ]),
  question(102, ...adultMenstrual, 'How long does your period usually last?', 'మీ పీరియడ్ సాధారణంగా ఎన్ని రోజులు ఉంటుంది?', [
    option('1-7-days', '1–7 days', '1–7 రోజులు'),
    option('over-7', 'More than 7 days', '7 రోజుల కంటే ఎక్కువ'),
    option('varies', 'It varies / Not sure', 'మారుతూ ఉంటుంది / ఖచ్చితంగా తెలియదు'),
    option('no-periods', 'I do not have periods', 'నాకు పీరియడ్స్ రావు'),
  ]),
  question(103, ...adultMenstrual, 'Do you sometimes have unusually heavy bleeding during your period?', 'పీరియడ్స్ సమయంలో కొన్నిసార్లు అసాధారణంగా ఎక్కువ రక్తస్రావం ఉంటుందా?', [
    option('never', 'Never', 'ఎప్పుడూ లేదు'),
    option('sometimes', 'Sometimes', 'కొన్నిసార్లు'),
    option('often', 'Often', 'తరచుగా'),
  ]),
  question(104, ...adultMenstrual, 'How much does period pain interfere with your normal activities, studying, working, sleeping, or daily life?', 'పీరియడ్ నొప్పి మీ సాధారణ పనులు, చదువు, ఉద్యోగం, నిద్ర లేదా దైనందిన జీవితానికి ఎంత అంతరాయం కలిగిస్తుంది?', [
    option('not-at-all', 'Not at all', 'అస్సలు లేదు'),
    option('a-little', 'A little', 'కొద్దిగా'),
    option('moderately', 'Moderately', 'మోస్తరుగా'),
    option('a-lot', 'A lot / Extremely', 'చాలా / తీవ్రముగా'),
  ]),
  question(105, ...adultSignals, 'Have you noticed irregular periods together with persistent acne or increased facial/body hair?', 'క్రమం తప్పిన పీరియడ్స్‌తో పాటు మొండి మొటిమలు లేదా ముఖం/శరీరంపై అధిక రోమాలు గమనించారా?', [
    option('no', 'No', 'లేదు'),
    option('yes', 'Yes', 'అవును'),
    option('not-sure', 'Not sure', 'ఖచ్చితంగా తెలియదు'),
  ]),
  question(106, 'Anaemia-related Awareness', 'రక్తహీనత సంబంధిత అవగాహన', 'Do you often feel unusually tired, weak, dizzy, or short of breath during normal activities?', 'సాధారణ పనులు చేస్తున్నప్పుడు అసాధారణ అలసట, బలహీనత, తల తిరగడం లేదా ఊపిరి తీసుకోవడంలో ఇబ్బంది తరచుగా కలుగుతుందా?', [
    option('never', 'Never', 'ఎప్పుడూ లేదు'),
    option('sometimes', 'Sometimes', 'కొన్నిసార్లు'),
    option('often', 'Often', 'తరచుగా'),
  ]),
  question(107, 'Health History', 'ఆరోగ్య చరిత్ర', 'Have you ever been told by a healthcare professional that you have high blood pressure, high blood sugar/diabetes, or another condition that needs regular monitoring?', 'మీకు అధిక రక్తపోటు, అధిక రక్త చక్కెర/మధుమేహం లేదా క్రమం తప్పకుండా పర్యవేక్షించాల్సిన మరో పరిస్థితి ఉందని ఆరోగ్య నిపుణుడు ఎప్పుడైనా చెప్పారా?', [
    option('no', 'No', 'లేదు'),
    option('yes', 'Yes', 'అవును'),
    option('not-sure', 'Not sure', 'ఖచ్చితంగా తెలియదు'),
    option('prefer-not', 'Prefer not to answer', 'సమాధానం ఇవ్వకూడదనుకుంటున్నాను'),
  ]),
  question(108, 'Reproductive & Preconception Health', 'ప్రజనన & గర్భధారణకు ముందు ఆరోగ్యం', 'Which best describes your current situation?', 'ప్రస్తుతం మీ పరిస్థితిని ఏది బాగా వివరిస్తుంది?', [
    option('not-planning', 'Not planning pregnancy', 'గర్భధారణను ప్లాన్ చేయడం లేదు'),
    option('future', 'May consider pregnancy in the future', 'భవిష్యత్తులో గర్భధారణను పరిగణించవచ్చు'),
    option('planning-pregnancy', 'Planning pregnancy', 'గర్భధారణను ప్లాన్ చేస్తున్నాను'),
    option('currently-pregnant', 'Currently pregnant', 'ప్రస్తుతం గర్భవతిని'),
    option('prefer-not', 'Prefer not to answer', 'సమాధానం ఇవ్వకూడదనుకుంటున్నాను'),
  ]),
  question(111, ...measurements, 'Height', 'ఎత్తు', [], { en: 'cm', te: 'సెం.మీ.' }),
  question(112, ...measurements, 'Weight', 'బరువు', [], { en: 'kg', te: 'కిలోలు' }),
];

export const SCREENING_BY_AGE: Record<AgeGroup, ScreeningQuestion[]> = {
  '10-19': ADOLESCENT_QUESTIONS,
  '20-29': ADULT_QUESTIONS,
  '30-44': [],
  '45-59': [],
  '60+': [],
};
