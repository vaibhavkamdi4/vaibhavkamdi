# Vaibhav Kamdi — Cybersecurity Research Portfolio

GitHub Pages project site for cybersecurity portfolio, malware analysis, threat hunting, threat intelligence and detection research.

## Live site

`https://vaibhavkamdi4.github.io/vaibhavkamdi/`

## Publishing a new research report

Put a complete HTML report into one of:

- `research/malware/`
- `research/threat-hunting/`
- `research/detection/`
- `research/threat-intelligence/`

Add these metadata tags inside `<head>`:

```html
<meta name="research-title" content="My Report Title">
<meta name="research-date" content="2026-10-08">
<meta name="research-tags" content="Malware, YARA, ATT&CK">
<meta name="research-description" content="Short public description">
```

The GitHub Action scans the research folders and regenerates `research/research.json`.

## Important

This is a public website. Never publish credentials, private client data, secrets, internal IPs, confidential reports or sensitive evidence.
