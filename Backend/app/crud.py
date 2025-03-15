# app/crud.py
# app/crud.py
import json
from sqlalchemy.orm import Session
from app import models, schemas  # Absolute import for models


def get_departments(db: Session):
    return db.query(models.Department).all()

def create_department(db: Session, department_data: dict):
    department = models.Department(
        name=department_data["name"],
        employees=department_data["employees"],
        machinery=[s.strip() for s in department_data["machinery"].split(",")],
        hierarchy=department_data.get("hierarchy", []),
        additional_fields=department_data.get("additional_fields", [])
    )
    db.add(department)
    db.commit()
    db.refresh(department)
    return department

def update_department(db: Session, department_id: int, department_data: dict):
    department = db.query(models.Department).filter(models.Department.id == department_id).first()
    if department:
        department.name = department_data["name"]
        department.employees = department_data["employees"]
        department.machinery = [s.strip() for s in department_data["machinery"].split(",")]
        department.additional_fields = department_data.get("additional_fields", [])
        db.commit()
        db.refresh(department)
    return department

def delete_department(db: Session, department_id: int):
    department = db.query(models.Department).filter(models.Department.id == department_id).first()
    if department:
        db.delete(department)
        db.commit()
    return department


# Machinery Section


def get_machine(db: Session, machine_id: int):
    return db.query(models.Machine).filter(models.Machine.id == machine_id).first()

def get_machines(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Machine).offset(skip).limit(limit).all()

def create_machine(db: Session, machine: schemas.MachineCreate):
    db_machine = models.Machine(
        name=machine.name,
        efficiency=machine.efficiency,
        speed=machine.speed,
        temperature=machine.temperature,
        chart_type=machine.chart_type,
        data=json.dumps([point.dict() for point in machine.data])
    )
    db.add(db_machine)
    db.commit()
    db.refresh(db_machine)
    return db_machine

def update_machine(db: Session, machine_id: int, machine: schemas.MachineUpdate):
    db_machine = get_machine(db, machine_id)
    if db_machine:
        db_machine.name = machine.name
        db_machine.efficiency = machine.efficiency
        db_machine.speed = machine.speed
        db_machine.temperature = machine.temperature
        db_machine.chart_type = machine.chart_type
        if machine.data is not None:
            db_machine.data = json.dumps([point.dict() for point in machine.data])
        db.commit()
        db.refresh(db_machine)
    return db_machine

def delete_machine(db: Session, machine_id: int):
    db_machine = get_machine(db, machine_id)
    if db_machine:
        db.delete(db_machine)
        db.commit()
    return db_machine