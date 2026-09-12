// ─── Types ────────────────────────────────────────────────────────────────────

export type Lang = "en" | "ar";

export interface Translations {
  nav: {
    howItWorks: string;
    results:    string;
    membership: string;
    coaching:   string;
    faq:        string;
    joinFree:   string;
  };

  hero: {
    topPill:   string;
    topJoin:   string;
    tag:       string;
    titlePart1: string;
    titlePart2: string;
    subtitle:  string;
    cta:       string;
    subCta:    string;
    stats: {
      traders:  string;
      accuracy: string;
      experience: string;
      countries: string;
    };
  };

  pricing: {
    title:    string;
    subtitle: string;
    vipTelegram: {
      name:        string;
      price:       string;
      period:      string;
      description: string;
      features:    string[];
      cta:         string;
    };
    fullCourse: {
      name:         string;
      price:        string;
      strikethrough: string;
      period:       string;
      description:  string;
      features:     string[];
      cta:          string;
    };
    coaching: {
      badge:        string;
      name:         string;
      price:        string;
      strikethrough: string;
      period:       string;
      description:  string;
      features:     string[];
      cta:          string;
    };
    trust: {
      line:   string;
      bank:   string;
      usdt:   string;
      refund: string;
      legal:  string;
    };
  };

  about: {
    sectionTag:  string;
    titlePart1:  string;
    titleBold:   string;
    titlePart2:  string;
    bio1:        string;
    bio2:        string;
    nameLabel:   string;
    roleLabel:   string;
    stats: {
      yearsLabel:     string;
      yearsSub:       string;
      communityLabel: string;
      communitySub:   string;
      winRateLabel:   string;
      winRateSub:     string;
      rrLabel:        string;
      rrSub:          string;
    };
  };

  modal: {
    badge:       string;
    title:       string;
    subtitle:    string;
    namePlaceholder:   string;
    emailPlaceholder:  string;
    phonePlaceholder:  string;
    privacyNote: string;
    submit:      string;
    submitting:  string;
    networkError: string;
  };
}

// ─── English ──────────────────────────────────────────────────────────────────

const en: Translations = {
  nav: {
    howItWorks: "How it works",
    results:    "Results",
    membership: "Membership",
    coaching:   "Coaching",
    faq:        "FAQ",
    joinFree:   "Join free",
  },

  hero: {
    topPill:    "Free daily market signals on Telegram.",
    topJoin:    "Join →",
    tag:        "FX YASSINE — multi-market day trader",
    titlePart1: "Trade the markets with me.",
    titlePart2: "Live, every day.",
    subtitle:   "Live entries and exits, daily signals, and a community that trades together. Start free on Telegram.",
    cta:        "Join free Telegram",
    subCta:     "Free daily market signals • no card needed • cancel anytime",
    stats: {
      traders:    "Active traders",
      accuracy:   "Verified signal accuracy",
      experience: "XAU/USD experience",
      countries:  "Countries",
    },
  },

  pricing: {
    title:    "Choose your level.",
    subtitle: "From live signals to full mentorship — every tier is designed for a different stage of your trading journey.",
    vipTelegram: {
      name:        "VIP TELEGRAM",
      price:       "$50",
      period:      "/ month",
      description: "Best signal-to-noise ratio on XAU/USD — nothing else.",
      features: [
        "2-5 Daily XAU/USD Signals",
        "Exact Entry, SL & TP",
        "Daily Market Analysis",
        "Live Trade Management",
      ],
      cta: "JOIN VIP",
    },
    fullCourse: {
      name:          "FULL COURSE",
      price:         "$110",
      strikethrough: "$297",
      period:        "one-time payment",
      description:   "Learn the system once, trade it forever.",
      features: [
        "40+ HD Video Lessons",
        "Price Action & SMC Strategies",
        "Risk Management Framework",
        "Downloadable PDF Resources",
      ],
      cta: "GET COURSE",
    },
    coaching: {
      badge:         "LIMITED PROMO",
      name:          "1-ON-1 COACHING",
      price:         "$400",
      strikethrough: "$599",
      period:        "one-time payment",
      description:   "Fastest path to consistency. Limited to 5 students.",
      features: [
        "Private Zoom Sessions",
        "Live Trading Together",
        "Review of your Trades",
        "Direct WhatsApp Access",
      ],
      cta: "APPLY NOW",
    },
    trust: {
      line:   "Trusted by traders across 38 countries.",
      bank:   "Bank transfer",
      usdt:   "USDT · TRC20",
      refund: "Refund available",
      legal:  "All subscriptions are activated via Telegram or WhatsApp after payment confirmation. No payment is processed on this website.",
    },
  },

  about: {
    sectionTag:  "The Trader Behind The System",
    titlePart1:  "Six years of",
    titleBold:   "proven",
    titlePart2:  "gold trading results.",
    bio1: "Yassine started trading gold full-time in 2020. After a tough first year, he rebuilt from scratch — focusing exclusively on XAU/USD price action, ICT concepts, and reading institutional order flow.",
    bio2: "What followed was six years of consistent, documented results. He built YassICTFX to share the exact method without the noise — no indicators, no complex theory. Just a repeatable system that works in London and New York sessions, taught to over 1,700 traders who follow his signals live every day.",
    nameLabel: "Yassine",
    roleLabel: "Lead Trader & Founder · YassICTFX",
    stats: {
      yearsLabel:     "Years Experience",
      yearsSub:       "XAU/USD",
      communityLabel: "Active Community",
      communitySub:   "traders",
      winRateLabel:   "Win Rate",
      winRateSub:     "verified",
      rrLabel:        "Avg Risk/Reward",
      rrSub:          "per signal",
    },
  },

  modal: {
    badge:             "Free Community Access",
    title:             "Join The Telegram Group",
    subtitle:          "Get daily market breakdowns, key gold levels, and live trade updates.",
    namePlaceholder:   "Full Name",
    emailPlaceholder:  "Email Address",
    phonePlaceholder:  "Phone / WhatsApp",
    privacyNote:       "No spam. Your info is safe with us.",
    submit:            "Join Free Group",
    submitting:        "Saving…",
    networkError:      "Network error. Please check your connection and try again.",
  },
};

// ─── Arabic ───────────────────────────────────────────────────────────────────

const ar: Translations = {
  nav: {
    howItWorks: "كيف يعمل",
    results:    "النتائج",
    membership: "الاشتراك",
    coaching:   "التدريب",
    faq:        "الأسئلة الشائعة",
    joinFree:   "انضم مجاناً",
  },

  hero: {
    topPill:    "إشارات تداول يومية مجانية على تيليجرام.",
    topJoin:    "انضم الآن ←",
    tag:        "إف إكس ياسين — متداول يومي في أسواق متعددة",
    titlePart1: "تداول في الأسواق معي.",
    titlePart2: "مباشرة، كل يوم.",
    subtitle:   "نقاط دخول وخروج مباشرة، إشارات يومية، ومجتمع يتداول معاً. ابدأ مجاناً على تيليجرام.",
    cta:        "انضم إلى تيليجرام مجاناً",
    subCta:     "إشارات يومية مجانية • لا حاجة لبطاقة بنكية • إلغاء في أي وقت",
    stats: {
      traders:    "متداول نشط",
      accuracy:   "دقة الإشارات الموثّقة",
      experience: "خبرة XAU/USD",
      countries:  "دولة",
    },
  },

  pricing: {
    title:    "اختر مستواك.",
    subtitle: "من الإشارات المباشرة إلى الإرشاد الكامل — كل مستوى مصمم لمرحلة مختلفة من رحلتك في التداول.",
    vipTelegram: {
      name:        "VIP TELEGRAM",
      price:       "$50",
      period:      "/ شهرياً",
      description: "أفضل نسبة إشارة إلى ضوضاء على XAU/USD — لا شيء آخر.",
      features: [
        "2-5 إشارات XAU/USD يومية",
        "نقطة الدخول الدقيقة، وقف الخسارة وجني الأرباح",
        "تحليل السوق اليومي",
        "إدارة الصفقات المباشرة",
      ],
      cta: "انضم VIP",
    },
    fullCourse: {
      name:          "الدورة الكاملة",
      price:         "$110",
      strikethrough: "$297",
      period:        "دفعة واحدة",
      description:   "تعلم النظام مرة واحدة، وتداول به إلى الأبد.",
      features: [
        "+40 درس فيديو عالي الدقة",
        "استراتيجيات Price Action و SMC",
        "إطار إدارة المخاطر",
        "موارد PDF قابلة للتنزيل",
      ],
      cta: "احصل على الدورة",
    },
    coaching: {
      badge:         "عرض محدود",
      name:          "تدريب فردي",
      price:         "$400",
      strikethrough: "$599",
      period:        "دفعة واحدة",
      description:   "أسرع طريق للاتساق. محدود لـ 5 طلاب.",
      features: [
        "جلسات خاصة عبر Zoom",
        "تداول مباشر معاً",
        "مراجعة صفقاتك",
        "وصول مباشر عبر واتساب",
      ],
      cta: "قدّم الآن",
    },
    trust: {
      line:   "موثوق به من قِبل متداولين عبر 38 دولة.",
      bank:   "تحويل بنكي",
      usdt:   "USDT · TRC20",
      refund: "استرداد متاح",
      legal:  "يتم تفعيل جميع الاشتراكات عبر تيليجرام أو واتساب بعد تأكيد الدفع. لا تتم معالجة أي مدفوعات على هذا الموقع.",
    },
  },

  about: {
    sectionTag:  "المتداول خلف النظام",
    titlePart1:  "ست سنوات من النتائج",
    titleBold:   "الموثّقة",
    titlePart2:  "في تداول الذهب.",
    bio1: "بدأ ياسين التداول بالذهب بدوام كامل عام 2020. بعد سنة أولى صعبة، أعاد البناء من الصفر — مركّزاً حصرياً على حركة سعر XAU/USD، ومفاهيم ICT، وقراءة تدفق الأوامر المؤسسية.",
    bio2: "ما تلا ذلك كان ست سنوات من النتائج الثابتة والموثّقة. بنى YassICTFX لمشاركة المنهج الدقيق بدون ضوضاء — لا مؤشرات، لا نظريات معقدة. فقط نظام قابل للتكرار يعمل في جلستي لندن ونيويورك، مُعلَّم لأكثر من 1,700 متداول يتابعون إشاراته المباشرة كل يوم.",
    nameLabel: "ياسين",
    roleLabel: "المتداول الرئيسي والمؤسس · YassICTFX",
    stats: {
      yearsLabel:     "سنوات الخبرة",
      yearsSub:       "XAU/USD",
      communityLabel: "المجتمع النشط",
      communitySub:   "متداول",
      winRateLabel:   "نسبة الربح",
      winRateSub:     "موثّقة",
      rrLabel:        "متوسط المخاطرة/العائد",
      rrSub:          "لكل إشارة",
    },
  },

  modal: {
    badge:             "وصول مجاني للمجتمع",
    title:             "انضم إلى مجموعة تيليجرام",
    subtitle:          "احصل على تحليلات السوق اليومية ومستويات الذهب الرئيسية وتحديثات الصفقات المباشرة.",
    namePlaceholder:   "الاسم الكامل",
    emailPlaceholder:  "البريد الإلكتروني",
    phonePlaceholder:  "الهاتف / واتساب",
    privacyNote:       "لا بريد مزعج. معلوماتك في أمان تام.",
    submit:            "انضم إلى المجموعة المجانية",
    submitting:        "جارٍ الحفظ…",
    networkError:      "خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مجدداً.",
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const translations: Record<Lang, Translations> = { en, ar };
