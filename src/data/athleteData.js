js/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         VitalEdge · ATHLETE DATA — EDIT THIS FILE           ║
 * ║  This is the ONLY file you need to change.                  ║
 * ║  All four role dashboards read from this single source.     ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export const ATHLETE = {

  // ─── Identity ──────────────────────────────────────────────────
  name:     "Jordan Silva",
  initials: "JS",
  position: "Midfielder",
  number:   "#14",
  team:     "FC Northgate",

  date: "February 24, 2026 · 07:42 AM",

  // ─── Activity ──────────────────────────────────────────────────
  steps: {
    value: 11240,
    goal:  15000,
    unit:  "steps",
    trend: "+6% vs 7-day avg",
    dir:   "up",
  },
  calories: {
    value:  2810,
    goal:   3200,
    unit:   "kcal burned",
    trend:  "−3% vs avg",
    dir:    "down",
  },
  activeMinutes: {
    value: 68,
    goal:  90,
    unit:  "active min",
    trend: "+12 min vs avg",
    dir:   "up",
  },

  // ─── Cardiovascular ────────────────────────────────────────────
  heartRate: {
    resting:  58,
    max:      174,
    hrv:      62,
    unit:     "bpm",
    trend:    "↓ 2 bpm resting vs last week",
    dir:      "up",
  },
  bloodPressure: {
    systolic:  118,
    diastolic:  76,
    unit:      "mmHg",
    status:    "Optimal",
    trend:     "Stable",
    dir:       "neutral",
  },

  // ─── ECG ───────────────────────────────────────────────────────
  ecg: {
    rhythm: "Normal Sinus Rhythm",
    rate:   "58 bpm",
    qt:     "382 ms",
    pr:     "156 ms",
    qrs:    "88 ms",
    notes:  "Athlete bradycardia noted. No abnormalities detected.",
    tags:   ["NSR", "No abnormalities", "QT normal", "Athlete bradycardia"],
  },

  // ─── Oxygen & Respiratory ──────────────────────────────────────
  spO2: {
    value: 98,
    unit:  "%",
    low:   95,
    trend: "Stable, within normal range",
    dir:   "neutral",
  },
  sleepApnea: {
    ahi:     4.1,
    status:  "Normal",
    events:  32,
    o2drop:  "3%",
    note:    "Mild variation noted. No clinical intervention required. Monitor if AHI ≥ 5.",
  },

  // ─── Wellness ──────────────────────────────────────────────────
  stress: {
    value: 32,
    unit:  "/ 100",
    label: "Low",
    trend: "Trending down — recovery effective",
    dir:   "up",
  },
  energyScore: {
    value: 84,
    label: "Good",
    breakdown: {
      sleep:    88,
      hrv:      79,
      activity: 85,
    },
    trend: "↑ 6 pts since Monday",
    dir:   "up",
  },
  antioxidant: {
    value: 42,
    unit:  "μmol/L",
    range: { low: 20, high: 60 },
    status: "Good",
    trend:  "Within optimal range",
    dir:    "neutral",
  },

  // ─── Body Composition ──────────────────────────────────────────
  bodyComposition: {
    weight:     82.4,
    bodyFat:    14.2,
    muscleMass: 68.4,
    boneMass:   3.1,
    water:      62.5,
    bmi:        22.8,
    trend:      "+0.3 kg muscle mass this month",
    dir:        "up",
  },

  // ─── Sleep ─────────────────────────────────────────────────────
  sleep: {
    total:   "7h 54m",
    bedtime: "22:41",
    wakeup:  "06:35",
    stages: {
      deep:  { duration: "1h 42m", pct: 21, color: "#2563eb" },
      light: { duration: "3h 10m", pct: 39, color: "#60a5fa" },
      rem:   { duration: "1h 55m", pct: 24, color: "#a78bfa" },
      awake: { duration: "0h 27m", pct: 16, color: "#374151" },
    },
    trend: "+18 min vs 7-day avg",
    dir:   "up",
  },

  // ─── Menstrual Cycle ───────────────────────────────────────────
  menstrual: {
    day:    12,
    length: 28,
    phase:  "Follicular",
    next:   "~16 days",
    note:   "Peak performance window. Estrogen rising — good for high-intensity work.",
  },

  // ─── Fall Detection ────────────────────────────────────────────
  fallDetection: {
    incidents: 0,
    lastCheck: "Today 07:42 AM",
    status:    "Clear",
    note:      "No incidents detected in the last 30 days.",
  },

  // ─── Weekly sparklines (Mon → Sun) ─────────────────────────────
  weeklyActiveMinutes: [52, 71, 45, 90, 68, 33, 61],
  weeklySteps:         [8200, 11240, 7600, 13100, 9800, 6500, 10300],

  // ─── Team roster (Coach view) ──────────────────────────────────
  team: [
    { name: "Jordan Silva",  pos: "MF", energy: 84, sleep: "7h 54m", stress: "Low",    status: "Ready"   },
    { name: "Alex Torres",   pos: "FW", energy: 71, sleep: "6h 10m", stress: "Medium", status: "Monitor" },
    { name: "Sam Okafor",    pos: "DF", energy: 55, sleep: "5h 30m", stress: "High",   status: "Risk"    },
    { name: "Casey Lin",     pos: "GK", energy: 90, sleep: "8h 20m", stress: "Low",    status: "Ready"   },
    { name: "Morgan Webb",   pos: "MF", energy: 78, sleep: "7h 05m", stress: "Low",    status: "Ready"   },
    { name: "Riley Park",    pos: "FW", energy: 63, sleep: "6h 45m", stress: "Medium", status: "Monitor" },
  ],

  // ─── Role-specific alerts ───────────────────────────────────────
  alerts: {
    coach:   { type: "warn", text: "Sam Okafor: High stress + poor sleep — recommend reduced load today." },
    trainer: { type: "info", text: "Jordan's resting HR has trended down 4 bpm this week — recovery is improving." },
    doctor:  { type: "warn", text: "SpO₂ stable. Antioxidant index borderline — consider dietary review." },
    athlete: { type: "ok",   text: "You're in great shape today. Energy score 84 — ideal day for high-intensity training." },
  },
};
