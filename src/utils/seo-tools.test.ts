import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateSitemapXml,
  validateSitemapXml,
  generateRobotsTxt,
} from './sitemap.ts';
import {
  calculateWordStats,
  calculateLoanEmi,
  formatJson,
  convertCase,
  evaluatePasswordStrength,
  calculateSalary,
  calculateCryptoRoi,
  calculateAgeDetails,
  calculateBmiAndBmr,
} from './seo-tools.ts';

test('generateSitemapXml creates standard XML urlset with escaped values', () => {
  const xml = generateSitemapXml([
    {
      url: 'https://example.com/tool?a=1&b=2',
      changefreq: 'daily',
      priority: 0.8,
      lastmod: '2026-10-23',
    },
  ]);

  assert.ok(xml.includes('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(xml.includes('<loc>https://example.com/tool?a=1&amp;b=2</loc>'));
  assert.ok(xml.includes('<lastmod>2026-10-23</lastmod>'));
  assert.ok(xml.includes('<changefreq>daily</changefreq>'));
  assert.ok(xml.includes('<priority>0.8</priority>'));

  const validation = validateSitemapXml(xml);
  assert.equal(validation.valid, true);
  assert.equal(validation.urlCount, 1);
});

test('validateSitemapXml detects invalid or empty sitemaps', () => {
  const emptyCheck = validateSitemapXml('');
  assert.equal(emptyCheck.valid, false);

  const invalidCheck = validateSitemapXml('<invalid>test</invalid>');
  assert.equal(invalidCheck.valid, false);
});

test('generateRobotsTxt outputs valid crawler directives and sitemap reference', () => {
  const robots = generateRobotsTxt({
    domain: 'https://omnitools.pro',
    allowAll: true,
    disallowPaths: ['/admin', '/temp'],
    sitemapPath: '/sitemap.xml',
  });

  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes('Disallow: /admin'));
  assert.ok(robots.includes('Sitemap: https://omnitools.pro/sitemap.xml'));
});

test('calculateWordStats computes word count, reading time, and keyword density', () => {
  const sample =
    'Search engine optimization (SEO) is essential for online tools. Good SEO improves visibility and drives organic traffic. SEO matters.';
  const stats = calculateWordStats(sample);

  assert.ok(stats.words > 10);
  assert.ok(stats.readingTimeMinutes >= 1);
  assert.ok(stats.topKeywords.length > 0);
  // 'seo' should be detected as a prominent keyword
  const seoKeyword = stats.topKeywords.find((k) => k.word === 'seo');
  assert.ok(seoKeyword !== undefined);
  assert.ok(seoKeyword.count >= 3);
});

test('calculateLoanEmi accurately calculates monthly EMI', () => {
  // Principal: $100,000, 6% annual rate, 12 months
  const emi = calculateLoanEmi(100000, 6, 12);
  assert.ok(emi.monthlyEmi > 8500 && emi.monthlyEmi < 8700);
  assert.ok(emi.totalPayment > 100000);
  assert.ok(emi.totalInterest > 0);
});

test('formatJson correctly handles valid and invalid JSON', () => {
  const valid = formatJson('{"foo":"bar","num":42}');
  assert.equal(valid.success, true);
  assert.ok(valid.formatted.includes('  "foo": "bar"'));

  const invalid = formatJson('{not json}');
  assert.equal(invalid.success, false);
});

test('convertCase transforms text accurately across conventions', () => {
  const original = 'Hello World Web Tools';
  assert.equal(convertCase(original, 'upper'), 'HELLO WORLD WEB TOOLS');
  assert.equal(convertCase(original, 'lower'), 'hello world web tools');
  assert.equal(convertCase(original, 'kebab'), 'hello-world-web-tools');
  assert.equal(convertCase(original, 'snake'), 'hello_world_web_tools');
  assert.equal(convertCase(original, 'camel'), 'helloWorldWebTools');
});

test('evaluatePasswordStrength rates password entropy correctly', () => {
  const weak = evaluatePasswordStrength('123456');
  assert.ok(weak.score <= 1);

  const strong = evaluatePasswordStrength('P@ssw0rd!#Secure2026_Entropy');
  assert.ok(strong.score >= 3);
});

test('calculateSalary returns accurate hourly and take-home tax breakdown', () => {
  const salary = calculateSalary(100000, 40, 52, 25);
  // 100,000 / 2080 hours = ~48.08
  assert.ok(salary.hourlyWage >= 48 && salary.hourlyWage <= 49);
  assert.equal(salary.annualTax, 25000);
  assert.equal(salary.annualNet, 75000);
  assert.equal(salary.monthlyNet, 6250);
});

test('calculateCryptoRoi calculates net return and fees accurately', () => {
  // $1000 invested at $10/token, sold at $20/token (100% gain minus 0.2% fee)
  const roi = calculateCryptoRoi(1000, 10, 20, 0.2);
  assert.equal(roi.isProfit, true);
  assert.ok(roi.netProfit > 980 && roi.netProfit < 1000);
  assert.ok(roi.roiPercentage > 95);
});

test('calculateAgeDetails computes exact years, months and milestones', () => {
  const age = calculateAgeDetails('2000-01-01', '2026-10-23');
  assert.equal(age.years, 26);
  assert.equal(age.months, 9);
  assert.ok(age.totalDays > 9000);
  assert.ok(age.daysUntilNextBirthday > 0 && age.daysUntilNextBirthday <= 366);
});

test('calculateBmiAndBmr computes accurate BMI and category', () => {
  // 70kg, 175cm, 25yr male -> BMI = 70 / (1.75^2) = 22.86 (Normal weight)
  const health = calculateBmiAndBmr(70, 175, 25, 'male', 1.375);
  assert.equal(health.bmi, 22.9);
  assert.equal(health.category, 'Normal weight');
  assert.ok(health.bmrCalories > 1500);
  assert.ok(health.maintenanceCalories > health.bmrCalories);
});

