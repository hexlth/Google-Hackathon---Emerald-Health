# Emerald Health – Google Hackathon 2025 (Team 6)

**Emerald Health** is an AI-powered web application built during the **Google Hackathon 2025** by **Team 6**. It uses cutting-edge generative AI and location services to detect early symptoms of disease, contact local GPs and specialists instantly, and guide users toward appropriate medical care based on input and severity.

## What It Does

Emerald Health empowers users to:

- **Detect Symptoms Early**: Enter symptoms via text or upload a photo — the app uses **Google Cloud Genkit + Gemini API** to analyze and determine potential conditions and severity.
- **Immediate Medical Outreach**: Depending on urgency and the detected issue, the system can notify your **local GP** and **specialists** in real-time.
- **Location-Based Help**: Input your location or use device geolocation to find nearby specialists, hospitals, or clinics equipped to help with your condition.
- **Privacy First**: Health inputs are processed securely and temporarily to deliver fast, meaningful guidance.

## Tech Stack

This application is built with a modern, production-ready stack:

- **Framework**: [Next.js (App Router)](https://nextjs.org/docs/app)
- **Language & UI**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Google Cloud Genkit](https://cloud.google.com/genkit), [Gemini API](https://ai.google.dev/)

## Getting Started

1. Clone the repository.
2. Add your Google API keys and Genkit config in `.env.local`:

   ```bash
   NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

