import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { userApi } from '../../api/user';

const RoomApplication = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        total: 0
    });

    const roomTypes = [
        { value: '', label: 'All Room Types' },
        { value: 'studio', label: 'Studio' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'private room', label: 'Private Room' }
    ];

    const fetchBookings = async (page = 1, search = '', roomType = '') => {
        setLoading(true);
        try {
            const response = await userApi.mybookings({
                page,
                pageSize: pagination.pageSize,
                search,
                roomType
            });
            
            setBookings(response?.data?.bookings);
            setPagination(prev => ({
                ...prev,
                total: response?.data?.pagination.total,
                page
            }));
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleSearchChange = (e) => {
        setFilterText(e.target.value);
        // Debounce or add a search button for better performance
    };

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
        fetchBookings(1, filterText, e.target.value);
    };

    const handlePageChange = (page) => {
        fetchBookings(page, filterText, selectedRoomType);
    };

    const columns = [
        {
            name: 'Room',
            selector: row => row.roomId?.roomTitle || 'N/A',
            sortable: true,
            cell: row => (
                <div className="flex items-center gap-2">
                    <img 
                        src={row.roomId?.images?.[0] || "https://www.cairnskangarooms.com/wp-content/uploads/2017/08/DUMMY-ROOM-2.jpg"} 
                        alt="room" 
                        width="40" 
                        height="40" 
                        style={{ borderRadius: '5px' }} 
                    />
                    <span>{row.roomId?.roomTitle || 'N/A'}</span>
                </div>
            ),
        },
        {
            name: 'Type',
            selector: row => row.roomId?.roomType || 'N/A',
            sortable: true,
            cell: row => (
                <span className="capitalize">{row.roomId?.roomType || 'N/A'}</span>
            ),
        },
        {
            name: 'Price',
            selector: row => row.roomId?.pricePerMonth || 'N/A',
            sortable: true,
            cell: row => (
                <span>${row.roomId?.pricePerMonth || 'N/A'}/month</span>
            ),
        },
        {
            name: 'Landlord',
            selector: row => row.roomId?.propertyId?.userId?.name || 'N/A',
            sortable: true,
            cell: row => (
                <div className="flex items-center gap-2">
                    <img 
                        src={row.roomId?.propertyId?.createdBy?.avatar?.secure_url || "https://placehold.co/30x30"} 
                        alt={row.roomId?.propertyId?.createdBy?.firstName} 
                        width="30" 
                        height="30" 
                        style={{ borderRadius: '50%' }} 
                    />
                    <span>{row.roomId?.propertyId?.createdBy?.firstName}</span>
                </div>
            ),
        },
        {
            name: 'Booking Date',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status || 'Pending',
            sortable: true,
            cell: row => (
                <span className={`font-medium text-sm ${
                    row.status === 'confirmed' ? 'text-green-600' : 
                    row.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                    {row.status || 'Pending'}
                </span>
            ),
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '64px',
            },
        },
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
            },
        },
    };

    const ExpandableComponent = ({ data }) => (
        <div className="p-6 bg-gray-50 flex flex-col md:flex-row gap-6 border-t">
            <div className="flex flex-col items-center">
                <img
                    src={data.roomId?.images?.[0] || "https://placehold.co/200x140"}
                    alt="room"
                    className="rounded-md w-52 h-auto mb-2"
                />
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>👥 {data.comingAlone ? '1' : '2+'}</span>
                    <span>📐 {data.roomId?.size || 'N/A'}</span>
                    <span>🛏 {data.roomId?.bedroom ? '1' : '0'}</span>
                </div>
            </div>

            <div className="flex-1 space-y-4">
                <div>
                    <h3 className="font-bold text-lg">
                        {data.roomId?.roomTitle || 'N/A'} - {data.roomId?.roomType || 'N/A'}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {data.roomId?.propertyId?.name || 'N/A'}
                    </p>
                </div>

                <div className="flex gap-12 text-sm">
                    <p>Check-in: <strong>{new Date(data.checkIn).toLocaleDateString()}</strong></p>
                    <p>Check-out: <strong>{new Date(data.checkOut).toLocaleDateString()}</strong></p>
                </div>

                <div>
                    <h4 className="font-semibold text-sm mb-1">Your Message:</h4>
                    <p className="text-gray-600 text-sm leading-snug">
                        {data.description || 'No message provided'}
                    </p>
                </div>

                <div className="flex gap-4 mt-4">
                    <button className="px-4 py-2 bg-red-500 text-white text-sm rounded">
                        Cancel Booking
                    </button>
                    {data.status === 'pending' && (
                        <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded">
                            Edit Request
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <section className='w-full min-h-screen'>
            <div className="nav_margin p-4 md:p-8 lg:p-16">
                <h2 className='primary_heading !text-3xl text-center my-2'>My Bookings</h2>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by room, property, or landlord"
                            value={filterText}
                            onChange={handleSearchChange}
                            onKeyPress={(e) => e.key === 'Enter' && fetchBookings(1, filterText, selectedRoomType)}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <select
                            value={selectedRoomType}
                            onChange={handleRoomTypeChange}
                            className="p-2 border rounded w-full"
                        >
                            {roomTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => fetchBookings(1, filterText, selectedRoomType)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Search
                    </button>
                </div>

                <DataTable
                    columns={columns}
                    data={bookings}
                    progressPending={loading}
                    selectableRows
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={pagination.total}
                    onChangePage={handlePageChange}
                    expandableRows
                    expandableRowsComponent={ExpandableComponent}
                    customStyles={customStyles}
                    noDataComponent={
                        <div className="py-8 text-center text-gray-500">
                            {loading ? 'Loading...' : 'No bookings found'}
                        </div>
                    }
                />
            </div>
        </section>
    );
};

export default RoomApplication;