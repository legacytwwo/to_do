from app import db

from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class Tasks(db.Model):
  __tablename__ = 'tasks'
  ##################
  id = db.Column(db.String(50), primary_key=True)
  created_at = db.Column(db.DateTime(timezone=False))
  updated_at = db.Column(db.DateTime(timezone=False))
  ##################
  finished = db.Column(db.Boolean)
  category = db.Column(db.String(50))
  description = db.Column(db.String(500))
  deadline = db.Column(db.DateTime(timezone=False))
  ##################
  @property
  def label(self):
    return self.category
  def dict(self):
    return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}

class TasksScheme(BaseModel):
  id: Optional[str]
  category: Optional[str]
  finished: Optional[bool]
  description: Optional[str]
  deadline: Optional[datetime]
  created_at: Optional[datetime]
  updated_at: Optional[datetime]
  class Config: orm_mode = True

class PaginationScheme(BaseModel):
  page: Optional[int] = 1
  itemCount: Optional[int]
  pageSize: Optional[int] = 10
  class Config: orm_mode = True