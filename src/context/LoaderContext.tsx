"use client";

import { createContext, useContext, useState } from "react";

const LoaderContext = createContext<{
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}>({
  loaded: false,
  setLoaded: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const LoaderProvider = ({ children }: Props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <LoaderContext.Provider
      value={{
        loaded,
        setLoaded,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
