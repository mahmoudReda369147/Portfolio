import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -100, y: -100 };
    let trails: { x: number; y: number; age: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      trails.push({ x: mouse.x, y: mouse.y, age: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw trails
      for (let i = 0; i < trails.length; i++) {
        const trail = trails[i];
        trail.age += 1;
        
        if (trail.age > 20) {
          trails.splice(i, 1);
          i--;
          continue;
        }

        const opacity = Math.max(0, 1 - trail.age / 20);
        const radius = Math.max(0.1, 10 * opacity);

        if (!Number.isFinite(trail.x) || !Number.isFinite(trail.y) || !Number.isFinite(radius)) continue;

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.5})`;
        ctx.fill();
      }

      if (Number.isFinite(mouse.x) && Number.isFinite(mouse.y)) {
        // Draw main cursor
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100]" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
