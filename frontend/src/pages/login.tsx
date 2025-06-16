import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { JSX } from "react/jsx-runtime";

import DefaultLayout from "@/layouts/default";
import AuthForm from "@/components/authform";

export const CarIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16m11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5M5 11l1.5-4.5h11L19 11z"
        fill="currentColor"
      />
    </svg>
  );
};

export const AdminIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="8" fill="currentColor" r="4" />
      <path
        d="M10.67 13.02c-.22-.01-.44-.02-.67-.02c-2.42 0-4.68.67-6.61 1.82c-.88.52-1.39 1.5-1.39 2.53V20h9.26a6.96 6.96 0 0 1-.59-6.98M20.75 16c0-.22-.03-.42-.06-.63l1.14-1.01l-1-1.73l-1.45.49q-.48-.405-1.08-.63L18 11h-2l-.3 1.49q-.6.225-1.08.63l-1.45-.49l-1 1.73l1.14 1.01c-.03.21-.06.41-.06.63s.03.42.06.63l-1.14 1.01l1 1.73l1.45-.49q.48.405 1.08.63L16 21h2l.3-1.49q.6-.225 1.08-.63l1.45.49l1-1.73l-1.14-1.01c.03-.21.06-.41.06-.63M17 18c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"
        fill="currentColor"
      />
    </svg>
  );
};

const userIntro = (
  <div>
    <p className="mb-2">
      <span className="font-semibold">Welcome to Parking Ticket!</span> Register
      for an account or log in to:
    </p>
    <ul className="list-disc list-inside text-gray-600 mb-2">
      <li>Reserve parking slots in real time</li>
      <li>View and manage your active and past reservations</li>
      <li>See live slot availability at all locations</li>
      <li>Get notified about your bookings and reservation status</li>
      <li>Update your profile and password</li>
      <li>Enjoy a seamless parking experience</li>
    </ul>
    <p>Start by logging in or creating an account to access all features!</p>
  </div>
);

const adminIntro = (
  <div>
    <p className="mb-2">
      <span className="font-semibold">Admin Portal:</span> Log in to manage your
      parking lot and users.
    </p>
    <ul className="list-disc list-inside text-gray-600 mb-2">
      <li>Securely access the admin dashboard</li>
      <li>Add, update, or delete parking locations</li>
      <li>Define and manage slots for each location</li>
      <li>View and manage all reservations</li>
      <li>Monitor parking activity and user accounts</li>
      <li>Keep your lot running smoothly</li>
    </ul>
    <p>
      Use your admin credentials to get started managing your parking system.
    </p>
  </div>
);

const userWelcome = (
  <div className="text-center mb-6">
    <h2 className="text-2xl font-bold">Welcome, User!</h2>
    <p className="text-gray-600 text-sm mt-2">
      Access available parking, make reservations, and manage your account.
    </p>
  </div>
);

const adminWelcome = (
  <div className="text-center mb-6">
    <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
    <p className="text-gray-600 text-sm mt-2">
      Manage parking locations, slots, users, and view reservation activity.
    </p>
  </div>
);

const overallWelcome = (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold mb-2">
      Parking Ticket: Treat your parking lot like it&apos;s a movie screening!
    </h1>
    <p className="text-gray-700 text-base max-w-xl mx-auto">
      Parking Ticket is a full-stack application for seamless parking
      management. Whether you&apos;re an admin or a user, you can manage
      locations, slots, and reservations with ease.
    </p>
  </div>
);

export default function App() {
  return (
    <DefaultLayout>
      <div className="flex w-full flex-col">
        {overallWelcome}
        <Tabs
          aria-label="Options"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          color="primary"
          variant="underlined"
        >
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <CarIcon />
                <span>User</span>
              </div>
            }
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 flex justify-center m-auto">
                <div className="text-gray-600">{userIntro}</div>
              </div>
              <div className="flex-1">
                <AuthForm headerText={userWelcome} />
              </div>
            </div>
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <AdminIcon />
                <span>Admin</span>
              </div>
            }
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 flex justify-center m-auto">
                <div className="text-gray-600">{adminIntro}</div>
              </div>
              <div className="flex-1">
                <AuthForm headerText={adminWelcome} />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}
