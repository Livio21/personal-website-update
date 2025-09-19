"use client";

import { useRef, useEffect } from 'react';

class Blobs {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    w: number;
    h: number;
    blobs: Blob[];
    animationFrameId: number | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.w = canvas.width;
        this.h = canvas.height;
        this.blobs = [];
        this.animationFrameId = null;

        const baseRadius = Math.sqrt(this.w * this.w + this.h * this.h) / 3;

        this.blobs.push(
            new Blob(this.w * 0.4, this.h * 0.4, baseRadius * 0.5, '#4F46E5', this.w, this.h), // Indigo
            new Blob(this.w * 0.8, this.h * 0.2, baseRadius * 0.3, '#DB2777', this.w, this.h), // Pink
            new Blob(this.w * 0.2, this.h * 0.7, baseRadius * 0.4, '#10B981', this.w, this.h)  // Emerald
        );
    }

    render() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        
        this.ctx.globalCompositeOperation = 'lighter'; 
        
        this.blobs.forEach(blob => {
            blob.update();
            this.ctx.beginPath();

            const grad = this.ctx.createRadialGradient(
                blob.x, blob.y, 1,
                blob.x, blob.y, blob.r
            );

            grad.addColorStop(0, blob.c);
            grad.addColorStop(1, `${blob.c}00`);

            this.ctx.fillStyle = grad;
            this.ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    start() {
        const animate = () => {
            this.render();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

class Blob {
    x: number;
    y: number;
    r: number;
    c: string;
    vx: number;
    vy: number;
    w: number;
    h: number;

    constructor(x: number, y: number, r: number, c: string, w: number, h: number) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.vx = (Math.random() - 0.5) * 0.4; // Slower speed
        this.vy = (Math.random() - 0.5) * 0.4; // Slower speed
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x - this.r < 0 || this.x + this.r > this.w) this.vx *= -1;
        if (this.y - this.r < 0 || this.y + this.r > this.h) this.vy *= -1;
    }
}

export const FluidBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let blobs: Blobs | null = null;

        const handleResize = () => {
            if (blobs) {
                blobs.stop();
            }
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            blobs = new Blobs(canvas);
            blobs.start();
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (blobs) {
                blobs.stop();
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -10,
                opacity: 0.25,
                filter: 'blur(100px)',
            }}
        />
    );
};
