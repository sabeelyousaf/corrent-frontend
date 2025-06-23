import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {name: 'Jan', value: 30000},
  {name: 'Feb', value: 15000},
  {name: 'Mar', value: 25000},
  {name: 'Apr', value: 50000},
  {name: 'May', value: 35000},
  {name: 'Jun', value: 45000},
];

const CustomDot = props => {
  const {cx, cy} = props;
  return (
    <circle cx={cx} cy={cy} r={6} stroke="black" strokeWidth={2} fill="white" />
  );
};

const flipTickets = [
  {
    id: 'VB102',
    address: '5407 Atlantic Ave, Virginia Beach, VA',
    rooms: 3,
    daysInFlip: 212,
    missedRevenue: 3200,
  },
  {
    id: 'AR134',
    address: '1200 N Garfield St, Arlington, VA',
    rooms: 2,
    daysInFlip: 187,
    missedRevenue: 2800,
  },
  {
    id: 'RC301',
    address: '315 W Broad St, Richmond, VA',
    rooms: 4,
    daysInFlip: 245,
    missedRevenue: 4100,
  },
  {
    id: 'FF233',
    address: '8400 Oak Chase Cir, Fairfax, VA',
    rooms: 2,
    daysInFlip: 198,
    missedRevenue: 2650,
  },
];

const TimeToFlip = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Time to Flip</h2>
        <div className="w-full bg-white rounded-lg p-4 flex flex-col justify-center items-center gap-2">
          <span className="text-sm font-medium text-zinc-700">
            Average Days to Flip
          </span>
          <p className="text-2xl font-semibold">1024 Days</p>
        </div>
      </div>

      <div className="w-full h-[400px] bg-white rounded-lg p-4">
        <div className="flex justify-between items-start mb-4">
          <span className="text-md font-semibold">Average Days to Flip</span>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium">
            View Outstanding Tickets
          </button>
        </div>

        <ResponsiveContainer width="95%" height="90%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={val => `${val / 1000}K`} />
            <Tooltip formatter={value => [`${value}`, 'Days']} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#colorStroke)"
              strokeWidth={2}
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full bg-white rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-accent_blue rounded-t-lg overflow-hidden">
              <th className="text-left text-sm font-medium text-white p-4">
                Ticket ID
              </th>
              <th className="text-left text-sm font-medium text-white p-4">
                Address
              </th>
              <th className="text-left text-sm font-medium text-white p-4">
                Rooms
              </th>
              <th className="text-left text-sm font-medium text-white p-4">
                Days In Flip
              </th>
              <th className="text-left text-sm font-medium text-white p-4">
                Missed Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {flipTickets.map ((ticket, index) => (
              <tr key={index} className="border-b border-zinc-200">
                <td className="text-left text-sm text-zinc-500 p-4">
                  {ticket.id}
                </td>
                <td className="text-left text-sm text-zinc-500 p-4">
                  {ticket.address}
                </td>
                <td className="text-left text-sm text-zinc-500 p-4">
                  {ticket.rooms}
                </td>
                <td className="text-left text-sm text-zinc-500 p-4">
                  {ticket.daysInFlip}
                </td>
                <td className="text-left text-sm text-zinc-500 p-4">
                  ${ticket.missedRevenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TimeToFlip;
