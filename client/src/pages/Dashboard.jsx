import React, { useState, useEffect } from "react";
import PageLayout from "../layouts/PageLayout";
import {
  getBudgetsByUserId,
  fetchActualIncomes,
  fetchActualExpenses,
} from "../services/api";
import { useUser } from "../services/context";
import BreakdownByMonth from "../components/dashboard/BreakdownByMonth";
import BreakdownByCategory from "../components/dashboard/BreakdownByCategory";
import Summary from "../components/dashboard/Summary";
import Finance from "../assets/finance.png";
import Modal from "../components/shared/Modal";
import CreateBudgetForm from "../components/budget/CreateBudgetForm";
import { IoIosCreate } from "react-icons/io";
import { IoIosJournal } from "react-icons/io";
// import Clock from "../components/dashboard/Clock";

const Dashboard = () => {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [YTDIncome, setYTDIncome] = useState(0);
  const [YTDExpenses, setYTDExpenses] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAndCalculateSavings = async () => {
      try {
        setLoading(true);
        setError(null);

        const budgetsData = await getBudgetsByUserId(user.id);
        const activeBudgets = budgetsData.filter(
          (budget) => budget.keep_track === true
        );

        let ytdIncome = 0;
        let ytdExpenses = 0;

        const savings = await Promise.all(
          activeBudgets.map(async (budget) => {
            const [actualIncomes, actualExpenses] = await Promise.all([
              fetchActualIncomes(user.id, budget.id),
              fetchActualExpenses(user.id, budget.id),
            ]);

            const totalIncome = actualIncomes.reduce(
              (sum, income) => sum + parseFloat(income.amount || 0),
              0
            );
            const totalExpense = actualExpenses.reduce(
              (sum, expense) => sum + parseFloat(expense.amount || 0),
              0
            );

            ytdIncome += totalIncome;
            ytdExpenses += totalExpense;

            return totalIncome - totalExpense;
          })
        );

        const totalSavings = savings.reduce(
          (sum, budgetSavings) => sum + budgetSavings,
          0
        );

        setBudgets(activeBudgets);
        setTotalSaved(totalSavings);
        setYTDIncome(ytdIncome);
        setYTDExpenses(ytdExpenses);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAndCalculateSavings();
    }
  }, [user]);

  function truncateUsername(username) {
    if (username.length <= 10) return username;
    const start = username.slice(0, 3);
    const end = username.slice(-4);
    return `${start}...${end}`;
  }
  // Modal functionality
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleResourceClick = () => {
    window.open(
      "https://money.com/budgeting-101-how-to-budget-money/",
      "_blank"
    );
  };

  return (
    <PageLayout>
      <div className="grid h-[80vh] w-full grow grid-cols-3 gap-4 px-20 py-8">
        {/* Column 1: Welcome and Summary and Buttons */}
        <div className="col-span-1 row-span-2 flex h-full flex-col gap-4">
          {/* Welcome */}
          <div className="flex h-1/4 rounded-lg border-2 bg-white p-5 py-10 text-3xl">
            {/* <Clock /> */}
            <p>
              Welcome, <br />
              <span className="font-bold">
                {truncateUsername(user.username)}!
              </span>
            </p>
          </div>

          <Summary
            loading={loading}
            error={error}
            totalSaved={totalSaved}
            YTDIncome={YTDIncome}
            YTDExpenses={YTDExpenses}
            className={"col-span-1 h-1/2"}
          />

          <div className="flex h-1/4 gap-4">
            <div
              className="flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 bg-white p-5 hover:bg-gray-100"
              onClick={openModal}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <IoIosCreate className="size-16 text-[#3A405A]" />
                <span className="text-center text-sm font-semibold uppercase text-gray-700">
                  New Budget
                </span>
              </div>
            </div>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <CreateBudgetForm onClose={closeModal} />
            </Modal>
            <div
              onClick={handleResourceClick}
              className="flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 bg-white p-5 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <IoIosJournal className="size-16 text-[#3A405A]" />
                <span className="text-center text-sm font-semibold uppercase text-gray-700">
                  Resources
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Active Budgets */}
        <div className="col-span-1 row-span-2 flex h-full flex-col gap-4">
          <div className="flex h-full flex-col justify-between rounded-lg border-2 bg-white p-5">
            {/* Active Budgets Header and Content */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Active Budgets
              </h2>
              {budgets.length === 0 ? (
                <p className="text-gray-500">No active budgets found.</p>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {budgets.map((budget) => (
                    <div
                      key={budget.id}
                      className="rounded-lg bg-gray-100 p-3 text-sm font-medium text-gray-800"
                    >
                      <p>{budget.budget_name}</p>
                      <p>
                        {budget.year} - {budget.month}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image at the Bottom */}
            <img
              src={Finance}
              alt="Finance Illustration"
              className="mb-0.5 h-44 w-auto object-contain"
            />
          </div>
        </div>

        {/* Column 3: Charts */}
        <div className="col-span-1 row-span-2 flex h-full flex-col gap-4">
          {/* Breakdown By Month */}
          <BreakdownByMonth className="h-1/2 rounded-lg border-2 bg-white" />

          {/* Breakdown By Category */}
          <BreakdownByCategory className="h-1/2 rounded-lg border-2 bg-white" />
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
