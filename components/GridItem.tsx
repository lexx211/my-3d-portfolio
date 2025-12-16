import React from 'react';
import { ArtWork } from '../types';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

interface GridItemProps {
  artwork: ArtWork;
  onClick: (artwork: ArtWork) => void;
  index: number;
}

const GridItem: React.FC<GridItemProps> = ({ artwork, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-gray-900 cursor-pointer rounded-sm"
      onClick={() => onClick(artwork)}
    >
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {artwork.title}
        </h3>
        <p className="text-white/60 text-xs uppercase tracking-wider mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {artwork.category}
        </p>
      </div>

      {/* Mobile Icon Indicator (since hover isn't great on mobile) */}
      <div className="absolute top-2 right-2 md:hidden opacity-50 bg-black/30 p-1.5 rounded-full backdrop-blur-sm">
        <Maximize2 size={12} className="text-white" />
      </div>
    </motion.div>
  );
};

export default GridItem;