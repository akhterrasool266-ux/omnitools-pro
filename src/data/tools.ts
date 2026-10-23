import { ToolMetadata } from '../types';

export const TOOLS_DATA: ToolMetadata[] = [
  {
    id: 'sitemap-generator',
    name: 'Automated XML Sitemap Generator & Validator',
    shortName: 'XML Sitemap Generator',
    slug: 'xml-sitemap-generator',
    category: 'seo',
    badge: 'High Search',
    icon: 'Network',
    description:
      'Generate Google-compliant XML sitemaps instantly with custom frequency, priority, and lastmod tags. Validate XML structure for search engine crawlers.',
    searchVolume: '450K / month',
    estimatedCpc: '$3.85',
    highIntentKeywords: [
      'xml sitemap generator',
      'google sitemap creator',
      'free sitemap generator online',
      'generate sitemap xml for website',
      'validate sitemap google search console',
    ],
    howToSteps: [
      'Enter your domain or list of webpage URLs in the input box.',
      'Configure the crawling frequency (daily, weekly, monthly) and page priority (0.1 to 1.0).',
      'Click "Generate Sitemap XML" to build a standard compliant XML file.',
      'Copy the output or download as sitemap.xml to upload to your web server root directory.',
      'Submit the sitemap link directly to Google Search Console for indexing.',
    ],
    faqs: [
      {
        question: 'Why does Google require an XML sitemap?',
        answer:
          'An XML sitemap acts as a roadmap for search engine crawlers (Googlebot, Bingbot), informing them which pages are most important, when they were last modified, and how frequently they change, accelerating indexation.',
      },
      {
        question: 'Where should I upload my sitemap.xml file?',
        answer:
          'Upload sitemap.xml into the root directory of your domain (e.g. https://yourdomain.com/sitemap.xml) and reference it in your robots.txt file.',
      },
      {
        question: 'How many URLs can a single XML sitemap file hold?',
        answer:
          'Google allows up to 50,000 URLs or 50MB uncompressed per sitemap file. If your site has more URLs, use a Sitemap Index file.',
      },
    ],
    metaTitle: 'Free XML Sitemap Generator & Validator - Google Search Console Ready',
    metaDescription:
      'Generate automated XML sitemaps with custom priority and changefreq tags. Fast, free, and validated for Google Search Console crawlers.',
  },
  {
    id: 'meta-serp-previewer',
    name: 'SEO Meta Tag Generator & Google SERP Simulator',
    shortName: 'Meta Tag & SERP Preview',
    slug: 'meta-tag-generator-serp-simulator',
    category: 'seo',
    badge: 'Popular',
    icon: 'Search',
    description:
      'Craft high-click-through Google SERP titles and descriptions with live mobile & desktop preview. Auto-generates OpenGraph, Twitter Cards, and Schema.org JSON-LD.',
    searchVolume: '320K / month',
    estimatedCpc: '$4.20',
    highIntentKeywords: [
      'meta tag generator',
      'google serp simulator',
      'serp snippet preview tool',
      'opengraph generator',
      'seo title tag length checker',
    ],
    howToSteps: [
      'Enter your page title, target URL, and meta description.',
      'Monitor the character and pixel counter (titles under 60 chars, descriptions under 160 chars) to prevent truncation.',
      'Toggle between Desktop and Mobile Google search preview modes.',
      'Copy ready-to-paste HTML meta tags and OpenGraph tags into your webpage <head>.',
    ],
    faqs: [
      {
        question: 'What is the optimal meta title length for Google in 2026?',
        answer:
          'Google displays up to 60 characters or ~580 pixels on desktop and mobile. Titles longer than this risk being cut off with an ellipsis (...).',
      },
      {
        question: 'Do meta descriptions directly impact Google ranking factors?',
        answer:
          'While not a direct algorithmic ranking factor, compelling meta descriptions significantly boost Click-Through Rates (CTR), which indirectly signals relevance to search engines.',
      },
    ],
    metaTitle: 'SEO Meta Tag Generator & Live Google SERP Simulator | OmniTools',
    metaDescription:
      'Generate SEO-optimized meta tags, OpenGraph cards, and preview how your webpage looks in Google Desktop and Mobile search results.',
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator & Crawler Directives Builder',
    shortName: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    category: 'seo',
    badge: 'SEO Core',
    icon: 'FileCode',
    description:
      'Create clean, syntax-validated robots.txt files for Googlebot, Bingbot, and AI crawlers. Manage crawl delays, disallowed directories, and sitemap directives.',
    searchVolume: '180K / month',
    estimatedCpc: '$2.90',
    highIntentKeywords: [
      'robots txt generator',
      'create robots txt online',
      'googlebot allow disallow builder',
      'robots txt sitemap directive generator',
    ],
    howToSteps: [
      'Enter your root website domain.',
      'Select default permissions for crawlers (Allow all or Disallow all).',
      'Specify specific folders to block from indexing (e.g., /admin, /wp-admin, /cart).',
      'Enter your XML sitemap URL.',
      'Click Download or Copy robots.txt and save to your root public directory.',
    ],
    faqs: [
      {
        question: 'Does robots.txt hide sensitive pages from the public?',
        answer:
          'No! Robots.txt is a public advisory file. It tells search crawlers which paths to avoid crawling, but it does not password-protect files or prevent direct access.',
      },
      {
        question: 'Can I block AI crawlers like GPTBot in robots.txt?',
        answer:
          'Yes, you can add "User-agent: GPTBot" with "Disallow: /" to block specific AI scrapers while allowing Googlebot to index your pages.',
      },
    ],
    metaTitle: 'Free Robots.txt Generator & Validator for Googlebot | OmniTools',
    metaDescription:
      'Generate standardized robots.txt files with custom user-agents, disallow directives, crawl-delay, and sitemap paths.',
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density & SEO Content Analyzer',
    shortName: 'Keyword Density Analyzer',
    slug: 'keyword-density-analyzer',
    category: 'seo',
    badge: 'High Value',
    icon: 'BarChart2',
    description:
      'Analyze 1-word, 2-word, and 3-word n-gram keyword frequencies and densities to avoid keyword stuffing and rank higher on Google search.',
    searchVolume: '140K / month',
    estimatedCpc: '$3.50',
    highIntentKeywords: [
      'keyword density checker',
      'seo content keyword frequency analyzer',
      'check keyword stuffing online',
      'article keyword percentage calculator',
    ],
    howToSteps: [
      'Paste your draft article, blog post, or webpage copy into the editor.',
      'Review total words, unique words, and density percentage.',
      'Check top keywords to ensure your primary keyword density is in the optimal 1% to 2.5% safe zone.',
      'Export or tweak content based on recommendations.',
    ],
    faqs: [
      {
        question: 'What is the ideal keyword density for Google SEO?',
        answer:
          'Modern search engines recommend natural writing with 1% to 2.5% keyword density. Densities above 3.5% may trigger algorithmic over-optimization penalties.',
      },
    ],
    metaTitle: 'Free Keyword Density Checker & SEO Text Analyzer | OmniTools',
    metaDescription:
      'Check keyword frequency and density percentage for any text. Optimize your articles for Google rankings without keyword stuffing penalties.',
  },
  {
    id: 'image-compressor',
    name: 'High-Speed Client-Side Image Compressor & WebP Converter',
    shortName: 'Image Compressor',
    slug: 'image-compressor-webp-converter',
    category: 'media',
    badge: 'Mega Volume',
    icon: 'Image',
    description:
      'Compress JPG, PNG, and WebP images by up to 85% with zero server upload. Instant, 100% private in-browser compression to skyrocket Google PageSpeed Core Web Vitals.',
    searchVolume: '1.2M / month',
    estimatedCpc: '$2.45',
    highIntentKeywords: [
      'image compressor',
      'compress jpeg online',
      'compress png without losing quality',
      'convert to webp online',
      'reduce image file size kb',
    ],
    howToSteps: [
      'Drag and drop or select your image (JPEG, PNG, or WebP).',
      'Adjust compression quality slider (recommended 75-85%).',
      'Optionally set maximum output width and target format (WebP/JPEG/PNG).',
      'Compare original vs compressed file size savings in real time.',
      'Download your optimized image instantly.',
    ],
    faqs: [
      {
        question: 'Are my images uploaded to any server?',
        answer:
          'No! All compression runs client-side inside your browser using the HTML5 Canvas API. Your images never leave your computer or phone.',
      },
      {
        question: 'Why does Google recommend WebP format?',
        answer:
          'WebP provides 25-35% superior compression compared to JPEG and PNG at equivalent visual quality, directly improving LCP (Largest Contentful Paint) scores.',
      },
    ],
    metaTitle: 'Free Image Compressor - Compress PNG, JPG, WebP Online | OmniTools',
    metaDescription:
      'Compress images up to 85% without loss of quality. 100% private, instant in-browser compression for faster websites and higher Google PageSpeed scores.',
  },
  {
    id: 'word-counter',
    name: 'Word Counter, Character Count & Readability Calculator',
    shortName: 'Word Counter',
    slug: 'word-counter-character-count',
    category: 'text',
    badge: 'Massive Traffic',
    icon: 'AlignLeft',
    description:
      'Real-time count of words, characters (with/without spaces), sentences, paragraphs, reading time, speaking time, and Flesch-Kincaid readability grade.',
    searchVolume: '2.5M / month',
    estimatedCpc: '$1.80',
    highIntentKeywords: [
      'word counter online',
      'character counter with spaces',
      'essay word count calculator',
      'reading time estimator',
      'flesch reading ease calculator',
    ],
    howToSteps: [
      'Type or paste your text into the editor.',
      'View live stats update instantly as you type.',
      'Check reading time (based on 200 wpm) and speaking time (130 wpm).',
      'Analyze the Flesch Reading Ease score to ensure clarity for your target audience.',
    ],
    faqs: [
      {
        question: 'What is a good Flesch Reading Ease score for web articles?',
        answer:
          'A score between 60 and 70 is considered standard reading level (understood by 13-15 year olds) and is recommended for consumer blogs and web content.',
      },
    ],
    metaTitle: 'Word Counter & Character Counter Tool (Free Online) | OmniTools',
    metaDescription:
      'Count words, characters, sentences, paragraphs, and calculate reading time and Flesch readability scores in real time.',
  },
  {
    id: 'loan-emi-calculator',
    name: 'Loan & Mortgage EMI Calculator with Amortization Schedule',
    shortName: 'Loan EMI Calculator',
    slug: 'loan-mortgage-emi-calculator',
    category: 'finance',
    badge: 'High AdSense RPM',
    icon: 'Calculator',
    description:
      'Calculate monthly loan EMIs, total payable interest, and yearly amortization breakdown for personal, car, and home mortgage loans. High financial intent tool.',
    searchVolume: '1.9M / month',
    estimatedCpc: '$5.60',
    highIntentKeywords: [
      'loan emi calculator',
      'home loan emi calculator with amortization',
      'car loan monthly payment calculator',
      'mortgage payment breakdown interest principal',
    ],
    howToSteps: [
      'Enter the loan amount (principal).',
      'Enter the annual interest rate percentage (%).',
      'Set the loan tenure in years or months.',
      'Review monthly EMI payment, total interest payable, and total loan cost.',
      'Inspect the monthly breakdown schedule table.',
    ],
    faqs: [
      {
        question: 'What is the formula used for EMI calculation?',
        answer:
          'EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is Principal, R is monthly interest rate, and N is the total number of monthly payments.',
      },
    ],
    metaTitle: 'Loan EMI Calculator - Home, Car & Personal Loan | OmniTools',
    metaDescription:
      'Calculate monthly EMI, total interest, and complete amortization schedule for personal loans, car loans, and home mortgages.',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter, Validator & Minifier',
    shortName: 'JSON Formatter',
    slug: 'json-formatter-validator',
    category: 'developer',
    badge: 'Dev Favorite',
    icon: 'Code2',
    description:
      'Format messy JSON strings into clean, indented code (2 spaces, 4 spaces, tabs). Validate syntax with line-by-line error messages and minify for production.',
    searchVolume: '1.6M / month',
    estimatedCpc: '$2.15',
    highIntentKeywords: [
      'json formatter online',
      'json validator syntax checker',
      'prettify json string',
      'json minifier compressor',
    ],
    howToSteps: [
      'Paste your raw JSON string into the editor.',
      'Click "Format (2 Spaces)" or "Format (4 Spaces)" to beautify.',
      'If there are syntax errors, review the exact error details.',
      'Click "Minify" to strip whitespace or "Copy" to clipboard.',
    ],
    faqs: [
      {
        question: 'Can this tool validate malformed JSON?',
        answer:
          'Yes, it pinpoints syntax errors such as missing quotes, trailing commas, or unmatched brackets with descriptive messages.',
      },
    ],
    metaTitle: 'Free JSON Formatter, Validator & Beautifier | OmniTools',
    metaDescription:
      'Format, validate, prettify, and minify JSON data online. Fast, clean syntax highlighting with instant error detection.',
  },
  {
    id: 'qr-generator',
    name: 'High-Resolution Custom QR Code Generator',
    shortName: 'QR Code Generator',
    slug: 'qr-code-generator',
    category: 'utility',
    badge: 'Trending',
    icon: 'QrCode',
    description:
      'Generate customizable, scan-ready QR codes for website URLs, WiFi credentials, plain text, and contact vCards. Download in crystal-clear SVG or PNG.',
    searchVolume: '3.1M / month',
    estimatedCpc: '$1.95',
    highIntentKeywords: [
      'qr code generator free',
      'create qr code for website url',
      'custom qr code generator with colors',
      'generate qr code high resolution png svg',
    ],
    howToSteps: [
      'Select QR code type: Website URL, Plain Text, or WiFi.',
      'Enter the content details.',
      'Choose custom foreground and background colors.',
      'Preview your QR code and test with a phone scanner.',
      'Download as PNG or vector SVG.',
    ],
    faqs: [
      {
        question: 'Do these QR codes ever expire?',
        answer:
          'No! These are static QR codes containing raw text or URL data directly encoded. They work forever without subscriptions or redirect servers.',
      },
    ],
    metaTitle: 'Free Custom QR Code Generator (SVG & PNG) | OmniTools',
    metaDescription:
      'Generate custom QR codes for URLs, WiFi, and text. Customize colors and download high-resolution QR codes for print and web.',
  },
  {
    id: 'password-generator',
    name: 'Secure Password Generator & Entropy Auditor',
    shortName: 'Password Generator',
    slug: 'secure-password-generator',
    category: 'utility',
    badge: 'Security',
    icon: 'Lock',
    description:
      'Generate cryptographically strong, unhackable passwords. Includes customizable character pools, ambiguity filters, and real-time entropy calculation.',
    searchVolume: '850K / month',
    estimatedCpc: '$2.30',
    highIntentKeywords: [
      'strong password generator',
      'random password generator secure',
      'password entropy checker',
      'generate safe password online',
    ],
    howToSteps: [
      'Set your desired password length (12 to 64 characters).',
      'Toggle uppercase, lowercase, numbers, and special symbols.',
      'Check the real-time entropy score and crack-time resistance.',
      'Click "Generate New" or copy directly to clipboard.',
    ],
    faqs: [
      {
        question: 'Are passwords generated using secure cryptography?',
        answer:
          'Yes, passwords are generated locally using the Web Cryptography API (`crypto.getRandomValues`), ensuring non-deterministic entropy.',
      },
    ],
    metaTitle: 'Strong Password Generator & Security Audit | OmniTools',
    metaDescription:
      'Generate strong, random passwords with custom rules, ambiguity filters, and real-time entropy estimation. 100% client-side security.',
  },
  {
    id: 'case-converter',
    name: 'Text Case Converter & String Formatter',
    shortName: 'Case Converter',
    slug: 'case-converter-text-formatter',
    category: 'text',
    badge: 'Fast Utility',
    icon: 'Type',
    description:
      'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case, and snake_case in one click.',
    searchVolume: '620K / month',
    estimatedCpc: '$1.40',
    highIntentKeywords: [
      'case converter online',
      'convert uppercase to lowercase',
      'title case converter',
      'sentence case converter',
      'kebab case camel case converter',
    ],
    howToSteps: [
      'Type or paste your text into the input box.',
      'Click the button corresponding to your desired format (e.g., Title Case, kebab-case, UPPERCASE).',
      'Copy the converted text with one click.',
    ],
    faqs: [
      {
        question: 'What is the difference between camelCase and kebab-case?',
        answer:
          'camelCase formats words like "myVariableName" (standard in JavaScript), while kebab-case separates words with hyphens like "my-variable-name" (standard in URLs and CSS).',
      },
    ],
    metaTitle: 'Free Text Case Converter (UPPERCASE, lowercase, Title Case) | OmniTools',
    metaDescription:
      'Convert text between UPPERCASE, lowercase, Title Case, camelCase, kebab-case, and snake_case with instant one-click copying.',
  },
  {
    id: 'base64-converter',
    name: 'Base64 Encoder & Decoder with UTF-8 Support',
    shortName: 'Base64 Encoder/Decoder',
    slug: 'base64-encoder-decoder',
    category: 'developer',
    badge: 'Developer',
    icon: 'Binary',
    description:
      'Encode plain text into standard Base64 or decode Base64 back to human-readable strings with full UTF-8 Unicode characters support.',
    searchVolume: '750K / month',
    estimatedCpc: '$1.75',
    highIntentKeywords: [
      'base64 encode online',
      'base64 decoder',
      'utf8 base64 converter',
      'decode base64 string to text',
    ],
    howToSteps: [
      'Select Encode or Decode mode.',
      'Paste your string into the input area.',
      'View the converted output in real time.',
      'Copy or download the output.',
    ],
    faqs: [
      {
        question: 'Does this handle UTF-8 characters like emojis and accents?',
        answer:
          'Yes, our encoder uses modern TextEncoder/TextDecoder APIs to safely preserve all Unicode, Cyrillic, Arabic, and emoji characters without scrambling.',
      },
    ],
    metaTitle: 'Free Base64 Encoder & Decoder (UTF-8 Supported) | OmniTools',
    metaDescription:
      'Fast, reliable online Base64 encoder and decoder with full UTF-8 Unicode support. Encode strings or decode Base64 instantly.',
  },
  {
    id: 'pdf-tools',
    name: 'Client-Side PDF Merger & Document Combiner',
    shortName: 'PDF Merger & Combiner',
    slug: 'pdf-merger-combine-documents',
    category: 'media',
    badge: 'High Search',
    icon: 'FileText',
    description:
      'Merge multiple PDF documents into a single consolidated PDF directly in your browser. 100% private, zero upload to external servers.',
    searchVolume: '2.8M / month',
    estimatedCpc: '$3.40',
    highIntentKeywords: [
      'pdf merger online free',
      'combine pdf files into one',
      'merge pdf client side private',
      'join multiple pdf documents',
    ],
    howToSteps: [
      'Upload two or more PDF files using the file picker or drag-and-drop.',
      'Review the order of your documents.',
      'Click "Merge PDFs into Single File".',
      'Download your merged PDF document immediately.',
    ],
    faqs: [
      {
        question: 'Are my confidential PDF documents safe?',
        answer:
          'Yes! All merging is executed entirely inside your browser using WebAssembly and pdf-lib. No document is ever sent to or stored on any server.',
      },
      {
        question: 'Is there a limit on file size?',
        answer:
          'Because processing occurs in your local memory, you can easily combine documents up to 100MB+ depending on your device RAM.',
      },
    ],
    metaTitle: 'Free PDF Merger - Combine Multiple PDF Files Online | OmniTools',
    metaDescription:
      'Merge multiple PDF files into one document in seconds. 100% free, secure, and client-side processing without uploading files.',
  },
  {
    id: 'salary-tax-calculator',
    name: 'Salary to Hourly & Tax Take-Home Paycheck Calculator',
    shortName: 'Salary & Tax Calculator',
    slug: 'salary-hourly-tax-paycheck-calculator',
    category: 'finance',
    badge: 'High AdSense RPM',
    icon: 'DollarSign',
    description:
      'Convert annual salary to hourly wage, daily pay, weekly earnings, and estimate monthly net take-home pay after federal and state income taxes.',
    searchVolume: '1.4M / month',
    estimatedCpc: '$5.90',
    highIntentKeywords: [
      'salary to hourly calculator',
      'take home pay calculator after tax',
      'annual salary to biweekly paycheck',
      'hourly wage to yearly income',
    ],
    howToSteps: [
      'Enter your annual salary or hourly rate.',
      'Specify typical weekly working hours (default 40 hrs).',
      'Adjust the estimated effective income tax percentage.',
      'Review your hourly rate, bi-weekly check, and net monthly take-home salary.',
    ],
    faqs: [
      {
        question: 'How is the hourly wage calculated from annual salary?',
        answer:
          'Based on standard 40 hours per week over 52 work weeks per year (total 2,080 working hours), Annual Salary is divided by 2,080.',
      },
    ],
    metaTitle: 'Salary to Hourly Calculator & Net Paycheck Estimator | OmniTools',
    metaDescription:
      'Convert salary to hourly pay, calculate paycheck take-home amounts, and estimate net monthly income after tax.',
  },
  {
    id: 'crypto-roi-calculator',
    name: 'Crypto & Investment Profit / ROI Calculator',
    shortName: 'Crypto & Investment ROI',
    slug: 'crypto-investment-roi-calculator',
    category: 'finance',
    badge: 'High CPC',
    icon: 'TrendingUp',
    description:
      'Calculate cryptocurrency and stock investment returns, net profit, percentage gains, and exchange transaction fees with target exit multipliers.',
    searchVolume: '1.1M / month',
    estimatedCpc: '$6.40',
    highIntentKeywords: [
      'crypto profit calculator',
      'bitcoin investment roi calculator',
      'crypto exit target profit calculator',
      'investment return percentage calculator',
    ],
    howToSteps: [
      'Enter your initial investment amount in USD.',
      'Enter your entry buy price and planned exit sell price.',
      'Adjust trading fee percentage (default 0.2%).',
      'Inspect total tokens acquired, gross exit value, net profit, and ROI %.',
      'Click scenario buttons (2x, 5x, 10x) to project bull market returns.',
    ],
    faqs: [
      {
        question: 'Does this calculator account for exchange trading fees?',
        answer:
          'Yes, both buy-side entry and sell-side exit exchange fees are deducted from gross profit for true net return accuracy.',
      },
    ],
    metaTitle: 'Crypto Profit & ROI Calculator - Calculate Investment Gains | OmniTools',
    metaDescription:
      'Calculate net cryptocurrency and stock investment profit, ROI percentage, and trading fees with custom bull/bear scenario multipliers.',
  },
  {
    id: 'age-calculator',
    name: 'Accurate Age, Birthday & Milestone Calculator',
    shortName: 'Age & Milestone Calculator',
    slug: 'exact-age-birthday-milestone-calculator',
    category: 'utility',
    badge: 'Mega Volume',
    icon: 'Calendar',
    description:
      'Calculate exact age in years, months, weeks, days, and hours. Discover day of the week you were born and countdown to your next birthday.',
    searchVolume: '3.5M / month',
    estimatedCpc: '$1.60',
    highIntentKeywords: [
      'age calculator online',
      'chronological age calculator years months days',
      'how many days old am i',
      'next birthday countdown calculator',
    ],
    howToSteps: [
      'Select your birth date from the date picker.',
      'Optionally choose a target comparison date (default today).',
      'View your exact chronological age in years, months, and days.',
      'Explore total days, hours, and countdown to your next birthday.',
    ],
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer:
          'Yes, leap years (February 29th) are accurately calculated using JavaScript date object time-delta logic.',
      },
    ],
    metaTitle: 'Free Age Calculator - Calculate Exact Age in Years, Months, Days | OmniTools',
    metaDescription:
      'Calculate your exact chronological age down to days and hours. View days lived, day of week born, and countdown to your next birthday.',
  },
  {
    id: 'bmi-calorie-calculator',
    name: 'BMI & Daily Calorie (BMR / TDEE) Health Calculator',
    shortName: 'BMI & Calorie Calculator',
    slug: 'bmi-bmr-calorie-health-calculator',
    category: 'health',
    badge: 'Popular',
    icon: 'Activity',
    description:
      'Calculate Body Mass Index (BMI), Basal Metabolic Rate (BMR), and Total Daily Energy Expenditure (TDEE) maintenance calories for weight goals.',
    searchVolume: '2.2M / month',
    estimatedCpc: '$3.10',
    highIntentKeywords: [
      'bmi calculator online',
      'body mass index calculator adults',
      'bmr calorie maintenance calculator',
      'daily calories for weight loss',
    ],
    howToSteps: [
      'Enter your weight in kilograms (kg) and height in centimeters (cm).',
      'Enter your age and select biological gender.',
      'Choose your weekly physical activity level.',
      'Inspect your BMI category and daily calories required for weight loss or maintenance.',
    ],
    faqs: [
      {
        question: 'What formula is used for BMR calorie calculation?',
        answer:
          'We use the scientifically recognized Mifflin-St Jeor Equation, clinically proven to be the most accurate BMR predictor.',
      },
    ],
    metaTitle: 'Free BMI & Calorie Calculator (BMR & TDEE) | OmniTools',
    metaDescription:
      'Calculate Body Mass Index (BMI), Basal Metabolic Rate (BMR), and daily maintenance calories for weight loss or muscle gain.',
  },
];
