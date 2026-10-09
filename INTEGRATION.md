# Integration instructions

This package adds one new research report to the existing GitHub Pages repository. It does not replace or modify `index.html`, `resume.html`, the shared stylesheet, or the Research portal.

## Add the report

Copy the `research/` directory in this package into the root of your existing repository:

`vaibhavkamdi4/vaibhavkamdi`

The final path should be:

`research/malware/universal-malware-analysis-framework.html`

## Why it integrates with your Research section

The report includes the metadata fields your repository README describes:

- `research-title`
- `research-date`
- `research-tags`
- `research-description`

Your GitHub Action scans the research folders and regenerates `research/research.json`. After you commit and push the new HTML file, allow the workflow to complete; the new article should then appear in the Research catalog and in the homepage's recent-research feed automatically.

## Article URL

`https://vaibhavkamdi4.github.io/vaibhavkamdi/research/malware/universal-malware-analysis-framework.html`

The article uses the existing shared stylesheet at `assets/css/style.css`, the project's `/vaibhavkamdi/` base path, and the existing Home / Research / Resume navigation. Article-only CSS is scoped to `ma-*` classes.

## Recommended validation

1. Preview locally using a static web server from the repository root (not by opening the file directly).
2. Check desktop and mobile layouts, table scrolling, navigation links, print-to-PDF, and copy-link behaviour.
3. Commit only the new article file.
4. Confirm the GitHub Action succeeds, then check the Research catalog and article URL.
5. If the catalogue generator uses a stricter allowlist or different metadata parser than documented, review its workflow output before changing any existing files.

The article deliberately labels the framework as a methodology and avoids claiming that every workflow or tool has been personally tested.
