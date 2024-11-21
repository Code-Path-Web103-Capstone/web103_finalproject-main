import React from "react";
import UserSettingsForm from "../components/auth/UserSettingsForm";
import PageLayout from "../layouts/PageLayout";

const AccountSettings = () => {
  return (
    <PageLayout>
      <div className="flex w-full items-center justify-center px-5 py-8">
        <UserSettingsForm />
      </div>
    </PageLayout>
  );
};

export default AccountSettings;
