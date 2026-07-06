"use client";

import { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassMinus, MagnifyingGlassPlus, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
}

export function ProductGallery({
  images,
  fallbackImage,
  productName,
}: {
  images: GalleryImage[];
  fallbackImage: string;
  productName: string;
}) {
  const allImages = images.length > 0 ? images : [{ src: fallbackImage, alt: productName }];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const activeImage = allImages[activeIndex] || allImages[0];

  // Zoom handlers for the lightbox modal
  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale === 1) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const closeZoomModal = () => {
    setIsZoomModalOpen(false);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main image card */}
      <div className="relative group w-full aspect-square bg-white border border-[#D4DFDC] rounded-[8px] shadow-sm flex items-center justify-center overflow-hidden">
        {/* Subtle magnifying glass indicator */}
        <button
          type="button"
          onClick={() => setIsZoomModalOpen(true)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#4A5560] border border-[#D4DFDC] shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Ampliar imagen"
        >
          <MagnifyingGlassPlus size={20} weight="bold" />
        </button>

        {/* Click to open Zoom Lightbox */}
        <div
          onClick={() => setIsZoomModalOpen(true)}
          className="relative w-full h-full cursor-zoom-in overflow-hidden flex items-center justify-center p-6 md:p-8"
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority
            className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 450px"
          />
        </div>
      </div>

      {/* Thumbnails list */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {allImages.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-square bg-white border rounded-[6px] p-2 flex items-center justify-center overflow-hidden transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]",
                  isActive
                    ? "border-[#D6532B] ring-2 ring-[#D6532B]/10"
                    : "border-[#D4DFDC] hover:border-[#4A5560]/50"
                )}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="120px"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Zoom / Lightbox Modal Overlay */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 select-none"
          role="dialog"
          aria-modal="true"
          aria-label={`Visualizador de imagen para ${productName}`}
        >
          {/* Controls header */}
          <div className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-10">
            <span className="text-[12px] font-mono font-bold uppercase tracking-[0.16em] text-white/80">
              {activeImage.alt}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomScale >= 3}
                className="p-2 text-white hover:text-[#D6532B] disabled:opacity-30 transition-colors"
                title="Aumentar zoom"
              >
                <MagnifyingGlassPlus size={24} weight="bold" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomScale <= 1}
                className="p-2 text-white hover:text-[#D6532B] disabled:opacity-30 transition-colors"
                title="Disminuir zoom"
              >
                <MagnifyingGlassMinus size={24} weight="bold" />
              </button>
              <button
                type="button"
                onClick={closeZoomModal}
                className="p-2 text-white hover:text-[#D6532B] transition-colors ml-2"
                title="Cerrar"
              >
                <X size={24} weight="bold" />
              </button>
            </div>
          </div>

          {/* Interactive Zoom Image container */}
          <div
            className={cn(
              "w-full h-full flex items-center justify-center overflow-hidden p-4",
              zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative w-full h-full max-w-[80vw] max-h-[80vh] transition-transform duration-200 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-contain"
                  sizes="80vw"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Help instructions (only visible when zoomed) */}
          {zoomScale > 1 && (
            <div className="absolute bottom-6 bg-black/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none">
              <span className="text-[11px] font-mono font-bold tracking-wider text-white/70">
                Arrastra la imagen para navegar
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
