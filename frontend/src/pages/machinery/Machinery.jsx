import MachineryDashboard from "../../components/machinery/Machinery";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Machinery = () => {
    return (
      <div className="home">
        <Navbar />
        <Sidebar />
        <MachineryDashboard />
      </div>
    );
  };

  export default Machinery