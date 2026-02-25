# VitalEdge · Athlete Health Dashboard

> Multi-role health metrics dashboard for coaches, trainers, team doctors, and athletes.
> Pure HTML + CSS + vanilla ES Modules — zero build step, zero dependencies.

## Quick start
```bash
git clone https://github.com/your-org/vitaledge.git
cd vitaledge
python -m http.server 8080   # or: npx serve .
```

python -m http.server 8080

## Updating data

Edit ONE file only: src/data/athleteData.js

## File structure

vitaledge/
├── index.html
├── README.md
├── .gitignore
├── docs/DATA_SCHEMA.md
└── src/
    ├── app.js
    ├── data/athleteData.js   ← ⭐ edit this
    ├── styles/main.css
    ├── components/ui.js
    └── views/
        ├── coachView.js
        ├── trainerView.js
        ├── doctorView.js
        └── athleteView.js

## License
MIT
