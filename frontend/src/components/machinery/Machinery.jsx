// MachineryDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./machinery.module.css";
import {
  fetchMachines,
  createMachine as createMachineAPI,
  updateMachine as updateMachineAPI,
  deleteMachine as deleteMachineAPI,
} from "../../api";

export default function MachineryDashboard() {
  // The machines will now be loaded from the backend.
  const [machines, setMachines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMachine, setEditMachine] = useState(null);
  const [newMachine, setNewMachine] = useState({
    name: "",
    efficiency: "",
    speed: "",
    temperature: "",
    chartType: "line", // This will map to the backend field "chart_type"
    data: [],
  });

  // Load machines when the component mounts.
  useEffect(() => {
    loadMachines();
  }, []);

  const loadMachines = async () => {
    try {
      const machinesData = await fetchMachines();
      setMachines(machinesData);
    } catch (error) {
      console.error("Error fetching machines", error);
    }
  };

  const handleInputChange = (e) => {
    setNewMachine({ ...newMachine, [e.target.name]: e.target.value });
  };

  // Create a new machine using the backend API.
  const addMachine = async () => {
    try {
      // Prepare payload for the API.
      const machinePayload = {
        name: newMachine.name,
        efficiency: parseInt(newMachine.efficiency),
        speed: parseInt(newMachine.speed),
        temperature: parseInt(newMachine.temperature),
        chart_type: newMachine.chartType,
        // Generate random data points for demonstration.
        data: [
          { time: "10:00", value: Math.random() * 100 },
          { time: "11:00", value: Math.random() * 100 },
          { time: "12:00", value: Math.random() * 100 },
        ],
      };

      const createdMachine = await createMachineAPI(machinePayload);
      setMachines([...machines, createdMachine]);
      setShowForm(false);
      // Reset the form fields.
      setNewMachine({
        name: "",
        efficiency: "",
        speed: "",
        temperature: "",
        chartType: "line",
        data: [],
      });
    } catch (error) {
      console.error("Error creating machine", error);
    }
  };

  // Delete a machine using the backend API.
  const deleteMachine = async (id) => {
    try {
      await deleteMachineAPI(id);
      setMachines(machines.filter((machine) => machine.id !== id));
    } catch (error) {
      console.error("Error deleting machine", error);
    }
  };

  // When editing, prefill the form with the machine’s current details.
  const editMachineData = (machine) => {
    setEditMachine(machine);
    setNewMachine({
      name: machine.name,
      // Depending on your API response, the numeric fields might be top-level
      // or inside a "parameters" object. Adjust accordingly.
      efficiency: machine.efficiency || machine.parameters?.efficiency,
      speed: machine.speed || machine.parameters?.speed,
      temperature: machine.temperature || machine.parameters?.temperature,
      // Map "chart_type" from the backend to "chartType" used in the form.
      chartType: machine.chart_type || machine.chartType,
      data: machine.data,
    });
    setShowForm(true);
  };

  // Save the updated machine using the backend API.
  const saveEditMachine = async () => {
    try {
      const machinePayload = {
        name: newMachine.name,
        efficiency: parseInt(newMachine.efficiency),
        speed: parseInt(newMachine.speed),
        temperature: parseInt(newMachine.temperature),
        chart_type: newMachine.chartType,
        // Not sending "data" here since it isn’t edited in the form.
      };
      const updatedMachine = await updateMachineAPI(editMachine.id, machinePayload);
      setMachines(
        machines.map((machine) =>
          machine.id === editMachine.id ? updatedMachine : machine
        )
      );
      setShowForm(false);
      setEditMachine(null);
      setNewMachine({
        name: "",
        efficiency: "",
        speed: "",
        temperature: "",
        chartType: "line",
        data: [],
      });
    } catch (error) {
      console.error("Error updating machine", error);
    }
  };

  return (
    <div className={styles["machinery-dashboard"]}>
      <div className={styles["main-content"]}>
        <div className={styles["main-title"]}>
          <h2>Machinery</h2>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditMachine(null);
            // Reset form when adding a new machine.
            setNewMachine({
              name: "",
              efficiency: "",
              speed: "",
              temperature: "",
              chartType: "line",
              data: [],
            });
          }}
        >
          Add Machine
        </button>

        {showForm && (
          <div className={styles["machine-form-overlay"]}>
            <h2>{editMachine ? "Edit Machine" : "Add New Machine"}</h2>
            <label>Name:</label>
            <input
              name="name"
              value={newMachine.name}
              onChange={handleInputChange}
            />
            <label>Efficiency:</label>
            <input
              name="efficiency"
              value={newMachine.efficiency}
              onChange={handleInputChange}
            />
            <label>Speed:</label>
            <input
              name="speed"
              value={newMachine.speed}
              onChange={handleInputChange}
            />
            <label>Temperature:</label>
            <input
              name="temperature"
              value={newMachine.temperature}
              onChange={handleInputChange}
            />
            <label>Chart Type:</label>
            <select
              name="chartType"
              value={newMachine.chartType}
              onChange={handleInputChange}
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
            <button onClick={editMachine ? saveEditMachine : addMachine}>
              Save
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}

        <div className={styles["machine-list"]}>
          {machines.map((machine) => (
            <div className={styles["machine-card"]} key={machine.id}>
              <div className={styles["machine-header"]}>
                <h2>{machine.name}</h2>
                <div>
                  <button onClick={() => editMachineData(machine)}>Edit</button>
                  <button onClick={() => deleteMachine(machine.id)}>
                    Delete
                  </button>
                </div>
              </div>
              <div className={styles["machine-details"]}>
                <p>
                  Efficiency:{" "}
                  {machine.efficiency || machine.parameters?.efficiency}% 
                </p>
                <p>
                  Speed:{" "}
                  {machine.speed || machine.parameters?.speed} RPM
                </p>
                <p>
                  Temperature:{" "}
                  {machine.temperature || machine.parameters?.temperature}°C
                </p>
              </div>
              <div className={styles["chart-container"]}>
                {(machine.chart_type === "line" || machine.chartType === "line") ? (
                  <LineChart width={300} height={200} data={machine.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                ) : (
                  <BarChart width={300} height={200} data={machine.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
