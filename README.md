# 🕒 Advanced Date & Time Range Picker

A high-performance, accessible, and timezone-aware Date & Time Range Picker built from scratch with React, TypeScript, and Tailwind CSS. Featuring a premium 3D Glassmorphism UI with smooth animations.

## 🚀 Key Features

-   **Range Selection**: Seamlessly select start and end dates with intuitive highlighting.
-   **Timezone Intelligence**: Native support for multiple timezones (UTC, Asia/Kolkata, US/Eastern, etc.) using `Intl.DateTimeFormat`.
-   **Quick Presets**: Fast selection for common ranges like "Last 7 Days", "This Month", etc.
-   **Precise Time Picking**: Integrated time selection for both start and end points.
-   **Premium Aesthetics**: Modern 3D glassmorphism design with floating animations and dynamic gradients.
-   **Accessibility (A11y)**: Fully keyboard navigable, ARIA-compliant, and screen-reader friendly.
-   **Robust Testing**: Comprehensive unit tests and Storybook documentation for every state.

## 🛠️ Technology Stack

-   **Frontend**: [React 18+](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **3D Effects**: [Three.js](https://threejs.org/) (for advanced scene integration)
-   **Documentation**: [Storybook](https://storybook.js.org/)
-   **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📂 Project Structure

```text
src/
├── components/          # React components (Calendar, TimePicker, Presets)
├── logic/               # Timezone and date manipulation logic
├── styles/              # Global CSS and Tailwind configurations
├── App.tsx              # Main application entry
└── main.tsx             # React DOM rendering
```

## ⚙️ Implementation Details

### 1. Timezone Handling
We avoid all external date libraries (like Moment or Day.js) to ensure zero-dependency timezone safety. All calculations use native `Date` objects and `Intl` APIs to handle DST transitions and UTC offsets accurately.

### 2. State Management
The picker Uses a custom hook `usePickerState` to manage complex range selection logic, ensuring a clean separation between UI and business logic.

### 3. Visual System
- **Glassmorphism**: Built using `backdrop-filter` and semi-transparent layers.
- **Micro-interactions**: Subtle `active:scale-90` effects and `hover` transitions for feedback.
- **Responsive**: Fully adapts from desktop wide-screens to mobile devices.

## 🧪 Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Run Storybook**:
   ```bash
   npm run storybook
   ```

4. **Run Tests**:
   ```bash
   npm run test
   ```

## 📄 Documentation & Reports
- **Project Report**: A detailed breakdown of the implementation is available in `REPORT.md`.
- **PDF Export**: You can export these files to PDF using VS Code extensions (like "Markdown PDF") or by printing the preview window.
