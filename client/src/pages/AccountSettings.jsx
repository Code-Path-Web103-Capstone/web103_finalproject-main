import React from "react";
import UserSettingsForm from "../components/auth/UserSettingsForm";
import PageLayout from "../layouts/PageLayout";

const AccountSettings = () => {
  return (
    <PageLayout>
      <div className="container mx-auto p-20">
        <UserSettingsForm />
      </div>
    </PageLayout>
  );
};

export default AccountSettings;
