import React from 'react';

const occupancyData = [
  {
    name: 'Arlington Heights, VA',
    occupancy: '85%',
  },
  {
    name: 'Virginia Beach Oceanfront, VA',
    occupancy: '92%',
  },
  {
    name: 'Richmond Downtown, VA',
    occupancy: '78%',
  },
  {
    name: 'Charlottesville Historic District, VA',
    occupancy: '88%',
  },
  {
    name: 'Norfolk Ghent Area, VA',
    occupancy: '81%',
  },
  {
    name: 'Fairfax Suburbs, VA',
    occupancy: '90%',
  },
];

const Occupancy = () => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-4">Occupancy</h2>
      <div className="w-full bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Properties</h3>
        <table className="w-full mt-2">
          <thead>
            <tr>
              <th className="text-sm font-semibold text-accent_blue text-left p-3">
                Name
              </th>
              <th className="text-sm font-semibold text-accent_blue text-left p-3">
                Occupancy
              </th>
            </tr>
          </thead>
          <tbody>
            {occupancyData.map ((property, index) => (
              <tr key={index}>
                <td className="text-sm text-zinc-600 text-left p-3">
                  {property.name}
                </td>
                <td className="text-sm text-zinc-600 text-left p-3">
                  {property.occupancy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Occupancy;
