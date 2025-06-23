import React from 'react'
import PropertyEarningStats from '../../components/property_owner/earnings/PropertyEarningStats'

const PropertyOwnerEarnings = () => {
  return (
    <section className='w-full'>
      <div className='w-full grid grid-cols-4 gap-4'>
        <PropertyEarningStats title={"Annual Income"} amount={86000} growth={16} />
        <PropertyEarningStats title={"Monthly Income"} amount={27000} growth={1} />
        <PropertyEarningStats title={"Current Month"} amount={22000} growth={16} />
        <PropertyEarningStats title={"Payout Accounts"} amount={86000} growth={16} />
      </div>

      <div className='bg-white p-4 rounded-lg mt-4'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Payout Report for Period</h2>
          <div className='flex items-center gap-4'>
            <label className='flex items-center gap-4'>
              <span className='text-sm inline-block'>Range From</span>
              <input className='text-sm border p-3 rounded border-zinc-200' type="date" />
            </label>
            <label className='flex items-center gap-4'>
              <span className='text-sm inline-block'>Range To</span>
              <input className='text-sm border p-3 rounded border-zinc-200' type="date" />
            </label>
            <input className='text-sm border p-3 rounded border-zinc-200 w-[300px]' type="text" placeholder='Search Here' />
          </div>
        </div>

        <table className='property-table'>
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Earnings</th>
              <th>Active Properties</th>
              <th>CSV Exports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan 2025</td>
              <td>$59000</td>
              <td>$120000</td>
              <td>14</td>
              <td>
                <button>
                  <span></span>
                  <span>CSV</span>
                </button>
              </td>
              <td>
                <button className='bg-accent_blue text-sm px-3 py-2 rounded cursor-pointer flex items-center gap-2'>
                  <span></span>
                  <span className='text-white text-sm'>Report</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className='flex items-center justify-between mt-4'>
          <div className='text-sm text-zinc-600'>Showing 15 results out of 150</div>
          <div className='flex gap-2 items-center'>
            <button className='px-3 py-1 border rounded text-sm'>Prev</button>
            <button className='px-3 py-1 border rounded text-sm bg-accent_blue text-white'>1</button>
            <button className='px-3 py-1 border rounded text-sm'>2</button>
            <button className='px-3 py-1 border rounded text-sm'>3</button>
            <button className='px-3 py-1 border rounded text-sm'>Next</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyOwnerEarnings
