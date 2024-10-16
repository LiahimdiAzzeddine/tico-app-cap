import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getFirstVisit } from "../hooks/useIndexedDB";
import Spinner from "../view/composants/Spinner";

const FirstVisitGuard = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstVisit = async () => {
      try {
        const firstVisitStatus = await getFirstVisit();
        setIsFirstVisit(
          firstVisitStatus === null
        );
      } catch (error) {
        console.error("Error checking first visit status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkFirstVisit();
  }, []);

  // Show a loading indicator or fallback while checking the visit status
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ">
        <Spinner />
      </div>
    ); // You can replace this with a spinner or custom loading component
  }

  return isFirstVisit ? <Navigate to="/welcome" replace /> : <Outlet />;
};

export default FirstVisitGuard;
