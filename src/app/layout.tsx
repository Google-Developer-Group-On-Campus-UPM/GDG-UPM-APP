/**
 * Root Layout Component for GDG UPM App
 *
 * This is the main layout that wraps all pages in the application.
 * It sets up:
 * 1. Global fonts (Poppins & Geist Mono)
 * 2. Global CSS styles
 * 3. HTML document structure
 * 4. SEO metadata
 *
 * The layout is applied to all pages in the app directory.
 */

import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

// Font configurations
// Poppins - Primary font for headings and body text
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Geist Mono - Monospace font for code and technical content
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO metadata for the entire application
export const metadata: Metadata = {
  title: "GDG UPM",
  description: "Google Developer Group Universiti Putra Malaysia",
};

/**
 * Root Layout Component
 *
 * @param children - Child components to be rendered within the layout
 * @returns JSX element containing the complete HTML document structure
 *
 * Features:
 * - Sets up font variables for use throughout the app
 * - Applies antialiasing for better text rendering
 * - Provides consistent layout structure for all pages
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Your layout logic goes here

  /**
   * Root Layout Logic:
   * 1. Initialize global providers (Auth, Theme, etc.)
   * 2. Set up global error boundaries
   * 3. Configure analytics and tracking
   * 4. Apply global font and CSS variables
   * 5. Render children components
   */

  // Global state providers setup
  // const providers = [
  //   AuthProvider,
  //   ThemeProvider,
  //   FirebaseProvider,
  //   NotificationProvider
  // ];

  // Error boundary for global error handling
  // const handleGlobalError = (error: Error) => {
  //   console.error('Global error:', error);
  //   // Send to error reporting service
  // };

  // Analytics initialization
  // useEffect(() => {
  //   initializeAnalytics();
  // }, []);

  return (
    /**
     * HTML Document Structure:
     * 1. HTML tag with language attribute
     * 2. Body with font variables and styling
     * 3. Global providers wrapper
     * 4. Error boundary wrapper
     * 5. Children components (pages)
     *
     * Font Variables Applied:
     * - --font-poppins -> INPUT: Poppins font config; OUTPUT: CSS variable
     * - --font-geist-mono -> INPUT: Geist Mono config; OUTPUT: CSS variable
     *
     * Global Providers (TODO):
     * - AuthProvider -> INPUT: children; OUTPUT: auth context
     * - ThemeProvider -> INPUT: children; OUTPUT: theme context
     * - FirebaseProvider -> INPUT: children; OUTPUT: firebase context
     */

    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        {/* Global Error Boundary */}
        {/* 
        <ErrorBoundary onError={handleGlobalError}>
          <AuthProvider>
            <ThemeProvider>
              <FirebaseProvider>
                <NotificationProvider>
                  {children}
                </NotificationProvider>
              </FirebaseProvider>
            </ThemeProvider>
          </AuthProvider>
        </ErrorBoundary>
        */}

        {children}
      </body>
    </html>
  );
}
