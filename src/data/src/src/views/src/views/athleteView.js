/**
 * VitalEdge · Athlete (Personal) View
 * Focus: Personal health snapshot — all metrics in one place.
 */

import { ATHLETE } from '../data/athleteData.js';
import { metricCard, alertBanner, viewTitle, sleepPanel } from '../components/ui.js';

export function renderAthlete() {
  const el  = document.getElementById('view-athlete');
  const a   = ATHLETE;
  const pct = (v, g) => Math.min(100, Math.round((v / g) * 100));

  el.innerHTML = `
    ${viewTitle('MY', 'STATS', 'Your complete health snapshot')}
    ${alertBanner('athlete')}

    <div style="display:grid;grid-template-columns:auto 1fr;gap:16px;margin-bottom:16px;align-items:start">
      <div class="panel" style="margin-bottom:0;min-width:220px">
        <div class="panel-title">Energy Score</div>
        ${energyRing(a.energyScore)}
        <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
          ${miniStat('Sleep',    a.energyScore.breakdown.sleep,    'var(--blue)'  )}
          ${miniStat('HRV',      a.energyScore.breakdown.hrv,      'var(--violet)')}
          ${miniStat('Activity', a.energyScore.breakdown.activity, 'var(--teal)'  )}
        </div>
      </div>
      <div class="grid" style="margin-bottom:0">
        ${metricCard({ key: 'steps',         label: 'Steps',       value: a.steps.value.toLocaleString(),   unit: a.steps.unit,         trend: a.steps.trend,         dir: a.steps.dir,         pct: pct(a.steps.value, a.steps.goal),           icon: '🦶' })}
        ${metricCard({ key: 'calories',      label: 'Calories',    value: a.calories.value.toLocaleString(),unit: a.calories.unit,      trend: a.calories.trend,      dir: a.calories.dir,      pct: pct(a.calories.value, a.calories.goal),     icon: '🔥' })}
        ${metricCard({ key: 'heartRate',     label: 'Resting HR',  value: a.heartRate.resting,              unit: a.heartRate.unit,     trend: a.heartRate.trend,     dir: a.heartRate.dir,     pct: 100 - pct(a.heartRate.resting, 80),         icon: '❤️' })}
        ${metricCard({ key: 'spO2',          label: 'Blood Oxygen',value: a.spO2.value,                    unit: a.spO2.unit,          trend: a.spO2.trend,          dir: a.spO2.dir,          pct: a.spO2.value,                               icon: '🩸' })}
        ${metricCard({ key: 'stress',        label: 'Stress',      value: a.stress.value,                   unit: a.stress.unit,        trend: a.stress.label,        dir: a.stress.dir,        pct: a.stress.value,                             icon: '🧘' })}
        ${metricCard({ key: 'activeMinutes', label: 'Active Min',  value: a.activeMinutes.value,            unit: a.activeMinutes.unit, trend: a.activeMinutes.trend, dir: a.activeMinutes.dir, pct: pct(a.activeMinutes.value, a.activeMinutes.goal), icon: '⚡' })}
      </div>
    </div>

    ${sleepPanel()}

    <div class="panel">
      <div class="panel-title">All Metrics — Full Reference</div>
      <table class="tbl">
        <thead><tr><th>Metric</th><th>Value</th><th>Unit / Detail</th><th>Status</th></tr></thead>
        <tbody>
          ${allRows(a).map(([metric, value, detail, status]) => `
            <tr>
              <td style="font-weight:500;color:var(--text)">${metric}</td>
              <td class="val">${value}</td>
              <td style="color:var(--text2)">${detail}</td>
              <td>${statusBadge(status)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function energyRing(e) {
  const r    = 42;
  const circ = 2 * Math.PI * r;
  const off  = circ * (1 - e.value / 100);
  return `
    <div class="ring-wrap">
      <div class="ring-box">
        <svg class="ring-svg" viewBox="0 0 100 100" width="100" height="100">
          <circle class="ring-bg"   cx="50" cy="50" r="${r}" stroke-width="8"/>
          <circle class="ring-fill" cx="50" cy="50" r="${r}" stroke-width="8"
            stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/>
        </svg>
        <div class="ring-center">${e.value}<small>/ 100</small></div>
      </div>
      <div>
        <div style="font-family:var(--font-display);font-size:1.3rem;color:var(--text);letter-spacing:.04em">${e.label}</div>
        <div style="font-size:0.68rem;color:var(--text2);margin-top:4px">${e.trend}</div>
      </div>
    </div>`;
}

function miniStat(label, val, color) {
  return `
    <div style="text-align:center">
      <div style="font-family:var(--font-display);font-size:1.2rem;color:${color}">${val}</div>
      <div style="font-size:0.58rem;color:var(--text3);letter-spacing:.08em;text-transform:uppercase">${label}</div>
    </div>`;
}

function statusBadge(s) {
  const green = ['Normal','Good','Optimal','Excellent','Clear','Low','Active','Tracked','Athletic'];
  const warn  = ['Elevated','Medium','Monitor','Fair'];
  const cls   = green.includes(s) ? 'pill-ok' : warn.includes(s) ? 'pill-warn' : 'pill-risk';
  return `<span class="pill ${cls}">${s}</span>`;
}

function allRows(a) {
  const bc = a.bodyComposition;
  return [
    ['Steps',               a.steps.value.toLocaleString(),                               a.steps.unit,                               'Normal'              ],
    ['Calories Burned',     a.calories.value.toLocaleString(),                            a.calories.unit,                            'Normal'              ],
    ['Active Minutes',      a.activeMinutes.value,                                        a.activeMinutes.unit,                       'Active'              ],
    ['Resting Heart Rate',  a.heartRate.resting,                                          a.heartRate.unit,                           'Athletic'            ],
    ['Peak Heart Rate',     a.heartRate.max,                                              'bpm max (session)',                        'Normal'              ],
    ['HRV',                 a.heartRate.hrv,                                              'ms',                                       'Good'                ],
    ['Blood Pressure',      `${a.bloodPressure.systolic}/${a.bloodPressure.diastolic}`,   a.bloodPressure.unit,                       a.bloodPressure.status],
    ['ECG Rhythm',          a.ecg.rhythm,                                                 a.ecg.rate,                                 'Normal'              ],
    ['Blood Oxygen (SpO₂)', a.spO2.value,                                                 a.spO2.unit,                                'Excellent'           ],
    ['Stress Level',        a.stress.value,                                               `/ 100 — ${a.stress.label}`,                'Low'                 ],
    ['Energy Score',        a.energyScore.value,                                          `/ 100 — ${a.energyScore.label}`,           'Good'                ],
    ['Antioxidant Index',   a.antioxidant.value,                                          a.antioxidant.unit,                         a.antioxidant.status  ],
    ['Body Weight',         bc.weight,                                                    'kg',                                       'Normal'              ],
    ['Body Fat',            bc.bodyFat,                                                   '%',                                        'Athletic'            ],
    ['Muscle Mass',         bc.muscleMass,                                                'kg',                                       'Good'                ],
    ['BMI',                 bc.bmi,                                                       'kg/m²',                                    'Normal'              ],
    ['Total Sleep',         a.sleep.total,                                                `${a.sleep.bedtime} → ${a.sleep.wakeup}`,   'Good'                ],
    ['Deep Sleep',          a.sleep.stages.deep.duration,                                 `${a.sleep.stages.deep.pct}% of night`,    'Normal'              ],
    ['REM Sleep',           a.sleep.stages.rem.duration,                                  `${a.sleep.stages.rem.pct}% of night`,     'Normal'              ],
    ['Sleep Apnea (AHI)',   a.sleepApnea.ahi,                                             'events/hr',                                a.sleepApnea.status   ],
    ['Menstrual Cycle',     `Day ${a.menstrual.day}`,                                     `${a.menstrual.phase} phase`,               'Tracked'             ],
    ['Fall Detection',      a.fallDetection.incidents === 0 ? 'Clear' : a.fallDetection.incidents, 'last 30 days',                   'Clear'               ],
  ];
}
