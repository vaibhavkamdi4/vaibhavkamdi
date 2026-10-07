# Vaibhav Kamdi GitHub Pages V2

## Publish research automatically

1. Put each complete public research report as an `.html` file anywhere under `research/`.
2. Add these metadata tags inside the `<head>` of the report:

```html
<meta name="research-title" content="My Research Title">
<meta name="category" content="malware">
<meta name="date" content="2026-10-08">
<meta name="tags" content="YARA,Ghidra,MITRE">
<meta name="description" content="Short public description">
```

3. Push to GitHub.
4. GitHub Actions scans the HTML files and generates `research/research.json`.
5. `/research/` and the homepage automatically show the new report.

Supported categories:
- `malware`
- `threat-hunting`
- `detection`
- `threat-intelligence`

Do not publish client-confidential information, credentials, private IOCs, or sensitive data.
