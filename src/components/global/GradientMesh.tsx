"use client";
import { Gradient } from "@/components/gradient"
import "@/app/globals.css";
import { useEffect, useRef } from "react";

export const MeshGradient = () => {
    const initialized = useRef(false);
    
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        
        const gradient = new Gradient();
        gradient.initGradient("#gradient-canvas");
        
        return () => {
            gradient.disconnect();
        };
    }, [])
    
    return (
        <canvas id="gradient-canvas" data-transition-in />
    )
}