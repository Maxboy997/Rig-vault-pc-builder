# RigVault — Next-Gen PC Hardware Visualizer & Custom Rig Builder

A sleek, interactive web application built with React and Tailwind CSS that allows users to explore elite computer components, filter by category or real-time search keywords, track total system cost, calculate estimated power draw (wattage), and export build specifications instantly.

## Tech Stack
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS (v4)
* **Icons & Notifications:** Lucide React, React Toastify
* **Deployment:** Vercel

## 3 Features We're Proud Of
1. **Dynamic Build Stack & LocalStorage Persistence:** Users can select components dynamically, and their build is safely stored in browser storage so it persists across refreshes.
2. **Real-time Cost & Power Calculation:** Instantly calculates both total financial cost ($) and estimated system power draw (~W) as parts are added or removed.
3. **Smart Toast Notifications & Audio Feedback:** Features interactive toast warnings for duplicate component selection and subtle synth audio cues on actions.

---

## Technical Answers to React Concepts

### 1. What is JSX?
JSX (JavaScript XML) is a syntax extension for JavaScript used in React. It allows us to write HTML-like structures directly inside JavaScript files. Under the hood, JSX gets compiled into standard JavaScript function calls (`React.createElement`) by Babel before rendering to the DOM.

### 2. Props vs State
* **Props (Properties):** Immutable data passed down from a parent component to a child component (e.g., passing `stack` and `onAddToBuild` from `App.jsx` to `ComponentGrid`). They are read-only for the receiving component.
* **State:** Mutable, internal data managed *within* a component (e.g., tracking selected components via `stack` state in `App.jsx`). When state changes, React re-renders the component to reflect the updated UI.

### 3. What is `useState`? (Where is it used in RigVault?)
`useState` is a React Hook that lets functional components manage state. It returns an array with the current state value and a setter function to update it.
* **In RigVault:** We used `useState` in `src/App.jsx` to manage `stack` (`const [stack, setStack] = useState(...)`) for tracking selected rig components, `components` for holding the catalog data, and `loading` for managing the initial data fetch loader.

### 4. What is `useEffect`? (Why was it needed for JSON load in RigVault?)
`useEffect` is a React Hook used for handling side effects like data fetching, manual DOM updates, or synchronizing with local storage after rendering.
* **In RigVault:** We used `useEffect` in `src/App.jsx` to fetch the `/data/components.json` catalog once when the app mounts, and another `useEffect` to synchronize the `stack` state with browser `localStorage` whenever components are added or removed.

### 5. Why is the `key` prop important in lists?
The `key` prop helps React identify which items in a list have changed, been added, or been removed. Unique keys give elements a stable identity, optimizing the reconciliation process (Virtual DOM diffing) and preventing state bugs during list re-renders.

### 6. What is Conditional Rendering? (Where is it used in RigVault?)
Conditional rendering in React allows components to render different UI elements or layouts based on specific conditions or state.
* **In RigVault:** We used conditional rendering in `src/components/Sidebar.jsx` to display an empty build state (`Your build stack is empty`) when `stack.length === 0`, and in `src/components/ComponentCard.jsx` to toggle the button UI between `"Add to Build"` and `"✓ In Your Build"`.

### 7. Explain Parent ↔ Child Data Flow.
React follows a **unidirectional (top-down)** data flow:
* **Parent to Child:** Data is passed down via **Props** (e.g., `App.jsx` passing `items` to `ComponentGrid`).
* **Child to Parent:** Children communicate upward via **Callback Functions** passed as props (e.g., `ComponentCard` invoking `onAddToBuild(item)` received from `App.jsx` to update the parent's `stack` state). 




> **⚠️ Simulation Notice:** *This project was developed and delivered as part of a real-world freelance client simulation / contract workflow for ForgeBench.*
