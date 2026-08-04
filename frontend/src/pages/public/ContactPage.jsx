import React, { useState } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { Mail, Phone, MapPin, MessageSquare, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const faqs = [
    { q: 'How do I access the gym after hours?', a: 'VIP Crimson and Black Executive members receive 24/7 access using the GYMNEX Mobile App QR Pass at our turnstile scanners.' },
    { q: 'Can I pause my membership when traveling?', a: 'Yes! Memberships can be paused for up to 90 days per year via your Member Dashboard settings.' },
    { q: 'Are personal training sessions included?', a: 'Crimson Elite passes include 2 monthly sessions, and VIP Black includes unlimited 1-on-1 coaching.' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitContact(formData);
      toast.success('Message sent! Our concierges will respond shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to submit message.');
    }
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="24/7 Concierge"
            title="GET IN TOUCH WITH GYMNEX"
            subtitle="Our support concierges and facility directors are available 24/7 worldwide."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="space-y-6">
              <h3 className="text-xl font-bold text-white font-display uppercase">Direct Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 uppercase font-semibold mb-1">Your Full Name</label>
                  <input type="text" required placeholder="Alexander Wright" className="w-full px-3.5 py-2.5 bg-dark-base border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 uppercase font-semibold mb-1">Email Address</label>
                  <input type="email" required placeholder="alex@example.com" className="w-full px-3.5 py-2.5 bg-dark-base border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 uppercase font-semibold mb-1">Message / Inquiry</label>
                  <textarea rows={4} required placeholder="How can we assist your training goals..." className="w-full px-3.5 py-2.5 bg-dark-base border border-white/10 rounded-xl text-white" />
                </div>
                <Button variant="primary" size="md" type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* FAQ Accordion & Contact Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white font-display uppercase">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-dark-card border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-white uppercase font-display"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-crimson-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-4 pb-4 text-xs text-gray-400 border-t border-white/5 pt-3 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
