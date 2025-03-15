# app/models.py
from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, Text, JSON
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.sql import func
from app.database import Base  # Absolute import for Base


# Departments Model

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    employees = Column(Integer, nullable=False)
    # Expect comma-separated values for machinery and additional_fields
    machinery = Column(ARRAY(String))
    hierarchy = Column(ARRAY(String))  # Adjust as needed for your use case
    additional_fields = Column(ARRAY(String))


# Dashboard Model

class ProductionData(Base):
    __tablename__ = "production_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    target = Column(Integer, nullable=False)
    actual = Column(Integer, nullable=False)

class MachineStatus(Base):
    __tablename__ = "machine_status"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    previous = Column(Integer, nullable=False)
    current = Column(Integer, nullable=False)
    recorded_at = Column(TIMESTAMP, default=func.now())

class Inventory(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    stock_level = Column(Integer, nullable=False)
    expected_level = Column(Integer, nullable=False)
    updated_at = Column(TIMESTAMP, default=func.now())

class Defects(Base):
    __tablename__ = "defects"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    defect_count = Column(Integer, nullable=False)

class WorkforceProductivity(Base):
    __tablename__ = "workforce_productivity"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    productivity = Column(Integer, nullable=False)


# Machinery Model

class Machine(Base):
    __tablename__ = "machines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    efficiency = Column(Integer, nullable=False)
    speed = Column(Integer, nullable=False)
    temperature = Column(Integer, nullable=False)
    chart_type = Column(String, nullable=False)  # e.g., "line" or "bar"
    # We store data as a JSON string.
    data = Column(Text, nullable=False)


# Workers Section 


class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    position = Column(String)



# Laboratory Section 

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    stage = Column(String, index=True)
    quality = Column(String)
    remarks = Column(String)
    # Store parameters as JSON. This field will contain an array of objects.
    parameters = Column(JSON)