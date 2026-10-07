export const TRANSLATIONS = {
  en: {
    appTitle: "Women360",
    appSubtitle: "PCOS Health & Screening Hub",
    telanganaHelpline: "104 Women's Helpline",
    policeHelpline: "1091 Women Helpline",
    nav: {
      home: "Home",
      learn: "Learn PCOS",
      risk: "Risk Check",
      wellness: "Wellness"
    },
    hero: {
      badge: "Understand. Screen. Take Care.",
      title: "Your Companion for PCOS Awareness & Women's Wellness",
      desc: "Learn about PCOS, understand your symptoms, and get an early risk indication with simple, compassionate guidance.",
      startScreening: "Start Risk Screening",
      learnMore: "Learn About PCOS",
      confidentialNote: "Confidential, culturally sensitive & available in English & తెలుగు."
    },
    advisory: {
      title: "TRUST & SAFETY ADVISORY • Screening vs. Clinical Diagnosis",
      body: "Women360 is an educational and early risk-screening tool, NOT a clinical diagnostic tool. It helps identify potential risk patterns based on established guidelines, but does not provide medical prescriptions, lab reports, or definitive clinical diagnoses. Always consult a qualified gynecologist or physician for proper medical evaluation, ultrasound scans, and hormonal blood panels."
    },
    services: {
      title: "Comprehensive Care Modules",
      subtitle: "Empowering every woman with scientific clarity and personalized holistic routines.",
      learnCard: {
        tag: "Awareness & Education",
        title: "Learn About PCOS",
        desc: "Understand symptoms, biological causes, evidence-based facts and debunk common myths.",
        cta: "Explore Knowledge Hub"
      },
      screeningCard: {
        tag: "Early Risk Screening",
        title: "Age-wise Health Screening",
        desc: "Choose your age group to begin a short, bilingual women’s health screening.",
        cta: "Choose Age Group"
      },
      wellnessCard: {
        tag: "Personalized Wellness",
        title: "Lifestyle & Routine Guide",
        desc: "Receive nutrition habits, gentle movement, circadian sleep routines, and self-care tips.",
        cta: "View Wellness Plan"
      }
    },
    educationSection: {
      badge: "Educational Hub",
      title: "Understanding PCOS with Clarity & Compassion",
      subtitle: "Polycystic Ovary Syndrome affects roughly 1 in 5 Indian women during their reproductive years.",
      tabs: {
        overview: "What is PCOS?",
        symptoms: "Signs & Indicators",
        spectrum: "Every Body is Unique",
        myths: "Myth vs. Fact",
        whenToConsult: "When to See a Doctor"
      },
      overviewContent: {
        h3: "A Manageable Hormonal & Metabolic Harmony Challenge",
        p1: "PCOS (Polycystic Ovary Syndrome) is not a disease, but an endocrine condition characterized by a delicate hormonal imbalance involving androgens (male hormones naturally present in small amounts) and insulin resistance.",
        p2: "When ovulation is irregular or delayed, fluid-filled immature follicles (often called cysts) can form on ovaries. With thoughtful nutritional changes, rhythmic daily movement, and medical guidance, symptoms can be effectively balanced.",
        stats: [
          { value: "1 in 5", label: "Indian women of reproductive age experience PCOS markers" },
          { value: "70%", label: "Cases remain undiagnosed due to stigma or lack of open conversation" },
          { value: "100%", label: "Manageable with early awareness, lifestyle harmony & clinical guidance" }
        ]
      },
      symptomsList: [
        {
          icon: "Calendar",
          title: "Irregular or Absent Cycles",
          desc: "Cycles longer than 35 days, fewer than 8 cycles a year, or completely missed periods due to delayed ovulation."
        },
        {
          icon: "Sparkles",
          title: "Persistent Hormonal Acne",
          desc: "Breakouts primarily localized along the lower third of the face, chin, jawline, and upper chest."
        },
        {
          icon: "Scissors",
          title: "Hirsutism (Coarse Body Hair)",
          desc: "Darker, coarser hair growth on upper lip, chin, chest, inner thighs, or abdominal midline."
        },
        {
          icon: "TrendingDown",
          title: "Scalp Thinning & Hair Loss",
          desc: "Female pattern hair thinning, particularly noticeable widening at the center hair partition or crown."
        },
        {
          icon: "Activity",
          title: "Weight Resistance & Belly Fat",
          desc: "Difficulty losing weight despite calorie control, often linked to cellular insulin resistance."
        },
        {
          icon: "Moon",
          title: "Fatigue & Sudden Mood Swings",
          desc: "Post-meal energy crashes, brain fog, anxiety, and low mood correlated with fluctuating blood glucose."
        }
      ],
      spectrumNotice: {
        title: "PCOS is Not One-Size-Fits-All",
        desc: "You can have PCOS with or without excess weight (lean PCOS), with or without acne. Symptoms can change across different life stages. That is why personalized lifestyle care and medical partnership are essential."
      },
      mythsList: [
        {
          myth: "Myth: PCOS means you can never conceive or have children.",
          fact: "Fact: PCOS is one of the most treatable causes of subfertility. Most women with PCOS have healthy pregnancies with lifestyle modifications and medical support."
        },
        {
          myth: "Myth: Only women who are overweight develop PCOS.",
          fact: "Fact: Up to 20-30% of women diagnosed have 'Lean PCOS', maintaining standard or low BMI while having hormonal or ovarian symptoms."
        },
        {
          myth: "Myth: If you have irregular periods, you definitely have PCOS.",
          fact: "Fact: Irregular cycles can stem from thyroid imbalances, hyperprolactinemia, stress, or nutritional deficiencies. Clinical tests are required."
        },
        {
          myth: "Myth: Birth control pills are the only medical solution.",
          fact: "Fact: Oral contraceptives regulate bleeding, but dietary balance, insulin sensitizing habits, stress regulation, and holistic lifestyle are foundational."
        }
      ],
      whenToSeeDoctor: [
        "Your menstrual periods have stopped completely for more than 3 consecutive months (and you are not pregnant).",
        "Severe, debilitating abdominal cramps or excessively heavy bleeding soaking a pad every 1-2 hours.",
        "Rapid or sudden onset of coarse facial hair growth or severe deepening of voice.",
        "Experiencing difficulty conceiving after 6 to 12 months of active trying.",
        "Unexplained extreme fatigue, excessive thirst, or sudden dark velvet patches on the neck (Acanthosis Nigricans)."
      ]
    },
    screening: {
      stepperTitle: "Women360 Health Screening",
      stepperSubtitle: "Answer based on your own experience.",
      questionProgress: "Question",
      of: "of",
      btnBack: "Back",
      btnNext: "Next Question",
      btnSubmit: "View My Risk Result",
      selectPrompt: "Please select an answer to continue",
      accordionTitle: "Why we ask these questions (Medical rationale)",
      accordionText: "Your answers can help identify health topics to discuss with a qualified healthcare professional. This questionnaire is for awareness only and is not a diagnosis."
    },
    result: {
      headerBadge: "CONFIDENTIAL SCREENING ASSESSMENT",
      title: "Your Early PCOS Risk Result",
      scoreLabel: "Total Calculated Score",
      scoreOutOf: "Screening score — not a diagnosis",
      riskBadge: {
        lower: "Lower Risk",
        moderate: "Moderate Risk",
        higher: "Higher Risk"
      },
      tierExpl: {
        lower: "Your responses suggest a lower likelihood of classic PCOS-associated traits at this time. Continuing proactive nutrition, stress balance, and regular physical movement helps maintain strong hormonal rhythm.",
        moderate: "Your answers indicate several physiological signs commonly observed in individuals experiencing hormonal imbalances or early PCOS patterns. A conversation with a healthcare professional can provide clarity.",
        higher: "Your assessment logged multiple significant markers frequently associated with PCOS, such as ovulatory delays and androgen-related signs. We strongly recommend scheduling a clinical evaluation with a gynecologist."
      },
      scaleTitle: "Rotterdam-Aligned Risk Spectrum",
      scaleLabels: ["Lower attention", "Moderate attention", "Higher attention"],
      factorsTitle: "Key Factors from Your Assessment",
      factorsSubtitle: "Breakdown of how your responses mapped to our validated risk screening matrix:",
      nextStepsTitle: "What Your Result Means & Recommended Next Steps",
      nextStepsList: [
        {
          step: "1",
          title: "Schedule a Gynecologist Consultation",
          desc: "Show this summary to your doctor. They may recommend pelvic ultrasound imaging, thyroid testing, and fasting insulin/lipid blood work."
        },
        {
          step: "2",
          title: "Track Your Cycle & Symptoms for 60 Days",
          desc: "Note dates of bleeding, cycle length, acne flare-ups, and energy dips. Consistent logs help your doctor reach an accurate clinical evaluation."
        },
        {
          step: "3",
          title: "Begin Hormone-Nourishing Daily Habits",
          desc: "Focus on blood sugar stability: eat protein and fiber first, drink water, take 15-minute walks after meals, and prioritize 7-8 hours of sleep."
        }
      ],
      doctorPrepBtn: "Download Doctor Visit Guide",
      viewWellnessBtn: "View Wellness Guidance",
      retakeBtn: "Retake Screening",
      helplineCardTitle: "Free Health Advisory Support in Telangana & AP",
      helpline104Desc: "Government Health Information & Counseling Helpline (Toll-Free 24/7)",
      disclaimer: "This screening result is for awareness and educational purposes only. It does not diagnose PCOS. Please consult a qualified healthcare professional for proper evaluation and diagnosis."
    },
    wellness: {
      badge: "Holistic Lifestyle Rhythms",
      title: "Personalized Wellness Guidance",
      subtitle: "Nourish your endocrine system with sustainable, gentle daily habits rooted in modern science and local wisdom.",
      disclaimerNotice: "Lifestyle suggestions support general wellbeing and are not a substitute for clinical therapies, prescribed medications, or diagnostic medical treatments.",
      pillars: [
        {
          id: "nutrition",
          icon: "Apple",
          name: "1. Balanced Nutrition",
          tag: "Insulin Sensitivity",
          summary: "Stabilize blood glucose to soothe androgen spikes.",
          points: [
            "Order of eating: Start meals with fiber (raw salad, palak, cucumbers), follow with protein (dal, paneer, eggs, sprouts), and end with complex carbs (millets, brown rice, jowar).",
            "Incorporate whole Indian grains: Replace refined maida/white rice with ragi, bajra, foxtail millet (korra) and unpolished pulses.",
            "Healthy fats for hormone synthesis: Include a handful of soaked almonds, walnuts, flaxseeds (alsi), and chia seeds daily.",
            "Avoid crash or restrictive diets: Severe calorie deprivation elevates cortisol, worsening menstrual irregularities."
          ]
        },
        {
          id: "movement",
          icon: "Activity",
          name: "2. Physical Activity",
          tag: "Metabolic Rhythm",
          summary: "Gentle, consistent movement that honors your body.",
          points: [
            "15-minute post-meal stroll: A casual walk after lunch and dinner rapidly clears glucose spikes without stressing adrenals.",
            "Strength and resistance training: 2 to 3 days weekly helps muscle cells absorb glucose independent of insulin.",
            "Restorative Yoga: Asanas like Supta Baddha Konasana (Reclining Bound Angle), Bhujangasana (Cobra), and Malasana (Garland pose) improve pelvic blood circulation.",
            "Avoid chronic over-exhaustion: High-intensity workouts without rest can spike stress hormones."
          ]
        },
        {
          id: "sleep",
          icon: "Moon",
          name: "3. Sleep Rhythm",
          tag: "Circadian Sync",
          summary: "Deep restorative rest resets melatonin and cortisol.",
          points: [
            "Consistent bedtime: Aim for sleep between 10:30 PM and 6:30 AM to match natural hormonal regeneration cycles.",
            "Dim blue light 1 hour prior: Exposure to smartphone screens suppresses melatonin, which is critical for ovarian follicle health.",
            "Cool, quiet environment: Keeps deep sleep stages uninterrupted.",
            "Morning natural sunlight: 10 minutes of morning sun grounds your circadian clock and optimizes Vitamin D synthesis."
          ]
        },
        {
          id: "stress",
          icon: "Heart",
          name: "4. Stress Management",
          tag: "Cortisol Regulation",
          summary: "Lower chronic fight-or-flight triggers.",
          points: [
            "Pranayama & Breathwork: 5-10 minutes of Anulom Vilom (alternate nostril breathing) and Bhramari cools down the nervous system.",
            "Sisterhood & Community: Sharing thoughts with friends or a counselor relieves the emotional isolation often felt with hormonal changes.",
            "Mindful journaling: Writing down symptoms and emotions reduces chronic worry.",
            "Regular digital detox: Take pauses from social media comparison."
          ]
        },
        {
          id: "clinical",
          icon: "Stethoscope",
          name: "5. When to Consult a Professional",
          tag: "Clinical Support",
          summary: "Medical guidance is an empowering partnership.",
          points: [
            "Cycles absent for 90+ consecutive days.",
            "Planning for pregnancy or fertility planning.",
            "Persistent severe cystic acne resisting typical topical care.",
            "Signs of insulin resistance such as dark velvet patches on the neck or skin tags.",
            "Annual comprehensive health checkups with a certified gynecologist."
          ]
        }
      ],
      checklistTitle: "Today's Hormone Balance Checklist",
      checklistDesc: "Tap to tick off your daily wellbeing commitments. Small, consistent steps build lifelong resilience.",
      tasks: [
        { id: "c1", time: "Morning", text: "Drank warm water with soaked methi (fenugreek) or jeera" },
        { id: "c2", time: "Morning", text: "Got 10 minutes of gentle morning sunlight & fresh air" },
        { id: "c3", time: "Midday", text: "Ate fiber/salad and protein before carbs at lunch" },
        { id: "c4", time: "Afternoon", text: "Completed 15 minutes of light walking or stretching" },
        { id: "c5", time: "Evening", text: "Stayed well hydrated throughout the day (8+ glasses of water)" },
        { id: "c6", time: "Night", text: "Turned off phone screen 45 minutes before sleep for deep rest" }
      ],
      herbalNoteTitle: "Traditional Kitchen Wisdom (ఆహార సూత్రాలు)",
      herbalNoteBody: "Traditional ingredients like soaked Methi (Fenugreek) seeds water, Cinnamon (Dalchini) tea, and Spearmint (Pudina) brew have shown natural support for glycemic balance and soothing androgen surges. Always discuss herbs with your doctor if taking prescribed medication."
    },
    doctorGuideModal: {
      title: "Doctor Visit Preparation Checklist",
      subtitle: "Bring these points to your appointment with your Gynecologist or Physician",
      printBtn: "Print / Save PDF Guide",
      closeBtn: "Close",
      questionsToAsk: [
        "Could my symptoms (such as irregular cycles or acne) be related to PCOS or thyroid dysfunction?",
        "Do you recommend a pelvic ultrasound or transvaginal ultrasound to check my ovaries?",
        "Which hormonal blood tests are appropriate (FSH, LH, Total Testosterone, DHEA-S, Prolactin)?",
        "Should we test fasting blood sugar, HbA1c, and fasting insulin to assess insulin sensitivity?",
        "What lifestyle or dietary modifications do you recommend alongside any clinical treatment?"
      ],
      whatToBring: [
        "Dates of your last 3-6 menstrual cycles (start date, end date, flow heaviness).",
        "List of any medications, birth control pills, or supplements you currently take.",
        "Family medical history (any diabetes, heart disease, thyroid, or PCOS in parents/sisters).",
        "A photo or note of stubborn skin flare-ups or hair changes."
      ]
    },
    footer: {
      helplineNote: "24x7 Free Healthcare Advice: Call 104 • National Women Helpline: Call 1091",
      copyright: "Women360 • An Educational & Early Screening Initiative for Women's Health. Not a Diagnostic Tool.",
      quickLinks: "Quick Navigation"
    }
  },
  te: {
    appTitle: "Women360",
    appSubtitle: "పీసీఓఎస్ (PCOS) అవగాహన & స్క్రీనింగ్ వేదిక",
    telanganaHelpline: "104 మహిళల ఆరోగ్య సహాయవాణి",
    policeHelpline: "1091 మహిళా హెల్ప్‌లైన్",
    nav: {
      home: "హోమ్",
      learn: "PCOS వివరాలు",
      risk: "రిస్క్ చెక్",
      wellness: "జీవనశైలి"
    },
    hero: {
      badge: "అర్థం చేసుకోండి. స్క్రీన్ చేయండి. జాగ్రత్త వహించండి.",
      title: "పీసీఓఎస్ (PCOS) అవగాహన & మహిళల సంపూర్ణ ఆరోగ్యానికి మీ నేస్తం",
      desc: "పీసీఓఎస్ (PCOS) గురించి సరళంగా తెలుసుకోండి, మీ లక్షణాలను అర్థం చేసుకోండి మరియు నమ్మకమైన ముందస్తు ప్రమాద స్థాయిని అంచనా వేయండి.",
      startScreening: "రిస్క్ స్క్రీనింగ్ ప్రారంభించండి",
      learnMore: "PCOS గురించి తెలుసుకోండి",
      confidentialNote: "పూర్తిగా గోప్యమైనది, గౌరవప్రదమైనది మరియు తెలుగు & English లో లభ్యం."
    },
    advisory: {
      title: "విశ్వసనీయత & భద్రతా సమాచారం • స్క్రీనింగ్ మరియు వైద్య నిర్ధారణ",
      body: "Women360 అనేది కేవలం అవగాహన మరియు ముందస్తు రిస్క్-స్క్రీనింగ్ సాధనం మాత్రమే, ఇది వైద్య నిర్ధారణ (డయాగ్నోసిస్) సాధనం కాదు. ఇది అంతర్జాతీయ మార్గదర్శకాల ఆధారంగా లక్షణాల సరళిని అర్థం చేసుకోవడానికి సహాయపడుతుంది కానీ మందుల చీటీలు లేదా క్లినికల్ రిపోర్టులు ఇవ్వదు. సరైన నిర్ధారణ, అల్ట్రాసౌండ్ స్కాన్ మరియు హార్మోన్ పరీక్షల కోసం ఎల్లప్పుడూ అర్హత కలిగిన స్త్రీల వైద్య నిపుణులను (గైనకాలజిస్ట్) సంప్రదించండి."
    },
    services: {
      title: "Women360 సేవలు",
      subtitle: "శాస్త్రీయ స్పష్టత మరియు సంపూర్ణ జీవనశైలి ద్వారా ప్రతి మహిళను బలోపేతం చేయడం.",
      learnCard: {
        tag: "అవగాహన & సమాచారం",
        title: "PCOS గురించి తెలుసుకోండి",
        desc: "లక్షణాలు, హార్మోన్ల కారణాలు, వాస్తవాలు మరియు అపోహలను స్పష్టంగా అర్థం చేసుకోండి.",
        cta: "సమాచార వేదికను చూడండి"
      },
      screeningCard: {
        tag: "ముందస్తు రిస్క్ స్క్రీనింగ్",
        title: "వయస్సు ఆధారిత ఆరోగ్య స్క్రీనింగ్",
        desc: "చిన్న, ద్విభాషా మహిళల ఆరోగ్య స్క్రీనింగ్ ప్రారంభించడానికి మీ వయస్సు పరిధిని ఎంచుకోండి.",
        cta: "వయస్సు పరిధిని ఎంచుకోండి"
      },
      wellnessCard: {
        tag: "వ్యక్తిగతీకరించిన జీవనశైలి",
        title: "సంపూర్ణ ఆరోగ్య సూత్రాలు",
        desc: "పౌష్టికాహారం, శారీరక వ్యాయామం, సరైన నిద్ర మరియు ఒత్తిడి నిర్వహణ మార్గదర్శకాలు.",
        cta: "జీవనశైలి ప్రణాళికను చూడండి"
      }
    },
    educationSection: {
      badge: "విద్యా వేదిక",
      title: "పీసీఓఎస్ (PCOS) ను సరైన అవగాహనతో జయించండి",
      subtitle: "భారతదేశంలో పునరుత్పత్తి వయస్సులో ఉన్న ప్రతి 5 మంది మహిళల్లో ఒకరు పీసీఓఎస్ (PCOS) లక్షణాలతో ఉన్నారు.",
      tabs: {
        overview: "PCOS అంటే ఏమిటి?",
        symptoms: "ముఖ్య లక్షణాలు",
        spectrum: "ప్రతి శరీరం ప్రత్యేకమైనది",
        myths: "అపోహలు vs వాస్తవాలు",
        whenToConsult: "వైద్యుడిని ఎప్పుడు కలవాలి?"
      },
      overviewContent: {
        h3: "సరైన జీవనశైలితో నియంత్రించగల హార్మోన్ల అసమతుల్యత",
        p1: "పీసీఓఎస్ (PCOS - Polycystic Ovary Syndrome) అనేది వ్యాధి కాదు, ఇది హార్మోన్లు మరియు ఇన్సులిన్ నిరోధకత వల్ల వచ్చే జీవక్రియ మరియు అంతఃస్రావ అసమతుల్యత.",
        p2: "అండం విడుదల క్రమం తప్పినప్పుడు, అండాశయాలలో చిన్న ద్రవ తిత్తులు (ఫోలికల్స్) ఏర్పడతాయి. మంచి పౌష్టికాహారం, రోజూ తేలికపాటి వ్యాయామం మరియు వైద్యుల సలహాలతో దీనిని విజయవంతంగా సమతుల్యం చేసుకోవచ్చు.",
        stats: [
          { value: "5 మందిలో 1", label: "భారతదేశంలో పునరుత్పత్తి వయస్సులోని మహిళల్లో PCOS లక్షణాలు కనిపిస్తున్నాయి" },
          { value: "70%", label: "బిడియం లేదా అవగాహన లేకపోవడం వల్ల చాలామందికి తెలియకుండానే ఉండిపోతుంది" },
          { value: "100%", label: "ముందస్తు అవగాహన, మంచి ఆహారం & వైద్య పర్యవేక్షణతో నిర్వహించవచ్చు" }
        ]
      },
      symptomsList: [
        {
          icon: "Calendar",
          title: "క్రమరహిత లేదా రాని పీరియడ్స్",
          desc: "పీరియడ్స్ 35 రోజుల కంటే ఆలస్యం కావడం, సంవత్సరంలో 8 సార్ల కంటే తక్కువ రావడం లేదా కొన్ని నెలలు పూర్తిగా ఆగిపోవడం."
        },
        {
          icon: "Sparkles",
          title: "మొండి మొటిమలు (Acne)",
          desc: "ముఖ్యంగా దవడ భాగం, గడ్డం, మెడ మరియు ఛాతీపై మాటిమాటికీ మొండిగా వచ్చే మొటిమలు."
        },
        {
          icon: "Scissors",
          title: "అవాంఛిత రోమాలు (Hirsutism)",
          desc: "పైపెదవి, గడ్డం, ఛాతీ, పొట్ట మధ్య భాగంలో పురుషుల తరహా దళసరి వెంట్రుకలు పెరగడం."
        },
        {
          icon: "TrendingDown",
          title: "జుట్టు పలచబడటం & రాలడం",
          desc: "తల మధ్య భాగంలో పాపిట వెడల్పు అవ్వడం లేదా మాడు వద్ద జుట్టు అధికంగా రాలిపోవడం."
        },
        {
          icon: "Activity",
          title: "బరువు పెరగడం & పొట్ట చుట్టూ కొవ్వు",
          desc: "ఆహార నియంత్రణ చేసినా బరువు తగ్గడం కష్టమవడం, ఇన్సులిన్ రెసిస్టెన్స్ వల్ల పొట్ట చుట్టూ బరువు చేరడం."
        },
        {
          icon: "Moon",
          title: "విపరీతమైన అలసట & మానసిక ఆందోళన",
          desc: "భోజనం తర్వాత నీరసం రావడం, కారణం లేకుండా మానసిక ఆందోళన, డిప్రెషన్ లేదా చిరాకు కలగడం."
        }
      ],
      spectrumNotice: {
        title: "ప్రతి స్త్రీలో PCOS ఒకేలా ఉండదు",
        desc: "బరువు ఎక్కువగా ఉన్నవారిలోనే కాదు, సన్నగా ఉండే మహిళల్లో కూడా 'లీన్ పీసీఓఎస్' ఉండవచ్చు. లక్షణాలు వ్యక్తిని బట్టి మారుతాయి. అందుకే వ్యక్తిగతీకరించిన జీవనశైలి మరియు వైద్యుల సహాయం ముఖ్యం."
      },
      mythsList: [
        {
          myth: "అపోహ: PCOS ఉంటే పిల్లలు పుట్టే అవకాశం అసలు ఉండదు.",
          fact: "వాస్తవం: PCOS ఉన్నప్పటికీ సరైన జీవనశైలి మరియు ఆధునిక వైద్య చికిత్సలతో మెజారిటీ మహిళలు ఆరోగ్యకరమైన పిల్లలకు జన్మనిస్తున్నారు."
        },
        {
          myth: "అపోహ: కేవలం అధిక బరువు ఉన్న మహిళలకే PCOS వస్తుంది.",
          fact: "వాస్తవం: సాధారణ లేదా తక్కువ బరువు ఉన్న 20-30% మంది మహిళల్లో కూడా 'లీన్ PCOS' లక్షణాలు ఉంటాయి."
        },
        {
          myth: "అపోహ: పీరియడ్స్ సరిగ్గా రాకపోతే అది ఖచ్చితంగా PCOS మాత్రమే.",
          fact: "వాస్తవం: థైరాయిడ్ సమస్యలు, అధిక ఒత్తిడి లేదా రక్తహీనత వల్ల కూడా పీరియడ్స్ ఆలస్యం కావచ్చు. పూర్తి రక్త పరీక్షలు అవసరం."
        },
        {
          myth: "అపోహ: దీనికి కేవలం గర్భనిరోధక మాత్రలు మాత్రమే పరిష్కారం.",
          fact: "వాస్తవం: మాత్రలు రక్తస్రావాన్ని నియంత్రించవచ్చు, కానీ సమతుల్య ఆహారం, వ్యాయామం మరియు ఒత్తిడి నియంత్రణలే శాశ్వత ఆరోగ్యాన్ని ఇస్తాయి."
        }
      ],
      whenToSeeDoctor: [
        "మీ పీరియడ్స్ వరుసగా 3 నెలల కంటే ఎక్కువ కాలం పూర్తిగా రాకపోతే.",
        "విపరీతమైన కడుపునొప్పి లేదా ప్రతి 1-2 గంటలకే ప్యాడ్ తడిసిపోయేంత అధిక రక్తస్రావం ఉంటే.",
        "ముఖంపై అకస్మాత్తుగా తీవ్రంగా దళసరి వెంట్రుకలు పెరగడం లేదా గొంతు బొంగురుపోవడం జరిగితే.",
        "గర్భం దాల్చడానికి 6 నుండి 12 నెలల పాటు ప్రయత్నించినా ఫలించకపోతే.",
        "విపరీతమైన దాహం, తీవ్ర అలసట లేదా మెడ వెనుక నల్లని దళసరి మచ్చలు (Acanthosis Nigricans) కనిపిస్తే."
      ]
    },
    screening: {
      stepperTitle: "Women360 ఆరోగ్య స్క్రీనింగ్",
      stepperSubtitle: "మీ అనుభవాల ఆధారంగా సమాధానాలు ఇవ్వండి.",
      questionProgress: "ప్రశ్న",
      of: "మొత్తం",
      btnBack: "వెనుకకు",
      btnNext: "తర్వాతి ప్రశ్న",
      btnSubmit: "నా రిస్క్ ఫలితాన్ని చూడండి",
      selectPrompt: "దయచేసి ముందుకు సాగడానికి ఒక ఎంపికను ఎంచుకోండి",
      accordionTitle: "ఈ ప్రశ్నలు ఎందుకు అడుగుతున్నాం? (వైద్య వివరణ)",
      accordionText: "మీ సమాధానాలు అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించాల్సిన ఆరోగ్య అంశాలను గుర్తించడంలో సహాయపడవచ్చు. ఈ ప్రశ్నావళి అవగాహన కోసం మాత్రమే; ఇది వైద్య నిర్ధారణ కాదు."
    },
    result: {
      headerBadge: "గోప్యమైన స్క్రీనింగ్ ఫలితం",
      title: "మీ PCOS ముందస్తు రిస్క్ ఫలితం",
      scoreLabel: "లెక్కించబడిన మొత్తం స్కోర్",
      scoreOutOf: "స్క్రీనింగ్ స్కోర్ — ఇది నిర్ధారణ కాదు",
      riskBadge: {
        lower: "తక్కువ ప్రమాదం (Lower Risk)",
        moderate: "మధ్యస్థ ప్రమాదం (Moderate Risk)",
        higher: "ఎక్కువ ప్రమాదం (Higher Risk)"
      },
      tierExpl: {
        lower: "మీ సమాధానాల ప్రకారం ప్రస్తుతానికి సాధారణ PCOS లక్షణాల సంభావ్యత తక్కువగా ఉంది. ఆరోగ్యకరమైన ఆహారం, రోజువారీ శారీరక శ్రమ మరియు సరైన నిద్రతో మీ హార్మోన్ల సమతుల్యతను కాపాడుకోండి.",
        moderate: "మీ సమాధానాలలో హార్మోన్ల అసమతుల్యత లేదా ముందస్తు పీసీఓఎస్ (PCOS) కు సంబంధించిన కొన్ని స్పష్టమైన లక్షణాలు కనిపిస్తున్నాయి. స్పష్టత కోసం వైద్య నిపుణులను సంప్రదించడం మంచిది.",
        higher: "మీ సమాధానాలలో పీసీఓఎస్ (PCOS) తో ముడిపడి ఉన్న పలు కీలక లక్షణాలు (పీరియడ్స్ ఆలస్యం, హార్మోన్ మార్కర్లు) నమోదయ్యాయి. దయచేసి గైనకాలజిస్ట్‌ను కలిసి పరీక్షలు చేయించుకోవాల్సిందిగా గట్టిగా సిఫార్సు చేస్తున్నాము."
      },
      scaleTitle: "స్క్రీనింగ్ స్థాయి పరిధి",
      scaleLabels: ["తక్కువ శ్రద్ధ", "మధ్యస్థ శ్రద్ధ", "ఎక్కువ శ్రద్ధ"],
      factorsTitle: "మీ స్క్రీనింగ్ ఆధారంగా ముఖ్య అంశాలు",
      factorsSubtitle: "మీరు ఇచ్చిన సమాధానాలు రిస్క్ స్కోరుకు ఎలా తోడ్పడ్డాయో పరిశీలించండి:",
      nextStepsTitle: "ఈ ఫలితం తర్వాత మీరు చేయవలసిన ముఖ్యమైన పనులు",
      nextStepsList: [
        {
          step: "1",
          title: "గైనకాలజిస్ట్ లేదా వైద్యుడిని సంప్రదించండి",
          desc: "ఈ ఫలితాల సారాంశాన్ని వైద్యుడికి చూపించండి. వారు అల్ట్రాసౌండ్ స్కాన్, థైరాయిడ్ మరియు హార్మోన్ల రక్త పరీక్షలను సిఫార్సు చేయవచ్చు."
        },
        {
          step: "2",
          title: "60 రోజుల పాటు మీ పీరియడ్స్ మరియు లక్షణాలను నమోదు చేయండి",
          desc: "పీరియడ్స్ తేదీలు, మొటిమలు, అలసట మొదలైన వాటిని నోట్ చేసుకోండి. ఇది డాక్టర్ సరైన మూల్యాంకనం చేయడానికి ఎంతగానో తోడ్పడుతుంది."
        },
        {
          step: "3",
          title: "హార్మోన్లను బలోపేతం చేసే రోజువారీ అలవాట్లను ప్రారంభించండి",
          desc: "మొదట పీచు పదార్థాలు, పప్పులు తినడం, భోజనం తర్వాత 15 నిమిషాల నడక మరియు రోజుకు 7-8 గంటల నిద్రను క్రమం తప్పకుండా పాటించండి."
        }
      ],
      doctorPrepBtn: "డాక్టర్ సందర్శన గైడ్‌ను డౌన్‌లోడ్ చేయండి",
      viewWellnessBtn: "జీవనశైలి మార్గదర్శకాలు చూడండి",
      retakeBtn: "మళ్లీ స్క్రీనింగ్ చేయండి",
      helplineCardTitle: "తెలంగాణ & ఆంధ్రప్రదేశ్ ఉచిత ఆరోగ్య సహాయవాణి",
      helpline104Desc: "ప్రభుత్వ ఆరోగ్య సమాచారం & సలహా విభాగం (టోల్ ఫ్రీ 24/7 నంబర్ 104)",
      disclaimer: "ఈ స్క్రీనింగ్ ఫలితం అవగాహన మరియు విద్యా ప్రయోజనాల కోసం మాత్రమే. ఇది పీసీఓఎస్‌ను నిర్ధారించదు. సరైన మూల్యాంకనం మరియు రోగ నిర్ధారణ కోసం దయచేసి అర్హత కలిగిన వైద్య నిపుణులను సంప్రదించండి."
    },
    wellness: {
      badge: "సంపూర్ణ జీవనశైలి మార్గదర్శకాలు",
      title: "వ్యక్తిగతీకరించిన జీవనశైలి ప్రణాళిక",
      subtitle: "శాస్త్రీయ విధానాలు మరియు మన సాంప్రదాయ ఆహారపు అలవాట్లతో హార్మోన్ల సమతుల్యతను సాధించండి.",
      disclaimerNotice: "ఈ జీవనశైలి సూచనలు సాధారణ ఆరోగ్యం మరియు బలాన్ని పెంపొందించడానికి మాత్రమే, ఇవి వైద్య చికిత్సలు లేదా డాక్టర్ ప్రిస్క్రిప్షన్‌కు ప్రత్యామ్నాయం కావు.",
      pillars: [
        {
          id: "nutrition",
          icon: "Apple",
          name: "1. సమతుల్య పౌష్టికాహారం",
          tag: "ఇన్సులిన్ నియంత్రణ",
          summary: "రక్తంలో చక్కెర హెచ్చుతగ్గులను నివారించి హార్మోన్లను శాంతింపజేయడం.",
          points: [
            "ఆహార క్రమం: భోజనంలో మొదట పీచుపదార్థాలు (కీరదోస, పచ్చి కూరగాయల సలాడ్), తర్వాత ప్రొటీన్ (పప్పు, పనీర్, గుడ్లు, మొలకలు), చివరగా తృణధాన్యాలు (జొన్నలు, రాగులు, బ్రౌన్ రైస్) తినండి.",
            "చిరుధాన్యాలు చేర్చండి: మైదా మరియు పాలిష్ చేసిన బియ్యానికి బదులుగా కొర్రలు, రాగులు, సజ్జలు ఉపయోగించండి.",
            "మంచి కొవ్వులు: రోజువారీ ఆహారంలో రాత్రి నానబెట్టిన బాదం, వాల్‌నట్స్, అవిసె గింజలు (Flaxseeds) చేర్చండి.",
            "క్రాష్ డైట్‌లు వద్దు: తీవ్రమైన పస్తులు ఉండటం వల్ల కార్టిసాల్ పెరిగి పీరియడ్స్ మరింత ఆలస్యమవుతాయి."
          ]
        },
        {
          id: "movement",
          icon: "Activity",
          name: "2. శారీరక వ్యాయామం & నడక",
          tag: "జీవక్రియ చురుకుదనం",
          summary: "శరీరానికి ఒత్తిడి కలిగించని స్థిరమైన రోజువారీ శ్రమ.",
          points: [
            "భోజనం తర్వాత 15 నిమిషాల నడక: మధ్యాహ్నం, రాత్రి భోజనం తర్వాత కొద్దిసేపు నెమ్మదిగా నడవడం వల్ల ఇన్సులిన్ పనితీరు మెరుగవుతుంది.",
            "కండరాల బలం (Strength Training): వారానికి 2-3 రోజులు వ్యాయామం చేయడం వల్ల శరీర కణాలు గ్లూకోజ్‌ను బాగా గ్రహిస్తాయి.",
            "యోగాసనాలు: భద్రకోణాసనం (బద్ధకోణాసనం), భుజంగాసనం, మాలాసనం పెల్విక్ భాగంలో రక్త ప్రసరణను మెరుగుపరుస్తాయి.",
            "అధిక శ్రమ వద్దు: విశ్రాంతి లేకుండా విపరీతమైన కఠిన వ్యాయామాలు ఒత్తిడి హార్మోన్లను పెంచుతాయి."
          ]
        },
        {
          id: "sleep",
          icon: "Moon",
          name: "3. ప్రశాంతమైన నిద్ర వేళలు",
          tag: "హార్మోన్ల పునరుజ్జీవనం",
          summary: "మెలటోనిన్ మరియు కార్టిసాల్ సమతుల్యత కోసం గాఢ నిద్ర.",
          points: [
            "క్రమబద్ధమైన సమయం: రాత్రి 10:30 నుండి ఉదయం 6:30 వరకు నిద్రపోవడం శరీర సహజ హార్మోన్ల తయారీకి తోడ్పడుతుంది.",
            "స్క్రీన్ సమయం తగ్గించండి: పడుకోవడానికి 1 గంట ముందు మొబైల్ స్క్రీన్ చూడటం ఆపండి; ఇది మెలటోనిన్ ఉత్పత్తిని పెంచుతుంది.",
            "చల్లని, నిశ్శబ్ద వాతావరణం: గాఢమైన నిద్ర అంతరాయం లేకుండా ఉండటానికి తోడ్పడుతుంది.",
            "ఉదయపు ఎండ: ఉదయాన్నే 10 నిమిషాలు ఎండలో నిలబడటం వల్ల విటమిన్ డి మరియు నిద్ర హార్మోన్ల లయ చక్కబడుతుంది."
          ]
        },
        {
          id: "stress",
          icon: "Heart",
          name: "4. మానసిక ప్రశాంతత & ఒత్తిడి నివారణ",
          tag: "కార్టిసాల్ తగ్గింపు",
          summary: "నాడీ వ్యవస్థను స్థిరపరిచి మానసిక స్థైర్యాన్ని పెంచడం.",
          points: [
            "ప్రాణాయామం: రోజూ 5-10 నిమిషాల అనులోమ విలోమ మరియు భ్రామరీ ప్రాణాయామం నాడీ వ్యవస్థను శాంతింపజేస్తుంది.",
            "భావాలను పంచుకోండి: మీ సమస్యలను కుటుంబ సభ్యులతో లేదా స్నేహితులతో పంచుకోవడం ఒంటరితనాన్ని దూరం చేస్తుంది.",
            "రాత అలవాటు: రోజువారీ అనుభవాలు, భావాలను డైరీలో రాసుకోవడం మానసిక ప్రశాంతతనిస్తుంది.",
            "సోషల్ మీడియా విరామం: పోలికలు తెచ్చే సోషల్ మీడియా నుండి అప్పుడప్పుడు దూరంగా ఉండండి."
          ]
        },
        {
          id: "clinical",
          icon: "Stethoscope",
          name: "5. వైద్యుడిని ఎప్పుడు సంప్రదించాలి?",
          tag: "వైద్య పర్యవేక్షణ",
          summary: "వైద్యుల మార్గదర్శకత్వం మీ ఆరోగ్యానికి రక్షణ కవచం.",
          points: [
            "పీరియడ్స్ వరుసగా 3 నెలల కంటే ఎక్కువ కాలం పూర్తిగా రాకపోతే.",
            "పిల్లల కోసం ప్రయత్నిస్తూ గర్భధారణలో సమస్యలు ఎదురవుతుంటే.",
            "చర్మ నిపుణులకు తగ్గని తీవ్రమైన గడ్డంపై మొటిమలు, అవాంఛిత రోమాలు ఉంటే.",
            "మెడ వెనుక నల్లటి దళసరి మచ్చలు లేదా తీవ్రమైన అలసట ఉన్నప్పుడు.",
            "సంవత్సరానికి ఒకసారి అనుభవజ్ఞులైన గైనకాలజిస్ట్‌తో పూర్తి ఆరోగ్య పరీక్షలు చేయించుకోండి."
          ]
        }
      ],
      checklistTitle: "నేటి ఆరోగ్య సంకల్పాలు (Daily Checklist)",
      checklistDesc: "ప్రతిరోజూ ఈ చిన్న అలవాట్లను టిక్ చేయండి. స్థిరమైన చిన్న మార్పులే దీర్ఘకాలిక ఆరోగ్యాన్ని ఇస్తాయి.",
      tasks: [
        { id: "c1", time: "ఉదయం", text: "నానబెట్టిన మెంతుల నీళ్లు లేదా జీలకర్ర కషాయం తాగాను" },
        { id: "c2", time: "ఉదయం", text: "10 నిమిషాల పాటు ఉదయపు ఎండలో నడిచాను" },
        { id: "c3", time: "మధ్యాహ్నం", text: "మధ్యాహ్న భోజనంలో మొదట సలాడ్, పప్పు తిని తర్వాత అన్నం తిన్నాను" },
        { id: "c4", time: "సాయంత్రం", text: "15 నిమిషాల నడక లేదా తేలికపాటి వ్యాయామం పూర్తి చేశాను" },
        { id: "c5", time: "రోజంతా", text: "రోజంతా పుష్కలంగా మంచి నీళ్లు (8+ గ్లాసులు) తాగాను" },
        { id: "c6", time: "రాత్రి", text: "పడుకోవడానికి 45 నిమిషాల ముందే ఫోన్ పక్కన పెట్టేసి ప్రశాంతంగా ఉన్నాను" }
      ],
      herbalNoteTitle: "మన వంటింటి ఆరోగ్య రహస్యాలు (ఆహార సూత్రాలు)",
      herbalNoteBody: "నానబెట్టిన మెంతుల నీరు (రక్తంలో చక్కెర తగ్గింపుకు), దాల్చినచెక్క టీ (ఇన్సులిన్ సెన్సిటివిటీకి), పుదీనా టీ (అవాంఛిత రోమాల నియంత్రణకు) సహజంగా తోడ్పడతాయని సంప్రదాయ వైద్యం మరియు శాస్త్రం చెబుతున్నాయి. మందులు వాడుతున్నట్లయితే డాక్టర్ సలహా తప్పనిసరి."
    },
    doctorGuideModal: {
      title: "డాక్టర్ సందర్శన సన్నద్ధత గైడ్ (Doctor Visit Guide)",
      subtitle: "మీ గైనకాలజిస్ట్ లేదా వైద్యుడిని కలిసినప్పుడు ఈ అంశాలను ప్రస్తావించండి",
      printBtn: "గైడ్‌ను ప్రింట్ / సేవ్ చేయండి",
      closeBtn: "మూసివేయి",
      questionsToAsk: [
        "నాకున్న లక్షణాలు (పీరియడ్స్ ఆలస్యం, మొటిమలు మొదలైనవి) పీసీఓఎస్ (PCOS) లేదా థైరాయిడ్ సమస్య వల్ల కావచ్చా?",
        "నా అండాశయాలను పరిశీలించడానికి పెల్విక్ అల్ట్రాసౌండ్ స్కాన్ అవసరమా?",
        "ఏయే హార్మోన్ల రక్త పరీక్షలు (FSH, LH, Testosterone, DHEA-S, Prolactin) చేయించుకోవాలి?",
        "ఇన్సులిన్ రెసిస్టెన్స్ అంచనా వేయడానికి ఫాస్టింగ్ బ్లడ్ షుగర్ మరియు HbA1c సరిపోతాయా?",
        "మందులతో పాటు నేను పాటించవలసిన ఆహారపు మరియు వ్యాయామ నియమాలు ఏమిటి?"
      ],
      whatToBring: [
        "గత 3-6 నెలల మీ పీరియడ్స్ తేదీలు మరియు రక్తస్రావ తీవ్రత వివరాలు.",
        "మీరు ప్రస్తుతం వాడుతున్న మందులు లేదా సప్లిమెంట్ల వివరాలు.",
        "కుటుంబ ఆరోగ్య చరిత్ర (తల్లి లేదా సోదరిలో మధుమేహం, థైరాయిడ్ లేదా PCOS ఉందా).",
        "ముఖంపై వచ్చే మొటిమలు లేదా అవాంఛిత రోమాల మార్పుల ఫోటోలు లేదా వివరాలు."
      ]
    },
    footer: {
      helplineNote: "24x7 ఉచిత ప్రభుత్వ ఆరోగ్య సలహాలు: 104 కి కాల్ చేయండి • మహిళా హెల్ప్‌లైన్: 1091",
      copyright: "Women360 • మహిళల సంపూర్ణ ఆరోగ్య & ముందస్తు అవగాహన వేదిక. ఇది రోగ నిర్ధారణ సాధనం కాదు.",
      quickLinks: "ముఖ్యమైన విభాగాలు"
    }
  }
};
