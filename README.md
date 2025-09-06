KAHANIKAAR – THE AI STORYTELLER

Turn a simple story idea into a fully illustrated, multi-scene storybook using AI! Perfect for creatives, educators, and kids.

FEATURES

Story Creation: Input a prompt, choose genre, tone, audience, and art style.

AI Generated: Multi-scene stories with text + illustrations.

Story Library: Save, read, share, or delete your stories.

User Accounts: Signup/login with Supabase; each user has a personal library.

Export & Share: Download stories as PDF or share via unique URL.

Extras: Text-to-Speech narration; regenerate text or images per scene.

TECH STACK

Frontend: React, TypeScript, TailwindCSS, Shadcn UI

Backend: Supabase (Auth, Database, Storage)

AI: GPT-4 / Claude / Mistral for story text; DALL·E / Stable Diffusion for images

Utilities: jsPDF/html2pdf.js, Web Speech API

GETTING STARTED

Clone the repository:
git clone <YOUR_GIT_URL>

Navigate to project directory:
cd KahaniKaar

Install dependencies:
npm install

Start the development server:
npm run dev

Open http://localhost:8080 in your browser to view the app locally.

PROJECT STRUCTURE

src/ → Components, pages, hooks, contexts

supabase/ → Config & database migrations

package.json → Project dependencies

vite.config.ts → Vite configuration

DEPLOYMENT

Build for production:
npm run build

Then host the built files on any static hosting platform or server.

