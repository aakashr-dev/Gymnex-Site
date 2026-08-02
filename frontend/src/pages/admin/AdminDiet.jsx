import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { Apple, Plus } from 'lucide-react';

export const AdminDiet = () => {
  const templates = [
    { title: 'HYPERTROPHY HIGH PROTEIN BULK', calories: '3,800 kcal', macros: '240g P | 420g C | 80g F', tag: 'Muscle Gain' },
    { title: 'METABOLIC AGGRESSIVE CUT', calories: '2,100 kcal', macros: '210g P | 150g C | 55g F', tag: 'Fat Loss' },
    { title: 'KETOGENIC ENDURANCE PROTOCOL', calories: '2,600 kcal', macros: '180g P | 30g C | 190g F', tag: 'Keto' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">NUTRITION & DIET TEMPLATES</h1>
            <p className="text-xs text-gray-400">Prescribed nutritional macro templates for coaches to assign to members.</p>
          </div>
          <Button variant="primary" size="sm" icon={Plus}>Create Template</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl, i) => (
            <Card key={i} className="space-y-3">
              <Badge variant="crimson">{tpl.tag}</Badge>
              <h3 className="text-base font-bold text-white font-display uppercase">{tpl.title}</h3>
              <p className="text-2xl font-black text-white font-display">{tpl.calories}</p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                {tpl.macros}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
