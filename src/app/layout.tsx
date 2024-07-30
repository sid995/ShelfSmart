import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { ThemeProviderWrapper } from "@/context/ThemeContext";
import { ThemeToggle } from "@/app/components/Layout/ThemeToggle";
import { AuthProvider } from "@/context/AuthContext";
import { AppWrapper } from "./components/Layout/AppWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShelfSmart",
  description: "ShelfSmart is a web app that helps you keep track of your pantry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <AppWrapper>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  ShelfSmart
                </Typography>
                <ThemeToggle />
              </Toolbar>
            </AppBar>
            <Container>{children}</Container>
          </AppWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
