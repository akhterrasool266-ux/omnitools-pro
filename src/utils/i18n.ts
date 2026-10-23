export type SupportedLang = 'en' | 'ur' | 'hi' | 'es' | 'ar';

export interface LangStrings {
  appName: string;
  tagline: string;
  crawlerStatus: string;
  searchPlaceholder: string;
  adSenseBadge: string;
  allTools: string;
  seoCategory: string;
  mediaCategory: string;
  textCategory: string;
  financeCategory: string;
  devCategory: string;
  healthCategory: string;
  freeInstant: string;
  connectAdSense: string;
  stepByStep: string;
  faqTitle: string;
  privacy: string;
  terms: string;
  contact: string;
  about: string;
  disclaimer: string;
  highSearchBadge: string;
}

export const TRANSLATIONS: Record<SupportedLang, LangStrings> = {
  en: {
    appName: 'OmniTools',
    tagline: 'High Search Free Web Tools Suite',
    crawlerStatus: 'Google Crawler Optimized • Live Automated Sitemap Generator • AdSense Monetization Ready',
    searchPlaceholder: 'Search 17+ free tools (sitemap, pdf, compressor, loan emi, salary)...',
    adSenseBadge: 'AdSense: Ready',
    allTools: 'All Tools (17)',
    seoCategory: 'SEO & Webmaster',
    mediaCategory: 'Image & Media',
    textCategory: 'Text & Writing',
    financeCategory: 'Finance & Tax',
    devCategory: 'Dev & Utilities',
    healthCategory: 'Health & Lifestyle',
    freeInstant: '100% Free & Client-Side',
    connectAdSense: 'Connect AdSense',
    stepByStep: 'Step-by-Step: How to Use this Tool',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact Us',
    about: 'About Us',
    disclaimer: 'AdSense Disclaimer',
    highSearchBadge: 'High Search',
  },
  ur: {
    appName: 'OmniTools (اومنی ٹولز)',
    tagline: 'Free Online Tools & SEO Suite (مفت آن لائن ویب ٹولز)',
    crawlerStatus: 'Google Crawler Ready • Live Automated Sitemap • Google AdSense Active',
    searchPlaceholder: 'Search tools (Sitemap, PDF, Salary, Image, Loan)...',
    adSenseBadge: 'AdSense: Active',
    allTools: 'تمام ٹولز • All (17)',
    seoCategory: 'SEO & ایس ای او',
    mediaCategory: 'Media & امیج',
    textCategory: 'Text & الفاظ',
    financeCategory: 'Finance & ٹیکس',
    devCategory: 'Dev & کوڈ',
    healthCategory: 'Health & صحت',
    freeInstant: '100% Free & Private',
    connectAdSense: 'Connect AdSense',
    stepByStep: 'How to Use this Tool (طریقہ کار)',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact Us',
    about: 'About Us',
    disclaimer: 'AdSense Disclaimer',
    highSearchBadge: 'High Search',
  },
  hi: {
    appName: 'OmniTools (ओम्नीटूल्स)',
    tagline: 'मुफ़्त ऑनलाइन वेब टूल्स और एसईओ सुइट',
    crawlerStatus: 'Google Crawler Ready • Live Automated Sitemap • Google AdSense Active',
    searchPlaceholder: 'Search tools (Sitemap, PDF, Salary, Image, Loan)...',
    adSenseBadge: 'AdSense: Active',
    allTools: 'सभी टूल्स • All (17)',
    seoCategory: 'SEO & एसईओ',
    mediaCategory: 'Media & इमेज',
    textCategory: 'Text & शब्द',
    financeCategory: 'Finance & वित्त',
    devCategory: 'Dev & डेवलपर्स',
    healthCategory: 'Health & स्वास्थ्य',
    freeInstant: '100% Free & Private',
    connectAdSense: 'Connect AdSense',
    stepByStep: 'How to Use this Tool',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact Us',
    about: 'About Us',
    disclaimer: 'AdSense Disclaimer',
    highSearchBadge: 'High Search',
  },
  es: {
    appName: 'OmniTools',
    tagline: 'Suite de Herramientas Web Gratuitas de Alta Demanda',
    crawlerStatus: 'Optimizado para Rastreador de Google • Sitemap XML Automático • Listo para AdSense',
    searchPlaceholder: 'Buscar 17+ herramientas (sitemap, pdf, compresor, salario)...',
    adSenseBadge: 'AdSense: Listo',
    allTools: 'Todas (17)',
    seoCategory: 'SEO y Webmaster',
    mediaCategory: 'Imagen y Medios',
    textCategory: 'Texto y Redacción',
    financeCategory: 'Finanzas e Impuestos',
    devCategory: 'Desarrollo y Utilidades',
    healthCategory: 'Salud y Bienestar',
    freeInstant: '100% Gratis y Privado',
    connectAdSense: 'Conectar AdSense',
    stepByStep: 'Paso a Paso: Cómo Usar esta Herramienta',
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    contact: 'Contacto',
    about: 'Sobre Nosotros',
    disclaimer: 'Descargo de AdSense',
    highSearchBadge: 'Alta Búsqueda',
  },
  ar: {
    appName: 'أومني تولز',
    tagline: 'مجموعة أدوات الويب المجانية عالية البحث',
    crawlerStatus: 'مهيأ لمحركات بحث جوجل • توليد تلقائي لخريطة الموقع • جاهز لأدسنس',
    searchPlaceholder: 'ابحث في أكثر من 17 أداة مجانية (خريطة الموقع، دمج PDF، حساب الراتب)...',
    adSenseBadge: 'أدسنس: جاهز',
    allTools: 'جميع الأدوات (17)',
    seoCategory: 'سيو ومشرفي المواقع',
    mediaCategory: 'الصور والوسائط',
    textCategory: 'النصوص والكتابة',
    financeCategory: 'المالية والضرائب',
    devCategory: 'أدوات المطورين',
    healthCategory: 'الصحة ونمط الحياة',
    freeInstant: 'مجاني 100% داخل المتصفح',
    connectAdSense: 'ربط أدسنس',
    stepByStep: 'خطوة بخطوة: كيفية استخدام هذه الأداة',
    faqTitle: 'الأسئلة الشائعة (FAQ)',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    contact: 'اتصل بنا',
    about: 'من نحن',
    disclaimer: 'إخلاء مسؤولية أدسنس',
    highSearchBadge: 'بحث عالي',
  },
};
