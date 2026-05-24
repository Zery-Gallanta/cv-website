# Hextech Industrial Portfolio | Zery Gallanta Sasongko

An immersive, high-fidelity portfolio website designed for **Zery Gallanta Sasongko**—Software Engineer & Creative Technologist. 

The website merges a **Web3 Bento Grid layout** with an interactive **Arcane (League of Legends) Hextech-Industrial** aesthetic, integrating responsive frontend design with a raw, engineered look.

---

## 🌌 Theme & Design System

The core design system is custom-built with Vanilla CSS and Tailwind CSS v4 to match a tactile, magical-industrial interface:
*   **Base Background**: Deep void blacks (`#050506`) and charcoal grays overlaid with a subtle SVG **Film Grain Noise** texture and **Cyan Blueprint Drafting Lines**.
*   **Accent Palette**: **Electric Hextech Blue** (`#00E5FF`) for interactive glows and energy nodes, combined with **Antique Brass/Copper** (`#B87333`) for metallic structural framing and borders.
*   **Typography**: 
    *   **Runic Headings**: `Cinzel` (Google Fonts) for an archaic, handcrafted, and premium cinematic appearance.
    *   **Telemetry Tech Specs**: `JetBrains Mono` for badges, statistics, exposure numbers, and command-line inputs.
    *   **Descriptions**: `Inter` for highly readable body copy.

---

## 🛠️ Modular Sections

### 1. Interactive Tactical Hero (`Hero.jsx`)
*   Features a centralized name with metallic gradient typography and a subtle drop shadow glow.
*   Includes a vertical circular profile photograph styled with `object-top` framing, encased in a slow-spinning antique brass geared bezel.
*   Social shortcut docks linking directly to GitHub, LinkedIn, and Email.

### 2. Web3 Bento Registry (`BentoSection.jsx`)
*   **Education**: Undergrad credentials at BINUS University with an active, clickable badge linking to Zery's published paper on IEEE Xplore.
*   **Experience**: Production engineering work at Petrokimia Gresik.
*   **Statistics Node**: Real-time counter metrics for projects, photography frames, and programming languages.

### 3. Blueprint Schematics (`Projects.jsx`)
*   Showcases engineering projects (e.g., Traffic Light Detection, Eco-Enzyme Analysis).
*   **Hover Interactive Sketches**: On hover, each card projects a glowing, semi-transparent inline cyan vector blueprint blueprint (crosshairs, drafting grids, and circuit tracks).

### 4. Creative Kinetics Visual Gallery (`Gallery.jsx`)
*   Exhibits Zery's real photography works (culinary, portraiture, street, and editorial photography) in a responsive grid.
*   Includes a full-screen cinematic lightbox overlay on click.
*   Displays real technical metadata for each photograph (e.g., *Sony A7IV // 85mm GM*, aperture, shutter speed, and ISO).

### 5. Tactical Tech Stack (`Skills.jsx`)
*   Neat, categorized matrix of skills (Languages, Frontend, Backend, Tools) styled as JetBrains Mono chips with subtle borders.

### 6. Collaboration Terminal Terminal (`Contact.jsx`)
*   An interactive terminal dock simulating a terminal workflow.
*   Direct CTA endpoints for WhatsApp communication (`+62 822 6659 1472`) and SMTP email dispatch.

---

## ⚡ Tech Stack

*   **Core**: React (JS) + Vite (Superfast building & HMR)
*   **Styling**: Tailwind CSS v4 + Custom `@theme` variables & HSL-mapped gradients
*   **Animations**: Framer Motion (Frictionless spring physics, exit/enter state transits)
*   **Icons**: Lucide React + Custom SVG paths (for error-free brand compilation)

---

## 🚀 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup Steps
1.  Clone the repository:
    ```bash
    git clone https://github.com/Zery-Gallanta/cv-website.git
    cd cv-website
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Launch the development server:
    ```bash
    npm run dev
    ```

4.  Build the production bundle:
    ```bash
    npm run build
    ```
