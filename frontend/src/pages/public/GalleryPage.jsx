import React, { useState } from 'react';
import { PageTransition, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Card, Modal } from '../../components/ui/UIComponents';

export const GalleryPage = () => {
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200', title: 'Main Barbell Floor', category: 'Facilities' },
    { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200', title: 'High-Density Interval Sprint', category: 'Action' },
    { url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1200', title: 'Deadlift Competition', category: 'Events' },
    { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200', title: 'Recovery Cold Plunge', category: 'Facilities' },
    { url: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&q=80&w=1200', title: 'Executive Spa Suite', category: 'Facilities' },
    { url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1200', title: 'Master Coach Session', category: 'Action' },
  ];

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Atmosphere"
            title="CINEMATIC VISUAL GALLERY"
            subtitle="Moments of high physical performance captured across our global flagships."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <StaggerItem key={idx}>
                <Card
                  onClick={() => setActiveImage(img)}
                  className="p-0 h-64 overflow-hidden group cursor-pointer border border-white/10 hover:border-crimson-500"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-sm font-bold text-white uppercase font-display">{img.title}</span>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <Modal isOpen={!!activeImage} onClose={() => setActiveImage(null)} title={activeImage?.title || 'Gallery Preview'}>
          {activeImage && (
            <img src={activeImage.url} alt={activeImage.title} className="w-full h-auto rounded-xl" />
          )}
        </Modal>
      </div>
    </PageTransition>
  );
};
