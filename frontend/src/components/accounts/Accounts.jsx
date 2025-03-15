import { useState } from "react";
import styles from "./accounts.module.css";

const AccountsDashboard = () => {
  const [dateRange, setDateRange] = useState("This Month");
  
  const [invoices, setInvoices] = useState([
    { id: 1, name: "Invoice #123", status: "Overdue", days: 5 },
    { id: 2, name: "Invoice #456", status: "Overdue", days: 2 },
  ]);

  const [reports, setReports] = useState([
    "Profit & Loss",
    "Balance Sheet",
    "Cash Flow",
  ]);

  const [financialOverview] = useState({
    revenue: 50000,
    expenses: 30000,
    profit: 20000,
    cashFlow: 15000,
    bankBalance: 25000,
  });

  const [accountsPayable] = useState([
    { id: 1, vendor: "Supplier A", amount: 1200, dueDays: 5 },
    { id: 2, vendor: "Supplier B", amount: 2300, dueDays: 10 },
  ]);

  const [accountsReceivable] = useState([
    { id: 1, customer: "Customer X", amount: 3200, overdueDays: 3 },
    { id: 2, customer: "Customer Y", amount: 4500, overdueDays: 7 },
  ]);

  const [employeePayments] = useState([
    { id: 1, name: "John Doe", amount: 5000, status: "Paid" },
    { id: 2, name: "Jane Smith", amount: 4500, status: "Pending" },
  ]);

  const addInvoice = () => {
    const newInvoice = {
      id: invoices.length + 1,
      name: `Invoice #${100 + invoices.length}`,
      status: "Pending",
      days: 0,
    };
    setInvoices([...invoices, newInvoice]);
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  const generateReport = () => {
    const newReport = `Generated Report #${reports.length + 1}`;
    setReports([...reports, newReport]);
  };

  const deleteReport = (index) => {
    setReports(reports.filter((_, i) => i !== index));
  };

    // Calculator State
    const [calcInput, setCalcInput] = useState("");

    const handleCalcInput = (value) => {
      setCalcInput((prev) => prev + value);
    };
  
    const calculateResult = () => {
      try {
        setCalcInput(eval(calcInput).toString());
      } catch {
        setCalcInput("Error");
      }
    };
  
    const clearCalc = () => {
      setCalcInput("");
    };

    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
        <div className={styles.mainTitle}><h2>Accounts</h2></div>
          <div className={styles.panel}>
            <h3 className={styles.sectionTitle}>Filters</h3>
            <select className={styles.dropdown} onChange={(e) => setDateRange(e.target.value)}>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Year">This Year</option>
            </select>
  
            <div className={styles.repo}>
              <h3 className={styles.sectionTitle}>Reports</h3>
              <button className={styles.actionButton} onClick={generateReport}>Generate Report</button>
              <ul className={styles.reportList}>
                {reports.map((report, index) => (
                  <li key={index} className={styles.reportItem}>
                    {report} <button onClick={() => deleteReport(index)}>❌</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className={styles.panel}>
  <h2 className={styles.panelTitle}>Financial Overview</h2>
  <ul>
    <li><span>Total Revenue:</span> ${financialOverview.revenue}</li>
    <li><span>Total Expenses:</span> ${financialOverview.expenses}</li>
    <li><span>Profit/Loss:</span> ${financialOverview.profit}</li>
    <li><span>Cash Flow:</span> ${financialOverview.cashFlow}</li>
    <li><span>Bank Balance:</span> ${financialOverview.bankBalance}</li>
  </ul>
</div>
  
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Accounts Payable</h2>
            <ul className={styles.alertList}>
              {accountsPayable.map((payable) => (
                <li key={payable.id} className={styles.alertItem}>
                  {payable.vendor} - ${payable.amount} due in {payable.dueDays} days
                </li>
              ))}
            </ul>
          </div>
  
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Accounts Receivable</h2>
            <ul className={styles.alertList}>
              {accountsReceivable.map((receivable) => (
                <li key={receivable.id} className={styles.alertItem}>
                  {receivable.customer} - ${receivable.amount} overdue by {receivable.overdueDays} days
                </li>
              ))}
            </ul>
          </div>
  
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Payment Due Reminders</h2>
            <button className={styles.actionButton} onClick={addInvoice}>
              Add Invoice
            </button>
            <ul className={styles.alertList}>
              {invoices.map((invoice) => (
                <li key={invoice.id} className={styles.alertItem}>
                  {invoice.name} - {invoice.status} {invoice.days} Days
                  <button onClick={() => deleteInvoice(invoice.id)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
  
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Employee Payments</h2>
            <ul className={styles.alertList}>
              {employeePayments.map((payment) => (
                <li key={payment.id} className={styles.alertItem}>
                  {payment.name} - ${payment.amount} ({payment.status})
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          <h2 className={styles.panelTitle}>Notifications</h2>
          <ul className={styles.alertList}>
            <li className={styles.alertItem}>New invoice received</li>
            <li className={styles.alertItem}>Expense report submitted</li>
            <li className={styles.alertItem}>Bank balance updated</li>
          </ul>
  
          <h2 className={styles.panelTitle}>Quick Actions</h2>
          <button className={styles.actionButton}>View Statements</button>
          <button className={styles.actionButton}>Settings</button>
          
          {/* Calculator Section */}
          <h2 className={styles.panelTitle}>Calculator</h2>
          <div className={styles.calculator}>
            <input type="text" className={styles.calcDisplay} value={calcInput} readOnly />
            <div className={styles.calcButtons}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "=", "+", "-", "*", "/"].map((btn) => (
                <button key={btn} onClick={() => (btn === "=" ? calculateResult() : handleCalcInput(btn))}>
                  {btn}
                </button>
              ))}
              <button onClick={clearCalc} className={styles.clearBtn}>C</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AccountsDashboard;