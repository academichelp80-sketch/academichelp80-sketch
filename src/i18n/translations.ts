export type Language = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'gu' | 'bn' | 'kn' | 'ml' | 'pa';

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

const en = {
  'brand': "ACADEMICHELP",
  'tagline': "Advanced Research & Publication Support",
  'nav': {
    'home': "Home",
    'services': "Services",
    'testimonials': "Testimonials",
    'blog': "Blog",
    'inquiry': "Inquiry",
    'payment': "Payment"
  },
  'hero': {
    'label': "Research Consultancy",
    'title': "Redefining Academic Research",
    'subtitle': "Expert guidance for scholars pursuing publication in SCI, Scopus, Web of Science, and UGC CARE indexed journals.",
    'cta1': "Get Started",
    'cta2': "Our Services",
    'publishedIn': "Published In",
    'successRate': "Success Rate",
    'whatsAppUs': "WhatsApp Us",
    'startInquiry': "Start Your Inquiry"
  },
  'stats': {
    'papers': "Papers Published",
    'scholars': "Scholars Helped",
    'journals': "Journals Covered",
    'satisfaction': "Satisfaction"
  },
  'services': {
    'title': "Our Services",
    'subtitle': "End-to-end academic support for every stage of your research.",
    'whatWeOffer': "What We Offer",
    'explore': "Explore Services"
  },
  'testimonials': {
    'title': "What Scholars Say",
    'subtitle': "56+ Indian scholars trust AcademicHelp for their research journey.",
    'viewAll': "View All",
    'searchPlaceholder': "Search by name, university, or keyword...",
    'of': "of",
    'reviews': "reviews",
    'label': "Testimonials"
  },
  'blog': {
    'title': "Latest Insights",
    'subtitle': "Expert articles to help you navigate academic publishing.",
    'searchPlaceholder': "Search articles...",
    'category': "Category",
    'readTime': "min read",
    'relatedArticles': "Related Articles",
    'needHelp': "Need help with this topic?",
    'helpText': "Our experts are ready to assist you.",
    'chatWhatsApp': "Chat on WhatsApp",
    'tags': "Tags",
    'allArticles': "All Articles",
    'label': "Knowledge Hub",
    'backToBlog': "Back to Blog",
    'byAcademicHelp': "By AcademicHelp Research Team"
  },
  'inquiry': {
    'title': "Send Your Inquiry",
    'subtitle': "Share your research details. We will connect on WhatsApp within 24 hours.",
    'label': "START YOUR JOURNEY",
    'name': "Full Name",
    'email': "Email",
    'phone': "Phone",
    'researchTitle': "Research Title",
    'objectives': "Proposed Objectives",
    'methodology': "Proposed Methodology",
    'required': "Required",
    'send': "Send via WhatsApp",
    'howItWorks': "How It Works",
    'step1': "Fill in your research details",
    'step2': "Click Send via WhatsApp",
    'step3': "Connect with our expert",
    'step4': "Get personalized guidance",
    'quickConnect': "Quick Connect on WhatsApp",
    'namePlaceholder': "Dr. Your Name",
    'emailPlaceholder': "your@email.com",
    'phonePlaceholder': "+91 98765 43210",
    'titlePlaceholder': "Your research title",
    'objectivesPlaceholder': "List your proposed objectives",
    'methodologyPlaceholder': "Describe your proposed methodology",
    'sentTitle': "Inquiry Sent!",
    'sentDesc': "We will connect with you on WhatsApp shortly.",
    'sendAnother': "Send another",
    'footerNote': "Your inquiry goes directly to our WhatsApp (+91 93106 04015)"
  },
  'payment': {
    'title': "Payment",
    'subtitle': "Fill in your details to proceed with UPI payment",
    'serviceLabel': "Service",
    'amountLabel': "Amount (Rs.)",
    'transactionId': "Transaction ID",
    'nameLabel': "Full Name",
    'emailLabel': "Email",
    'phoneLabel': "Phone",
    'proceed': "Proceed to Payment",
    'secure': "Secure UPI Payment via PhonePe / GPay / Paytm",
    'orderSummary': "Order Summary",
    'scanToPay': "Scan to Pay",
    'scanDesc': "Open PhonePe, GPay, or Paytm and scan",
    'upiId': "UPI ID",
    'copy': "Copy",
    'copied': "Copied",
    'confirmPayment': "Confirm Payment",
    'confirmDesc': "After completing the UPI payment, enter your Transaction ID below",
    'confirmBtn': "I Have Paid - Generate Receipt",
    'verifying': "Verifying Payment...",
    'generating': "Generating your receipt",
    'receiptTitle': "Payment Receipt",
    'downloadReceipt': "Download Receipt (PDF)",
    'shareWhatsApp': "Share on WhatsApp",
    'newPayment': "Make Another Payment",
    'paid': "PAID",
    'paymentMethod': "Payment Method",
    'mode': "Mode",
    'customerDetails': "Customer Details",
    'amountDetails': "Amount Details",
    'serviceCharges': "Service Charges",
    'totalAmount': "Total Amount",
    'thankYou': "Thank you for choosing AcademicHelp!",
    'computerGenerated': "This is a computer-generated receipt.",
    'transactionLabel': "Transaction ID",
    'payNow': "Pay Now",
    'back': "Back",
    'receipt': {
      'downloadPDF': "Download Receipt (PDF)",
      'shareWhatsApp': "Share on WhatsApp"
    }
  },
  'footer': {
    'trust': "A Trusted Partner in Academic Research",
    'order': "ORDER YOUR PAPER",
    'copyright': "Copyright © 2025 AcademicHelp. All rights reserved.",
    'privacy': "Privacy Policy",
    'terms': "Terms & Conditions",
    'quickLinks': "Quick Links",
    'services': "Services",
    'about': "About",
    'contact': "Contact",
    'support': "Support",
    'connect': "Connect"
  },
  'cta': {
    'title': "Ready to Publish Your Research?",
    'subtitle': "Let our experts guide you from manuscript to publication in top-tier journals.",
    'button': "Get Started Now"
  },
  'about': {
    'label': "Why AcademicHelp",
    'title': "Trusted in Research Excellence",
    'desc': "India's premier research consultancy. Our PhD-qualified experts ensure every paper meets the highest standards of top-tier academic journals.",
    'feature1': "SCI Journals",
    'feature1Desc': "Science Citation Index",
    'feature2': "Scopus",
    'feature2Desc': "Indexed Publications",
    'feature3': "UGC CARE",
    'feature3Desc': "Approved Journals",
    'feature4': "ABDC",
    'feature4Desc': "Ranked Journals"
  },
  'process': {
    'label': "Process",
    'title': "How It Works",
    'step1': "Submit Details",
    'step1Desc': "Share your research title, objectives, and methodology via our form or WhatsApp.",
    'step2': "Expert Assigned",
    'step2Desc': "We match you with a PhD-qualified expert in your research domain.",
    'step3': "Receive Work",
    'step3Desc': "Get your publication-ready manuscript delivered on schedule.",
    'step4': "Get Published",
    'step4Desc': "Submit to your target journal with confidence and achieve success."
  },
  'servicesPage': {
    'title': "Our Services",
    'subtitle': "End-to-end academic support for every stage of your research journey.",
    'comprehensive': "Comprehensive Solutions",
    'advantageTitle': "The AcademicHelp Advantage",
    'advantage1': "100% Customized",
    'advantage1Desc': "Every project crafted to match your research objectives and target journal requirements.",
    'advantage2': "PhD Experts",
    'advantage2Desc': "Doctorate-qualified researchers with expertise across diverse academic disciplines.",
    'advantage3': "Fully Confidential",
    'advantage3Desc': "Complete anonymity throughout the research and publication process."
  },
  'notFound': {
    'title': "Page Not Found",
    'desc': "The page you are looking for does not exist.",
    'backHome': "Back to Home"
  },
  'seo': {
    'keywords': "research paper writing, AI tools for research, research publications, research Scopus, thesis writing, plagiarism removal, peer review, academic consultancy",
    'description': "AcademicHelp provides expert research consultancy for research papers, review papers, thesis writing, methodology design, conceptual framework, peer review, and plagiarism removal."
  }
} as const;

const hi = {
  'brand': "ACADEMICHELP",
  'tagline': "Advanced Research & Publication Support",
  'nav': {
    'home': "होम",
    'services': "सेवाएं",
    'testimonials': "प्रशंसापत्र",
    'blog': "ब्लॉग",
    'inquiry': "पूछताछ",
    'payment': "भुगतान"
  },
  'hero': {
    'label': "रिसर्च कंसल्टेंसी",
    'title': "अकादमिक रिसर्च को नया आकार",
    'subtitle': "SCI, Scopus, Web of Science और UGC CARE जर्नल में प्रकाशन के लिए विद्वानों को विशेषज्ञ मार्गदर्शन।",
    'cta1': "शुरू करें",
    'cta2': "हमारी सेवाएं",
    'publishedIn': "प्रकाशित जर्नल",
    'successRate': "सफलता दर",
    'whatsAppUs': "WhatsApp करें",
    'startInquiry': "अपनी पूछताछ शुरू करें"
  },
  'stats': {
    'papers': "प्रकाशित पेपर",
    'scholars': "विद्वान सहायता प्राप्त",
    'journals': "जर्नल कवर",
    'satisfaction': "संतुष्टि दर"
  },
  'services': {
    'title': "हमारी सेवाएं",
    'subtitle': "आपके शोध के हर चरण के लिए अंत-से-अंत अकादमिक सहायता।",
    'whatWeOffer': "हम क्या ऑफर करते हैं",
    'explore': "सेवाएं देखें"
  },
  'testimonials': {
    'title': "विद्वान क्या कहते हैं",
    'subtitle': "56+ भारतीय विद्वान AcademicHelp पर भरोसा करते हैं।",
    'viewAll': "सभी देखें",
    'searchPlaceholder': "नाम, विश्वविद्यालय या कीवर्ड से खोजें...",
    'of': "में से",
    'reviews': "समीक्षाएं",
    'label': "प्रशंसापत्र"
  },
  'blog': {
    'title': "नवीनतम अंतर्दृष्टि",
    'subtitle': "अकादमिक प्रकाशन में मदद करने वाले विशेषज्ञ लेख।",
    'searchPlaceholder': "लेख खोजें...",
    'category': "श्रेणी",
    'readTime': "मिनट पढ़ें",
    'relatedArticles': "संबंधित लेख",
    'needHelp': "इस विषय में मदद चाहिए?",
    'helpText': "हमारे विशेषज्ञ आपकी सहायता के लिए तैयार हैं।",
    'chatWhatsApp': "WhatsApp पर चैट करें",
    'tags': "टैग",
    'allArticles': "सभी लेख",
    'label': "ज्ञान केंद्र",
    'backToBlog': "ब्लॉग पर वापस",
    'byAcademicHelp': "AcademicHelp रिसर्च टीम द्वारा"
  },
  'inquiry': {
    'title': "अपनी पूछताछ भेजें",
    'subtitle': "अपना शोध शीर्षक, उद्देश्य और कार्यप्रणाली साझा करें। हम WhatsApp पर 24 घंटों में जुड़ेंगे।",
    'label': "अपनी यात्रा शुरू करें",
    'name': "पूरा नाम",
    'email': "ईमेल",
    'phone': "फोन",
    'researchTitle': "शोध शीर्षक",
    'objectives': "प्रस्तावित उद्देश्य",
    'methodology': "प्रस्तावित कार्यप्रणाली",
    'required': "आवश्यक",
    'send': "WhatsApp पर भेजें",
    'howItWorks': "यह कैसे काम करता है",
    'step1': "अपना शोध विवरण भरें",
    'step2': "WhatsApp पर भेजें पर क्लिक करें",
    'step3': "हमारे विशेषज्ञ से जुड़ें",
    'step4': "व्यक्तिगत मार्गदर्शन प्राप्त करें",
    'quickConnect': "WhatsApp पर तुरंत जुड़ें",
    'namePlaceholder': "डॉ. आपका नाम",
    'emailPlaceholder': "आपका@ईमेल.com",
    'phonePlaceholder': "+91 98765 43210",
    'titlePlaceholder': "आपका शोध शीर्षक",
    'objectivesPlaceholder': "अपने प्रस्तावित उद्देश्य सूचीबद्ध करें",
    'methodologyPlaceholder': "अपनी प्रस्तावित कार्यप्रणाली वर्णन करें",
    'sentTitle': "पूछताछ भेजी गई!",
    'sentDesc': "हम जल्द ही WhatsApp पर आपसे जुड़ेंगे।",
    'sendAnother': "दूसरी भेजें",
    'footerNote': "आपकी पूछताछ सीधे हमारे WhatsApp (+91 93106 04015) पर जाती है"
  },
  'payment': {
    'title': "भुगतान",
    'subtitle': "UPI भुगतान के लिए अपना विवरण भरें",
    'serviceLabel': "सेवा",
    'amountLabel': "राशि (रु.)",
    'transactionId': "लेनदेन ID",
    'nameLabel': "पूरा नाम",
    'emailLabel': "ईमेल",
    'phoneLabel': "फोन",
    'proceed': "भुगतान जारी रखें",
    'secure': "PhonePe / GPay / Paytm द्वारा सुरक्षित UPI भुगतान",
    'orderSummary': "ऑर्डर सारांश",
    'scanToPay': "स्कैन करके भुगतान करें",
    'scanDesc': "PhonePe, GPay, या Paytm खोलें और स्कैन करें",
    'upiId': "UPI ID",
    'copy': "कॉपी",
    'copied': "कॉपी हो गया",
    'confirmPayment': "भुगतान की पुष्टि करें",
    'confirmDesc': "UPI भुगतान पूरा करने के बाद, नीचे अपना लेनदेन ID दर्ज करें",
    'confirmBtn': "मैंने भुगतान किया - रसीद तैयार करें",
    'verifying': "भुगतान सत्यापित हो रहा है...",
    'generating': "आपकी रसीद तैयार हो रही है",
    'receiptTitle': "भुगतान रसीद",
    'downloadReceipt': "रसीद डाउनलोड करें (PDF)",
    'shareWhatsApp': "WhatsApp पर साझा करें",
    'newPayment': "एक और भुगतान करें",
    'paid': "भुगतान किया",
    'paymentMethod': "भुगतान का तरीका",
    'mode': "मोड",
    'customerDetails': "ग्राहक विवरण",
    'amountDetails': "राशि विवरण",
    'serviceCharges': "सेवा शुल्क",
    'totalAmount': "कुल राशि",
    'thankYou': "AcademicHelp चुनने के लिए धन्यवाद!",
    'computerGenerated': "यह कंप्यूटर-जनित रसीद है।",
    'transactionLabel': "लेनदेन ID",
    'payNow': "Pay Now",
    'back': "Back",
    'receipt': {
      'downloadPDF': "Download Receipt (PDF)",
      'shareWhatsApp': "Share on WhatsApp"
    }
  },
  'footer': {
    'trust': "अकादमिक शोध में एक विश्वसनीय साथी",
    'order': "अपना पेपर ऑर्डर करें",
    'copyright': "कॉपीराइट © 2025 AcademicHelp। सर्वाधिकार सुरक्षित।",
    'privacy': "गोपनीयता नीति",
    'terms': "नियम और शर्तें",
    'quickLinks': "त्वरित लिंक",
    'services': "सेवाएं",
    'about': "हमारे बारे में",
    'contact': "संपर्क",
    'support': "सहायता",
    'connect': "जुड़ें"
  },
  'cta': {
    'title': "अपना शोध प्रकाशित करने के लिए तैयार हैं?",
    'subtitle': "टॉप-टियर जर्नल में प्रकाशन के लिए हमारे विशेषज्ञों को मार्गदर्शन करने दें।",
    'button': "अभी शुरू करें"
  },
  'about': {
    'label': "AcademicHelp क्यों",
    'title': "रिसर्च उत्कृष्टता में विश्वसनीय",
    'desc': "भारत की प्रमुख रिसर्च कंसल्टेंसी। हमारे PhD-योग्य विशेषज्ञ सुनिश्चित करते हैं कि हर पेपर शीर्ष अकादमिक जर्नल के उच्चतम मानकों को पूरा करे।",
    'feature1': "SCI जर्नल",
    'feature1Desc': "साइंस साइटेशन इंडेक्स",
    'feature2': "Scopus",
    'feature2Desc': "अनुक्रमित प्रकाशन",
    'feature3': "UGC CARE",
    'feature3Desc': "अनुमोदित जर्नल",
    'feature4': "ABDC",
    'feature4Desc': "रैंक किए गए जर्नल"
  },
  'process': {
    'label': "प्रक्रिया",
    'title': "यह कैसे काम करता है",
    'step1': "विवरण जमा करें",
    'step1Desc': "हमारे फॉर्म या WhatsApp के माध्यम से अपना शोध शीर्षक, उद्देश्य और कार्यप्रणाली साझा करें।",
    'step2': "विशेषज्ञ नियुक्त",
    'step2Desc': "हम आपको आपके शोध क्षेत्र में PhD-योग्य विशेषज्ञ से मिलाते हैं।",
    'step3': "काम प्राप्त करें",
    'step3Desc': "समय पर प्रकाशन-तैयार पांडुलिपि प्राप्त करें।",
    'step4': "प्रकाशित करें",
    'step4Desc': "आत्मविश्वास के साथ अपने लक्षित जर्नल में सबमिट करें और सफलता प्राप्त करें।"
  },
  'servicesPage': {
    'title': "हमारी सेवाएं",
    'subtitle': "आपके शोध यात्रा के हर चरण के लिए अंत-से-अंत अकादमिक सहायता।",
    'comprehensive': "व्यापक समाधान",
    'advantageTitle': "AcademicHelp का लाभ",
    'advantage1': "100% अनुकूलित",
    'advantage1Desc': "हर प्रोजेक्ट आपके शोध उद्देश्यों और लक्षित जर्नल आवश्यकताओं से मेल खाने के लिए तैयार किया गया।",
    'advantage2': "PhD विशेषज्ञ",
    'advantage2Desc': "विविध अकादमिक विषयों में विशेषज्ञता रखने वाले डॉक्टरेट-योग्य शोधकर्ता।",
    'advantage3': "पूर्ण गोपनीयता",
    'advantage3Desc': "शोध और प्रकाशन प्रक्रिया के दौरान पूर्ण अनामिता।"
  },
  'notFound': {
    'title': "पेज नहीं मिला",
    'desc': "आप जो पेज खोज रहे हैं वह मौजूद नहीं है।",
    'backHome': "होम पर वापस जाएं"
  },
  'seo': {
    'keywords': "रिसर्च पेपर राइटिंग, AI टूल्स फॉर रिसर्च, रिसर्च पब्लिकेशन, स्कोपस, थीसिस राइटिंग",
    'description': "AcademicHelp रिसर्च पेपर, थीसिस राइटिंग, प्लagiarism रिमूवल और पीयर रिव्यू के लिए विशेषज्ञ सहायता प्रदान करता है।"
  }
} as const;

const ta = en as const;

const te = en as const;

const mr = en as const;

const gu = en as const;

const bn = en as const;

const kn = en as const;

const ml = en as const;

const pa = en as const;

export const translations = { en, hi, ta, te, mr, gu, bn, kn, ml, pa } as const;
export type Translations = typeof translations.en;