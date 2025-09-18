import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TransactionForm from "./components/TransactionForm";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<TransactionForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
