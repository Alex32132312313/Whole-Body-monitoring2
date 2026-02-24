/**
 * VitalEdge · Trainer View
 * Focus: Load, recovery, body composition, activity trends.
 */

import { ATHLETE } from '../data/athleteData.js';
import { metricCard, alertBanner, viewTitle, sparkline } from '../components/ui.js';

export function renderTrainer() {
  const el  = document.getElementById('view-trainer');
  const a   = ATHLETE;
  const bc  = a.bodyComposition;
  const pct = (v, g) => Math.min(100, Math.round((v / g) * 100));

  el.innerHTML = `
    ${viewTitle('TRAINER', 'LOAD & RECOVERY', 'Physical conditioning metrics')}
    ${alertBanner('trainer')}

    <div class="grid">
      ${metricCard({ key: 'steps',         label: 'Daily Steps',     value: a.steps.value.toLocaleString(),   unit: a.steps.unit,           trend: a.steps.trend,         dir: a.steps.dir,         pct: pct(a.steps.value, a.steps.goal),           icon: '🦶' })}
      ${metricCard({ key: 'calories',      label: 'Calories Burned', value: a.calories.value.toLocaleString(),unit: a.calories.unit,        trend: a.calories.trend,      dir: a.calories.dir,      pct: pct(a.calories.value, a.calories.goal),     icon: '🔥' })}
      ${metricCard({ key: 'activeMinutes', label: 'Active Minutes',  value: a.activeMinutes.value,            unit: a.activeMinutes.unit,   trend: a.activeMinutes.trend, dir: a.activeMinutes.dir, pct: pct(a.activeMinutes.value, a.activeMinutes.goal), icon: '⚡' })}
      ${metricCard({ key: 'heartRate',     label: 'Resting HR',      value: a.heartRate.resting,              unit: a.heartRate.unit,       trend: a.heartRate.trend,     dir: a.heartRate.dir,     pct: 100 - pct(a.heartRate.resting, 80),         icon: '❤️' })}
      ${metricCard({ key: 'heartRate',     label: 'Peak HR',         value: a.heartRate.max,                  unit: 'bpm max',              trend: 'Session peak',        dir: 'neutral',           pct: pct(a.heartRate.max, 200),                  icon: '💓' })}
      ${metricCard({ key: 'fallDetection', label: 'Fall Detection',  value: a.fallDetection.incidents === 0 ? 'Clear' : a.fallDetection.incidents, unit: a.fallDetection.incidents === 0 ? 'No incidents' : 'incidents', trend: a.fallDetection.note, dir: 'up', pct: 100, icon: '🛡️' })}
    </div>

    <div class="grid grid-2">
      <div class="panel">
        <div class="panel-title">Weekly Active Minutes (Mon → Sun)</div>
        ${sparkline(a.weeklyActiveMinutes)}
      </div>
      <div class="panel">
        <div class="panel-title">Weekly Steps (Mon → Sun)</div>
        ${sparkline(a.weeklySteps.map(v => Math.round(v/100)*100))}
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Body Composition</div>
      <div class="comp-grid">
        ${compItem('Body Weight',   bc.weight + ' kg',     bc.weight / 100 * 82,  'var(--teal)'  )}
        ${compItem('Body Fat',      bc.bodyFat + '%',      bc.bodyFat,             'var(--rose)'  )}
        ${compItem('Muscle Mass',   bc.muscleMass + ' kg', bc.muscleMass / 100 * 90, 'var(--lime)')}
        ${compItem('Bone Mass',     bc.boneMass + ' kg',   bc.boneMass / 5 * 100,  'var(--sky)'   )}
        ${compItem('Body Water',    bc.water + '%',        bc.water,               'var(--blue)'  )}
        ${compItem('BMI',           bc.bmi,                bc.bmi / 30 * 100,     'var(--amber)' )}
      </div>
      <div style="margin-top:14px;font-size:0.68rem;color:var(--text2)">📈 ${bc.trend}</div>
    </div>`;
}

function compItem(label, val, pct, color) {
  return `
    <div class="comp-item">
      <label>${label}</label>
      <div class="cv" style="color:${color}">${val}</div>
      <div class="bar"><div class="bar-fill" style="width:${Math.min(100,pct)}%;background:${color}"></div></div>
    </div>`;
}
