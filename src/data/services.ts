export interface Service {
  id: number;
  slug: string;
  titleEn: string;
  titleHi: string;
  shortDescEn: string;
  shortDescHi: string;
  fullDescEn: string;
  fullDescHi: string;
  icon: string;
  sortOrder: number;
}

export const servicesData: Service[] = [
  {
    id: 1,
    slug: "research-paper-writing",
    titleEn: "Research Paper Writing",
    titleHi: "रिसर्च पेपर राइटिंग",
    shortDescEn: "Get professionally written research papers for SCI, Scopus, and UGC CARE indexed journals with original methodology and data analysis.",
    shortDescHi: "SCI, Scopus और UGC CARE जर्नल के लिए पेशेवर रूप से लिखे गए रिसर्च पेपर प्राप्त करें।",
    fullDescEn: "Our expert writers craft high-quality research papers tailored for SCI, Scopus, UGC CARE, and ABDC indexed journals. We ensure original methodology, proper data analysis, plagiarism-free content, and compliance with journal guidelines. From conceptualization to final submission-ready manuscript, we handle every detail with academic precision.",
    fullDescHi: "हमारे विशेषज्ञ लेखक SCI, Scopus, UGC CARE और ABDC अनुक्रमित जर्नल के लिए उच्च गुणवत्ता वाले रिसर्च पेपर तैयार करते हैं।",
    icon: "FileText",
    sortOrder: 1,
  },
  {
    id: 2,
    slug: "review-paper-writing",
    titleEn: "Review Paper Writing",
    titleHi: "रिव्यू पेपर राइटिंग",
    shortDescEn: "Comprehensive systematic and narrative review papers with extensive literature analysis for top-tier publications.",
    shortDescHi: "शीर्ष-स्तरीय प्रकाशनों के लिए व्यापक साहित्य विश्लेषण के साथ सिस्टमैटिक और नैरेटिव रिव्यू पेपर।",
    fullDescEn: "We specialize in crafting systematic reviews, narrative reviews, scoping reviews, and meta-analyses. Our team conducts comprehensive literature searches across multiple databases (Scopus, Web of Science, PubMed, IEEE), synthesizes findings using PRISMA guidelines, and delivers publication-ready manuscripts with critical analysis and future research directions.",
    fullDescHi: "हम सिस्टमैटिक रिव्यू, नैरेटिव रिव्यू, स्कोपिंग रिव्यू और मेटा-एनालिसिस तैयार करने में विशेषज्ञ हैं।",
    icon: "BookOpen",
    sortOrder: 2,
  },
  {
    id: 3,
    slug: "thesis-writing",
    titleEn: "Thesis & Dissertation Writing",
    titleHi: "थीसिस और डिसर्टेशन राइटिंग",
    shortDescEn: "Complete PhD thesis, Master's dissertation, and M.Phil thesis writing with chapter-wise expert guidance.",
    shortDescHi: "पीएचडी थीसिस, मास्टर डिसर्टेशन और एम.फिल थीसIS लेखन पूर्ण अध्याय-वार मार्गदर्शन के साथ।",
    fullDescEn: "From proposal to final viva, we provide end-to-end thesis writing services. Our experts assist with literature review, research methodology design, data collection and analysis, results interpretation, and discussion writing. We ensure your thesis meets university guidelines and international academic standards. Chapter-wise delivery with unlimited revisions.",
    fullDescHi: "प्रस्ताव से अंतिम वाइवा तक, हम अंत-से-अंत थीसिस लेखन सेवाएं प्रदान करते हैं।",
    icon: "GraduationCap",
    sortOrder: 3,
  },
  {
    id: 4,
    slug: "methodology-design",
    titleEn: "Research Methodology Design",
    titleHi: "रिसर्च मेथडोलॉजी डिज़ाइन",
    shortDescEn: "Expert assistance in designing quantitative, qualitative, and mixed-method research frameworks.",
    shortDescHi: "मात्रात्मक, गुणात्मक और मिश्रित-विधि अनुसंधान ढांचे को डिजाइन करने में विशेषज्ञ सहायता।",
    fullDescEn: "We help researchers design robust research methodologies including experimental designs, survey instruments, case study protocols, ethnographic approaches, and mixed-method frameworks. Our team ensures methodological rigor, validity, reliability, and ethical compliance in every research design.",
    fullDescHi: "हम शोधकर्ताओं को मजबूत शोध पद्धतियां डिजाइन करने में मदद करते हैं।",
    icon: "Settings",
    sortOrder: 4,
  },
  {
    id: 5,
    slug: "conceptual-model",
    titleEn: "Conceptual Framework Development",
    titleHi: "कांसेप्चुअल फ्रेमवर्क डेवलपमेंट",
    shortDescEn: "Build strong theoretical frameworks with hypothesis development and structural equation modeling.",
    shortDescHi: "हाइपोथीसिस डेवलपमेंट और स्ट्रक्चरल इक्वेशन मॉडलिंग के साथ मजबूत सैद्धांतिक फ्रेमवर्क बनाएं।",
    fullDescEn: "Our experts develop comprehensive conceptual frameworks grounded in established theories. We assist with hypothesis formulation, variable identification, mediating and moderating variable analysis, and structural equation modeling (SEM) using AMOS, SmartPLS, and SPSS. Visual framework diagrams included.",
    fullDescHi: "हमारे विशेषज्ञ स्थापित सिद्धांतों में आधारित व्यापक कल्पनात्मक ढांचे विकसित करते हैं।",
    icon: "Network",
    sortOrder: 5,
  },
  {
    id: 6,
    slug: "peer-review",
    titleEn: "Peer Review & Paper Improvement",
    titleHi: "पीयर रिव्यू और पेपर इंप्रूवमेंट",
    shortDescEn: "Expert peer review service to improve paper quality before journal submission.",
    shortDescHi: "जर्नल सबमिशन से पहले पेपर की गुणवत्ता में सुधार के लिए विशेषज्ञ पीयर रिव्यू सेवा।",
    fullDescEn: "Get your paper reviewed by subject matter experts before submission. We provide detailed feedback on research design, methodology, data analysis, writing quality, and journal fit. Our review process includes language editing, formatting according to journal guidelines, and addressing potential reviewer concerns.",
    fullDescHi: "सबमिशन से पहले विषय विशेषज्ञों द्वारा अपने पेपर की समीक्षा करवाएं।",
    icon: "Eye",
    sortOrder: 6,
  },
  {
    id: 7,
    slug: "plagiarism-removal",
    titleEn: "Plagiarism & AI Detection Removal",
    titleHi: "प्लagiarism और AI डिटेक्शन रिमूवल",
    shortDescEn: "Advanced plagiarism removal and AI content humanization for 100% originality.",
    shortDescHi: "100% मौलिकता के लिए एडवांस्ड प्लagiarism रिमूवल और AI कंटेंट ह्यूमनाइजेशन।",
    fullDescEn: "We use advanced techniques to reduce plagiarism below 10% (Turnitin, iThenticate) and humanize AI-generated content to bypass AI detection tools (GPTZero, Copyleaks, ZeroGPT). Our experts rewrite content while maintaining academic integrity, proper citations, and the original meaning of your research.",
    fullDescHi: "हम Turnitin, iThenticate में प्लagiarism 10% से कम करने और AI डिटेक्शन टूल्स को बायपास करने के लिए उन्नत तकनीकों का उपयोग करते हैं।",
    icon: "ShieldCheck",
    sortOrder: 7,
  },
  {
    id: 8,
    slug: "publication-support",
    titleEn: "Journal Publication Support",
    titleHi: "जर्नल पब्लिकेशन सपोर्ट",
    shortDescEn: "End-to-end support for publishing in SCI, Scopus, Web of Science, and UGC CARE journals.",
    shortDescHi: "SCI, Scopus, Web of Science और UGC CARE जर्नल में प्रकाशन के लिए अंत-से-अंत सहायता।",
    fullDescEn: "We provide complete publication support including journal selection (SCI, Scopus, WoS, UGC CARE, ABDC), manuscript formatting, cover letter writing, response to reviewer comments, and resubmission support. Our team has a proven track record of successful publications in Q1 and Q2 journals across all disciplines.",
    fullDescHi: "हम SCI, Scopus, WoS, UGC CARE, ABDC में जर्नल चयन, मैन्युस्क्रिप्ट फॉर्मेटिंग, कवर लेटर लेखन सहित पूर्ण प्रकाशन सहायता प्रदान करते हैं।",
    icon: "Globe",
    sortOrder: 8,
  },
];
