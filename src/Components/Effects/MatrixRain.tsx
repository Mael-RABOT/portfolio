import React, { useEffect, useRef } from 'react';
import { colors, fonts } from '../../theme/theme.const';

const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.fillStyle = colors.main.base;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:,.<>?~`';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);

        const drops: number[] = Array(columns).fill(1000); // Initial value to clear screen

        const drawMatrix = () => {
            // Fade towards main theme background
            ctx.fillStyle = colors.decorations.matrixFade;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = colors.decorations.matrixGreen;
            ctx.font = `${fontSize}px ${fonts.mono}`;

            for (let i = 0; i < drops.length; i++) {
                const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];

                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(drawMatrix, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: colors.decorations.matrixOpacity,
            }}
        />
    );
};

export default MatrixRain;