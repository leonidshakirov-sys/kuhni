"use client";

import { useEffect } from "react";
import { captureUtmFromLocation } from "@/lib/utm";

export function UtmTracker() {
  useEffect(() => {
    captureUtmFromLocation();
  }, []);
  return null;
}
