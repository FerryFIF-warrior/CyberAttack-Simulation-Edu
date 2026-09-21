import "../css/app.css";
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const pages = import.meta.glob("./Pages/**/*.{jsx,tsx}");

const closeOpenDetails = () => {
  document.querySelectorAll("details[open]").forEach((details) => {
    details.removeAttribute("open");
  });
};

document.addEventListener("click", (event) => {
  document.querySelectorAll("details[open]").forEach((details) => {
    if (!details.contains(event.target as Node)) details.removeAttribute("open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeOpenDetails();
});

router.on("navigate", closeOpenDetails);

createInertiaApp({
  resolve: (name) => {
    const pagePath = [`./Pages/${name}.tsx`, `./Pages/${name}.jsx`].find(
      (path) => path in pages,
    );

    if (!pagePath) {
      throw new Error(`Inertia page not found: ${name}`);
    }

    return resolvePageComponent(pagePath, pages) as any;
  },
  setup({ el, App, props }) {
    const root = createRoot(el as HTMLElement);
    root.render(<App {...props} />);
  },
  progress: {
    color: "#4F46E5",
  },
});
