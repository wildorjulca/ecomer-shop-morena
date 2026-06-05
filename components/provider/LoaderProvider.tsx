"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type LoaderContextType = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

type LoaderProviderProps = {
    children: ReactNode;
};

export function LoaderProvider({ children }: LoaderProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}

            {loading && (
                // <div style={overlayStyle}>
                //   <div style={spinnerStyle}></div>
                // </div>
                <div className="fixed top-0 bg-black/40 right-0 h-screen w-screen z-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
                </div>
            )}
        </LoaderContext.Provider>
    );
}

export function useLoader(): LoaderContextType {
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("useLoader must be used inside LoaderProvider");
    }

    return context;
}

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
};

const spinnerStyle: React.CSSProperties = {
    width: "60px",
    height: "60px",
    border: "6px solid #fff",
    borderTop: "6px solid transparent",
    borderRadius: "50%",
};