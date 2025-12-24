import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  onReset: () => void;
}

const data = [
  { name: 'Principal', value: 85 },
  { name: 'Interest', value: 15 },
];

const COLORS = ['#4f46e5', '#e0e7ff'];

export const SuccessStep: React.FC<Props> = ({ onReset }) => {
  return (
    <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
      <div className="flex justify-center">
        <div className="bg-green-100 p-6 rounded-full animate-bounce">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Application Submitted!</h2>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
          Your loan application ID is <span className="font-mono text-indigo-600 font-bold">#ER-9823</span>. 
          Our team will visit you as scheduled.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-w-xs mx-auto">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Estimated Repayment Split</h4>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs mt-2">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> Principal</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-100"></div> Interest</div>
          </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
      >
        Start New Application <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};