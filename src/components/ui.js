/**
 * VitalEdge · Shared UI helpers
 * Pure functions that return HTML strings.
 */

import { ATHLETE } from '../data/athleteData.js';

export const COLOR = {
  steps:          'var(--teal)',
  calories:       'var(--rose)',
  activeMinutes:  'var(--amber)',
  heartRate:      'var(--rose)',
  bloodPressure:  'var(--pink)',
  spO2:           'var(--sky)',
  stress:         'var(--violet)',
  energyScore:    'var(--teal)',
  antioxidant:    'var(--orange)',
  bodyFat:        'var(--emerald)',
  muscleMass:     'var(--lime)',
  menstrual:      'var(--violet)',
  fallDetection:  'var(--teal)',
  sleep:          'var(--blue)',
};

export function metricCard({ key, label, value, unit, trend, dir, pct, icon }) {
  const c    = COLOR[key] || 'var(--teal)';
  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';
  const cls   = dir === 'up' ? 'up' : dir === 'down' ? 'down' : 'neutral';
  const fill  = pct != null ? pct : 0;

  return `
    <div class="card" style="--c:${c}">
      <div class="card-icon">${icon ?? ''}</div>
      <div class="card-label">${label}</div>
      <div class="card-value">${value}</div>
      <div class="card-unit">${unit}</div>
      <div class="card-trend"><span class="${cls}">${arrow}</span>&nbsp;${trend}</div>
      <div class="bar"><div class="bar-fill" style="width:${fill}%"></div></div>
    </div>`;
}

export function alertBanner(role) {
  const a = ATHLETE.alerts[role];
  const icons = { ok: '✓', info: 'ℹ', warn: '⚠' };
  return `<div class="alert ${a.type}">${icons[a.type]} ${a.text}</div>`;
}

export function viewTitle(line1, accent, subtitle) {
  return `
    <div class="view-title">
      <div>
        <h1>${line1} <span>${accent}</span></h1>
        <p>${subtitle}</p>
      </div>
      <div class="timestamp">${ATHLETE.date}</div>
    </div>`;
}

export function sleepPanel() {
  const s  = ATHLETE.sleep;
  const st = s.stages;
  const order = ['deep', 'light', 'rem', 'awake'];

  const segs = order.map(k => {
    const sg = st[k];
    return `<div class="sleep-seg" style="flex:${sg.pct};background:${sg.color}">${sg.pct > 10 ? k.toUpperCase() : ''}</div>`;
  }).join('');

  const legend = order.map(k => {
    const sg = st[k];
    return `<div class="leg-item"><div class="leg-dot" style="background:${sg.color}"></div>${k.charAt(0).toUpperCase()+k.slice(1)} · ${sg.duration}</div>`;
  }).join('');

  return `
    <div class="panel">
      <div class="panel-title">Sleep Architecture · ${s.total} total</div>
      <div class="sleep-track">${segs}</div>
      <div class="sleep-legend">${legend}</div>
      <div style="margin-top:12px;font-size:0.68rem;color:var(--text2)">
        Bed ${s.bedtime} → Wake ${s.wakeup} &nbsp;·&nbsp;
        <span class="up">▲</span> ${s.trend}
      </div>
    </div>`;
}

export function ecgPanel() {
  const e    = ATHLETE.ecg;
  const path = buildEcgPath(600, 56, 4);

  const kvs = [
    { label: 'Rhythm', val: e.rhythm },
    { label: 'Rate',   val: e.rate   },
    { label: 'QT',     val: e.qt     },
    { label: 'PR',     val: e.pr     },
    { label: 'QRS',    val: e.qrs    },
  ].map(kv => `<div class="ecg-kv"><label>${kv.label}</label><span>${kv.val}</span></div>`).join('');

  const tags = e.tags.map(t => `<span class="tag">${t}</span>`).join('');

  return `
    <div class="panel">
      <div class="panel-title">ECG · Last Reading</div>
      <div class="ecg-canvas">
        <svg viewBox="0 0 600 56" preserveAspectRatio="none">
          <path d="${path}" class="ecg-glow"/>
          <path d="${path}" class="ecg-line"/>
        </svg>
      </div>
      <div class="ecg-meta">${kvs}</div>
      <div class="tag-row">${tags}</div>
      <div style="margin-top:10px;font-size:0.68rem;color:var(--text2)">${e.notes}</div>
    </div>`;
}

export function statusPill(text) {
  const cls = text === 'Ready'   ? 'pill-ok'
            : text === 'Monitor' ? 'pill-warn'
            : text === 'Risk'    ? 'pill-risk'
            : 'pill-ok';
  return `<span class="pill ${cls}">${text}</span>`;
}

export function buildEcgPath(w = 600, h = 56, segs = 4) {
  const mid = h / 2;
  const sw  = w / segs;
  let d = `M0,${mid}`;
  for (let i = 0; i < segs; i++) {
    const x = i * sw;
    d += ` L${x+18},${mid}`;
    d += ` Q${x+26},${mid-5} ${x+33},${mid}`;
    d += ` L${x+43},${mid}`;
    d += ` L${x+48},${mid+4}`;
    d += ` L${x+53},4`;
    d += ` L${x+58},${mid+9}`;
    d += ` L${x+63},${mid}`;
    d += ` Q${x+76},${mid-10} ${x+92},${mid}`;
    d += ` L${x+sw},${mid}`;
  }
  return d;
}

export function sparkline(values, days = ['M','T','W','T','F','S','S']) {
  const W = 560, H = 56, pad = 24;
  const max = Math.max(...values);
  const pts = values.map((v, i) => ({
    x: pad + i * ((W - pad*2) / (values.length - 1)),
    y: H - pad - (v / max) * (H - pad * 1.4),
    v, d: days[i],
  }));
  const line = pts.map((p,i) => (i===0?'M':'L')+p.x+','+p.y).join(' ');
  const area = `${line} L${pts.at(-1).x},${H} L${pts[0].x},${H} Z`;

  return `
    <div class="spark-wrap">
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="var(--teal)" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="var(--teal)" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="${area}" fill="url(#sg)"/>
        <path d="${line}" stroke="var(--teal)" fill="none" stroke-width="1.8" stroke-linejoin="round"/>
        ${pts.map(p => `
          <circle cx="${p.x}" cy="${p.y}" r="3" fill="var(--teal)"/>
          <text x="${p.x}" y="${H-3}" text-anchor="middle" fill="var(--text3)" font-size="8" font-family="IBM Plex Mono">${p.d}</text>
          <text x="${p.x}" y="${p.y-7}" text-anchor="middle" fill="var(--text)" font-size="7.5" font-family="IBM Plex Mono">${p.v}</text>
        `).join('')}
      </svg>
    </div>`;
}
