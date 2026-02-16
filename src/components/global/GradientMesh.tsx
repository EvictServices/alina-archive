"use client";
import { Gradient } from "@/components/gradient"
import "@/app/globals.css";
import { useEffect, useRef, useState } from "react";

export const MeshGradient = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gradientRef = useRef<Gradient | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        if (!canvasRef.current || gradientRef.current) return;
        
        const initGradient = () => {
            try {
                const gradient = new Gradient();
                gradientRef.current = gradient;
                gradient.initGradient("#gradient-canvas");
                
                setTimeout(() => {
                    setIsLoaded(true);
                }, 150);
            } catch (error) {
                console.error("Failed to initialize gradient:", error);
                setIsLoaded(true);
            }
        };
        
        if (document.readyState === 'complete') {
            initGradient();
        } else {
            window.addEventListener('load', initGradient);
            return () => window.removeEventListener('load', initGradient);
        }
        
        return () => {
            if (gradientRef.current) {
                gradientRef.current.disconnect();
                gradientRef.current = null;
            }
        };
    }, [])
    
    return (
        <>
            <div className={`gradient-fallback ${isLoaded ? 'fade-out' : ''}`} />
            <canvas 
                ref={canvasRef}
                id="gradient-canvas" 
                data-transition-in 
                className={isLoaded ? 'gradient-loaded' : ''}
            />
        </>
    )
}