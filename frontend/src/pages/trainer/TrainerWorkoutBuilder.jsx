import React, { useState } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { Plus, Trash, Dumbbell, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerWorkoutBuilder = () => {
  const [client, setClient] = useState('Alexander Wright');
  const [programTitle, setProgramTitle] = useState('Titan Hypertrophy - Block 2');
  const [exercises, setExercises] = useState([
    { name: 'Barbell Back Squat', sets: '4', reps: '6-8', rest: '180s', rpe: 'RPE 8' },
    { name: 'Romanian Deadlift', sets: '3', reps: '8-10', rest: '120s', rpe: 'RPE 7.5' },
    { name: 'Bulgarian Split Squat', sets: '3', reps: '10-12', rest: '90s', rpe: 'RPE 8.5' }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: 'Leg Press 45°', sets: '3', reps: '12-15', rest: '90s', rpe: 'RPE 8' }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSaveProgram = (e) => {
    e.preventDefault();
    toast.success(`Workout routine prescribed & pushed to ${client}'s Member App!`);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">INTERACTIVE WORKOUT BUILDER</h1>
          <p className="text-xs text-gray-400">Prescribe exercise microcycles, sets, reps, tempo, and target RPE.</p>
        </div>

        <Card className="max-w-4xl space-y-6">
          <form onSubmit={handleSaveProgram} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase text-gray-400 mb-1">Target Client</label>
                <select
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
                >
                  <option>Alexander Wright</option>
                  <option>Elena Rostova</option>
                  <option>David Chen</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold uppercase text-gray-400 mb-1">Routine Title</label>
                <input
                  type="text"
                  value={programTitle}
                  onChange={(e) => setProgramTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>

            {/* Prescribed Exercise List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase font-display">Prescribed Exercises ({exercises.length})</h4>
                <Button type="button" variant="glass" size="sm" onClick={addExercise} icon={Plus}>
                  Add Exercise
                </Button>
              </div>

              {exercises.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-6 gap-3 items-center">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Exercise Name</label>
                    <input
                      type="text"
                      value={ex.name}
                      onChange={(e) => {
                        const copy = [...exercises];
                        copy[idx].name = e.target.value;
                        setExercises(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-dark-base border border-white/10 rounded-lg text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Sets</label>
                    <input
                      type="text"
                      value={ex.sets}
                      onChange={(e) => {
                        const copy = [...exercises];
                        copy[idx].sets = e.target.value;
                        setExercises(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-dark-base border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Reps Target</label>
                    <input
                      type="text"
                      value={ex.reps}
                      onChange={(e) => {
                        const copy = [...exercises];
                        copy[idx].reps = e.target.value;
                        setExercises(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-dark-base border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Rest</label>
                    <input
                      type="text"
                      value={ex.rest}
                      onChange={(e) => {
                        const copy = [...exercises];
                        copy[idx].rest = e.target.value;
                        setExercises(copy);
                      }}
                      className="w-full px-2.5 py-1.5 bg-dark-base border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-3 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => removeExercise(idx)}
                      className="p-2 text-crimson-500 hover:bg-crimson-500/10 rounded-lg transition-colors ml-auto"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" size="md" type="submit" icon={Save} className="w-full">
              Push Routine to Athlete App
            </Button>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
};
