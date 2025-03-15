import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import WorkersGrid from "../../components/workers/WorkersGrid";

const Workers = () => {
    return (
      <div className="home">
        <Navbar />
        <Sidebar />
        <WorkersGrid />
      </div>
    );
  };

  export default Workers