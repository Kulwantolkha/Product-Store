"use client";

// Minimal toaster fallback for projects without Chakra UI.
// Provides a simple `toaster` object with a `push` method that logs and optionally shows an alert.
export const toaster = {
  push: (opts) => {
    // opts: { title, description, type }
    console.info("toast", opts);
    if (opts && opts.type === "error") {
      // lightweight user-visible fallback
      // eslint-disable-next-line no-alert
      alert(opts.title || opts.description || "Error");
    }
  },
};

export const Toaster = () => null;
