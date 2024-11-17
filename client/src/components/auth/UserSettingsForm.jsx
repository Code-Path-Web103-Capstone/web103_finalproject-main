import React, { useState } from "react";
import { updateUser } from "../../services/api";
import { useUser } from "../../services/context";

const UserSettingsForm = () => {
  const { user, login } = useUser();
  console.log(user);
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const updates = { email, username };
      if (password) {
        updates.password = password;
      }

      const data = await updateUser(user.id, updates);

      // Update context with new user data
      login(data.updatedUser);

      setSuccess("User settings updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update user settings.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-6 rounded border bg-gray-50 p-4"
    >
      <h2 className="text-2xl font-semibold text-gray-700">
        Update Your Settings
      </h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="mb-1 block text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-gray-600">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-gray-600">
          New Password (optional)
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UserSettingsForm;
