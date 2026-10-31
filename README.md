[![CI](https://github.com/VinzMarc/ITelect4_GT2/actions/workflows/ci.yml/badge.svg)](https://github.com/VinzMarc/ITelect4_GT2/actions/workflows/ci.yml)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## AI project reviews

Run `npm run dev` from the repository root to start both the frontend and backend. The Vite development server proxies `/api` to `http://localhost:4000`. Starting only Vite leaves API requests without a backend and causes a 502 gateway error.

The authenticated `/review` page submits project descriptions to the backend's `/api/ai` endpoint.

Set `GEMINI_API_KEY` in `itelect4-backend/.env` using the provided `itelect4-backend/.env.example` as a template. The key must stay on the backend and must not be prefixed with `VITE_`. For deployment, add `GEMINI_API_KEY` to the backend's Vercel project environment variables and redeploy that project.

The review accepts a trimmed description of 20 to 2000 characters, is limited to 10 requests per authenticated user every 15 minutes, and returns a summary, strengths, improvements, and a rating.

Run the frontend checks with `npm run typecheck` and `npm test`. Run `npm run dev` from the repository root to start the frontend and backend together.
