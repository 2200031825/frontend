"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const InvestorContext =
  createContext();

export function InvestorProvider({
  children,
}) {

  const [investor,
    setInvestor] =
    useState(null);

  useEffect(() => {

    const cookie =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(
            "investor="
          )
        );

    if (cookie) {

      const value =
        decodeURIComponent(
          cookie.split("=")[1]
        );

      setInvestor(
        JSON.parse(value)
      );
    }

  }, []);

  return (

    <InvestorContext.Provider
      value={{
        investor,
        setInvestor,
      }}
    >

      {children}

    </InvestorContext.Provider>

  );
}

export function useInvestor() {

  return useContext(
    InvestorContext
  );
}