import React, { useState } from 'react'
import PersonalInformation from '../../components/property_owner/settings/PersonalInformation';
import Notifications from '../../components/property_owner/settings/Notifications';
import PromoCodes from '../../components/property_owner/settings/PromoCodes';
import BookSettings from '../../components/property_owner/settings/BookSettings';

const Settings = () => {
    const [filter, setFilter] = useState("personal_info");
    return (
        <section className='w-full'>
            <div className='w-full grid grid-cols-4 gap-2 mb-4'>
                {
                    [
                        { value: "personal_info", label: "Personal Information" },
                        { value: "notification", label: "Notifications" },
                        { value: "promo_code", label: "Promo Code" },
                        { value: "book_settings", label: "Book Settings" },
                    ].map((btn, index) => <button onClick={() => setFilter(btn.value)} className={` cursor-pointer text-sm rounded w-full p-3 font-medium ${filter === btn.value ? "bg-accent_blue text-white" : "bg-white"}`} key={index}>{btn.label}</button>)
                }
            </div>

            {
                filter === "personal_info" ? <PersonalInformation /> :
                    filter === "notification" ? <Notifications /> :
                        filter === "promo_code" ? <PromoCodes /> :
                            filter === "book_settings" ? <BookSettings /> : ""
            }

        </section>
    )
}

export default Settings
