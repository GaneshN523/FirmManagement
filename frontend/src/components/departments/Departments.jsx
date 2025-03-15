import React, { useState, useEffect } from "react";
import styles from "./departments.module.css";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../../api";

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    employees: "",
    machinery: "",
    hierarchy: [],
    additionalFields: []
  });

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      // Convert additional_fields from backend to additionalFields for the UI
      const data = response.data.map(dept => ({
        ...dept,
        additionalFields: dept.additional_fields
      }));
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  const handleInputChange = (e) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
  };

  const addNewInputField = () => {
    setNewDepartment((prevState) => ({
      ...prevState,
      additionalFields: [...prevState.additionalFields, ""]
    }));
  };

  const handleAdditionalInputChange = (e, index) => {
    const updatedFields = [...newDepartment.additionalFields];
    updatedFields[index] = e.target.value;
    setNewDepartment({ ...newDepartment, additionalFields: updatedFields });
  };

  const deleteAdditionalField = (index) => {
    setNewDepartment((prevState) => ({
      ...prevState,
      additionalFields: prevState.additionalFields.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setNewDepartment({
      name: "",
      employees: "",
      machinery: "",
      hierarchy: [],
      additionalFields: []
    });
    setEditDepartment(null);
  };

  // Call the API to add a department
  const addDepartmentHandler = async () => {
    const payload = {
      name: newDepartment.name,
      employees: parseInt(newDepartment.employees),
      machinery: newDepartment.machinery,
      hierarchy: newDepartment.hierarchy,
      additional_fields: newDepartment.additionalFields
    };

    try {
      await createDepartment(payload);
      setShowForm(false);
      resetForm();
      fetchDepartments();
    } catch (error) {
      console.error("Failed to add department", error);
    }
  };

  // Call the API to update a department
  const saveEditDepartmentHandler = async () => {
    const payload = {
      name: newDepartment.name,
      employees: parseInt(newDepartment.employees),
      machinery: newDepartment.machinery,
      additional_fields: newDepartment.additionalFields
    };

    try {
      await updateDepartment(editDepartment.id, payload);
      setShowForm(false);
      setEditDepartment(null);
      resetForm();
      fetchDepartments();
    } catch (error) {
      console.error("Failed to update department", error);
    }
  };

  // Call the API to delete a department
  const deleteDepartmentHandler = async (id) => {
    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      console.error("Failed to delete department", error);
    }
  };

  // When editing, pre-populate the form with the department data
  const editDepartmentData = (dept) => {
    setEditDepartment(dept);
    setNewDepartment({
      name: dept.name,
      employees: dept.employees,
      machinery: Array.isArray(dept.machinery) ? dept.machinery.join(",") : dept.machinery,
      hierarchy: dept.hierarchy,
      additionalFields: [...dept.additionalFields]
    });
    setShowForm(true);
  };

  return (
    <div className={styles.departmentManager}>
      <div>
        <h2>Departments</h2>
      </div>
      <button className={styles.deptAdd} onClick={() => { resetForm(); setShowForm(true); }}>
        Add Department
      </button>

      {showForm && (
        <div className={styles.formContainer}>
          <h2>{editDepartment ? "Edit Department" : "Add New Department"}</h2>

          <input
            className={styles.inputField}
            name="name"
            placeholder="Department Name"
            value={newDepartment.name}
            onChange={handleInputChange}
          />
          <br />
          <input
            className={styles.inputField}
            name="employees"
            placeholder="Number of Employees"
            value={newDepartment.employees}
            onChange={handleInputChange}
          />
          <br />
          <input
            className={styles.inputField}
            name="machinery"
            placeholder="Machinery (comma-separated)"
            value={newDepartment.machinery}
            onChange={handleInputChange}
          />
          <br />

          {newDepartment.additionalFields.map((field, index) => (
            <div key={index} className={styles.additionalFieldContainer}>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Additional Info"
                value={field}
                onChange={(e) => handleAdditionalInputChange(e, index)}
              />
              <button className={styles.deleteButton} onClick={() => deleteAdditionalField(index)}>
                Delete Field
              </button>
            </div>
          ))}

          <button className={styles.addButton} onClick={addNewInputField}>Add Field</button>
          <button
            className={styles.saveButton}
            onClick={editDepartment ? saveEditDepartmentHandler : addDepartmentHandler}
          >
            Save
          </button>
          <button className={styles.cancelButton} onClick={() => { setShowForm(false); resetForm(); }}>
            Cancel
          </button>
        </div>
      )}

      <div className={styles.gridContainer}>
        {departments.map((dept) => (
          <div className={styles.gridItem} key={dept.id}>
            <div className={styles.header}>
              <h2>{dept.name}</h2>
              <div>
                <button className={styles.editButton} onClick={() => editDepartmentData(dept)}>
                  Edit
                </button>
                <button className={styles.deleteButton} onClick={() => deleteDepartmentHandler(dept.id)}>
                  Delete
                </button>
              </div>
            </div>
            <p>Employees: {dept.employees}</p>
            <p>
              Machinery: {Array.isArray(dept.machinery) ? dept.machinery.join(", ") : dept.machinery}
            </p>
            <h3>Additional Information:</h3>
            <ul>
              {dept.additionalFields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManager;
