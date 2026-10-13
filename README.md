# Anteng Cai — personal website

A build-free GitHub Pages portfolio. Preserves the original paper (#f6f5f1), forest (#253c35 / #29644b), and sage palette.

## Preview

Run `python -m http.server 8000` in this directory and open http://localhost:8000.
GitHub Pages serves the root of the main branch: https://catcatcat23.github.io/.

## Files and interactions

- `index.html`: accessible, static resume-based content; native expandable research details.
- `styles.css`: responsive layout, signal illustration, hover effects, reduced-motion support.
- `script.js`: Motion entrance animations, project filters, reading progress and animation preference.
- `assets/vendor/`: locally served Motion 12.23.24 (MIT), including its license. No CDN request is required at runtime.

Motion: https://github.com/motiondivision/motion
Documentation: https://motion.dev/docs/quick-start

All content stays readable without JavaScript or if the animation library fails. Project filters appear only when JavaScript is available. System reduced-motion preferences take priority; the footer toggle also persists an explicit pause locally.

## Content provenance

Education, research metrics, contribution descriptions, publication statuses, internships and skills are taken from the supplied Anteng_Cai_Sushen_Resume.pdf (October 2026 editing session). Publication and patent statuses reflect that resume, rather than independent verification. Retained GitHub links and creative project descriptions come from the original website. The original UR5 project and the resume's Isaac Sim project remain separate. No publication acceptance is inferred from a submission, and OrganSlot's offline evidence and reconstruction limitation are stated explicitly. The private source PDF and phone number are not bundled with the site.
