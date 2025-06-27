'use client';
import React, {useState} from 'react';

export default function SmartLocks () {
  const [isLoading, setIsLoading] = useState (true);

  const handleLoad = () => {
    setIsLoading (false);
  };

  return (
    <div className="w-full h-screen relative">
      {/* Spinner */}
      {isLoading &&
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>}

      {/* Iframe */}
      <iframe
        src="https://key-room-access-control.lovable.app/"
        onLoad={handleLoad}
        className="w-full h-full border-0"
      />
    </div>
  );
}
