import styles from "./dashboard.module.css";
import { useState, useEffect } from "react";
import { getProductionData } from "../../api";
import { getMachineData } from "../../api";
import { getDefectData } from "../../api";
import { getProductivityData } from "../../api";
import { getInventoryData } from "../../api";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
  Area,
} from "recharts";

const FactoryDashboard = ({ aspect, title }) => {

  const [productionData, setProductionData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [defectData, setDefectData] = useState([]);
  const [productivityData, setProductivityData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
 
 
  useEffect(() => {
    fetchProductionData();
  }, []);

  const fetchProductionData = async () => {
    try {
        const data = await getProductionData();
        
        // Format data for Recharts
        const formattedData = data.map((item) => ({
            name: item.date,  // X-axis
            Target: item.target,
            Actual: item.actual,
        }));

        setProductionData(formattedData);
    } catch (error) {
        console.error("Error fetching production data:", error);
    }
};

useEffect(() => {
  fetchMachineData();
}, []);

const fetchMachineData = async () => {
  try {
      const data = await getMachineData();
      
      // Format data for Recharts
      const formattedData = data.map((item) => ({
          name: item.type,  // X-axis
          Previous: item.previous,
          Current: item.current,
      }));

      setMachineData(formattedData);
  } catch (error) {
      console.error("Error fetching machine data:", error);
  }
};

useEffect(() => {
  fetchDefectData();
}, []);

const fetchDefectData = async () => {
  try {
      const data = await getDefectData();
      
      // Format data for Recharts
      const formattedData = data.map((item) => ({
          name: item.date,  // X-axis
          Defects: item.defect_count,
      }));

      setDefectData(formattedData);
  } catch (error) {
      console.error("Error fetching machine data:", error);
  }
};

useEffect(() => {
  fetchProductivityData();
}, []);

const fetchProductivityData = async () => {
  try {
      const data = await getProductivityData();
      
      // Format data for Recharts
      const formattedData = data.map((item) => ({
          day: item.date,  // X-axis
          productivity: item.productivity,
      }));

      setProductivityData(formattedData);
  } catch (error) {
      console.error("Error fetching machine data:", error);
  }
};

useEffect(() => {
  fetchInventoryData();
}, []);

const fetchInventoryData = async () => {
  try {
      const data = await getInventoryData();
      
      // Format data for Recharts
      const formattedData = data.map((item) => ({
          name: item.updated_at,  // X-axis
          Level: item.stock_level,
          Expected: item.expected_level,
      }));

      setInventoryData(formattedData);
  } catch (error) {
      console.error("Error fetching machine data:", error);
  }
};

  return (
    <div className={styles.factoryDashboard}>
      <div className={styles.mainTitle}><h2>Dashboard</h2></div>
      <div className={styles.title}>{title}</div>

      {/* Small Charts Row */}
      <div className={styles.smallChartsRow}>
        <div className={styles.smallChart} style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={machineData} barGap={2} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={false} />  {/* Hides labels */}
              <YAxis />
              <Tooltip />
              <Bar dataKey="Previous" fill="#ff9800" />
              <Bar dataKey="Current" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.chartTitle}>Machine Performance</div>
        </div>

        <div className={styles.smallChart}>
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart data={defectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Defects" fill="#ff6347" />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.chartTitle}>Defect Data</div>
        </div>

        <div className={styles.smallChart}>
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="productivity" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.chartTitle}>Workforce Productivity</div>
        </div>
      </div>

      {/* Big Charts Row */}
      <div className={styles.bigChartsRow}>
        <div className={styles.bigChart}>
          <ResponsiveContainer width="100%" aspect={aspect}>
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Target" stroke="#8884d8" />
              <Line type="monotone" dataKey="Actual" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div className={styles.chartTitle}>Production Data</div>
        </div>

        <div className={styles.bigChart}>
          <ResponsiveContainer width="100%" aspect={aspect}>
            <ComposedChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Level" fill="#4caf50" />
              <Line type="monotone" dataKey="Expected" stroke="#ff9800" />
              <Area type="monotone" dataKey="Level" fill="#c8e6c9" stroke="#388e3c" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className={styles.chartTitle}>Inventory Stock Level</div>
        </div>
      </div>
    </div>
  );
};

export default FactoryDashboard;
