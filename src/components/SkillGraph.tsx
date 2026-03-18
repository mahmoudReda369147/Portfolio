import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = {
  nodes: [
    { id: "Full Stack", group: 0, radius: 45, color: "#ffffff" },
    
    { id: "Frontend", group: 1, radius: 35, color: "#3b82f6" }, // blue-500
    { id: "Backend", group: 2, radius: 35, color: "#10b981" }, // emerald-500
    { id: "Database", group: 3, radius: 35, color: "#8b5cf6" }, // violet-500
    { id: "AI & Tools", group: 4, radius: 35, color: "#ec4899" }, // pink-500
    
    { id: "React.js", group: 1, radius: 25, color: "#60a5fa" }, // blue-400
    { id: "Next.js", group: 1, radius: 25, color: "#60a5fa" },
    { id: "Tailwind CSS", group: 1, radius: 25, color: "#60a5fa" },
    { id: "TypeScript", group: 1, radius: 25, color: "#60a5fa" },
    
    { id: "Node.js", group: 2, radius: 25, color: "#34d399" }, // emerald-400
    { id: "Express.js", group: 2, radius: 25, color: "#34d399" },
    { id: "REST APIs", group: 2, radius: 25, color: "#34d399" },
    
    { id: "MongoDB", group: 3, radius: 25, color: "#a78bfa" }, // violet-400
    { id: "PostgreSQL", group: 3, radius: 25, color: "#a78bfa" },
    { id: "Firebase", group: 3, radius: 25, color: "#a78bfa" },
    
    { id: "Gemini AI", group: 4, radius: 25, color: "#f472b6" }, // pink-400
    { id: "OpenAI API", group: 4, radius: 25, color: "#f472b6" },
    { id: "Git", group: 4, radius: 25, color: "#f472b6" },
  ],
  links: [
    { source: "Full Stack", target: "Frontend" },
    { source: "Full Stack", target: "Backend" },
    { source: "Full Stack", target: "Database" },
    { source: "Full Stack", target: "AI & Tools" },
    
    { source: "Frontend", target: "React.js" },
    { source: "Frontend", target: "Next.js" },
    { source: "Frontend", target: "Tailwind CSS" },
    { source: "Frontend", target: "TypeScript" },
    
    { source: "Backend", target: "Node.js" },
    { source: "Backend", target: "Express.js" },
    { source: "Backend", target: "REST APIs" },
    { source: "Backend", target: "TypeScript" }, // Cross-link
    
    { source: "Database", target: "MongoDB" },
    { source: "Database", target: "PostgreSQL" },
    { source: "Database", target: "Firebase" },
    
    { source: "AI & Tools", target: "Gemini AI" },
    { source: "AI & Tools", target: "OpenAI API" },
    { source: "AI & Tools", target: "Git" },
  ]
};

export default function SkillGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg.selectAll("*").remove();

    // Copy data so simulation doesn't mutate original
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 15).iterations(2))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    // Draw links
    const link = svg.append("g")
      .attr("stroke", "#ffffff")
      .attr("stroke-opacity", 0.15)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    // Draw nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation) as any);

    node.append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => d.color)
      .attr("fill-opacity", 0.15)
      .attr("stroke", (d: any) => d.color)
      .attr("stroke-width", 2)
      .style("cursor", "grab");

    node.append("text")
      .text((d: any) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#ffffff")
      .attr("font-size", (d: any) => d.radius > 30 ? "14px" : "12px")
      .attr("font-weight", (d: any) => d.radius > 30 ? "bold" : "normal")
      .attr("pointer-events", "none")
      .style("text-shadow", "0px 2px 4px rgba(0,0,0,0.8)");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: any) {
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    // Handle resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      svg.attr("width", newWidth).attr("height", newHeight).attr("viewBox", [-newWidth / 2, -newHeight / 2, newWidth, newHeight]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[600px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden relative shadow-[0_0_40px_rgba(59,130,246,0.1)]">
      <div className="absolute top-6 left-6 pointer-events-none z-10">
        <h3 className="text-white/50 font-mono text-sm uppercase tracking-widest">Interactive Skill Network</h3>
        <p className="text-white/30 text-xs mt-1">Drag nodes to explore relationships</p>
      </div>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}
