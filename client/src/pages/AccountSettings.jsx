import React from "react";
import UserSettingsForm from "../components/auth/UserSettingsForm";
import PageLayout from "../layouts/PageLayout";

const AccountSettings = () => {
  return (
    <PageLayout>
      <div className="flex w-full items-center justify-center border-2 border-red-500 p-5">
        <UserSettingsForm />
      </div>
    </PageLayout>
  );
};

export default AccountSettings;
