/**
 * VitalEdge · App Bootstrap
 * 1. Populates header identity from ATHLETE data
 * 2. Renders all four role views once on load
 * 3. Wires the tab switcher
 */

import { ATHLETE }       from './data/athleteData.js';
import { renderCoach }   from './views/coachView.js';
import { renderTrainer } from './views/trainerView.js';
import { renderDoctor }  from './views/doctorView.js';
import { renderAthlete } from './views/athleteView.js';

document.addEventListener('DOMContentLoaded', () => {
  populateIdentity();
  renderAll();
  initTabs();
});

function populateIdentity() {
  document.getElementById('avatar').textContent        = ATHLETE.initials;
  document.getElementById('athlete-name').textContent  = ATHLETE.name;
  document.getElementById('athlete-meta').textContent  =
    `${ATHLETE.position} · ${ATHLETE.number} · ${ATHLETE.team}`;
}

function renderAll() {
  renderCoach();
  renderTrainer();
  renderDoctor();
  renderAthlete();
}

function initTabs() {
  const tabBar = document.getElementById('tabBar');
  tabBar.addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`view-${btn.dataset.role}`)?.classList.add('active');
  });
}
