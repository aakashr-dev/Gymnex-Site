import React, { useState } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { Apple, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const MemberDiet = () => {
  const [loggedMeals, setLoggedMeals] = useState([
    { meal: 'Meal 1 - Breakfast', name: '6 Whole Eggs, 100g Oats, Blueberries', calories: '750 kcal', p: '52g' },
    { meal: 'Meal 2 - Post-Workout', name: '2 Scoops Whey Isolate, 80g Cream of Rice', calories: '580 kcal', p: '50g' }
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogMeal = (e) => {
    e.preventDefault();
    setLoggedMeals([...loggedMeals, { meal: 'Meal 3 - Dinner', name: '250g Sirloin Steak, Jasmine Rice', calories: '820 kcal', p: '65g' }]);
    toast.success('Meal logged successfully!');
    setModalOpen(false);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">MY NUTRITIONAL PLAN</h1>
            <p className="text-xs text-gray-400">Target Macros: 3,200 kcal | 210g Protein | 350g Carbs | 75g Fat</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} icon={Plus}>
            Log Meal
          </Button>
        </div>

        <div className="space-y-4">
          {loggedMeals.map((m, idx) => (
            <Card key={idx} className="flex items-center justify-between">
              <div>
                <Badge variant="crimson">{m.meal}</Badge>
                <h4 className="text-sm font-bold text-white font-display uppercase mt-1">{m.name}</h4>
                <p className="text-xs text-gray-400">Protein: {m.p}</p>
              </div>
              <span className="text-sm font-bold text-white font-display">{m.calories}</span>
            </Card>
          ))}
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Log Custom Meal">
          <form onSubmit={handleLogMeal} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">Meal Title</label>
              <input type="text" required placeholder="Dinner" className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
            </div>
            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">Calorie Target</label>
              <input type="number" required placeholder="800" className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
            </div>
            <Button variant="primary" size="md" type="submit" className="w-full">
              Confirm Meal Log
            </Button>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};
