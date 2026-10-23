/**
 * SEO & Utility logic functions: Keyword density, Word Counter, Loan EMI, JSON Formatter, etc.
 */

export interface WordStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  fleschScore: number;
  fleschLabel: string;
  topKeywords: Array<{ word: string; count: number; density: number }>;
}

export function calculateWordStats(text: string): WordStats {
  if (!text || text.trim() === '') {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      fleschScore: 100,
      fleschLabel: 'Very Easy',
      topKeywords: [],
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Words (split on whitespace & clean punctuation)
  const rawWords = text.trim().split(/\s+/).filter(Boolean);
  const words = rawWords.length;

  // Sentences
  const sentenceMatches = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
  const sentences = Math.max(sentenceMatches.length, text.trim() ? 1 : 0);

  // Paragraphs
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // Reading time (~200 words per minute average reading speed)
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  // Speaking time (~130 words per minute average speaking speed)
  const speakingTimeMinutes = Math.max(1, Math.ceil(words / 130));

  // Syllables estimation for Flesch Reading Ease
  const totalSyllables = rawWords.reduce((acc, word) => {
    return acc + countSyllables(word);
  }, 0);

  // Flesch Reading Ease formula: 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  let fleschScore = 100;
  if (words > 0 && sentences > 0) {
    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    fleschScore = Math.max(0, Math.min(100, Math.round(score)));
  }

  let fleschLabel = 'Standard';
  if (fleschScore >= 90) fleschLabel = 'Very Easy (5th Grade)';
  else if (fleschScore >= 80) fleschLabel = 'Easy (6th Grade)';
  else if (fleschScore >= 70) fleschLabel = 'Fairly Easy (7th Grade)';
  else if (fleschScore >= 60) fleschLabel = 'Standard (8th-9th Grade)';
  else if (fleschScore >= 50) fleschLabel = 'Fairly Difficult (High School)';
  else if (fleschScore >= 30) fleschLabel = 'Difficult (College)';
  else fleschLabel = 'Very Confusing (Graduate)';

  // Keyword density (filtering common stop words)
  const stopWords = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
    'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do',
    'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
    'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is',
    'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of',
    'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
    'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves',
    'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very',
    'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'you',
    'your', 'yours', 'yourself', 'yourselves',
  ]);

  const wordFrequencyMap: Record<string, number> = {};
  rawWords.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length > 2 && !stopWords.has(clean)) {
      wordFrequencyMap[clean] = (wordFrequencyMap[clean] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(wordFrequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: Number(((count / (words || 1)) * 100).toFixed(2)),
    }));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    fleschScore,
    fleschLabel,
    topKeywords: sortedKeywords,
  };
}

function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 3) return 1;
  const replaced = clean
    .replace(/(?:[^laeiouy]|ed|es|e)$/, '')
    .replace(/^y/, '');
  const matches = replaced.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

// Loan EMI Calculator
export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  monthlyBreakdown: Array<{
    month: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }>;
}

export function calculateLoanEmi(
  principal: number,
  annualInterestRatePercent: number,
  tenureMonths: number
): EmiResult {
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0, monthlyBreakdown: [] };
  }

  const monthlyRate = annualInterestRatePercent / (12 * 100);

  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = principal / tenureMonths;
  } else {
    monthlyEmi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  }

  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  let remaining = principal;
  const breakdown: EmiResult['monthlyBreakdown'] = [];

  for (let m = 1; m <= Math.min(tenureMonths, 24); m++) {
    const interestPart = remaining * monthlyRate;
    const principalPart = monthlyEmi - interestPart;
    remaining = Math.max(0, remaining - principalPart);

    breakdown.push({
      month: m,
      principalPaid: Math.round(principalPart),
      interestPaid: Math.round(interestPart),
      remainingBalance: Math.round(remaining),
    });
  }

  return {
    monthlyEmi: Math.round(monthlyEmi * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    monthlyBreakdown: breakdown,
  };
}

// JSON Formatter
export function formatJson(
  input: string,
  indentSpaces = 2
): { success: boolean; formatted: string; error?: string } {
  if (!input || !input.trim()) {
    return { success: false, formatted: '', error: 'Input is empty' };
  }
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indentSpaces);
    return { success: true, formatted };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid JSON format';
    return { success: false, formatted: input, error: message };
  }
}

// Case Converter
export type CaseMode =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'kebab'
  | 'snake';

export function convertCase(text: string, mode: CaseMode): string {
  if (!text) return '';

  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()
      );
    case 'sentence':
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case 'camel': {
      const words = text
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean);
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join('');
    }
    case 'kebab':
      return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .toLowerCase()
        .replace(/^-+|-+$/g, '');
    case 'snake':
      return text
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toLowerCase()
        .replace(/^_+|_+$/g, '');
    default:
      return text;
  }
}

// Password Generator
export interface PasswordOptions {
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  avoidAmbiguous?: boolean;
}

export function generatePassword(length = 16, options: PasswordOptions = {}): string {
  const {
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
    avoidAmbiguous = true,
  } = options;

  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lower = 'abcdefghijklmnopqrstuvwxyz';
  let numbers = '0123456789';
  let symbols = '!@#$%^&*()_+~|}{[]:;?><,.-=';

  if (avoidAmbiguous) {
    upper = upper.replace(/[IO]/g, '');
    lower = lower.replace(/[lo]/g, '');
    numbers = numbers.replace(/[01]/g, '');
    symbols = symbols.replace(/[|{}[\]:;]/g, '');
  }

  let charset = '';
  if (includeUppercase) charset += upper;
  if (includeLowercase) charset += lower;
  if (includeNumbers) charset += numbers;
  if (includeSymbols) charset += symbols;

  if (!charset) charset = lower + numbers;

  let result = '';
  const cryptoObj = typeof window !== 'undefined' && window.crypto ? window.crypto : null;

  if (cryptoObj) {
    const randomVals = new Uint32Array(length);
    cryptoObj.getRandomValues(randomVals);
    for (let i = 0; i < length; i++) {
      result += charset[randomVals[i] % charset.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }

  return result;
}

export function evaluatePasswordStrength(password: string): {
  score: number;
  label: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  entropy: number;
} {
  if (!password) {
    return { score: 0, label: 'Very Weak', entropy: 0 };
  }

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const entropy = Math.round(password.length * Math.log2(poolSize || 1));

  let score = 0;
  if (entropy > 80) score = 4;
  else if (entropy > 60) score = 3;
  else if (entropy > 40) score = 2;
  else if (entropy > 25) score = 1;

  const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'] as const;
  return {
    score,
    label: labels[score],
    entropy,
  };
}

// Salary & Tax Take-Home Calculator
export interface SalaryBreakdown {
  hourlyWage: number;
  dailyPay: number;
  weeklyPay: number;
  monthlyGross: number;
  annualTax: number;
  monthlyNet: number;
  annualNet: number;
  effectiveTaxRate: number;
}

export function calculateSalary(
  annualSalary: number,
  hoursPerWeek = 40,
  weeksPerYear = 52,
  estimatedTaxRatePercent = 20
): SalaryBreakdown {
  if (annualSalary <= 0) {
    return {
      hourlyWage: 0,
      dailyPay: 0,
      weeklyPay: 0,
      monthlyGross: 0,
      annualTax: 0,
      monthlyNet: 0,
      annualNet: 0,
      effectiveTaxRate: 0,
    };
  }

  const totalHours = Math.max(1, hoursPerWeek * weeksPerYear);
  const hourlyWage = annualSalary / totalHours;
  const weeklyPay = annualSalary / weeksPerYear;
  const dailyPay = weeklyPay / 5;
  const monthlyGross = annualSalary / 12;
  const annualTax = (annualSalary * Math.max(0, estimatedTaxRatePercent)) / 100;
  const annualNet = annualSalary - annualTax;
  const monthlyNet = annualNet / 12;

  return {
    hourlyWage: Math.round(hourlyWage * 100) / 100,
    dailyPay: Math.round(dailyPay * 100) / 100,
    weeklyPay: Math.round(weeklyPay * 100) / 100,
    monthlyGross: Math.round(monthlyGross * 100) / 100,
    annualTax: Math.round(annualTax * 100) / 100,
    monthlyNet: Math.round(monthlyNet * 100) / 100,
    annualNet: Math.round(annualNet * 100) / 100,
    effectiveTaxRate: estimatedTaxRatePercent,
  };
}

// Crypto & Investment ROI Calculator
export interface CryptoRoiResult {
  totalTokens: number;
  exitGrossValue: number;
  netProfit: number;
  roiPercentage: number;
  totalFeesPaid: number;
  isProfit: boolean;
}

export function calculateCryptoRoi(
  investmentAmount: number,
  buyPrice: number,
  sellPrice: number,
  feePercentage = 0.2
): CryptoRoiResult {
  if (investmentAmount <= 0 || buyPrice <= 0) {
    return {
      totalTokens: 0,
      exitGrossValue: 0,
      netProfit: 0,
      roiPercentage: 0,
      totalFeesPaid: 0,
      isProfit: false,
    };
  }

  const entryFee = (investmentAmount * feePercentage) / 100;
  const netInvested = investmentAmount - entryFee;
  const totalTokens = netInvested / buyPrice;

  const rawExit = totalTokens * sellPrice;
  const exitFee = (rawExit * feePercentage) / 100;
  const finalExit = rawExit - exitFee;

  const netProfit = finalExit - investmentAmount;
  const roiPercentage = (netProfit / investmentAmount) * 100;
  const totalFeesPaid = entryFee + exitFee;

  return {
    totalTokens: Math.round(totalTokens * 10000) / 10000,
    exitGrossValue: Math.round(finalExit * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    roiPercentage: Math.round(roiPercentage * 100) / 100,
    totalFeesPaid: Math.round(totalFeesPaid * 100) / 100,
    isProfit: netProfit >= 0,
  };
}

// Age & Birthday Milestone Calculator
export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  daysUntilNextBirthday: number;
  dayOfWeekBorn: string;
}

export function calculateAgeDetails(
  birthDateStr: string,
  targetDateStr = '2026-10-23'
): AgeResult {
  const birth = new Date(birthDateStr);
  const target = new Date(targetDateStr);

  if (isNaN(birth.getTime()) || birth > target) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalHours: 0,
      daysUntilNextBirthday: 0,
      dayOfWeekBorn: 'Unknown',
    };
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = target.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday < target) {
    nextBday.setFullYear(target.getFullYear() + 1);
  }
  const daysUntilNextBirthday = Math.ceil(
    (nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekBorn = daysOfWeek[birth.getDay()];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    daysUntilNextBirthday,
    dayOfWeekBorn,
  };
}

// BMI & Calorie Calculator
export interface BmiResult {
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese';
  bmrCalories: number;
  maintenanceCalories: number;
}

export function calculateBmiAndBmr(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: 'male' | 'female' = 'male',
  activityMultiplier = 1.375
): BmiResult {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) {
    return { bmi: 0, category: 'Normal weight', bmrCalories: 0, maintenanceCalories: 0 };
  }

  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  let category: BmiResult['category'] = 'Normal weight';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const bmrCalories = Math.round(bmr);
  const maintenanceCalories = Math.round(bmr * activityMultiplier);

  return {
    bmi,
    category,
    bmrCalories,
    maintenanceCalories,
  };
}
