import React from "react";

function PageLayout({ children }) {
  return (
    <main className="flex h-auto w-full flex-grow flex-col items-center border-t border-gray-500 bg-[#D9D9D9] p-5">
      {children}
    </main>
  );
}

export default PageLayout;
