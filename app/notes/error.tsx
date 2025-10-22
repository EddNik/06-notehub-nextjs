"use client";

import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error?: Error | null;
}
export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <p className={css.text}>
      Could not fetch the list of notes. {error?.message}
    </p>
  );
}
