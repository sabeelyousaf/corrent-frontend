// components/PropertyMetricsTable.js
import React from 'react';
import { assets } from '../../../constants';

const PropertyMetricsTable = ({
    currentData,
    search,
    handleSearch,
    handleSort,
    currentPage,
    totalPages,
    handlePageChange
}) => {
    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Property Metrics</h2>
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="bg-white p-3 rounded-lg border-zinc-200 border min-w-[300px] text-sm"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <div className="bg-white rounded-lg overflow-auto">
                <table className="property-table w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-white">
                            <th><input type="checkbox" /></th>
                            <th className="cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                            {['Status', 'Member Sat', 'Maintenance', 'Move-in Exp', 'Payment Ext', 'Status'].map((label, i) => (
                                <th key={i} className="cursor-pointer" onClick={() => handleSort(i)}>
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id} className="border-t border-zinc-200">
                                <td><input type="checkbox" /></td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <img src={assets.placeholder} alt="" className="w-[40px] h-[40px] rounded-sm" />
                                        <p>{item.name}</p>
                                    </div>
                                </td>
                                {item.metrics.map((metric, idx) => (
                                    <td key={idx}><span>{metric}</span></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-b-lg">
                <button
                    className="px-3 py-1 bg-gray-200 rounded-md"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    className="px-3 py-1 bg-gray-200 rounded-md"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default PropertyMetricsTable;
