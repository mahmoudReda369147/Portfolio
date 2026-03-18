/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ChevronDown, Code2, Database, Layout, Server, Cpu, Atom, FileCode2, Palette, FileType2, LayoutTemplate, Zap, Box, Globe, Cloud, Layers, Sparkles, CreditCard, GitBranch, Download } from 'lucide-react';
import { useRef, useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import WaveBackground from './components/WaveBackground';
import CustomCursor from './components/CustomCursor';
import StarfieldBackground from './components/StarfieldBackground';
import SkillGraph from './components/SkillGraph';
import ProjectCard, { Project } from './components/ProjectCard';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const projectsData: Project[] = [
  {
    title: "Aleen",
    subtitle: "Real Estate Management System",
    description: "Built React-based dashboards and Node.js REST APIs for unit tracking and maintenance workflows, improving efficiency by 45%.",
    role: "Full Stack Developer (65%)",
    tags: ["React", "Node.js", "REST API", "Dashboard"],
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "Deyar",
    subtitle: "Sales & Contract Management Platform",
    description: "Developed deposits, contracts, and sales modules, optimizing system flows and reducing user-side delays by 35%.",
    role: "Full Stack Developer (75%)",
    tags: ["React", "Node.js", "Sales Module", "Contracts"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "Bonn",
    subtitle: "IoT Smart Control System",
    description: "Designed REST APIs for IoT device control with Digital Key, QR, and NFC integrations, increasing automation efficiency by 55%.",
    role: "Backend Developer (100%)",
    tags: ["Node.js", "IoT", "REST API", "NFC/QR"],
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "StayCity",
    subtitle: "Smart Hotel Management Platform",
    description: "Built a scalable hotel system with IoT sensor integration (Aqara, Aranet) and AI-powered automation via Gemini AI.",
    role: "Full Stack Developer (90%)",
    tags: ["React", "Node.js", "IoT", "Gemini AI"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "Arion.ai",
    subtitle: "AI-Powered Email Platform",
    description: "Built a Gmail-based platform with AI for task and meetings extraction, email drafting, automation bots, multi-account management, and voice assistant.",
    role: "Private Project",
    tags: ["AI", "Gmail API", "Automation", "Voice Assistant"],
    links: true,
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "Podcaster.ai",
    subtitle: "AI Podcast Generator",
    description: "Built an AI-driven app that converts prompts or real conversations into structured podcast-ready content using automated AI processing.",
    role: "Private Project",
    tags: ["AI", "Audio Processing", "Content Gen"],
    links: true,
    images: [
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
    ]
  }
];

export default function App() {
  const constraintsRef = useRef(null);
  const [isInteractiveMode, setIsInteractiveMode] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-gray-200 selection:bg-blue-500/30 overflow-hidden">
      <CustomCursor />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-display font-bold text-xl tracking-tighter text-white">
            MRS<span className="text-blue-500">.</span>
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          </div>
          <a href="#contact" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors">
            Get in touch
          </a>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6">
          {/* 2D Particle Canvas Background */}
          <ParticleBackground />
          
          {/* Floating 2D Geometric Shapes */}
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-[10%] w-16 h-16 border-4 border-blue-500/30 rounded-xl z-0 pointer-events-none"
          />
          <motion.div
            animate={{ y: [0, 40, 0], rotate: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 right-[10%] w-24 h-24 border-4 border-emerald-500/30 rounded-full z-0 pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, 30, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[20%] w-12 h-12 bg-purple-500/20 z-0 pointer-events-none"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10 pointer-events-none">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-start pointer-events-auto"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Available for new opportunities
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1] mb-6">
                Full Stack <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Developer.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
                Hi, I'm <strong className="text-white font-medium">Mahmoud Reda Soltan</strong>. I build scalable, high-performance web applications with modern technologies and AI integrations.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <a href="#projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 flex items-center gap-2">
                  View My Work
                  <ChevronDown className="w-4 h-4" />
                </a>
                <a href="/Mahmoud_Reda_Soltan_CV.pdf" download className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-full font-bold transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 flex items-center gap-2">
                  Download CV
                  <Download className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-4 px-6">
                  <a href="https://github.com/sultan369147" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/mahmoud-reda-soltan" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="relative hidden lg:block pointer-events-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 2 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/20 relative shadow-[16px_16px_0px_0px_rgba(59,130,246,0.3)] bg-black"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Mahmoud Reda Soltan" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="flex items-center gap-2 text-white/80 text-sm font-mono mb-2">
                    <MapPin className="w-4 h-4" /> Damietta, Egypt
                  </div>
                  <div className="text-3xl font-display font-black text-white tracking-tight">
                    Mahmoud R. Soltan
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <WaveBackground />
        </section>

        {/* CSS Marquee Section */}
        <div className="w-full overflow-hidden bg-blue-600 py-4 border-y border-white/10 flex relative z-20">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-white font-display font-bold text-xl tracking-widest uppercase">
            <span>React.js</span> <span className="text-blue-300">✦</span>
            <span>Next.js</span> <span className="text-blue-300">✦</span>
            <span>Node.js</span> <span className="text-blue-300">✦</span>
            <span>Express</span> <span className="text-blue-300">✦</span>
            <span>MongoDB</span> <span className="text-blue-300">✦</span>
            <span>PostgreSQL</span> <span className="text-blue-300">✦</span>
            <span>TypeScript</span> <span className="text-blue-300">✦</span>
            <span>Tailwind CSS</span> <span className="text-blue-300">✦</span>
            <span>Firebase</span> <span className="text-blue-300">✦</span>
            <span>Gemini AI</span> <span className="text-blue-300">✦</span>
            {/* Duplicate for infinite effect */}
            <span>React.js</span> <span className="text-blue-300">✦</span>
            <span>Next.js</span> <span className="text-blue-300">✦</span>
            <span>Node.js</span> <span className="text-blue-300">✦</span>
            <span>Express</span> <span className="text-blue-300">✦</span>
            <span>MongoDB</span> <span className="text-blue-300">✦</span>
            <span>PostgreSQL</span> <span className="text-blue-300">✦</span>
            <span>TypeScript</span> <span className="text-blue-300">✦</span>
            <span>Tailwind CSS</span> <span className="text-blue-300">✦</span>
            <span>Firebase</span> <span className="text-blue-300">✦</span>
            <span>Gemini AI</span> <span className="text-blue-300">✦</span>
          </div>
        </div>

        {/* About & Education Section */}
        <section id="about" className="py-24 px-6 bg-[var(--color-surface)] relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-16"
            >
              <div>
                <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
                  About Me
                </motion.h2>
                <motion.p variants={fadeIn} className="text-gray-400 leading-relaxed mb-6 text-lg">
                  With over a year of professional experience at Macsoft, I specialize in building scalable, high-performance web applications using React, Next.js, Node.js, and Express.js.
                </motion.p>
                <motion.p variants={fadeIn} className="text-gray-400 leading-relaxed text-lg">
                  I have a strong focus on clean architecture, performance optimization, and user-centered UI/UX. I'm also experienced in developing modern, AI-integrated systems and collaborating with cross-functional teams to deliver reliable, production-ready solutions.
                </motion.p>
              </div>
              
              <div>
                <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
                  Education
                </motion.h2>
                <motion.div 
                  variants={fadeIn} 
                  whileHover={{ x: 4, y: -4, boxShadow: "-8px 8px 0px 0px rgba(59,130,246,0.5)" }}
                  className="bg-black/50 border-2 border-white/10 rounded-2xl p-8 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Bachelor of Science in Physics and Computer Science</h3>
                      <p className="text-blue-400 font-medium mt-1">Al-Azhar University</p>
                    </div>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-gray-300 border border-white/10">Class of 2025</span>
                  </div>
                  <div className="space-y-2 text-gray-400 mt-6">
                    <p><strong className="text-gray-300">Faculty:</strong> Science</p>
                    <p><strong className="text-gray-300">Major:</strong> Physics and Computer Science</p>
                    <p><strong className="text-gray-300">Grade:</strong> Very Good</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-[var(--color-background)] border-y border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Featured Projects</h2>
                <p className="text-gray-400 text-lg max-w-2xl">A selection of enterprise systems and AI-powered applications I've built.</p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {projectsData.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Technical Arsenal Section */}
        <section id="skills" className="py-24 px-6 bg-[var(--color-surface)] relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Technical Arsenal</h2>
              <p className="text-gray-400 text-lg mb-8">
                {isInteractiveMode ? "Interact with my skills! Drag and explore the network." : "The technologies and tools I use to build robust digital products."}
              </p>
              
              <div className="flex items-center justify-center mt-8">
                <div className="bg-black/50 border border-white/10 p-1.5 rounded-full flex items-center relative">
                  <div 
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 border border-white/10 rounded-full transition-all duration-300 ease-out ${isInteractiveMode ? 'left-1.5' : 'left-[calc(50%+4px)]'}`}
                  />
                  <button
                    onClick={() => setIsInteractiveMode(true)}
                    className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${isInteractiveMode ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Cpu className="w-4 h-4" /> Interactive
                  </button>
                  <button
                    onClick={() => setIsInteractiveMode(false)}
                    className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${!isInteractiveMode ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Layout className="w-4 h-4" /> Grid
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              {isInteractiveMode ? (
                <SkillGraph />
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Frontend",
                      icon: <Layout className="w-6 h-6" />,
                      colorClasses: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", glow: "bg-blue-500/20", hoverColor: "rgba(59,130,246,1)" },
                      skills: [
                        { name: "React.js", icon: <Atom className="w-4 h-4" /> },
                        { name: "Next.js", icon: <FileCode2 className="w-4 h-4" /> },
                        { name: "TypeScript", icon: <FileType2 className="w-4 h-4" /> },
                        { name: "Tailwind CSS", icon: <Palette className="w-4 h-4" /> },
                        { name: "Bootstrap", icon: <LayoutTemplate className="w-4 h-4" /> },
                        { name: "React Query", icon: <Zap className="w-4 h-4" /> },
                        { name: "Redux", icon: <Box className="w-4 h-4" /> }
                      ]
                    },
                    {
                      title: "Backend",
                      icon: <Server className="w-6 h-6" />,
                      colorClasses: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", glow: "bg-emerald-500/20", hoverColor: "rgba(16,185,129,1)" },
                      skills: [
                        { name: "Node.js", icon: <Server className="w-4 h-4" /> },
                        { name: "Express.js", icon: <Layers className="w-4 h-4" /> },
                        { name: "RESTful APIs", icon: <Globe className="w-4 h-4" /> },
                        { name: "JavaScript (ES6+)", icon: <FileCode2 className="w-4 h-4" /> }
                      ]
                    },
                    {
                      title: "Database",
                      icon: <Database className="w-6 h-6" />,
                      colorClasses: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", glow: "bg-purple-500/20", hoverColor: "rgba(168,85,247,1)" },
                      skills: [
                        { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
                        { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
                        { name: "Firebase", icon: <Cloud className="w-4 h-4" /> },
                        { name: "Supabase", icon: <Database className="w-4 h-4" /> },
                        { name: "Prisma", icon: <Layers className="w-4 h-4" /> },
                        { name: "Mongoose", icon: <Box className="w-4 h-4" /> }
                      ]
                    },
                    {
                      title: "AI & Tools",
                      icon: <Cpu className="w-6 h-6" />,
                      colorClasses: { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400", glow: "bg-pink-500/20", hoverColor: "rgba(236,72,153,1)" },
                      skills: [
                        { name: "OpenAI API", icon: <Cpu className="w-4 h-4" /> },
                        { name: "Gemini AI", icon: <Sparkles className="w-4 h-4" /> },
                        { name: "Sanity CMS", icon: <LayoutTemplate className="w-4 h-4" /> },
                        { name: "Stripe", icon: <CreditCard className="w-4 h-4" /> },
                        { name: "Git", icon: <GitBranch className="w-4 h-4" /> }
                      ]
                    }
                  ].map((category, i) => (
                    <motion.div
                      key={category.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }
                      }}
                      whileHover={{ 
                        y: -8, 
                        boxShadow: `8px 8px 0px 0px ${category.colorClasses.hoverColor}`,
                        borderColor: category.colorClasses.hoverColor
                      }}
                      className="group bg-black border-2 border-white/10 rounded-2xl p-8 transition-all duration-300 flex flex-col h-full relative z-10 overflow-hidden"
                    >
                      <div className={`absolute top-0 right-0 w-64 h-64 ${category.colorClasses.glow} rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-500 group-hover:opacity-100 opacity-50`} />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`p-4 ${category.colorClasses.bg} rounded-2xl border ${category.colorClasses.border} ${category.colorClasses.text}`}>
                            {category.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white font-display">{category.title}</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mt-auto">
                          {category.skills.map(skill => (
                            <div key={skill.name} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-default shadow-sm group/skill">
                              <div className={`${category.colorClasses.text} opacity-70 group-hover/skill:opacity-100 transition-opacity`}>
                                {skill.icon}
                              </div>
                              <span className="font-medium text-sm">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-black relative overflow-hidden z-20">
          <StarfieldBackground />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.15),transparent_50%)] z-10" />
          
          <div className="max-w-4xl mx-auto relative z-20 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter">
                Let's build something <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">extraordinary.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: "6px 6px 0px 0px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:sultan369147@gmail.com" 
                  className="px-8 py-4 bg-white text-black border-2 border-white rounded-full font-bold transition-all flex items-center gap-3 w-full sm:w-auto justify-center text-lg"
                >
                  <Mail className="w-5 h-5" />
                  Say Hello
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: "6px 6px 0px 0px rgba(59,130,246,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+201063402361" 
                  className="px-8 py-4 bg-black text-white border-2 border-blue-500 rounded-full font-bold transition-all flex items-center gap-3 w-full sm:w-auto justify-center text-lg"
                >
                  <Phone className="w-5 h-5" />
                  +20 106 340 2361
                </motion.a>
              </div>
              
              <div className="flex items-center justify-center gap-8">
                <motion.a whileHover={{ y: -5 }} href="https://github.com/sultan369147" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors flex flex-col items-center gap-2">
                  <Github className="w-8 h-8" />
                  <span className="text-xs font-mono uppercase tracking-widest">GitHub</span>
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="https://linkedin.com/in/mahmoud-reda-soltan" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors flex flex-col items-center gap-2">
                  <Linkedin className="w-8 h-8" />
                  <span className="text-xs font-mono uppercase tracking-widest">LinkedIn</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/10 bg-black relative z-20">
        <p className="text-gray-500 text-sm font-mono">
          © {new Date().getFullYear()} Mahmoud Reda Soltan. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
