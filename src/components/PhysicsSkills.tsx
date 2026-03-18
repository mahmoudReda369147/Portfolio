import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const skills = [
  "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "React Query", "Redux",
  "Node.js", "Express.js", "RESTful APIs", "Firebase", "Supabase",
  "MongoDB", "PostgreSQL", "Prisma", "Mongoose",
  "JavaScript", "TypeScript", "OpenAI API", "Gemini AI", "Sanity CMS", "Stripe"
];

export default function PhysicsSkills() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies,
          Body = Matter.Body;

    // create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const width = Math.max(1, sceneRef.current.clientWidth);
    const height = Math.max(1, sceneRef.current.clientHeight);

    // create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
      }
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add walls
    const wallOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
    Composite.add(world, [
      Bodies.rectangle(width / 2, -50, width, 100, wallOptions), // top
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), // bottom
      Bodies.rectangle(-50, height / 2, 100, height, wallOptions), // left
      Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions) // right
    ]);

    // add skill bodies
    const skillBodies = skills.map((skill, i) => {
      const x = width / 2 + (Math.random() - 0.5) * 50;
      const y = height / 2 + (Math.random() - 0.5) * 50;
      
      // Calculate text width roughly
      const textWidth = skill.length * 10 + 40;
      
      const body = Bodies.rectangle(x, y, textWidth, 40, {
        chamfer: { radius: 15 },
        restitution: 0.8,
        friction: 0.1,
        render: {
          fillStyle: '#000000',
          strokeStyle: 'rgba(59,130,246,0.8)',
          lineWidth: 2,
        },
        label: skill
      });

      // Add initial explosion velocity
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20 - 5
      });

      return body;
    });

    Composite.add(world, skillBodies);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // Custom render for text
    Matter.Events.on(render, 'afterRender', () => {
      const context = render.context;
      context.font = 'bold 14px monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#93c5fd'; // blue-300

      skillBodies.forEach(body => {
        const { x, y } = body.position;
        if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(body.angle)) {
          context.save();
          context.translate(x, y);
          context.rotate(body.angle);
          context.fillText(body.label, 0, 0);
          context.restore();
        }
      });
    });

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = Math.max(1, sceneRef.current.clientWidth);
      const newHeight = Math.max(1, sceneRef.current.clientHeight);
      
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
      
      // Update walls
      Composite.remove(world, world.bodies.filter(b => b.isStatic));
      Composite.add(world, [
        Bodies.rectangle(newWidth / 2, -50, newWidth, 100, wallOptions),
        Bodies.rectangle(newWidth / 2, newHeight + 50, newWidth, 100, wallOptions),
        Bodies.rectangle(-50, newHeight / 2, 100, newHeight, wallOptions),
        Bodies.rectangle(newWidth + 50, newHeight / 2, 100, newHeight, wallOptions)
      ]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
      Engine.clear(engine);
    };
  }, []);

  return (
    <div 
      ref={sceneRef} 
      className="w-full h-[500px] border-2 border-dashed border-white/10 rounded-3xl bg-black/20 overflow-hidden relative cursor-grab active:cursor-grabbing"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <span className="text-9xl font-black font-display">SKILLS</span>
      </div>
    </div>
  );
}
