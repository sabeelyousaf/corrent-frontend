import React from 'react'

const ToggleSwitch = ({ label, value, onChange }) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='font-medium text-sm'>{label}</span>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => onChange(!value)}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${value ? 'bg-blue-700' : 'bg-gray-300'
            }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
        <span className='text-xs text-zinc-600'>{value ? 'ON' : 'OFF'}</span>
      </div>
    </div>
  )
}

export default ToggleSwitch
