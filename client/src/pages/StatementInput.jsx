const StatementInput = () => {
  return (
    <main className="flex h-auto w-full flex-col items-center border-2 border-red-600 bg-[#D9D9D9]">
      <div className="container p-10 flex flex-col items-center justify-center space-y-5 border border-red-500">
        <img
          className="rounded-xl border-2"
          src="https://placehold.co/600x400/png"
        />
        <p>
          or manually input{" "}
          <span className="text-blue-600 hover:underline">here</span>{" "}
        </p>
      </div>
    </main>
  );
};

export default StatementInput;
