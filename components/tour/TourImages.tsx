import Image from "next/image";

const TourImages = ({ images }: { images: string[] }) => {
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
    <div className="w-full space-y-3">
      
      <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden">
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
              className="relative w-full aspect-square rounded-lg overflow-hidden"
              role="listitem"
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
  );
};

export default TourImages;