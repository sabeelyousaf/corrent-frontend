import React from 'react';

const evictionRooms = []; // Add entries if needed in future

const pendingRoomTickets = [
  {
    id: 'EV902',
    address: '8307 Riverside Dr, Richmond, VA',
    rooms: 1,
    daysInFlip: 123,
    missedRevenue: 1200,
  },
  {
    id: 'VB778',
    address: '2320 Pacific Ave, Virginia Beach, VA',
    rooms: 2,
    daysInFlip: 192,
    missedRevenue: 2150,
  },
  {
    id: 'AR660',
    address: '1755 Clarendon Blvd, Arlington, VA',
    rooms: 3,
    daysInFlip: 150,
    missedRevenue: 2750,
  },
];

const PendingRooms = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Pending Rooms</h2>

      <div className="w-full rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold">Room In Eviction</h3>
        <div className="w-full h-[80px] bg-red-100 rounded-lg flex items-center justify-center mt-2">
          <p className="font-medium">
            {evictionRooms.length === 0
              ? 'No Room in Eviction'
              : `${evictionRooms.length} Rooms in Eviction`}
          </p>
        </div>
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
                Days Pending
              </th>
              <th className="text-left text-sm font-medium text-white p-4">
                Missed Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingRoomTickets.map ((ticket, index) => (
              <tr key={index} className="border-b border-zinc-200">
                <td className="text-left text-sm font-normal text-zinc-500 p-4">
                  {ticket.id}
                </td>
                <td className="text-left text-sm font-normal text-zinc-500 p-4">
                  {ticket.address}
                </td>
                <td className="text-left text-sm font-normal text-zinc-500 p-4">
                  {ticket.rooms}
                </td>
                <td className="text-left text-sm font-normal text-zinc-500 p-4">
                  {ticket.daysInFlip}
                </td>
                <td className="text-left text-sm font-normal text-zinc-500 p-4">
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

export default PendingRooms;
