import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  role: string;
  tags: string[];
  links?: boolean;
  images: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }
      }}
      whileHover={{
        y: -8,
        boxShadow: "8px 8px 0px 0px rgba(59,130,246,1)",
        borderColor: "rgba(59,130,246,1)"
      }}
      className="group bg-black border-2 border-white/10 rounded-2xl transition-all duration-300 flex flex-col h-full relative z-10 overflow-hidden"
    >
      {/* Image Gallery Section */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden group/gallery bg-white/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={project.images[currentIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
            alt={`${project.title} screenshot ${currentIndex + 1}`}
          />
        </AnimatePresence>
        
        {/* Gallery Controls */}
        {project.images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/gallery:opacity-100 transition-all backdrop-blur-md border border-white/10 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/gallery:opacity-100 transition-all backdrop-blur-md border border-white/10 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {project.images.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-blue-500 w-6 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-white/40 hover:bg-white/80 w-1.5'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Gradient Overlay for smooth transition to content */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-8 pt-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white font-display">{project.title}</h3>
            <p className="text-blue-400 font-medium mt-1 text-sm">{project.subtitle}</p>
          </div>
          {project.links && (
            <div className="flex gap-2">
              <a href="#" className="p-2 bg-white/5 hover:bg-blue-500 hover:text-white rounded-full text-gray-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-full text-gray-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed flex-grow text-sm">
          {project.description}
        </p>
        
        <div className="mb-6">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full">
            {project.role}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-mono font-medium text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
