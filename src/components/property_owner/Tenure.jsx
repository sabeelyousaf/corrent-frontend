import React from 'react';

const tenureData = [
  {
    address: 'Arlington Heights, VA',
    tenure: 1125,
  },
  {
    address: 'Virginia Beach Oceanfront, VA',
    tenure: 986,
  },
  {
    address: 'Richmond Downtown, VA',
    tenure: 1050,
  },
  {
    address: 'Charlottesville Historic District, VA',
    tenure: 1193,
  },
  {
    address: 'Fairfax Suburbs, VA',
    tenure: 1082,
  },
];

const Tenure = () => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold">Tenure</h2>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="w-full bg-white rounded-lg p-4">
          <span className="text-sm font-medium text-zinc-600">
            Property Tenure
          </span>
          <p className="text-2xl font-semibold">1047 Days</p>
          <p className="text-sm text-zinc-600">
            This is, on average, how long a member stays within an Owner’s Portfolio.
          </p>
        </div>

        <div className="w-full bg-white rounded-lg p-4">
          <span className="text-sm font-medium text-zinc-600">
            Average Property Age
          </span>
          <p className="text-2xl font-semibold">1065 Days</p>
          <p className="text-sm text-zinc-600">
            This is, on average, how long a property is listed on our platform.
          </p>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">Tenure By Properties</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-sm font-semibold text-accent_blue text-left py-2">
                Address
              </th>
              <th className="text-sm font-semibold text-accent_blue text-left py-2">
                Average Tenure (Days)
              </th>
            </tr>
          </thead>
          <tbody>
            {tenureData.map ((property, index) => (
              <tr key={index}>
                <td className="text-sm text-zinc-600 text-left py-2">
                  {property.address}
                </td>
                <td className="text-sm text-zinc-600 text-left py-2">
                  {property.tenure}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Tenure;
