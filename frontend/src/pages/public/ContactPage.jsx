import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageTransition } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge, AtmosphericBackground } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { Mail, Phone, MapPin, MessageSquare, ChevronDown, User, Send, ShieldCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const selectedPlanParam = searchParams.get('plan') || searchParams.get('domain') || '';

  const [openFaq, setOpenFaq] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    email: '',
    phone: '',
    domain: 'Hypertrophy & Bodybuilding Program',
    message: ''
  });

  useEffect(() => {
    if (selectedPlanParam) {
      setFormData((prev) => ({
        ...prev,
        domain: selectedPlanParam
      }));
    }
  }, [selectedPlanParam]);

  const programDomains = [
    'Hypertrophy & Bodybuilding Program',
    'HIIT & Cardio Conditioning Program',
    'Strength & Powerlifting Program',
    'Olympic Weightlifting Masterclass',
    'Recovery & Cryotherapy Vault',
    'Boxing & Combat Conditioning',
    'General Fitness & Wellness Inquiry'
  ];

  const faqs = [
    { q: 'How do I access the gym after hours?', a: 'VIP Crimson and Black Executive members receive 24/7 access using the GYMNEX Mobile App QR Pass at our turnstile scanners.' },
    { q: 'Can I pause my membership when traveling?', a: 'Yes! Memberships can be paused for up to 90 days per year via your Member Dashboard settings.' },
    { q: 'Are personal training sessions included?', a: 'Crimson Elite passes include 2 monthly sessions, and VIP Black includes unlimited 1-on-1 coaching.' },
    { q: 'How do I select a personal trainer?', a: 'You can choose your preferred trainer from our Master Staff Roster during enrollment or in your Member Hub.' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please complete all required contact fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitContact({
        name: formData.name,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        domain: formData.domain,
        subject: `Inquiry for ${formData.domain}`,
        message: formData.message || `Inquiry for ${formData.domain} by ${formData.name}`
      });

      if (res.success || res.data) {
        toast.success(`Thank you ${formData.name}! Your inquiry for "${formData.domain}" has been received.`);
        setFormData({
          name: '',
          gender: 'Male',
          email: '',
          phone: '',
          domain: 'Hypertrophy & Bodybuilding Program',
          message: ''
        });
      } else {
        toast.error(res.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      toast.error('Failed to submit contact enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen relative overflow-hidden">
        <AtmosphericBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <SectionHeader
            eyebrow="24/7 Concierge & Enrollment"
            title="GET IN TOUCH WITH GYMNEX"
            subtitle="Connect with our facility directors, enroll in training domains, or select your membership plan."
            align="center"
          />

          {selectedPlanParam && (
            <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-between shadow-crimson-glow">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="font-extrabold uppercase text-xs font-display">SELECTED ENROLLMENT PLAN:</p>
                  <p className="text-white font-bold text-sm">{selectedPlanParam}</p>
                </div>
              </div>
              <Badge variant="amber">DIRECT ENROLLMENT</Badge>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Form */}
            <Card className="lg:col-span-7 space-y-6 border-amber-500/30 bg-dark-surface/95 backdrop-blur-xl p-8">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  PROGRAM & ENROLLMENT CONTACT FORM
                </span>
                <h3 className="text-2xl font-black text-white font-display uppercase mt-2">
                  Direct Program & Membership Inquiry
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-300 uppercase font-bold mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Alexander Wright"
                    className="w-full px-4 py-3 bg-dark-card border border-white/15 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Gender & Domain Program Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 uppercase font-bold mb-1.5">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-card border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-amber-400 uppercase font-bold mb-1.5">Select Program / Domain *</label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-card border border-amber-500/40 text-amber-400 font-extrabold rounded-xl focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {programDomains.map((domain, i) => (
                        <option key={i} value={domain} className="bg-dark-card text-white font-semibold">
                          {domain}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 uppercase font-bold mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 bg-dark-card border border-white/15 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 uppercase font-bold mb-1.5">Contact Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2831"
                      className="w-full px-4 py-3 bg-dark-card border border-white/15 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Message Notes */}
                <div>
                  <label className="block text-gray-300 uppercase font-bold mb-1.5">Additional Message / Goals</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your fitness targets, schedule preference, or preferred personal coach..."
                    className="w-full px-4 py-3 bg-dark-card border border-white/15 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors font-sans"
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={submitting}
                  icon={Send}
                  className="w-full bg-amber-500 text-black hover:bg-amber-400 font-extrabold uppercase tracking-wider py-3 shadow-crimson-glow text-xs"
                >
                  {submitting ? 'Submitting Inquiry...' : 'Submit Contact Enquiry'}
                </Button>
              </form>
            </Card>

            {/* Info Panel & FAQs */}
            <div className="lg:col-span-5 space-y-8">
              {/* Concierge Details */}
              <div className="bg-dark-card border border-white/10 rounded-3xl p-6 space-y-4">
                <h4 className="text-base font-extrabold text-white uppercase font-display flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" /> GYMNEX 24/7 Concierge Desk
                </h4>

                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Phone className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="font-bold text-white uppercase text-[10px]">Direct Phone</p>
                      <p className="font-mono text-gray-300">+1 (212) 555-0199</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="font-bold text-white uppercase text-[10px]">Concierge Email</p>
                      <p className="font-mono text-gray-300">concierge@gymnex.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="font-bold text-white uppercase text-[10px]">Flagship Headquarters</p>
                      <p className="text-gray-300">450 Fifth Avenue, Midtown Manhattan, NY</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-display uppercase">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-dark-card border border-white/10 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-white uppercase font-display"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
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

