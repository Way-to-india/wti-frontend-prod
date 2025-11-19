
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const TourImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="relative h-[280px] w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">No images available</p>
      </div>
    );
  }

  const main = images[0];
  const gallery = images.slice(1, 4);
  const extraCount = images.length - 4;

  return (
    <>
      <div className="w-full space-y-3">

        <div
          className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(main)}
        >
          <Image
            src={main}
            alt="Main tour image showing destination highlights"
            fill
            className="object-cover"
            priority
            quality={75}
          />
        </div>


        <div className="grid grid-cols-3 gap-3" role="list" aria-label="Tour gallery">
          {gallery.map((src, idx) => {
            const isLast = idx === 2 && extraCount > 0;
            return (
              <div
                key={idx}
                className="relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer"
                role="listitem"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Tour gallery image ${idx + 2}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                />
                {isLast && (
                  <div
                    className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 flex items-end justify-center pb-2"
                    aria-label={`${extraCount} more images available`}
                  >
                    <span className="text-white font-semibold text-sm sm:text-base">
                      +{extraCount} images
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>


      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>


            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged tour image"
                fill
                className="object-contain"
                quality={90}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TourImages;