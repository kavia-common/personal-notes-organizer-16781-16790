# Ocean Notes – Playful Personal Notes Organizer

A Next.js frontend that lets users create, edit, and manage personal notes with a playful "Ocean Professional" theme, featuring vibrant colors, rounded surfaces, and lively gradients.

## Tech
- Next.js App Router
- Tailwind CSS v4
- TypeScript
- LocalStorage mock API (ready to be swapped for real backend)

## Run
- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm start`

Open http://localhost:3000

## Structure
- src/app: pages and layout
- src/components: UI components (Header, Sidebar, NoteCard, NoteModal, ConfirmDialog)
- src/hooks/useNotes.ts: state management and CRUD orchestration
- src/services/notesApi.ts: mock API (localStorage)

## Theme
Colors and radii are set in src/styles/theme.ts and src/app/globals.css using Tailwind v4 and CSS variables.

Primary: #EC4899
Secondary: #8B5CF6
Background: #FDF2F8
Surface: #FFFFFF
Text: #374151

## Backend integration (future)
Swap src/services/notesApi.ts functions to call your backend:

- Set env: NEXT_PUBLIC_NOTES_API_URL=https://your-backend.example.com
- Replace the functions with fetch(`${process.env.NEXT_PUBLIC_NOTES_API_URL}/notes`...)

## Accessibility
- Descriptive aria labels
- Keyboard focusable controls
- Color contrast conscious styling

## Notes
- Data persists locally in the browser via localStorage in the mock API.
- Tags are comma-separated in the editor and used for filtering.
