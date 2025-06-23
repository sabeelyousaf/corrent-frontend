import React from 'react';
import Rating from './Rating';

const ratingsData = [
  {
    property: 'Arlington Heights, VA',
    member: 'John D.',
    rating: 4.5,
    comment: 'Very clean and well-maintained. Quiet neighborhood.',
  },
  {
    property: 'Virginia Beach Oceanfront, VA',
    member: 'Emily R.',
    rating: 4.8,
    comment: 'Amazing views and walkable to everything. Highly recommend!',
  },
  {
    property: 'Richmond Downtown, VA',
    member: 'Carlos M.',
    rating: 3.9,
    comment: 'Good location but a bit noisy during weekends.',
  },
];

const MemberRatings = () => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold">Members Rating</h2>
      <div className="w-full p-4 bg-white rounded-lg mt-4">
        <h2 className="text-lg font-semibold">House Rating</h2>
        <p className="text-sm text-zinc-600 mb-4">
          Members are asked to rate their house every 14 days.
        </p>

        <div className="flex flex-col gap-4">
          {ratingsData.map ((rating, index) => (
            <div key={index} className="p-4  ">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-md">{rating.property}</h3>
                <span className="text-sm text-zinc-500">
                  by {rating.member}
                </span>
              </div>
              <Rating value={rating.rating} />
              <p className="text-sm text-zinc-700 mt-1 italic">
                "{rating.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberRatings;
