# app/main.py
import json
from fastapi import FastAPI, Depends, Body, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app import schemas
from app import models, crud, database
from app.models import Worker, Report
from app.schemas import ReportCreate, ReportResponse

# Create database tables (for initial development; later, use Alembic for migrations)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Configure CORS to allow requests from your frontend
origins = [
    "http://localhost:5173",  # Frontend (e.g., React development server)
    "http://localhost:8000",  # Optionally allow backend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get a database session per request
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET all departments
@app.get("/departments")
def read_departments(db: Session = Depends(get_db)):
    return crud.get_departments(db)

# POST: create a new department
@app.post("/departments")
def create_department(
    name: str = Body(...),
    employees: int = Body(...),
    machinery: str = Body(...),
    hierarchy: list = Body(default=[]),
    additional_fields: list = Body(default=[]),
    db: Session = Depends(get_db)
):
    department_data = {
        "name": name,
        "employees": employees,
        "machinery": machinery,
        "hierarchy": hierarchy,
        "additional_fields": additional_fields
    }
    return crud.create_department(db, department_data)

# PUT: update an existing department
@app.put("/departments/{department_id}")
def update_department(
    department_id: int,
    name: str = Body(...),
    employees: int = Body(...),
    machinery: str = Body(...),
    additional_fields: list = Body(default=[]),
    db: Session = Depends(get_db)
):
    department_data = {
        "name": name,
        "employees": employees,
        "machinery": machinery,
        "additional_fields": additional_fields
    }
    return crud.update_department(db, department_id, department_data)

# DELETE a department
@app.delete("/departments/{department_id}")
def delete_department(department_id: int, db: Session = Depends(get_db)):
    return crud.delete_department(db, department_id)



# Dashboard endpoints

# 1️⃣ Add production data
@app.post("/production/")
def add_production(date: str, target: int, actual: int, db: Session = Depends(get_db)):
    new_entry = models.ProductionData(date=date, target=target, actual=actual)
    db.add(new_entry)
    db.commit()
    return {"message": "Production data added successfully"}

# 2️⃣ Get all production data
@app.get("/production/")
def get_production(db: Session = Depends(get_db)):
    return db.query(models.ProductionData).all()

# 3️⃣ Add machine status
@app.post("/machine/")
def add_machine_status(type: str, previous: int, current: int, db: Session = Depends(get_db)):
    new_entry = models.MachineStatus(type=type, previous=previous, current=current)
    db.add(new_entry)
    db.commit()
    return {"message": "Machine status recorded"}

# 4️⃣ Get all machine statuses
@app.get("/machine/")
def get_machine_status(db: Session = Depends(get_db)):
    return db.query(models.MachineStatus).all()

# 5️⃣ Add inventory data
@app.post("/inventory/")
def add_inventory(stock_level: int, expected_level: int, db: Session = Depends(get_db)):
    new_entry = models.Inventory(stock_level=stock_level, expected_level=expected_level)
    db.add(new_entry)
    db.commit()
    return {"message": "Inventory updated"}

# 6️⃣ Get inventory data
@app.get("/inventory/")
def get_inventory(db: Session = Depends(get_db)):
    return db.query(models.Inventory).all()

# 7️⃣ Add defect data
@app.post("/defects/")
def add_defects(date: str, defect_count: int, db: Session = Depends(get_db)):
    new_entry = models.Defects(date=date, defect_count=defect_count)
    db.add(new_entry)
    db.commit()
    return {"message": "Defects recorded"}

# 8️⃣ Get defect data
@app.get("/defects/")
def get_defects(db: Session = Depends(get_db)):
    return db.query(models.Defects).all()

# 9️⃣ Add workforce productivity
@app.post("/productivity/")
def add_productivity(date: str, productivity: int, db: Session = Depends(get_db)):
    new_entry = models.WorkforceProductivity(date=date, productivity=productivity)
    db.add(new_entry)
    db.commit()
    return {"message": "Productivity recorded"}

# 🔟 Get workforce productivity
@app.get("/productivity/")
def get_productivity(db: Session = Depends(get_db)):
    return db.query(models.WorkforceProductivity).all()


# Machinery Section

@app.get("/machines", response_model=list[schemas.Machine])
def read_machines(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    machines = crud.get_machines(db, skip=skip, limit=limit)
    # Convert the JSON string to Python objects for the API response.
    for machine in machines:
        machine.data = json.loads(machine.data)
    return machines

@app.post("/machines", response_model=schemas.Machine)
def create_machine(machine: schemas.MachineCreate, db: Session = Depends(get_db)):
    db_machine = crud.create_machine(db, machine)
    db_machine.data = json.loads(db_machine.data)
    return db_machine

@app.put("/machines/{machine_id}", response_model=schemas.Machine)
def update_machine(machine_id: int, machine: schemas.MachineUpdate, db: Session = Depends(get_db)):
    db_machine = crud.update_machine(db, machine_id, machine)
    if db_machine is None:
        raise HTTPException(status_code=404, detail="Machine not found")
    db_machine.data = json.loads(db_machine.data)
    return db_machine

@app.delete("/machines/{machine_id}", response_model=schemas.Machine)
def delete_machine(machine_id: int, db: Session = Depends(get_db)):
    db_machine = crud.delete_machine(db, machine_id)
    if db_machine is None:
        raise HTTPException(status_code=404, detail="Machine not found")
    db_machine.data = json.loads(db_machine.data)
    return db_machine


# Workers Section 

@app.get("/workers", response_model=list[schemas.Worker])
def read_workers(db: Session = Depends(get_db)):
    workers = db.query(Worker).all()
    return workers

@app.post("/workers", response_model=schemas.Worker)
def create_worker(worker: schemas.WorkerCreate, db: Session = Depends(get_db)):
    db_worker = Worker(name=worker.name, age=worker.age, position=worker.position)
    db.add(db_worker)
    db.commit()
    db.refresh(db_worker)
    return db_worker

@app.delete("/workers/{worker_id}", response_model=dict)
def delete_worker(worker_id: int, db: Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    db.delete(worker)
    db.commit()
    return {"detail": "Worker deleted successfully"}


# Laboratory Section 


# 1. Endpoint to get live processing data (static sample data)
@app.get("/api/live-data")
def read_live_data():
    return {
        "totalCornProcessed": 12000,
        "totalGlucoseProduced": 9500,
        "batchNumber": "B-1023",
        "processingTime": "4h 35m",
        "status": "Running",
    }

# 2. Get all reports (optionally filter by period if needed)
@app.get("/api/reports", response_model=list[ReportResponse])
def get_reports(period: str = None, db: Session = Depends(get_db)):
    # For simplicity, we are not filtering by period in this example.
    reports = db.query(Report).all()
    return reports

# 3. Create a new report
@app.post("/api/reports", response_model=ReportResponse)
def create_report(report: ReportCreate, db: Session = Depends(get_db)):
    db_report = Report(
        stage=report.stage,
        quality=report.quality,
        remarks=report.remarks,
        parameters=[p.dict() for p in report.parameters]
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

# 4. Update an existing report
@app.put("/api/reports/{report_id}", response_model=ReportResponse)
def update_report(report_id: int, report: ReportCreate, db: Session = Depends(get_db)):
    db_report = db.query(Report).filter(Report.id == report_id).first()
    if not db_report:
        raise HTTPException(status_code=404, detail="Report not found")
    db_report.stage = report.stage
    db_report.quality = report.quality
    db_report.remarks = report.remarks
    db_report.parameters = [p.dict() for p in report.parameters]
    db.commit()
    db.refresh(db_report)
    return db_report

# 5. Delete a report
@app.delete("/api/reports/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    db_report = db.query(Report).filter(Report.id == report_id).first()
    if not db_report:
        raise HTTPException(status_code=404, detail="Report not found")
    db.delete(db_report)
    db.commit()
    return {"detail": "Report deleted successfully"}