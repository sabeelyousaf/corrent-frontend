import React from 'react';
import { assets } from '../../../constants';

const PropertyMetricsTable = ({ currentData }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Property Metrics</h2>

            <div className="bg-white rounded-lg overflow-auto">
                <table className="property-table w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-zinc-200">
                            <th>Image</th>
                            <th>Property Name</th>
                            <th>Member Satisfaction</th>
                            <th>Maintenance</th>
                            <th>Move-in Experience</th>
                            <th>Payment Experience</th>
                            <th>Overall Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className="border-t border-zinc-200">
                                <td>
                                    <img
                                        src={assets.placeholder} // Replace this with actual image if available: item.propertyImages?.[0]
                                        alt="property"
                                        className="w-[40px] h-[40px] rounded-sm object-cover"
                                    />
                                </td>
                                <td>{item?.title || 'N/A'}</td>
                                <td>{item?.memberSatisfaction ?? '0'}</td>
                                <td>{item?.maintenance ?? '0'}</td>
                                <td>{item?.moveInExperience ?? '0'}</td>
                                <td>{item?.paymentExperience ?? '0'}</td>
                                <td>{item?.overallStatus ?? '0'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyMetricsTable;
