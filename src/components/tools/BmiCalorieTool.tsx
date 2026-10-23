import React, { useState } from 'react';
import { Activity, Flame, Heart, TrendingUp, Scale } from 'lucide-react';
import { calculateBmiAndBmr } from '../../utils/seo-tools';

export const BmiCalorieTool: React.FC = () => {
  const [weightKg, setWeightKg] = useState<number>(72);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.375); // lightly active

  const health = calculateBmiAndBmr(weightKg, heightCm, age, gender, activity);

  const categoryColor = {
    Underweight: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-300',
    'Normal weight': 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300',
    Overweight: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-300',
    Obese: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-300',
  }[health.category];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Weight (kg)</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="30"
                max="180"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Height (cm)</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min="120"
                max="220"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Age</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{age} yrs</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    gender === 'male'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    gender === 'female'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Weekly Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
            >
              <option value={1.2}>Sedentary (Little or no exercise)</option>
              <option value={1.375}>Lightly active (Exercise 1-3 days/week)</option>
              <option value={1.55}>Moderately active (Exercise 3-5 days/week)</option>
              <option value={1.725}>Very active (Exercise 6-7 days/week)</option>
            </select>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-1">
              <span>Your Body Mass Index</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${categoryColor}`}>
                {health.category}
              </span>
            </div>
            <div className="text-4xl font-extrabold text-white tracking-tight my-1">
              {health.bmi}
              <span className="text-xs font-normal text-indigo-300 ml-2">kg/m²</span>
            </div>

            <div className="mt-5 pt-4 border-t border-indigo-800/60 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-indigo-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Basal BMR</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {health.bmrCalories.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">kcal</span>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-indigo-300 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Daily TDEE</span>
                </div>
                <div className="text-lg font-bold text-emerald-400 mt-1">
                  {health.maintenanceCalories.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">kcal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-800/40 text-[11px] text-indigo-200/80 text-center">
            To lose 0.5kg/week: consume ~{health.maintenanceCalories - 500} kcal/day
          </div>
        </div>
      </div>
    </div>
  );
};
