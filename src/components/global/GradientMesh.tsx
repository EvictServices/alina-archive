"use client";
import { Gradient } from "@/components/gradient"
import "@/app/globals.css";
import { useEffect, useRef, useState } from "react";

export const MeshGradient = () => {
    const initialized = useRef(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        
        const gradient = new Gradient();
        gradient.initGradient("#gradient-canvas");
        
        setTimeout(() => {
            setIsLoaded(true);
        }, 150);
        
        return () => {
            gradient.disconnect();
        };
    }, [])
    
    return (
        <>
            <div className={`gradient-fallback ${isLoaded ? 'fade-out' : ''}`} />
            <canvas 
                id="gradient-canvas" 
                data-transition-in 
                className={isLoaded ? 'gradient-loaded' : ''}
            />
        </>
    )
}