# Vaibhav Kamdi — Security Research Portfolio

## Architecture

The site is a static GitHub Pages portfolio with an automatic research catalog.

```text
index.html
resume.html
resume.pdf

research/
├── index.html
├── research.json                 # GENERATED — do not edit manually
│
├── malware/
│   ├── report-001.html
│   └── report-002.html
│
├── threat-hunting/
│   └── hunt-001.html
│
├── detection/
│   └── sigma-001.html
│
└── threat-intelligence/
    └── campaign-001.html
```

## Publishing a new report

1. Copy `research/REPORT-TEMPLATE.html`.
2. Put it into the appropriate folder.
3. Change the metadata in `<head>`:

```html
<meta name="research-title" content="My Malware Analysis">
<meta name="category" content="malware">
<meta name="date" content="2026-10-08">
<meta name="tags" content="YARA,Ghidra,MITRE">
<meta name="description" content="Short public description.">
```

4. Write your complete HTML research report.
5. Commit/push to GitHub.
6. GitHub Actions scans `research/**/*.html`.
7. It automatically regenerates `research/research.json`.
8. `/research/` and the homepage automatically display the new report.

### Category folders

- `malware`
- `threat-hunting`
- `detection`
- `threat-intelligence`

### Important

`research/research.json` is generated automatically. Do not manually maintain it.

Never publish customer-confidential information, credentials, private telemetry, secrets, or sensitive internal IOCs.
