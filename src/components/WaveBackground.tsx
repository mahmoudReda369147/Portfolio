import { useEffect, useRef } from 'react';

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200; // Fixed height for the wave area
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw multiple waves
      const waves = [
        { amplitude: 30, frequency: 0.01, speed: 0.02, color: 'rgba(59, 130, 246, 0.1)' },
        { amplitude: 40, frequency: 0.008, speed: 0.015, color: 'rgba(16, 185, 129, 0.1)' },
        { amplitude: 20, frequency: 0.015, speed: 0.03, color: 'rgba(59, 130, 246, 0.2)' }
      ];

      if (Number.isFinite(canvas.width) && Number.isFinite(canvas.height)) {
        waves.forEach(wave => {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
          
          for (let x = 0; x <= canvas.width; x += 10) {
            const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude + canvas.height / 2;
            if (Number.isFinite(x) && Number.isFinite(y)) {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();
          ctx.fillStyle = wave.color;
          ctx.fill();
        });
      }

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[200px] overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
    </div>
  );
}
