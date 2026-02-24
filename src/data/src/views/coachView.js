/**
 * VitalEdge · Coach View
 * Focus: Team readiness, energy, sleep quality, stress flags.
 */

import { ATHLETE } from '../data/athleteData.js';
import { metricCard, alertBanner, viewTitle, sleepPanel, statusPill } from '../components/ui.js';

export function renderCoach() {
  const el  = document.getElementById('view-coach');
  const a   = ATHLETE;
  const pct = (v, g) => Math.round((v / g) * 100);

  el.innerHTML = `
    ${viewTitle('COACH', 'OVERVIEW', 'Performance readiness at a glance')}
    ${alertBanner('coach')}

    <div class="grid">
      ${metricCard({ key: 'energyScore',  label: 'Energy Score',      value: a.energyScore.value,             unit: a.energyScore.label,        trend: a.energyScore.trend,    dir: a.energyScore.dir,    pct: a.energyScore.value,                      icon: '⚡' })}
      ${metricCard({ key: 'heartRate',    label: 'Resting Heart Rate', value: a.heartRate.resting,             unit: a.heartRate.unit,            trend: a.heartRate.trend,      dir: a.heartRate.dir,      pct: 100 - pct(a.heartRate.resting, 80),       icon: '❤️' })}
      ${metricCard({ key: 'steps',        label: 'Daily Steps',        value: a.steps.value.toLocaleString(),  unit: a.steps.unit,                trend: a.steps.trend,          dir: a.steps.dir,          pct: pct(a.steps.value, a.steps.goal),         icon: '🦶' })}
      ${metricCard({ key: 'activeMinutes',label: 'Active Minutes',     value: a.activeMinutes.value,           unit: a.activeMinutes.unit,        trend: a.activeMinutes.trend,  dir: a.activeMinutes.dir,  pct: pct(a.activeMinutes.value, a.activeMinutes.goal), icon: '⚡' })}
      ${metricCard({ key: 'stress',       label: 'Stress Level',       value: a.stress.value,                  unit: a.stress.unit,               trend: a.stress.trend,         dir: a.stress.dir,         pct: a.stress.value,                           icon: '🧘' })}
      ${metricCard({ key: 'sleep',        label: 'Total Sleep',        value: a.sleep.total,                   unit: 'last night',                trend: a.sleep.trend,          dir: a.sleep.dir,          pct: 87,                                       icon: '🌙' })}
    </div>

    <div class="grid grid-2">
      ${sleepPanel()}
      <div class="panel">
        <div class="panel-title">Team Readiness Snapshot</div>
        <table class="tbl">
          <thead><tr><th>Athlete</th><th>Pos</th><th>Energy</th><th>Sleep</th><th>Stress</th><th>Status</th></tr></thead>
          <tbody>
            ${a.team.map(p => {
              const barC = p.energy >= 80 ? 'var(--ok)' : p.energy >= 65 ? 'var(--warn)' : 'var(--danger)';
              const sC   = p.stress === 'Low' ? 'var(--ok)' : p.stress === 'Medium' ? 'var(--warn)' : 'var(--danger)';
              return `
                <tr>
                  <td style="font-weight:500">${p.name}</td>
                  <td style="color:var(--text3)">${p.pos}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:7px">
                      <div style="width:52px;height:3px;background:var(--border2);border-radius:2px;overflow:hidden">
                        <div style="width:${p.energy}%;height:100%;background:${barC};border-radius:2px"></div>
                      </div>
                      <span class="val" style="font-size:0.85rem">${p.energy}</span>
                    </div>
                  </td>
                  <td>${p.sleep}</td>
                  <td style="color:${sC}">${p.stress}</td>
                  <td>${statusPill(p.status)}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}
