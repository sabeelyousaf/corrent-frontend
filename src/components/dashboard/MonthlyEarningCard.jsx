import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "S", value: 10 },
    { name: "M", value: 20 },
    { name: "T", value: 25 },
    { name: "W", value: 32 },
    { name: "T", value: 32 },
    { name: "F", value: 42 },
    { name: "S", value: 45 },
];

const MonthlyEarningCard = () => {
    return (
        <div className="w-full h-[185px] p-4 rounded-md bg-white shadow-sm">
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm font-medium text-gray-800">Monthly Earnings</h2>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">$1,508.22</div>

            <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00bfff" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#00bfff" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
                    <YAxis
                        domain={[0, 50]}
                        ticks={[10, 20, 30, 40, 50]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        width={28}
                    />
                    <CartesianGrid horizontal={false} vertical={false} />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#00bfff"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyEarningCard;
