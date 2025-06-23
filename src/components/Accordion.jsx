import React, { useState } from 'react'

const Accordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-xl shadow-md p-5 mb-4">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-[#1c1c1e]">
                    {question}
                </h3>
                <div className="w-6 h-6 flex items-center justify-center bg-[#0D3C84] text-white rounded">
                    {isOpen ? (<p>-</p>) : (<p>+</p>)}
                </div>
            </div>
            {isOpen && (
                <p className="mt-3 text-sm text-[#cc4848]">
                    {answer}
                </p>
            )}
        </div>
    )
}

export default Accordion
