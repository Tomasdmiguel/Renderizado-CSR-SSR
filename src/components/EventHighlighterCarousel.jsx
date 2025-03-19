"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const EventHighlighterCarousel = ({ characters, title}) => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || characters.length === 0) return;

    const cardWidth = scrollContainer.firstChild?.offsetWidth + 24; // width + gap
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const interval = setInterval(() => {
      if (scrollPosition >= maxScroll) {
        setScrollPosition(0);
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const newPosition = scrollPosition + cardWidth;
        setScrollPosition(newPosition);
        scrollContainer.scrollTo({ left: newPosition, behavior: "smooth" });
      }
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [scrollPosition, characters.length]);

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="md:text-4xl text-2xl font-bold mb-6 text-[#30364C]">
        {title}
      </h2>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
      >
        {characters.map((char) => (
          <div key={char.id} className="min-w-[250px] w-2/5 md:min-w-[350px] flex-shrink-0">
            <div className="rounded-2xl overflow-hidden relative">
              <Image
                src={char.image}
                alt={char.name}
                width={200}
                height={160}
                className="w-full md:h-48 h-40 object-cover"
              />
              <span className="absolute top-2 right-2 md:hidden bg-[#C1FF71] text-[#30364C] md:text-sm text-xs font-semibold font-metropolis px-4 py-2 rounded-full">
                {char.species}
              </span>
            </div>
            <div className="mt-4 shadow-xl rounded-3xl p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="md:text-xl text-sm font-bold text-gray-800">
                    {char.name}
                  </h3>
                  <p className="md:text-sm text-xs text-gray-600 mt-1">
                    {char.species}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default EventHighlighterCarousel;
