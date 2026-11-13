# Think Board

A simple note app made with React. This is my mini project for the Quera front-end bootcamp.

You can:

- See all notes
- Create a new note
- Open a note and see its details
- Edit a note
- Delete a note (it asks you first)
- Search and sort notes
- Switch between light and dark theme

## Tools

- React + TypeScript
- Vite
- Tailwind CSS + daisyUI
- React Query + Axios
- React Router

## How to run

```bash
npm install
npm run dev
```

Then open the link that shows in the terminal.

## Folders

```
src/
  pages/            one file for each page
  features/notes/   everything about notes (API, hooks, components)
  components/       shared parts (navbar, dialog, ...)
  hooks/            small reusable hooks
  lib/              axios and React Query setup
```

## Backend

The app uses this API: `https://thinkboard.codewithmmd.ir/api/notes`
