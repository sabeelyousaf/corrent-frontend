import React, { useState } from 'react'
import { assets } from '../../../../constants'
import Select from 'react-select'
import { styles } from '../../../select/style'
import { genderOptions } from '../../../select/options'
import CountrySelect from '../../CountrySelect'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { userApi } from '../../../api/user'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


const PersonalInformation = () => {
      const user = useSelector((state) => state.auth.user);
    const [editMode, setEditMode] = useState(false)
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const [gender, setGender] = useState(user?.gender || null)
    const [phone, setPhone] = useState(user?.phone || '')
    const [address, setAddress] = useState(user?.address || '')
    const [nationality, setNationality] = useState(user?.nationality || null)
    const [idImage, setIdImage] = useState(user?.avatar?.secure_url || assets.placeholder)
    const [avatarFile, setAvatarFile] = useState(null)
    const dispatch = useDispatch();


    
    const updateProfile = async (e) => {
        e.preventDefault()
        const payload = {
            firstName,
            lastName,
            gender: gender?.value || '',
            phone_number: phone,
            address,
            nationality: nationality?.label || '',
            avatar: user?.avatar || {
                public_id: "user_avatar_123",
                secure_url: assets.placeholder
            }
        }
        
        try {
            const res = await userApi.update(payload)
            console.log("Profile updated successfully:", res)
            toast.success('User information has been updated successfully')
            setEditMode(false)
        } catch (error) {
            toast.error('Failed to update profile')
            console.error("Profile update failed:", error)
        }
    }
        
    const updateProfileImage = async (file) => {
        try {
            const res = await userApi.uploadImage(file)
            setIdImage(res?.user?.avatar?.secure_url || assets.placeholder)
            toast.success('User image uploaded successfully')
        } catch (error) {
            toast.error('User image cannot be uploaded')
            console.error("Image upload failed", error)
        }
    }

    const handleCountryChange = (selectedOption) => {
        setNationality(selectedOption)
    }

    return (
        <div className='w-full flex gap-4'>
            <div className='w-[300px] h-[600px] bg-white rounded-lg flex flex-col items-center py-8 justify-between'>
                <div className='flex flex-col items-center'>
                    <img 
                        className='mb-2 w-[150px] h-[150px] rounded-full object-center object-cover' 
                        src={idImage} 
                        alt="Profile" 
                    />
                    <h4 className='text-lg font-semibold '>{user?.name}</h4>
                    <p className='text-sm font-medium text-zinc-600'>{user?.email}</p>

                    <label className='mt-4 bg-accent_blue text-white font-medium px-4 py-3 rounded cursor-pointer text-sm'>
                        Upload New Picture
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                    setAvatarFile(file)
                                    updateProfileImage(file)
                                }
                            }}
                        />
                    </label>
                    <button 
                        className='mt-2 text-accent_red border border-accent_red font-medium px-4 py-3 rounded cursor-pointer text-sm'
                        onClick={() => {
                            setIdImage(assets.placeholder)
                            setAvatarFile(null)
                        }}
                    >
                        Remove Your Picture
                    </button>
                </div>

                <button className="cursor-pointer px-4 py-3 bg-accent_red text-white text-sm font-medium rounded">
                    Delete Account
                </button>
            </div>
            <div className='flex-1 h-full'>
             <div className='w-full flex items-center justify-between mb-2'>
                    <h2 className='text-xl font-semibold'>Basic Info</h2>
                    {editMode ? (
                        <button 
                            className='text-white bg-accent_blue px-4 py-2 rounded text-sm cursor-pointer'
                            onClick={updateProfile}
                        >
                            Save
                        </button>
                    ) : (
                        <button 
                            className='text-white bg-accent_blue px-4 py-2 rounded text-sm cursor-pointer'
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                        </button>
                    )}
            </div>

                <form className='grid grid-cols-2 gap-4'>
                    <label>
                        <span>First Name</span>
                        <input 
                            type="text" 
                            className='!bg-white' 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            readOnly={!editMode}
                        />
                    </label>

                    <label>
                        <span>Last Name</span>
                        <input 
                            type="text" 
                            className='!bg-white' 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            readOnly={!editMode}
                        />
                    </label>

                    <label className='col-span-2'>
                        <span>Gender</span>
                        <Select 
                            styles={styles} 
                            options={genderOptions}
                            value={gender}
                            onChange={setGender}
                            isDisabled={!editMode}
                        />
                    </label>

                    <label className='col-span-2'>
                        <span>Email</span>
                        <input 
                            className='!bg-white' 
                            type="email" 
                            value={user?.email || ''}
                            readOnly
                        />
                    </label>

                    <label className='col-span-2'>
                        <span>Phone Number</span>
                        <PhoneInput
                            country={'pk'}
                            value={phone}
                            onChange={setPhone}
                            inputClass="!w-full !rounded-md !bg-white"
                            disabled={!editMode}
                        />
                    </label>

                    <label className='col-span-2'>
                        <span>Nationality</span>
                        <CountrySelect 
                            value={nationality}
                            onChange={handleCountryChange}
                            isDisabled={!editMode}
                        />
                    </label>

                    <label className='col-span-2'>
                        <span>Current Address</span>
                        <input 
                            className='!bg-white' 
                            type="text" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly={!editMode}
                        />
                    </label>

                    <button 
                        className='bg-accent_red text-sm text-white rounded p-3 w-[120px] mt-4'
                        type="button"
                        onClick={()=>{
                            localStorage.removeItem('token');
                            localStorage.removeItem('auth');
                            localStorage.removeItem('persist:auth');
                            window.location.href="/"
                        }}
                    >
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PersonalInformation