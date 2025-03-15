import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DepartmentManager from "../../components/departments/Departments";

const Department = () => {
    return (
      <div className="home">
        <Navbar />
        <Sidebar />
        <DepartmentManager />
      </div>
    );
  };

  export default Department