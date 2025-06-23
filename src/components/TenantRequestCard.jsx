import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TenantRequestCard = ({ room }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden shadow mb-4">
      {/* Collapsed Header */}
      <div
        className="flex items-center justify-between bg-zinc-100 px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <input type="checkbox" />
          <span className="font-semibold">{room.title}</span>
          <span className="text-zinc-500">{room.location}</span>
          <span className="text-zinc-600 font-medium">${room.price}</span>
        </div>

        <div className="flex items-center gap-4">
          <span>{room.tenant}</span>
          <span>{room.date}</span>
          <span className="text-blue-500">{room.status}</span>
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="bg-white p-4 grid grid-cols-3 gap-6">
          {/* Room Image */}
          <div className="col-span-1">
            <img src={room.image} alt="room" className="rounded-lg w-full object-cover" />
            <div className="mt-2 flex gap-2 text-sm text-zinc-600">
              <span>👥 {room.tenants}</span>
              <span>📐 {room.area}</span>
              <span>🛏 {room.beds}</span>
            </div>
          </div>

          {/* Room Details */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-semibold">{room.fullTitle}</h4>
              <p className="text-sm text-zinc-500">{room.subtitle}</p>
              <div className="flex gap-8 mt-2 text-sm">
                <span>Joined: <strong>{room.joined}</strong></span>
                <span>Tenants Hosted: <strong>{room.hosted}</strong></span>
              </div>

              <div className="mt-4">
                <h5 className="font-semibold">Tenant Message:</h5>
                <p className="text-sm text-zinc-600 line-clamp-3">{room.message}</p>
                <button className="text-blue-500 text-sm mt-1">Read More</button>
              </div>
            </div>

            <button className="btn mt-4 self-start bg-red-500 text-white px-4 py-2 rounded">
              Cancel Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantRequestCard;
