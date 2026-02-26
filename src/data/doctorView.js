/**
 * VitalEdge · Team Doctor View
 * Focus: Clinical & physiological indicators.
 */

import { ATHLETE } from '../data/athleteData.js';
import { metricCard, alertBanner, viewTitle, ecgPanel } from '../components/ui.js';

export function renderDoctor() {
  const el = document.getElementById('view-doctor');
  const a  = ATHLETE;

  el.innerHTML = `
    ${viewTitle('MEDICAL', 'DASHBOARD', 'Clinical & physiological indicators')}
    ${alertBanner('doctor')}

    <div class="grid">
      ${metricCard({ key: 'bloodPressure', label: 'Blood Pressure',       value: `${a.bloodPressure.systolic}/${a.bloodPressure.diastolic}`, unit: a.bloodPressure.unit, trend: `${a.bloodPressure.status} · ${a.bloodPressure.trend}`, dir: a.bloodPressure.dir, pct: 62, icon: '🩺' })}
      ${metricCard({ key: 'heartRate',     label: 'Resting HR',           value: a.heartRate.resting, unit: a.heartRate.unit, trend: a.heartRate.trend, dir: a.heartRate.dir, pct: 100 - Math.round(a.heartRate.resting/80*100), icon: '❤️' })}
      ${metricCard({ key: 'spO2',          label: 'Blood Oxygen (SpO₂)',  value: a.spO2.value, unit: a.spO2.unit, trend: a.spO2.trend, dir: a.spO2.dir, pct: a.spO2.value, icon: '🩸' })}
      ${metricCard({ key: 'antioxidant',   label: 'Antioxidant Index',    value: a.antioxidant.value, unit: a.antioxidant.unit, trend: `${a.antioxidant.status} · ${a.antioxidant.trend}`, dir: a.antioxidant.dir, pct: Math.round((a.antioxidant.value / a.antioxidant.range.high) * 100), icon: '🍊' })}
      ${metricCard({ key: 'stress',        label: 'Stress Level',         value: a.stress.value, unit: `${a.stress.unit} — ${a.stress.label}`, trend: a.stress.trend, dir: a.stress.dir, pct: a.stress.value, icon: '🧘' })}
      ${metricCard({ key: 'menstrual',     label: 'Menstrual Cycle',      value: `Day ${a.menstrual.day}`, unit: `of ${a.menstrual.length}-day cycle`, trend: `${a.menstrual.phase} phase · next ~${a.menstrual.next}`, dir: 'neutral', pct: Math.round(a.menstrual.day / a.menstrual.length * 100), icon: '🌙' })}
    </div>

    ${ecgPanel()}

    <div class="panel">
      <div class="panel-title">Sleep Apnea — AHI Scale</div>
      ${apneaStats()}
      <div class="ahi-scale">
        <div class="ahi-marker" style="left:${Math.min(98, Math.round((a.sleepApnea.ahi / 40) * 100))}%">${a.sleepApnea.ahi}</div>
      </div>
      <div class="ahi-labels">
        <span>0 — Normal (&lt;5)</span><span>5 — Mild</span><span>15 — Moderate</span><span>30+ — Severe</span>
      </div>
      <div style="margin-top:14px;background:var(--surf2);border-radius:8px;padding:10px 14px;border:1px solid var(--border);font-size:0.68rem;color:var(--text2)">
        📋 ${a.sleepApnea.note}
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Menstrual Cycle — Clinical Note</div>
      <div class="phase-pill"><div class="phase-dot"></div>${a.menstrual.phase} Phase · Day ${a.menstrual.day} of ${a.menstrual.length}</div>
      <div style="font-size:0.72rem;color:var(--text2);line-height:1.7">${a.menstrual.note}</div>
    </div>`;
}

function apneaStats() {
  const ap = ATHLETE.sleepApnea;
  const c  = ap.ahi < 5 ? 'var(--ok)' : ap.ahi < 15 ? 'var(--warn)' : 'var(--danger)';
  const items = [
    { label: 'AHI',     val: ap.ahi,    unit: 'events/hr',       color: c              },
    { label: 'Status',  val: ap.status, unit: '',                 color: c              },
    { label: 'Events',  val: ap.events, unit: 'total',            color: 'var(--teal)'  },
    { label: 'O₂ Drop', val: ap.o2drop, unit: 'avg desaturation', color: 'var(--sky)'   },
  ];
  return `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:14px">
      ${items.map(i => `
        <div>
          <div style="font-size:0.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);margin-bottom:5px">${i.label}</div>
          <div style="font-family:var(--font-display);font-size:1.7rem;color:${i.color}">${i.val}</div>
          <div style="font-size:0.62rem;color:var(--text3)">${i.unit}</div>
        </div>`).join('')}
    </div>`;
}
