# VitalEdge · Data Schema

All data lives in src/data/athleteData.js as a single ATHLETE object.

## Standard metric shape
{ value, goal, unit, trend, dir }
dir: "up" = green ▲ | "down" = red ▼ | "neutral" = grey —

## sleep.stages — pct values must sum to 100
## team — status: "Ready" | "Monitor" | "Risk"
## alerts — type: "ok" | "info" | "warn"
## weeklyActiveMinutes / weeklySteps — arrays of 7 (Mon→Sun)

See full field reference in the file itself — every field is commented.
```

---

### 🚫 12. `.gitignore`
```
.DS_Store
Thumbs.db
.vscode/
.idea/
*.swp
node_modules/
dist/
.env
