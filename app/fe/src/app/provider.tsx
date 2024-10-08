"use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { Component, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "next-themes";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient();

export default function AppProvider({ children }: any) {
  const { systemTheme } = useTheme();

  return (
    // <QueryClientProvider client={queryClient}>
    //   <ReactQueryDevtools initialIsOpen={true} />
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme={systemTheme}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
    // </QueryClientProvider>
  );
}
