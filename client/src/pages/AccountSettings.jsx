import React from "react";
import UserSettingsForm from "../components/auth/UserSettingsForm";

const AccountSettings = () => {
  return (
    <main className="flex h-auto w-full flex-col items-center border-2 border-red-600 bg-[#D9D9D9]">
      <div className="container mx-auto my-8">
        <UserSettingsForm />
      </div>
    </main>
  );
};

export default AccountSettings;
