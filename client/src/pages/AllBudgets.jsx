import React, { useState } from "react";
import { useUser } from "../services/context";
import useBudgets from "../hooks/useBudgets";
import BudgetCard from "../components/budget/BudgetCard";
import SkeletonCard from "../components/budget/SkeletonCard";
import Modal from "../components/shared/Modal";
import CreateBudgetForm from "../components/budget/CreateBudgetForm";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

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
    <PageLayout>
      <div className="px-5 py-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Card for creating a new budget */}
          <BudgetCard variant="new" onClick={openModal} />

          {/* Render skeleton cards if loading, otherwise show budget cards */}
          {loading
            ? Array.from({ length: budgets.length || 8 }).map((_, index) => (
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
    </PageLayout>
  );
}

export default AllBudgets;
