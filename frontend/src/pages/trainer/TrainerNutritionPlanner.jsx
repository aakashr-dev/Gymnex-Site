import React, { useState } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { Apple, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerNutritionPlanner = () => {
  const [calories, setCalories] = useState(3200);
  const [protein, setProtein] = useState(210);
  const [carbs, setCarbs] = useState(350);
  const [fats, setFats] = useState(75);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">NUTRITION & MACRO PLANNER</h1>
          <p className="text-xs text-gray-400">Calculate caloric intake, macronutrient distribution, and meal timelines.</p>
        </div>

        <Card className="max-w-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Calories</p>
              <p className="text-2xl font-extrabold text-white font-display">{calories} kcal</p>
            </div>
            <div className="p-4 rounded-xl bg-crimson-500/10 border border-crimson-500/30">
              <p className="text-[10px] text-crimson-500 font-bold uppercase">Protein</p>
              <p className="text-2xl font-extrabold text-white font-display">{protein}g</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Carbs</p>
              <p className="text-2xl font-extrabold text-white font-display">{carbs}g</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Fats</p>
              <p className="text-2xl font-extrabold text-white font-display">{fats}g</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase text-gray-400 mb-1">Target Caloric Target (kcal)</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white font-bold"
              />
            </div>
            <Button variant="primary" size="md" icon={Save} onClick={() => toast.success('Macro Plan Prescribed!')} className="w-full">
              Assign Nutritional Macros
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
