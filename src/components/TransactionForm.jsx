import React, { useState, useEffect } from "react";
import "../styles/TransactionForm.css";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

const TransactionForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [errorsCheck, setErrorsCheck] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const balance = totalIncome - totalExpense;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    let error = {};
    if (!form.name.trim()) error.name = "Name is Required";
    if (!form.amount.trim()) error.amount = "Amount Required";
    if (!form.date.trim()) error.date = "Date is Required";
    setErrorsCheck(error);

    if (Object.keys(error).length === 0) {
      await addDoc(collection(db, "incomes"), {
        name: form.name,
        amount: parseFloat(form.amount),
        date: form.date,
        createdAt: new Date(),
      });
      setForm({ name: "", amount: "", date: "" });
      setShowForm(false);
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    let error = {};
    if (!form.name.trim()) error.name = "Name is Required";
    if (!form.amount.trim()) error.amount = "Amount Required";
    if (!form.date.trim()) error.date = "Date is Required";
    setErrorsCheck(error);

    if (Object.keys(error).length === 0) {
      await addDoc(collection(db, "expenses"), {
        name: form.name,
        amount: parseFloat(form.amount),
        date: form.date,
        createdAt: new Date(),
      });
      setForm({ name: "", amount: "", date: "" });
      setShowExpenseForm(false);
    }
  };

  useEffect(() => {
    const unsubscribeIncome = onSnapshot(
      collection(db, "incomes"),
      (snapshot) => {
        let sum = 0;
        snapshot.docs.forEach((doc) => {
          sum += doc.data().amount;
        });
        setTotalIncome(sum);
      }
    );

    const unsubscribeExpense = onSnapshot(
      collection(db, "expenses"),
      (snapshot) => {
        let sum = 0;
        snapshot.docs.forEach((doc) => {
          sum += doc.data().amount;
        });
        setTotalExpense(sum);
      }
    );

    return () => {
      unsubscribeIncome();
      unsubscribeExpense();
    };
  }, []);

  return (
    <>
      <nav className="nav-bar">
        <section>
          <h4>Personal Finance-Tracker</h4>
        </section>
      </nav>

      {/* Header Section */}
      <section className="header-section">
        <div
          className="amount"
          style={{ backgroundColor: "antiquewhite", color: "navy" }}
        >
          <h1>Balance</h1>
          <h3>₹{balance}</h3>
        </div>
        <div className="amount">
          <h1>Total Income</h1>
          <h3>₹{totalIncome}</h3>
          <button onClick={(e) => setShowForm(true)}>Add Income</button>
        </div>
        <div className="amount">
          <h1>Total Expenses</h1>
          <h3>₹{totalExpense}</h3>
          <button onClick={(e) => setShowExpenseForm(true)}>Add Expense</button>
        </div>
      </section>

      <section>
        {showForm && (
          <div className="form">
            <h4>Income Form</h4>
            <p>Fill this form</p>
            <input
              className="input-tag"
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            {errorsCheck.name && (
              <p style={{ color: "red" }}>{errorsCheck.name}</p>
            )}
            <input
              className="input-tag"
              name="amount"
              type="text"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />
            {errorsCheck.amount && (
              <p style={{ color: "red" }}>{errorsCheck.amount}</p>
            )}
            <input
              className="input-tag"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
            {errorsCheck.date && (
              <p style={{ color: "red" }}>{errorsCheck.date}</p>
            )}
            <button onClick={handleIncomeSubmit}>Submit</button>
          </div>
        )}

        {showExpenseForm && (
          <div className="form">
            <h4>Expense Form</h4>
            <p>Fill this form</p>
            <input
              className="input-tag"
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            {errorsCheck.name && (
              <p style={{ color: "red" }}>{errorsCheck.name}</p>
            )}
            <input
              className="input-tag"
              name="amount"
              type="text"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />
            {errorsCheck.amount && (
              <p style={{ color: "red" }}>{errorsCheck.amount}</p>
            )}
            <input
              className="input-tag"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
            {errorsCheck.date && (
              <p style={{ color: "red" }}>{errorsCheck.date}</p>
            )}
            <button onClick={handleExpenseSubmit}>Submit</button>
          </div>
        )}
      </section>
    </>
  );
};

export default TransactionForm;
