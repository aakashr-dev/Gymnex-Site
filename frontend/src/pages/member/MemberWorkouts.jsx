import React, { useState } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { Dumbbell, CheckCircle2, Play } from 'lucide-react';
import toast from 'react-hot-toast';

export const MemberWorkouts = () => {
  const [completed, setCompleted] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);

  const exercises = [
    { id: 1, name: 'Barbell Back Squat', sets: 4, reps: '6-8', rest: '180s', video: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Romanian Deadlift', sets: 3, reps: '8-10', rest: '120s', video: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', rest: '90s', video: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Seated Calf Raise', sets: 4, reps: '15-20', rest: '60s', video: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800' }
  ];

  const toggleExercise = (id) => {
    setCompleted({ ...completed, [id]: !completed[id] });
    toast.success('Exercise completed!');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">PRESCRIBED DAILY WORKOUT</h1>
            <p className="text-xs text-gray-400">Titan Hypertrophy — Block 2 (Coach Marcus Vance)</p>
          </div>
          <Badge variant="crimson">Week 4 / Day 1</Badge>
        </div>

        <div className="space-y-4">
          {exercises.map((ex) => (
            <Card key={ex.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${completed[ex.id] ? 'opacity-60 border-emerald-500/40 bg-emerald-500/5' : ''}`}>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleExercise(ex.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    completed[ex.id] ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/20 text-transparent hover:border-crimson-500'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 fill-current" />
                </button>
                <div>
                  <h4 className={`text-lg font-bold font-display uppercase ${completed[ex.id] ? 'line-through text-gray-500' : 'text-white'}`}>{ex.name}</h4>
                  <p className="text-xs text-gray-400">{ex.sets} Sets × {ex.reps} Reps | Rest: {ex.rest}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="glass" size="sm" onClick={() => setActiveVideo(ex)} icon={Play}>
                  Video Guide
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Modal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} title={activeVideo?.name || 'Exercise Guide'}>
          {activeVideo && (
            <div className="space-y-4 text-xs">
              <img src={activeVideo.video} alt={activeVideo.name} className="w-full h-56 rounded-xl object-cover" />
              <p className="text-gray-300">Maintain a neutral spine during setup. Drive through heels and maintain brace.</p>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
};
