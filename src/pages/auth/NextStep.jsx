import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2';
import CountrySelect from '../../components/CountrySelect';
import LogoAccent from '../../components/LogoAccent';
import {useDispatch} from 'react-redux';
import {onboard} from '../../redux/auth/authActions';

const NextStep = () => {
  const [phone, setPhone] = useState ('');
  const [nationality, setNationality] = useState ('');
  const dispatch = useDispatch ();

  const submitHandler = e => {
    e.preventDefault ();
    dispatch (onboard (phone, nationality.label));
  };

  return (
    <section className="w-full h-screen flex items-center gap-8 p-8">
      <div className="flex-1 max-w-[500px] h-full relative flex flex-col justify-center">
        <div className="w-full absolute top-0 left-0 flex items-center justify-between">
          <LogoAccent />
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-accent_blue_dark">
              Just One More Step
            </h2>
            <p className="text-sm text-zinc-600">
              Join Now! Please enter your details.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <label>
              <span className="text-sm font-medium text-primary_text mb-1 block">
                Phone Number
              </span>
              <PhoneInput value={phone} onChange={value => setPhone (value)} />
            </label>

            <label>
              <span className="text-sm font-medium text-primary_text mb-1 block">
                Nationality
              </span>
              <CountrySelect
                value={nationality}
                onChange={e => setNationality (e)}
              />
            </label>

            <button type="submit" className="w-full btn">Next Step</button>
          </div>
        </form>
      </div>

      <div className="flex-1 h-full bg-red-50 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-center object-cover"
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Join Now"
        />
      </div>
    </section>
  );
};

export default NextStep;
