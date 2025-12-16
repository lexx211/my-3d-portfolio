import React, { useState, useEffect } from 'react';
import { ArtWork } from './types';
import GridItem from './components/GridItem';
import ImageViewer from './components/ImageViewer';
import { Menu, Zap, Box, Layers, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data Generator
const generateArtworks = (): ArtWork[] => {
  const categories = ['Abstract', 'Industrial', 'Character', 'Environment'];
  const titles = [
    'Neon Genesis', 'Void Structure', 'Cyber Organic', 'Chrome Heart',
    'Liquid Metal', 'Neural Net', 'Dark Matter', 'Solar Flare',
    'Quantum Leap', 'Obsidian Tower', 'Silent Echo', 'Prism Break'
  ];

  return Array.from({ length: 12 }).map((_, i) => ({
    id: `art-${i}`,
    title: titles[i] || `Project ${i + 1}`,
    category: categories[i % categories.length],
    // Using picsum to simulate high-quality renders. 
    // We add a random seed to get different images.
    imageUrl: `https://picsum.photos/seed/${i + 135}/800/1000`,
    description: "Rendered in Blender 4.0 using Cycles. Focusing on subsurface scattering and volumetric lighting to create a sense of depth and atmosphere."
  }));
};

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtWork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtWork | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setArtworks(generateArtworks());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu first
    const element = document.getElementById(id);
    if (element) {
      // Offset for the fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const categories = ['All', ...new Set(artworks.map((a) => a.category))];

  const filteredArtworks = filter === 'All' 
    ? artworks 
    : artworks.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-black text-gray-200 selection:bg-white selection:text-black font-sans pb-20">
      
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
          {/* Logo Click scrolls to top (About) */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-black">
              <Box size={20} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-white">
              MY<span className="text-gray-500">PORTFOLIO</span>
            </h1>
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
             <button onClick={() => scrollToSection('work')} className="hover:text-white transition-colors">Work</button>
             <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
             <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 flex flex-col md:hidden"
          >
             <nav className="flex flex-col gap-8 text-center mt-10">
               <button 
                 onClick={() => scrollToSection('work')}
                 className="text-3xl font-light text-white hover:text-gray-400 transition-colors"
               >
                 Work
               </button>
               <button 
                 onClick={() => scrollToSection('about')}
                 className="text-3xl font-light text-white hover:text-gray-400 transition-colors"
               >
                 About
               </button>
               <button 
                 onClick={() => scrollToSection('contact')}
                 className="text-3xl font-light text-white hover:text-gray-400 transition-colors"
               >
                 Contact
               </button>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 md:px-6 pt-32 md:pt-40 relative z-0">
        
        {/* Intro Section (About) */}
        <div id="about" className="mb-12 max-w-2xl scroll-mt-32">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-6">
            Visualizing the <br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">
              Impossible.
            </span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            A collection of 3D explorations, concept art, and digital sculptures. 
            Designed for the future.
          </p>
        </div>

        {/* Filter Tabs & Grid (Work) */}
        <div id="work" className="scroll-mt-32">
          <div className="flex flex-wrap gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
            {filteredArtworks.map((art, index) => (
              <GridItem 
                key={art.id} 
                artwork={art} 
                index={index} 
                onClick={setSelectedArtwork} 
              />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredArtworks.length === 0 && (
            <div className="py-20 text-center text-gray-600">
              <Layers size={48} className="mx-auto mb-4 opacity-20" />
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>

      </main>

      {/* Footer (Contact) */}
      <footer id="contact" className="mt-24 border-t border-white/10 py-12 text-center text-gray-600 text-sm scroll-mt-10">
        <h3 className="text-xl text-white mb-6 font-light">Let's Create Together</h3>
        <p className="mb-8 max-w-md mx-auto">
          Open for commissions and collaborations. <br/>
          <a href="mailto:hello@example.com" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">
            hello@example.com
          </a>
        </p>
        <p>© {new Date().getFullYear()} 3D Design Portfolio.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Zap size={16} /> 
          <span>Built with React & Tailwind</span>
        </div>
      </footer>

      {/* Lightbox / Modal */}
      <ImageViewer 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />
    </div>
  );
};

export default App;