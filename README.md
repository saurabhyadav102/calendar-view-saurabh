📅 Calendar View Application

This project implements an interactive Calendar View built with React, TypeScript, Vite, TailwindCSS, and Storybook — based on the provided assignment specification.

--------------------------------------------------------------------------------
🚀 Features

✅ Month View
- Displays a full monthly grid (7x6 layout)
- Highlights today’s date
- Shows events as color-coded tags
- +More option for multiple events on a day

✅ Week View
- Displays 7 days with vertical hourly slots (00:00–23:00)
- Scrollable layout
- Events positioned by start & end time
- Click any time slot to add new events

✅ Event Management
- Add, edit, and delete events via a modal form
- Select event color and time range
- Validation for title and time conflicts
- Real-time update on save/delete

✅ Calendar Navigation
- Next, Previous, and Today buttons
- Toggle between Month and Week views

✅ Storybook Integration
- Visualizes multiple UI states:
  - Default (with events)
  - Empty Calendar
  - Week View
  - Many Events
  - Interactive Demo (add/edit/delete live)

--------------------------------------------------------------------------------
🛠️ Tech Stack

Frontend Framework: React + TypeScript (Vite)
Styling: Tailwind CSS
Date Utilities: Day.js
State Management: Zustand
Animation: Framer Motion
Component Testing: Storybook
Build Tool: Vite
Deployment (Optional): Vercel / Chromatic

--------------------------------------------------------------------------------
⚙️ Installation & Setup

1️⃣ Clone the repository
    git clone https://github.com/your-username/calendar-view.git
    cd calendar-view

2️⃣ Install dependencies
    npm install

3️⃣ Start development server
    npm run dev
    → Open http://localhost:5173

4️⃣ Run Storybook
    npm run storybook
    → Open http://localhost:6006

--------------------------------------------------------------------------------
🧱 Component Overview

CalendarView - Main wrapper, handles month/week switch
MonthView - Monthly grid with events
WeekView - Weekly time-based layout
EventModal - Add/Edit/Delete events
useCalendar Hook - Manages current date and view state
useEventManager Hook - Handles all event CRUD operations
Modal Primitive - Generic reusable modal component

--------------------------------------------------------------------------------
🧪 Storybook Scenarios

Default - Standard calendar view with events
Empty - Calendar without events
Week View - Switch view to weekly layout
Many Events - Stress test with 20+ events
Interactive - Add/Edit/Delete in real-time

--------------------------------------------------------------------------------
🧰 Deployment (Optional)

Option 1 — Deploy on Vercel
    npm run build
    → Deploy dist folder

Option 2 — Deploy Storybook on Chromatic
    npm install chromatic
    npx chromatic --project-token=<your-token>

--------------------------------------------------------------------------------
👨‍💻 Author

Saurabh Yadav
2nd Year MCA | NIT Jamshedpur
🎯 Interests: Cybersecurity, AI/ML, and Full Stack Development

--------------------------------------------------------------------------------
📸 Preview

Month View: preview/monthview.png
Week View: preview/weekview.png

--------------------------------------------------------------------------------
This project follows modern React component architecture, clean code practices, and modular design to meet all assignment expectations.
