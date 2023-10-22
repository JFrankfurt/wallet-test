"use client";

import { WagmiConfig } from "wagmi";

import { config } from "./wagmi-config";
import { PropsWithChildren, useEffect, useState } from "react";

export function Providers({ children }: PropsWithChildren<{}>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
}
