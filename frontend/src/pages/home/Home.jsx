import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FactoryDashboard from "../../components/dashboard/Dashboard";

const Home = () => {
    return (
      <div className="home">
        <Navbar />
        <Sidebar />
        <FactoryDashboard />
      </div>
    );
  };
  
  export default Home;