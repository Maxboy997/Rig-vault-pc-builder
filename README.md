# RigVault — Next-Gen PC Hardware Visualizer & Custom Rig Builder

A sleek, interactive web application built with React and Tailwind CSS that allows users to explore elite computer components, filter by category or real-time search keywords, track total system cost, calculate estimated power draw (wattage), and export build specifications instantly.

## Tech Stack
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Icons & Notifications:** Lucide React, React Toastify
* **Deployment:** Vercel

## 3 Features We're Proud Of
1. **Dynamic Build Stack & LocalStorage Persistence:** Users can select components dynamically, and their build is safely stored in browser storage so it persists across refreshes.
2. **Real-time Cost & Power Calculation:** Instantly calculates both total financial cost and estimated system power draw (~W) as parts are added or removed.
3. **Smart Toast Notifications & Duplicate Prevention:** Prevents duplicate component additions with informative toast warnings and smooth visual feedback.

---

## Technical Answers to React Concepts

### 1. What is JSX?
JSX (JavaScript XML) is a syntax extension for JavaScript used in React. It allows us to write HTML-like structures directly inside JavaScript files. Under the hood, JSX gets compiled into standard JavaScript function calls (`React.createElement`) by Babel before rendering to the DOM.

### 2. Props vs State
* **Props (Properties):** Immutable data passed down from a parent component to a child component. They are read-only for the receiving component and used to configure components dynamically.
* **State:** Mutable, internal data managed *within* a component. When state changes, React re-renders the component to reflect the updated UI.

### 3. What is `useState`?
`useState` is a React Hook that lets functional components manage state. It returns an array with two values: the current state variable and a setter function to update that state and trigger a re-render.
*Example:* `const [count, setCount] = useState(0);`

### 4. What is `useEffect`?
`useEffect` is a React Hook used for handling side effects in functional components (such as data fetching, subscriptions, or manually manipulating the DOM). It runs after the render phase, and its execution can be controlled via a dependency array.

### 5. Why is the `key` prop important in lists?
The `key` prop helps React identify which items in a list have changed, been added, or been removed. Unique keys give elements a stable identity, optimizing the reconciliation process (Virtual DOM diffing) and preventing rendering bugs or state loss.

### 6. What is Conditional Rendering?
Conditional rendering in React refers to the ability to render different UI elements or components based on certain conditions (using JavaScript operators like `if/else`, ternary operators `? :`, or logical `&&`).

### 7. Explain Parent ↔ Child Data Flow.
React follows a **unidirectional (top-down)** data flow:
* **Parent to Child:** Data is passed down via **Props**.
* **Child to Parent:** Since child components cannot directly modify parent props, data flows upward via **Callback Functions** passed down as props from the parent. The child invokes this function to send data or trigger state changes in the parent.
<!-- revision update -->
