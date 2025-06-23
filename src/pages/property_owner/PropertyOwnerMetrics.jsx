import React, {useState} from 'react';

import PropertyMetricsTable
  from '../../components/property_owner/PropertyMetricsTable';
import MemberRatings from '../../components/property_owner/MemberRatings';
import Occupancy from '../../components/property_owner/Occupancy';
import Tenure from '../../components/property_owner/Tenure';
import TimeToFlip from '../../components/property_owner/TimeToFlip';
import PendingRooms from '../../components/property_owner/PendingRooms';
import Listing from '../../components/property_owner/Listing';
import Downloads from '../../components/property_owner/Downloads';

const mockData = [
  {
    id: 1,
    name: 'Arlington Heights, VA',
    metrics: [8.6, 2.1, 6.2, 5.8, 2.4, 8.9], // strong ROI, low risk
  },
  {
    id: 2,
    name: 'Richmond Downtown, VA',
    metrics: [7.2, 3.5, 5.1, 4.9, 3.3, 7.5], // mid ROI, slightly higher risk
  },
  {
    id: 3,
    name: 'Virginia Beach Oceanfront, VA',
    metrics: [8.8, 1.9, 6.8, 6.3, 2.1, 9.2], // tourist zone, high score
  },
  {
    id: 4,
    name: 'Charlottesville Historic District, VA',
    metrics: [7.5, 2.8, 5.7, 4.4, 2.9, 7.8],
  },
  {
    id: 5,
    name: 'Norfolk Ghent Area, VA',
    metrics: [6.9, 3.2, 4.9, 3.8, 3.7, 6.5],
  },
  {
    id: 6,
    name: 'Fairfax Suburbs, VA',
    metrics: [8.1, 2.0, 6.1, 5.7, 2.3, 8.7],
  },
];

const itemsPerPage = 3;

const PropertyOwnerMetrics = () => {
  const [search, setSearch] = useState ('');
  const [sortColumn, setSortColumn] = useState (null);
  const [sortOrder, setSortOrder] = useState ('asc');
  const [currentPage, setCurrentPage] = useState (1);
  const [filter, setFilter] = useState ('property_scores');

  const handleSearch = e => {
    setSearch (e.target.value);
    setCurrentPage (1);
  };

  const handleSort = index => {
    if (sortColumn === index) {
      setSortOrder (sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn (index);
      setSortOrder ('asc');
    }
  };

  const filteredData = mockData.filter (item =>
    item.name.toLowerCase ().includes (search.toLowerCase ())
  );

  const sortedData = [...filteredData].sort ((a, b) => {
    if (sortColumn === null) return 0;
    const valA = sortColumn === 'name' ? a.name : a.metrics[sortColumn];
    const valB = sortColumn === 'name' ? b.name : b.metrics[sortColumn];

    if (typeof valA === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare (valB)
        : valB.localeCompare (valA);
    } else {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
  });

  const totalPages = Math.ceil (sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice (startIndex, startIndex + itemsPerPage);

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage (page);
    }
  };

  const tabs = [
    {label: 'Property Scores', value: 'property_scores'},
    {label: 'Members Rating', value: 'members_rating'},
    {label: 'Occupancy', value: 'occupancy'},
    {label: 'Tenure', value: 'tenure'},
    {label: 'Time to Flip', value: 'time_to_flip'},
    {label: 'Pending Rooms', value: 'pending_rooms'},
    {label: 'Listing', value: 'listing'},
    {label: 'Downloads', value: 'downloads'},
  ];

  return (
    <section className="w-full">
      <div className="w-full grid grid-cols-8 gap-2 mb-4">
        {tabs.map ((b, index) => (
          <button
            onClick={() => setFilter (b.value)}
            className={`w-full p-3 rounded-lg text-sm font-medium cursor-pointer ${filter === b.value ? 'bg-accent_blue text-white' : 'text-zinc-600 bg-white'}`}
            key={index}
          >
            {b.label}
          </button>
        ))}
      </div>

      {filter === 'property_scores' &&
        <PropertyMetricsTable
          currentData={currentData}
          search={search}
          handleSearch={handleSearch}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />}

      {filter === 'members_rating'
        ? <MemberRatings />
        : filter === 'occupancy'
            ? <Occupancy />
            : filter === 'tenure'
                ? <Tenure />
                : filter === 'time_to_flip'
                    ? <TimeToFlip />
                    : filter === 'pending_rooms'
                        ? <PendingRooms />
                        : filter === 'listing'
                            ? <Listing />
                            : filter === 'downloads' ? <Downloads /> : ''}
    </section>
  );
};

export default PropertyOwnerMetrics;
