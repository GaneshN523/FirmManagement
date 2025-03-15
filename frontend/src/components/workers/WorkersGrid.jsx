// In your WorkersGrid.jsx
import React, { useState, useEffect } from "react";
import styles from "./workersgrid.module.css";
import { getWorkers, addWorker, deleteWorker } from "../../api"; // adjust the path accordingly

const WorkersGrid = () => {
  const [workers, setWorkers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: "", age: "", position: "" });

  // Fetch workers from the API when the component mounts.
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (error) {
      console.error("Failed to fetch workers", error);
    }
  };

  const handleChange = (e) => {
    setNewWorker({ ...newWorker, [e.target.name]: e.target.value });
  };

  const handleAddWorker = async () => {
    if (!newWorker.name || !newWorker.age || !newWorker.position) return;

    try {
      await addWorker({ 
        name: newWorker.name, 
        age: Number(newWorker.age), 
        position: newWorker.position 
      });
      setOpen(false);
      setNewWorker({ name: "", age: "", position: "" });
      fetchWorkers();
    } catch (error) {
      console.error("Error adding worker", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorker(id);
      fetchWorkers();
    } catch (error) {
      console.error("Error deleting worker", error);
    }
  };

  return (
    <div className={styles.componentContainer}>
      <div><h2>Workers</h2></div>
      <button 
        className={styles.addWorkerBtn}
        onClick={() => setOpen(true)}
      >
        Add Worker
      </button>
      
      <div className={styles.workersgrid}>
        <table className={styles.workersTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.name}</td>
                <td>{worker.age}</td>
                <td>{worker.position}</td>
                <td>
                  <button 
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(worker.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Add Worker</h2>
            <input 
              className={styles.inputField} 
              placeholder="Name" 
              name="name" 
              value={newWorker.name} 
              onChange={handleChange}
            />
            <input 
              className={styles.inputField} 
              type="number" 
              placeholder="Age" 
              name="age" 
              value={newWorker.age} 
              onChange={handleChange}
            />
            <input 
              className={styles.inputField} 
              placeholder="Position" 
              name="position" 
              value={newWorker.position} 
              onChange={handleChange}
            />
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelBtn} 
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmBtn} 
                onClick={handleAddWorker}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkersGrid;
