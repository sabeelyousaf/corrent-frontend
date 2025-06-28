import React, { useMemo } from 'react';
// import { assets } from '../../../constants';
import { FlowbiteTable } from '../flowbite-table/FlowbiteTable'
import { ColumnType } from '../flowbite-table/types/FlowbiteTable';
import { assets } from '../../../constants';

interface Metrics{
  id: string,
  _id: string,
  title: string,
  memberSatisfaction?: string, 
  maintenance?: string,
  moveInExperience?: string,
  paymentExperience?: string, 
  overallStatus?: string
  url?: string
}
interface Props {
  currentData: Metrics[]
}

const PropertyMetricsTable = ({ currentData }:Props) => {
console.log(currentData, 'currentData');
  const columns: ColumnType<Metrics, keyof Metrics>[]  = useMemo(
    () => [
      {
        key: 'title',
        header: 'Image',
        cell: (currentData: Metrics) =>
          currentData.url || assets.placeholder ?  
          <img
            src={assets.placeholder || currentData.url} // Replace this with actual image if available: item.propertyImages?.[0]
            alt="property"
            className="w-[40px] h-[40px] rounded-sm object-cover"
          />
        : '-',
      },
      {
        key: 'title',
        header: 'Property Name',
      },
      {
        key: 'memberSatisfaction',
        header: 'Member Satisfaction',
      },
      {
        key: 'maintenance',
        header: 'Maintenance',
      },
      {
        key: 'moveInExperience',
        header: 'Move-in Experience',
      },
      {
        key: 'paymentExperience',
        header: 'Payment Experience',
      },
      {
        key: 'overallStatus',
        header: 'Overall Status',
      },
    ],
    []
  );

    return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Property Metrics</h2>
          <div className="bg-white rounded-lg overflow-auto">
            <div className='property-table w-full text-sm text-left border-collapse'>
                <FlowbiteTable data={currentData || []} columns={columns} />
            </div>
          </div>
        </div>
    );
};

export default PropertyMetricsTable;
