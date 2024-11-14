import React, { useState } from "react";
import { useUser } from "../services/context";
import useBudgets from "../hooks/useBudgets";
import BudgetCard from "../components/budget/BudgetCard";
import SkeletonCard from "../components/budget/SkeletonCard";
import Modal from "../components/shared/Modal";
import CreateBudgetForm from "../components/budget/CreateBudgetForm";
import { useNavigate } from "react-router-dom";

function AllBudgets() {
  const { user, setBudgetId } = useUser();
  const { budgets, loading } = useBudgets(user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if not logged i
  // Handle card click
  const handleCardClick = (id) => {
    if (id) {
      setBudgetId(id); // Set budgetId in context and local storage
      navigate(`/statement-input`); // Redirect to statement-input page
    } else {
      openModal(); // Open modal for new budget
    }
  };

  // Modal functionality
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex h-auto w-full flex-grow flex-col items-center bg-[#D9D9D9] p-5">
      <div>
        <div className="grid grid-cols-3 gap-4">
          {/* Card for creating a new budget */}
          <BudgetCard variant="new" onClick={openModal} />

          {/* Render skeleton cards if loading, otherwise show budget cards */}
          {loading
            ? Array.from({ length: budgets.length || 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : budgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onClick={handleCardClick}
                />
              ))}
        </div>
      </div>

      {/* Modal for creating a new budget */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateBudgetForm onClose={closeModal} />
      </Modal>
    </main>
  );
}

export default AllBudgets;
