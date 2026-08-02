import React, { useState } from 'react';
import { PageTransition, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Modal } from '../../components/ui/UIComponents';
import { Star, Quote, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReviewsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const reviews = [
    {
      name: 'Alexander Wright',
      tier: 'VIP Crimson Member',
      rating: 5,
      comment: 'GYMNEX is hands-down the most incredible athletic facility and software suite I have ever experienced. The periodized workouts from Coach Marcus are unmatched.',
      date: '2 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Elena Rostova',
      tier: 'Pro Performance Member',
      rating: 5,
      comment: 'The cryotherapy lab and seamless QR entry make every visit feel like a 5-star executive hotel experience. Incredible staff.',
      date: '1 month ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    toast.success('Thank you! Your verified review has been submitted for moderation.');
    setModalOpen(false);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <SectionHeader
              eyebrow="Community Voice"
              title="VERIFIED ATHLETE REVIEWS"
              subtitle="Read authentic feedback from high-performance members and luxury facility owners."
            />
            <Button variant="primary" size="md" onClick={() => setModalOpen(true)} icon={Plus} className="mt-4 md:mt-0">
              Submit Review
            </Button>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev, idx) => (
              <StaggerItem key={idx}>
                <Card className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{rev.date}</span>
                  </div>
                  <p className="text-sm text-gray-300 italic leading-relaxed">"{rev.comment}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-display uppercase">{rev.name}</h4>
                      <p className="text-[10px] text-crimson-500 font-semibold">{rev.tier}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Submit Verified Review">
          <form onSubmit={handleSubmitReview} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Your Rating</label>
              <select className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded-xl text-white">
                <option value="5">5 Stars — Flawless</option>
                <option value="4">4 Stars — Great</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Your Review</label>
              <textarea
                rows={4}
                required
                placeholder="Share your experience..."
                className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded-xl text-white placeholder:text-gray-600"
              />
            </div>
            <Button variant="primary" size="md" type="submit" className="w-full">
              Post Review
            </Button>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};
