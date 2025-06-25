import React from 'react';
import Rating from './Rating';

const MemberRatings = ({ currentData }) => {
  // If no data is available yet
  if (!currentData) {
    return <div>Loading ratings...</div>;
  }

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold">Members Rating</h2>
      <div className="w-full p-4 bg-white rounded-lg mt-4">
        <h2 className="text-lg font-semibold">House Rating</h2>
        <p className="text-sm text-zinc-600 mb-4">
          Members are asked to rate their house every 14 days.
        </p>

        <div className="flex flex-col gap-4">
          {currentData.map((item) => (
            <div key={item.property._id} className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-md">{item.property.title}</h3>
                <span className="text-sm text-zinc-500">
                  {item.ratings.length ? `by ${item.ratings[0].member}` : ""}
                </span>
              </div>
              
              {item.ratings.length ? (
                <>
                  <Rating value={item.ratings[0].rating} />
                  <p className="text-sm text-zinc-700 mt-1 italic">
                    "{item.ratings[0].comment}"
                  </p>
                </>
              ) : (
                <p className="text-sm text-green-600 mt-2">
                  No ratings yet. Be the first to rate this property!
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberRatings;