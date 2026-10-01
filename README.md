# GCP Network Engineer Hub

![Project preview](./222.jpg)

A modern, responsive reference application for Google Cloud networking engineers. The project combines a structured command database, troubleshooting playbooks, learning content, and architecture references into a clean engineering portal.

## Overview

GCP Network Engineer Hub is designed to help engineers quickly find the right Cloud Networking command, understand the purpose behind it, and move from diagnosis to implementation without digging through scattered documentation.

### Included capabilities

- Structured command catalog for GCP networking topics
- Search and filter experience across service, category, difficulty, and environment
- Dedicated topic pages for VPC, VPN, firewall, BGP, NAT, DNS, load balancers, GKE networking, and AL examples
- English / Albanian UI toggle
- Troubleshooting and runbook sections
- Learning modules and architecture reference cards
- Clean, engineering-focused interface built for internal knowledge sharing

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Lucide React

## Project Structure

```text
gcp-network-engineer-hub/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── data/
│       ├── architecture.ts
│       ├── commands.ts
│       ├── learning.ts
│       └── troubleshooting.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── README.md
└── public/
```

## Main Features

### Command database
The command catalog is stored as structured data in `src/data/commands.ts` instead of rendering commands inline in the UI. This keeps the app scalable and makes it easier to add, version, search, and update entries over time.

### Topic-based navigation
Each networking topic has a dedicated page so users can find commands more efficiently than in a single large dashboard view.

### Bilingual experience
The interface supports both English and Albanian, with a language switch in the top-right area of the app.

### Operational references
The app also includes:

- networking learning modules
- troubleshooting runbooks
- configuration checklists
- architecture patterns

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

Then open:

```text
http://localhost:4173
```

## Production Build

```bash
npm run build
```

This will generate a production build in the `dist` folder.

## Preview the production build

```bash
npm run preview -- --host 0.0.0.0 --port 4173
```

## Notes

This project is intended as a reusable networking reference and knowledge hub. The current architecture supports future growth to hundreds of commands and additional topic pages without restructuring the app.

## Future Expansion Ideas

- add more GCP networking command families
- introduce search ranking and tag-based relevance
- add command favorites or saved snippets
- add deployment-ready admin or internal documentation layers
- expand Albanian content translation for command descriptions and learnings
# gcp-tutorial-2027
