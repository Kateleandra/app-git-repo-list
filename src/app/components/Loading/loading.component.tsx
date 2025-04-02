import React from "react";
import { Typography } from "@/app/components/Typography/typography.component";

export function Loading({ message = "Carregando..." }: { message?: string }) {
  return (
    <Typography variant="p" color="grey" aria-live="polite">
      {message}
    </Typography>
  );
}
