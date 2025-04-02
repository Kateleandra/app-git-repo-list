"use client";
import React from "react";

import { CustomError } from "@/app/components/CustomError/custom-error.component";

export default function SearchNotFoundPage() {
  return (
    <div>
      <CustomError src="/error_404.svg" code={404} />
    </div>
  );
}
