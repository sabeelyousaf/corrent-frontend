import { useState } from 'react';

const NotificationCenter = () => {
    const [smsEnabled, setSmsEnabled] = useState(false);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [phoneEnabled, setPhoneEnabled] = useState(false);

    const toggleClass =
        "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-accent_blue peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all";

    const renderToggle = (label, value, setter) => (
        <li className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm font-medium text-gray-900">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => setter(!value)}
                />
                <div className={toggleClass}></div>
            </label>
        </li>
    );

    return (
        <div>
            <h3 className='text-xl font-medium mb-4'>Notification Center</h3>
            <ul>
                {renderToggle("SMS", smsEnabled, setSmsEnabled)}
                {renderToggle("Email", emailEnabled, setEmailEnabled)}
                {renderToggle("Phone", phoneEnabled, setPhoneEnabled)}
            </ul>
        </div>
    );
};

export default NotificationCenter;
