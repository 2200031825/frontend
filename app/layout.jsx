"use client";

import "./globals.css";

import {
  InvestorProvider,
} from "./context/InvestorContext";

export default function RootLayout({
  children,
}) {

  return (  

    <html lang="en">

      <body>

        <InvestorProvider>
          {children}
        </InvestorProvider>

      </body>

    </html>
  );
}