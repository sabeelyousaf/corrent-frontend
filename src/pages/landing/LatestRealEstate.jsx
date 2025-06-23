import React, { useCallback, useEffect, useState } from 'react';
import RealEstate from '../../components/RealEstate';
import { roomApi } from '../../api/room';

const LatestRealEstate = () => {
  const pageSize = 3;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFetched = React.useRef(false);
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const response = await roomApi.list(pageSize);
      console.log(response, "response");
      setRooms(response?.rooms);

    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isFetched.current) {
      fetchRooms();
      isFetched.current = true;
    }
  }, [fetchRooms]);

  console.log(rooms, 'LatestRealEstate rooms');


  return (
    <section className='w-full flex flex-col items-center bg-zinc-100'>
      <div className="content_area text-center py-16">
        <div className="text">
          <h1 className='primary_heading'>Discover the latest real estate</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo</p>
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
          {!loading && rooms.length > 0 ? (
            rooms.map((room) => (
              <RealEstate
                key={room._id}
                id={room._id}
                slug={room?.slug}
                image={ "https://picsum.photos/1000/1000"}
                title={room.roomTitle}
                location={room.apartment || "Location not specified"}
                price={room.pricePerMonth}
                beds={
                  room.bedroom?.doubleBed
                    ? 1
                    : room.bedroom?.twinBed
                      ? 2
                      : room.bedroom?.singleBed
                        ? 1
                        : 0
                }
                baths={1}
                area={room.size || "N/A"}
                posted={new Date(room.createdAt).toLocaleDateString()}
              />
            ))
          ) : !loading && rooms.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center">
              No rooms available at the moment.
            </p>
          ) : (
            <p className="col-span-full text-center text-gray-500">Loading...</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default LatestRealEstate;
