# app/schemas.py
from typing import List, Any, Optional
from pydantic import BaseModel

# Machines Section 

class DataPoint(BaseModel):
    time: str
    value: float

class MachineBase(BaseModel):
    name: str
    efficiency: int
    speed: int
    temperature: int
    chart_type: str  # "line" or "bar"

class MachineCreate(MachineBase):
    data: List[DataPoint]

class MachineUpdate(MachineBase):
    data: Optional[List[DataPoint]]  # Optional in case you want to update only parameters

class Machine(MachineBase):
    id: int
    data: List[DataPoint]

    class Config:
        from_attributes = True



# Workers Section 


class WorkerBase(BaseModel):
    name: str
    age: int
    position: str

class WorkerCreate(WorkerBase):
    pass

class Worker(WorkerBase):
    id: int

    class Config:
        from_attributes = True


# Laboratory Section 

class Parameter(BaseModel):
    parameter: str
    value: str

class ReportCreate(BaseModel):
    stage: str
    quality: str
    remarks: str
    parameters: list[Parameter]

class ReportResponse(ReportCreate):
    id: int

    class Config:
        from_attributes = True