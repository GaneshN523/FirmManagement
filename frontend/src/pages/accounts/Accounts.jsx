import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AccountsDashboard from "../../components/Accounts/Accounts";

const Accounts = () => {
    return (
      <div className="home">
        <Navbar />
        <Sidebar />
        <AccountsDashboard />
      </div>
    );
  };

  export default Accounts