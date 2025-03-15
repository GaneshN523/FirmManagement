import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // FastAPI backend


// Dashboard Section


export const getProductionData = async () => {
    const response = await axios.get(`${API_BASE_URL}/production/`);
    return response.data;
};

export const getMachineData = async () => {
    const response = await axios.get(`${API_BASE_URL}/machine/`);
    return response.data;
}

export const getDefectData = async () => {
    const response = await axios.get(`${API_BASE_URL}/defects/`);
    return response.data;
}

export const getProductivityData = async () => {
    const response = await axios.get(`${API_BASE_URL}/productivity/`);
    return response.data;
}

export const getInventoryData = async () => {
    const response = await axios.get(`${API_BASE_URL}/inventory/`);
    return response.data;
}


//  Departments Section


// GET all departments
export const getDepartments = async () => {
  return await axios.get(`${API_BASE_URL}/departments`);
};

// CREATE a new department
// Expects an object with keys: name, employees, machinery, hierarchy, additional_fields
export const createDepartment = async (department) => {
  return await axios.post(`${API_BASE_URL}/departments`, department);
};

// UPDATE an existing department
export const updateDepartment = async (id, department) => {
  return await axios.put(`${API_BASE_URL}/departments/${id}`, department);
};

// DELETE a department by ID
export const deleteDepartment = async (id) => {
  return await axios.delete(`${API_BASE_URL}/departments/${id}`);
};




//  Machines Section 


export const fetchMachines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/machines`);
      return response.data;
    } catch (error) {
      console.error("Error fetching machines", error);
      throw error;
    }
  };
  
  export const createMachine = async (machineData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/machines`, machineData);
      return response.data;
    } catch (error) {
      console.error("Error creating machine", error);
      throw error;
    }
  };
  
  export const updateMachine = async (id, machineData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/machines/${id}`, machineData);
      return response.data;
    } catch (error) {
      console.error("Error updating machine", error);
      throw error;
    }
  };
  
  export const deleteMachine = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/machines/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting machine", error);
      throw error;
    }
  };




// Workers Section 

  export const getWorkers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching workers:", error);
      throw error;
    }
  };
  
  export const addWorker = async (worker) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/workers`, worker);
      return response.data;
    } catch (error) {
      console.error("Error adding worker:", error);
      throw error;
    }
  };
  
  export const deleteWorker = async (workerId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/workers/${workerId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting worker:", error);
      throw error;
    }
  };


//  Laboratory Section 

const BASE_URL = "http://127.0.0.1:8000/api"; // Ensure the base URL includes '/api'

export const getLiveData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/live-data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching live data:", error.response?.data || error.message);
    throw error;
  }
};

// Get reports with optional period filter
export const getReports = async (period = "weekly") => {
  try {
    const response = await axios.get(`${BASE_URL}/reports`, {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new report
export const createReport = async (report) => {
  try {
    const response = await axios.post(`${BASE_URL}/reports`, report);
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing report
export const updateReport = async (id, report) => {
  try {
    const response = await axios.put(`${BASE_URL}/reports/${id}`, report);
    return response.data;
  } catch (error) {
    console.error("Error updating report:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a report
export const deleteReport = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reports/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting report:", error.response?.data || error.message);
    throw error;
  }
};