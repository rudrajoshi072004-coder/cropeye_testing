/**
 * Test script for pest and disease risk score logic.
 * Run with: npx ts-node meter/test-risk.ts (from project root)
 * Or: npx tsx meter/test-risk.ts
 */

import { assessPestRiskLevel } from './pestRiskCalculator';
import { assessDiseaseRiskLevel } from './diseaseRiskCalculator';
import { pestsData } from './pestsData';
import { diseasesData } from './diseasesData';

const log = (msg: string, pass: boolean) =>
  console.log(pass ? `✅ ${msg}` : `❌ ${msg}`);

console.log('\n🧪 Risk Score Test\n' + '─'.repeat(50));

// --- PEST TESTS ---
console.log('\n📋 PEST RISK TESTS\n');

const fleaBeetle = pestsData[0]; // Sep, Oct | stage 10-30 DAP | chewing
const leafRoller = pestsData[1]; // Oct, Nov | stage 20-45 DAP | chewing

// 1. High: month + stage + API > 0
const r1 = assessPestRiskLevel(
  fleaBeetle,
  25, // days (in 10-30 range)
  'September',
  { chewing_affected_pixel_percentage: 5, sucking_affected_pixel_percentage: 0, SoilBorn_affected_pixel_percentage: 0 }
);
log('Pest High: month+stage+API>0 → Flea beetle in Sep, 25 DAP, chewing 5%', r1 === 'High');

// 2. Moderate: month + stage, no API
const r2 = assessPestRiskLevel(
  fleaBeetle,
  25,
  'September',
  { chewing_affected_pixel_percentage: 0, sucking_affected_pixel_percentage: 0, SoilBorn_affected_pixel_percentage: 0 }
);
log('Pest Moderate: month+stage, API=0 → Flea beetle in Sep, 25 DAP', r2 === 'Moderate');

// 3. Low: month only (stage mismatch)
const r3 = assessPestRiskLevel(
  fleaBeetle,
  50, // outside 10-30
  'September',
  undefined
);
log('Pest Low: month only, stage mismatch → Flea beetle in Sep, 50 DAP', r3 === 'Low');

// 4. null: month mismatch
const r4 = assessPestRiskLevel(fleaBeetle, 25, 'January', undefined);
log('Pest null: month mismatch → Flea beetle in Jan', r4 === null);

// --- DISEASE TESTS ---
console.log('\n📋 DISEASE RISK TESTS\n');

const downyMildew = diseasesData[0]; // Sep-Jan | stage 20-80 DAP | fungal

// 5. High: fungal + month + stage + fungi%
const r5 = assessDiseaseRiskLevel(
  downyMildew,
  50,
  'September',
  { fungi_affected_pixel_percentage: 8 }
);
log('Disease High: Downy mildew, Sep, 50 DAP, fungi 8%', r5 === 'High');

// 6. Moderate: month + stage, fungi=0
const r6 = assessDiseaseRiskLevel(
  downyMildew,
  50,
  'September',
  { fungi_affected_pixel_percentage: 0 }
);
log('Disease Moderate: Downy mildew, Sep, 50 DAP, fungi 0%', r6 === 'Moderate');

// 7. Low: month only
const r7 = assessDiseaseRiskLevel(
  downyMildew,
  150, // outside 20-80
  'September',
  undefined
);
log('Disease Low: Downy mildew in Sep, stage mismatch (150 DAP)', r7 === 'Low');

// 8. null: month mismatch
const r8 = assessDiseaseRiskLevel(downyMildew, 50, 'June', undefined);
log('Disease null: Downy mildew in June (month mismatch)', r8 === null);

console.log('\n' + '─'.repeat(50));
console.log('Done.\n');
