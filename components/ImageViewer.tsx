import React, { useEffect } from 'react';
import { X, ExternalLink, Info } from 'lucide-react';
import { ArtWork } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageViewerProps {
  artwork: ArtWork | null;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ artwork, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [artwork]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-50 bg-black/20 rounded-full backdrop-blur-md"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <div
            className="relative w-full h-full flex flex-col items-center justify-center max-w-7xl mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent click through to background
          >
            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full flex-1 flex items-center justify-center overflow-hidden"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-h-full max-w-full object-contain shadow-2xl rounded-sm"
              />
            </motion.div>

            {/* Info Panel (Bottom) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full mt-4 md:mt-6 text-left max-w-2xl px-2"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                  {artwork.title}
                </h2>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 border border-white/20 px-2 py-1 rounded-full">
                  {artwork.category}
                </span>
              </div>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                {artwork.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageViewer;