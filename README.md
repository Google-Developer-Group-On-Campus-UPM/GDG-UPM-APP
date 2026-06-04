# GDG UPM Website

Official website for Google Developer Group - Universiti Putra Malaysia.

## Overview

A modern web app showcasing team members, events, and partners. Features an admin dashboard for content management with real-time Firebase updates.

## Tech Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS** + **Material-UI**
- **Firebase** (Firestore, Auth, Analytics)
- **Biome** (Formatting and Linting)

## Quick Start

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Environment setup**
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Run development server**

   ```bash
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Homepage with all sections
│   ├── layout.tsx         # Root layout and providers
│   └── admin/             # Admin dashboard
├── components/            # React components
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable UI components
├── services/              # External service integrations
│   ├── auth/              # Authentication service
│   ├── events/            # Events service
│   ├── firebase/          # Firebase configuration
│   └── team/              # Team management service
├── constants/             # App constants and types
└── hooks/                 # Custom React hooks
```

## Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn start    # Start production server
yarn lint     # Run Biome checks
```

## Firebase Setup

1. Create project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database, Authentication, and Storage
3. Copy config to `.env.local`

---

## Developer Best Practices

### File Organization

- **One default export per file** - Each file exports only one main component/function
- **Single responsibility** - Each file handles one specific concern
- **Clear naming** - Use descriptive names that match the file purpose

### Code Style

- **Use Prettier** - Format code automatically on save
- **Follow ESLint rules** - No warnings or errors allowed
- **TypeScript types** - Define proper types for all data

### Component Structure

```typescript
// ✅ Good - Single responsibility
export default function Button() {
  // Button logic only
}

// ❌ Bad - Multiple responsibilities
export default function ButtonWithModalAndForm() {
  // Too many things in one file
}
```

### Folder Structure

```
components/
├── Button.tsx        # One component per file
├── Modal.tsx         # Single responsibility
└── Form.tsx          # Clear purpose
```

### Comments and Documentation

- Write pseudocode logic explaining what functions should do
- Use clear INPUT/OUTPUT documentation
- Keep comments simple and helpful
- Document complex business logic

### State Management

- **Local state**: useState for component-specific data
- **Global state**: Context API for shared data
- **Server state**: Firebase for persistent data

### Performance

- Use React.memo for expensive components
- Lazy load components when possible
- Keep bundle sizes small

### Quality Checklist

Before committing code:

- [ ] Code formatted with Biome
- [ ] No Biome check errors
- [ ] TypeScript compiles without errors
- [ ] One default export per file
- [ ] Single responsibility per file
- [ ] Meaningful variable names
- [ ] Comments explain the logic
- [ ] Tests pass (when available)

### Git Workflow

1. Create feature branch from main
2. Make small, focused commits
3. Write clear commit messages
4. Test before pushing
5. Create pull request with description
