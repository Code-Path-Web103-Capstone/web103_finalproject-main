const UserTest = () => {
  return (
    <div className="m-10 border-2 border-red-600 p-14">
      {isLoggedIn ? (
        <div>
          <p>Logged in as: {user?.email}</p>
          <p>User ID: {user?.id}</p>
          <p>Role: {user?.role}</p>
        </div>
      ) : (
        <p>Currently Logged out.</p>
      )}
    </div>
  );
};
