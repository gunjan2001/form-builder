# Form Builder

A dynamic form builder and renderer built with React, TypeScript, and Tailwind CSS. Create custom forms visually, then render and submit them — all in the browser.

## Features

- **Form Builder** — Add, configure, reorder, and delete form fields
- **Field Types** — Supports `Text`, `Number`, `Dropdown`, and `Checkbox`
- **Dropdown Options** — Add, edit, and remove options for dropdown fields
- **Field Validation** — Mark fields as required; errors shown on form submit
- **Reorder Fields** — Move fields up or down with arrow buttons
- **Persistent Schema** — Form schema is saved to `localStorage` and restored on reload
- **Form Renderer** — Preview and submit the built form with full validation
- **Tabbed UI** — Switch between Builder and Renderer views seamlessly

## Tech Stack

| Technology | Version |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| Vite | 8 |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd form-builder

# Install dependencies
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── FormBuilder.tsx   # Form builder UI — add/edit/reorder/delete fields
│   ├── FormRenderer.tsx  # Renders the form and handles submission & validation
│   └── Header.tsx        # App header with Builder / Renderer tab switcher
├── App.tsx               # Root component — state management & tab routing
├── types.ts              # Shared TypeScript types (FormSchema, FieldType, etc.)
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## Form Schema

Each field in the form is represented by a `FormSchema` object:

```ts
type FormSchema = {
  id: string;          // Unique field identifier (UUID)
  label: string;       // Field label displayed in the form
  type: FieldType;     // "text" | "number" | "dropdown" | "checkbox"
  required: boolean;   // Whether the field is required on submit
  options?: string[];  // Dropdown options (only for type "dropdown")
};
```

## Usage

1. Open the app and go to the **Builder** tab
2. Click **+ Add field** to add a new field
3. Set the field name, type, and whether it is required
4. For **Dropdown** fields, add the available options
5. Use the **▲ / ▼** buttons to reorder fields
6. Click **Save** to switch to the **Renderer** tab
7. Fill in the rendered form and click **Submit**
