import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const foodPollData = [
  { name: 'Good', value: 35 },
  { name: 'Average', value: 15 },
  { name: 'Bad', value: 10 },
];

const COLORS = ['#10b981', '#facc15', '#f87171'];

export default function FoodPollResults() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Food Quality Poll Results</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4">Tenant Feedback</h3>
        <div className="w-full h-72 p-2 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={foodPollData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                innerRadius="40%"
                paddingAngle={3}
              >
                {foodPollData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                className="text-sm md:text-base"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
