# Anime Movie App

A full-stack application for browsing and discovering anime, featuring a .NET backend and a React Native (Expo) frontend.

## Features

- **Anime Search**: Search for your favorite anime titles.
- **Rankings**: View top-ranked anime.
- **Detailed Info**: Get summaries, genre info, and episode counts.
- **Responsive UI**: Beautiful mobile interface built with Expo.

## Technology Stack

### Backend
- **Framework**: .NET 10.0 (Web API)
- **Database**: PostgreSQL (Entity Framework Core)
- **External API**: Anime DB (RapidAPI)
- **Architecture**: Service-Repository Pattern

### Frontend
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: React Hooks

## structure

```
App/
├── Backend/          # .NET Web API
└── frontend/         # React Native Expo App
```

## Getting Started

### Prerequisites
- .NET 10.0 SDK
- Node.js & npm/yarn
- Expo CLI

### Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Run the application:
   ```bash
   dotnet run
   ```
   The API will start at `http://localhost:5214`.

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend/movie_app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npx expo start
   ```

