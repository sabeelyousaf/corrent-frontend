import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {styles} from '../../select/style';
import CustomerCard from '../../components/dashboard/CustomerCard';
import OrdersCard from '../../components/dashboard/OrdersCard';
import IncomeCard from '../../components/dashboard/IncomeCard';
import ExpenseCard from '../../components/dashboard/ExpenseCard';
import {Link} from 'react-router-dom';
import {assets} from '../../../constants';
import {FaPhoneAlt} from 'react-icons/fa';
import {FaCalendarAlt} from 'react-icons/fa';
import OngoingCard from '../../components/dashboard/OngoingCard';
import Map from '../../components/Map';
import {dashboardApi} from '../../api/dashboard';
const Dashboard = () => {
  const [manageActive, setManageActive] = useState ('ongoing');
  const [totalCustomers, setTotalCustomers] = useState (0);
  const [totalIncome, setTotalIncome] = useState (0);
  const [totalBooking, setTotalBooking] = useState (0);


  const fetchAnalytics = async () => {
    const res = await dashboardApi.ANALYTICS ();
    setTotalCustomers (res?.totalCustomers);
    setTotalIncome (res?.totalIncome);
    setTotalBooking (res?.totalBookings);

  };
  useEffect (() => {
    fetchAnalytics ();
  }, []);

  return (
    <section className="w-full flex gap-4">
      <div className="flex-1 h-full flex flex-col gap-4">
        <div className="w-full h-[600px] bg-red-200 rounded-lg relative overflow-hidden">
          <div className="z-10 w-full absolute top-0 left-0 p-4 bg-white flex items-center justify-between">
            <h2 className="text-lg font-semibold text-accent_blue">Map</h2>

            <input
              type="text"
              placeholder="Search Here"
              className="!text-sm bg-accent_blue/10 p-3 min-w-[300px] rounded-full"
            />
          </div>
          <Map />
        </div>

        <div className="w-full pb-4 bg-white rounded-lg">

          <table className="property-table ">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>Name</th>
                <th>Status</th>
                <th>Member Sat</th>
                <th>Maintenance</th>
              </tr>
            </thead>

          <tbody>
  <tr>
    <td><input type="checkbox" /></td>
    <td>
      <div className="flex items-center gap-2">
        <img src={assets.placeholder} className="w-[40px] h-[40px] rounded-sm" alt="" />
        <p>4219 Cary St, Richmond, VA</p>
      </div>
    </td>
    <td><span>8.5</span></td>
    <td><span>1.2</span></td>
    <td><span>4.8</span></td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>
      <div className="flex items-center gap-2">
        <img src={assets.placeholder} className="w-[40px] h-[40px] rounded-sm" alt="" />
        <p>1432 Oceanfront Ave, Virginia Beach, VA</p>
      </div>
    </td>
    <td><span>7.9</span></td>
    <td><span>0.9</span></td>
    <td><span>3.6</span></td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>
      <div className="flex items-center gap-2">
        <img src={assets.placeholder} className="w-[40px] h-[40px] rounded-sm" alt="" />
        <p>3301 Wilson Blvd, Arlington, VA</p>
      </div>
    </td>
    <td><span>9.1</span></td>
    <td><span>1.5</span></td>
    <td><span>5.0</span></td>
  </tr>
</tbody>

          </table>
        </div>
      </div>

      <div className="w-[350px] flex flex-col gap-4">
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <h3 className="text-xl font-medium text-accent_blue">Metrics</h3>
          </div>

          <div>
            <Select styles={styles} />
          </div>

          <CustomerCard value={totalCustomers} />
          <OrdersCard value={totalBooking}  />
          <IncomeCard value={totalIncome} />
          <ExpenseCard  value={totalCustomers}/>

        </div>

        <div className="w-full bg-white rounded-lg">

          <div className="w-full flex items-center justify-between p-4">
            <h3 className="text-lg font-semibold text-accent_blue">Manage</h3>

            <Link className="text-sm text-zinc-700 hover:text-accent_blue">
              See All
            </Link>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setManageActive ('ongoing')}
              className={`cursor-pointer flex-1 border-b-3  pb-2 ${manageActive == 'ongoing' ? 'border-accent_blue' : 'border-zinc-200'}`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setManageActive ('next_5_days')}
              className={`cursor-pointer flex-1 border-b-3  pb-2 ${manageActive == 'next_5_days' ? 'border-accent_blue' : 'border-zinc-200'}`}
            >
              Next 5 Days
            </button>
          </div>

          {manageActive === 'ongoing'
            ? <div className="w-full p-4 flex flex-col gap-2">
                <OngoingCard />
                <OngoingCard />
              </div>
            : <div className="h-[300px]" />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
