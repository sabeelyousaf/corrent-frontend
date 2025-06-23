import React, { useState } from 'react';
import { assets } from '../../../constants';
import NotificationCenter from '../../components/NotificationCenter';
import Select from 'react-select';
import { styles } from '../../select/style';
import PhoneInput from 'react-phone-input-2';
import { userApi } from '../../api/user';
import toast from 'react-hot-toast';

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

const studyWorkOptions = [
    { value: 'study', label: 'Study' },
    { value: 'work', label: 'Work' },
];

const fundingOptions = [
    { value: 'self', label: 'Self Funded' },
    { value: 'sponsor', label: 'Sponsored' },
    { value: 'loan', label: 'Loan' },
];

const Profile = ({ user }) => {    

    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [nationality, setNationality] = useState(user?.nationality || '');
    const [requestMessage, setRequestMessage] = useState(user?.requestMessage || '');
    const [profession, setProfession] = useState(user?.profession || '');
    const [locationStudy, setLocationStudy] = useState(user?.locationStudy || '');
    const [fundStayMsg, setFundStayMsg] = useState(user?.fundStayMsg || '');
    const [about, setAbout] = useState(user?.about || '');
    const [idImage, setIdImage] = useState(user?.avatar?.secure_url);
    const [avatarFile, setAvatarFile] = useState(null);

    const updateProfile = async (e) => {
        e.preventDefault();
        const payload = {
            firstName,
            lastName,
            phone_number: phone,
            address,
            nationality,
            avatar: user?.avatar || { 
                public_id: "user_avatar_123",
                secure_url: "https://res.cloudinary.com/demo/image/upload/v1710000000/avatar.jpg"
            },
            requestMessage,
            profession,
            locationStudy,
            fundStayMsg,
            about,
        };
        try {
            const res = await userApi.update(payload);
            console.log("Profile updated successfully:", res);
             toast.success('User information has been updated successfully');
            setEditMode(false);
        } catch (error) {
             toast.error('Please login to subscribe');
            console.error("Profile update failed:", error);
        }
    };

        const updateProfileImage = async (file) => {
        try {
            const res = await userApi.uploadImage(file);
            console.log(res,'response data');
            setIdImage(res?.user?.avatar?.secure_url);
            console.log("Uploaded Image:", res);
              toast.success('User Image uploaded successfully');
        } catch (error) {
              toast.success('User image cannot be uploaded');

            console.error("Image upload failed", error);
        }
        };


    return (
        <section className="w-full min-h-screen flex justify-center px-16">
            <div className="nav_margin flex items-center gap-8 w-full">
                {/* Sidebar (unchanged) */}
                <div className="flex flex-col gap-2 items-center w-[250px] h-full">
                    <img
                        src={idImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-center object-cover"
                        onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s"}
                    />
                    <div>
                        <h3 className="text-lg text-center font-medium">{user?.name}</h3>
                        <p className="text-sm text-center text-zinc-600">{user?.email}</p>
                    </div>
                    <label className="btn text-sm cursor-pointer">
  Upload New Picture
  <input
    type="file"
    hidden
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setAvatarFile(file);
        updateProfileImage(file);
      }
    }}
  />
</label>
                    <div className="mt-3 w-full">
                        <NotificationCenter />
                    </div>

                    <button className='btn !bg-red-600 text-sm !w-full'>Delete Account</button>
                </div>


                {/* Main Form */}
                <div className="flex-1 h-full gap-4 flex flex-col">
                    {/* Basic Info */}
                    <div>
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-lg font-semibold">Basic Info</h4>
                            {editMode ? (
                                <button
                                    className="btn !w-[100px] text-xs"
                                    onClick={updateProfile} 
                                >
                                    Update
                                </button>
                            ) : (
                                <button
                                    className="btn !w-[100px] text-xs"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        <form className="mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Split name into first/last */}
                                <label>
                                    <span>First Name</span>
                                    <input
                                        type="text"
                                        className="input"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        readOnly={!editMode}
                                    />
                                </label>
                                
                                <label>
                                    <span>Last Name</span>
                                    <input
                                        type="text"
                                        className="input"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        readOnly={!editMode}
                                    />
                                </label>

                                <label>
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        className="input"
                                        value={user?.email || ''}
                                        readOnly
                                    />
                                </label>

                                <label>
                                    <span>Phone</span>
                                    <PhoneInput
                                        country={'pk'}
                                        value={phone}
                                        onChange={setPhone}
                                        inputClass="!w-full !rounded-md"
                                        disabled={!editMode}
                                    />
                                </label>

                                <label className="col-span-2">
                                    <span>Current Address</span>
                                    <input
                                        type="text"
                                        className="input"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        readOnly={!editMode}
                                    />
                                </label>
                                
                                {/* Added Nationality field */}
                                <label className="col-span-2">
                                    <span>Nationality</span>
                                    <input
                                        type="text"
                                        className="input"
                                        value={nationality}
                                        onChange={(e) => setNationality(e.target.value)}
                                        readOnly={!editMode}
                                    />
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* Additional Info - Updated to requestMessage */}
                    <div>
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-lg font-semibold">Booking Request Message</h4>
                        </div>
                        <textarea
                            className="mt-3 w-full h-[200px] border-zinc-200 p-3 border rounded-lg resize-none"
                            placeholder="I want to join the platform as a property owner."
                            value={requestMessage}
                            onChange={(e) => setRequestMessage(e.target.value)}
                            readOnly={!editMode}
                        ></textarea>
                    </div>

                    {/* Booking Section */}
                    <div>
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-lg font-semibold">Professional Details</h4>
                        </div>

                        <form className="flex flex-col gap-2 mb-8 mt-3">
                            <label>
                                <span>Profession</span>
                                <input
                                    type="text"
                                    className="input"
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    readOnly={!editMode}
                                />
                            </label>

                            <label>
                                <span>Institution/Company</span>
                                <input
                                    type="text"
                                    className="input"
                                    value={locationStudy}
                                    onChange={(e) => setLocationStudy(e.target.value)}
                                    readOnly={!editMode}
                                    placeholder="Lahore University"
                                />
                            </label>

                            <label>
                                <span>How will you fund your stay?</span>
                                <Select
                                    styles={styles}
                                    options={fundingOptions}
                                    value={fundingOptions.find(opt => opt.label === fundStayMsg)}
                                    onChange={(opt) => setFundStayMsg(opt.label)}
                                    isDisabled={!editMode}
                                />
                            </label>

                            <label className="font-medium">
                                <span>About Yourself</span>
                                <textarea
                                    className="w-full h-[120px] border-zinc-200 p-3 border rounded-lg resize-none"
                                    placeholder="I am a full-stack developer with a passion for real estate tech."
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    readOnly={!editMode}
                                ></textarea>
                            </label>

                            <label>
                                <span className="font-semibold">ID Document</span>
                                <input
                                    type="file"
                                    className="mb-2"
                                    disabled={!editMode}
                                    onChange={(e) => setIdImage(e.target.files[0])}
                                    accept="image/*,application/pdf"
                                />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;