# Khunnos


Khunnos is a smart chatbot assistant that helps you manage your calendar by turning appointment-related chat messages into Google Calendar events.

## Problem

Messaging apps often contain reminders, meeting times, and appointment details, but users still need to manually transfer them into calendar apps—this is time-consuming and can cause human errors.

## Key Features

- **Automatic event recognition**: Extracts event details (name, time, agenda, location) from chat messages
- **Event management**: Add, edit, and delete events
- **Google account integration**: Sign in with Google for a consistent cross-device experience
- **Google Calendar sync**: Push events to Google Calendar so users can manage them later in their preferred calendar app
- **Broad compatibility**: Works with calendar apps that support URL subscriptions
- **Privacy-first**: Does not collect or store user chat history

## How It Works (High Level)

1. User sends a message (appointment info)
2. Khunnos sends message text to an NLP step (Gemini) to parse structured event data
3. App uses stored credentials (Firestore) + Google Calendar API to create/update events
4. Events sync to Google Calendar

## Tech Stack

**Core**
- **Next.js** (App Router) – web app
- **Firebase Authentication (Google Sign-In)**
- **Firestore** – store user/config/event-related data
- **Google Calendar API** – create/edit/delete calendar events
- **Gemini API** – parse and structure appointment text

> Note: Some versions/demos may also include a React Native client.

## Project Documentation

- Project deck / report:
  - [Khonnos_webapp_2025.pdf](https://github.com/user-attachments/files/24358874/Khonnos_webapp_2025.pdf)

---

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm / yarn / pnpm / bun

### Install
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
