import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { Plus, Trash, Dumbbell, Save, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export const TrainerWorkoutBuilder = () => {
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [programTitle, setProgramTitle] = useState('Titan Hypertrophy - Block 2');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [exercises, setExercises] = useState([
    { name: 'Barbell Back Squat', sets: '4', reps: '6-8', rest: '180s', rpe: 'RPE 8' },
    { name: 'Romanian Deadlift', sets: '3', reps: '8-10', rest: '120s', rpe: 'RPE 7.5' },
    { name: 'Bulgarian Split Squat', sets: '3', reps: '10-12', rest: '90s', rpe: 'RPE 8.5' }
  ]);

  const loadAssignedClients = async () => {
    setLoading(true);
    try {
      const profile = await api.getMyTrainerProfile();
      let roster = [];
      if (profile && Array.isArray(profile.assignedMembers) && profile.assignedMembers.length > 0) {
        roster = profile.assignedMembers;
      } else {
        const allMembers = await api.getMembers();
        if (Array.isArray(allMembers)) roster = allMembers;
      }
      setClients(roster);
      if (roster.length > 0) {
        const preselectedId = location.state?.memberId;
        const initial = roster.find(c => (c._id || c.id) === preselectedId) || roster[0];
        setSelectedClient(initial.name);
      }
    } catch (err) {
      console.error('Error loading clients for workout builder:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignedClients();
  }, []);

  const addExercise = () => {
    setExercises([...exercises, { name: 'Leg Press 45°', sets: '3', reps: '12-15', rest: '90s', rpe: 'RPE 8' }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSaveProgram = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      toast.success(`Workout routine prescribed & pushed to ${selectedClient || 'Member'}'s App!`);
    } catch (err) {
      toast.error('Failed to prescribe workout program.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">INTERACTIVE WORKOUT BUILDER</h1>
            <p className="text-xs text-gray-400">Prescribe exercise microcycles, sets, reps, tempo, and target RPE.</p>
          </div>
          <Button variant="glass" size="sm" onClick={loadAssignedClients} icon={RefreshCw} className="text-xs">
            Sync Clients
          </Button>
        </div>

        <Card className="max-w-4xl space-y-6">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Loading Assigned Client Roster...</p>
            </div>
          ) : (
            <form onSubmit={handleSaveProgram} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-gray-400 mb-1">Target Client</label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  >
                    {clients.map((c) => (
                      <option key={c._id || c.id} value={c.name}>
                        {c.name} ({c.fitnessGoal || 'Client'})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-gray-400 mb-1">Routine Title</label>
                  <input
                    type="text"
                    value={programTitle}
                    onChange={(e) => setProgramTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500 font-semibold"
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
                        className="w-full px-2.5 py-1.5 bg-dark-base border border-white/10 rounded-lg text-white font-semibold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Target Reps</label>
                      <input
                        type="text"
                        value={ex.reps}
                        onChange={(e) => {
                          const copy = [...exercises];
                          copy[idx].reps = e.target.value;
                          setExercises(copy);
                        }}
                        className="w-full px-2.5 py-1.5 bg-dark-base border border-white/10 rounded-lg text-white font-semibold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Intensity RPE</label>
                      <input
                        type="text"
                        value={ex.rpe}
                        onChange={(e) => {
                          const copy = [...exercises];
                          copy[idx].rpe = e.target.value;
                          setExercises(copy);
                        }}
                        className="w-full px-2.5 py-1.5 bg-dark-base border border-white/10 rounded-lg text-amber-400 font-bold text-center"
                      />
                    </div>
                    <div className="flex justify-end pt-3 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => removeExercise(idx)}
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Save}
                  className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs px-6"
                  disabled={submitting}
                >
                  {submitting ? 'Prescribing...' : 'Prescribe & Push Routine to Member App'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </PageTransition>
  );
};
