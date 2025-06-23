import React, {useState, useEffect, useRef} from 'react';
import ToggleSwitch from './ToggleSwitch';
import {userApi} from '../../../api/user';
import toast from 'react-hot-toast';

const Notifications = () => {
  // State for notification preferences
  const [chatNotification, setChatNotification] = useState ('email');
  const [taskNotification, setTaskNotification] = useState ('email');
  const firstRender = useRef (true);

  // Map state to API payload
  const getPayload = () => ({
    chatNotification,
    taskNotification,
    enhancedMemberSetting: true,
  });

  // Send API request when preferences change
  useEffect (
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }

      const updateSettings = async () => {
        try {
          await userApi.setting (getPayload ());
          console.log ('Settings updated successfully');
          toast.success ('Settings updated successfully');
        } catch (error) {
          console.error ('Failed to update settings:', error);
          // Add error handling (e.g., show toast message)
          toast.error ('Failed to update settings:', error);
        }
      };

      updateSettings ();
    },
    [chatNotification, taskNotification]
  );

  return (
    <section className="w-full space-y-4">
      <div className="w-full bg-white rounded-lg p-4 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Messages</h3>
          <p className="text-sm font-medium text-zinc-600">
            Choose how you get notified when someone messages you in chat.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <ToggleSwitch
            label="Email"
            value={chatNotification === 'email'}
            onChange={checked =>
              setChatNotification (checked ? 'email' : 'none')}
          />
          <ToggleSwitch
            label="SMS"
            value={chatNotification === 'sms'}
            onChange={checked => setChatNotification (checked ? 'sms' : 'none')}
          />
        </div>
      </div>

      <div className="w-full bg-white rounded-lg p-4 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Tasks</h3>
          <p className="text-sm font-medium text-zinc-600">
            Choose how you get notified about task updates and deadlines.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <ToggleSwitch
            label="Email"
            value={taskNotification === 'email'}
            onChange={checked =>
              setTaskNotification (checked ? 'email' : 'none')}
          />
          <ToggleSwitch
            label="SMS"
            value={taskNotification === 'sms'}
            onChange={checked => setTaskNotification (checked ? 'sms' : 'none')}
          />
        </div>
      </div>
    </section>
  );
};

export default Notifications;
