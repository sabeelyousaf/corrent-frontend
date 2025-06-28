import React from "react";

const ToggleSwitch = ({isRooms, setIsRooms, fetchRooms}) => {

    const toggle = () => {
        setIsRooms(!isRooms)
        if (!isRooms)fetchRooms();
    }
    ;

    return (
        <div className="flex items-center gap-4 font-semibold text-gray-700">
            <span className={`${!isRooms ? "text-black" : "text-gray-500"}`}>
                Properties
            </span>

            <button
                onClick={toggle}
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isRooms ? "bg-blue-600" : "bg-gray-300"
                    }`}
            >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isRooms ? "translate-x-6" : "translate-x-0"
                        }`}
                />
            </button>

            <span className={`${isRooms ? "text-black" : "text-gray-500"}`}>
                Rooms
            </span>
        </div>
    );
};

export default ToggleSwitch;
