import Laboratory from "../../components/laboratory/Laboratory";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const LaboratoryDash = () => {
    return (
      <div className="home">
        <Navbar />
        <Sidebar />
        <Laboratory />
      </div>
    );
  };

  export default LaboratoryDash