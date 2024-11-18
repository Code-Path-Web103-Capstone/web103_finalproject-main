import React from "react";
import UserSettingsForm from "../components/auth/UserSettingsForm";

const AccountSettings = () => {
  return (
    <main className="mt-10 flex h-auto w-full flex-grow flex-col items-center border-t border-gray-500 bg-[#D9D9D9] p-5">
      <div className="container mx-auto p-20">
        <UserSettingsForm />
      </div>
    </main>
  );
};

export default AccountSettings;
