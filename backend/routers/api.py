from uuid import uuid4
from datetime import datetime
from pydantic import ValidationError

from app import app, db
from models.core import *
from lib.flask import jsonify, request

@app.route('/api/tasks', methods=['GET'])
def route_get_tasks():
  try:
    offset = None
    page = int(request.args['page'])
    category = request.args['category']
    if page > 1:
      offset = (page - 1) * 10
    query = db.session.query(Tasks)
    query = query.filter(Tasks.category == category)
    count = query.count()
    query = query.limit(10).offset(offset)
    query_result = query.all()
    answer = []
    for x in query_result:
      answer.append({
        'id': x.id,
        'deadline': x.deadline,
        'finished': x.finished,
        'description': x.description,
      })
    pagination = {
      'itemCount': count,
      'pageSize': 10, 'page': page,
    }
    return jsonify({
      'response': answer,
      'pagination': pagination
    })
  except Exception as err:
    return jsonify({'status': 'Error'})

@app.route('/api/tasks', methods=['POST'])
def route_post_tasks():
  try:
    params = request.json
    if params['deadline']:
      params['deadline'] = datetime.fromtimestamp(params['deadline']/1000.0)
    try:
      task = TasksScheme(**params)
    except ValidationError as err:
      return jsonify(err.json())

    task.id = str(uuid4())
    task.created_at = datetime.now()
    record = Tasks(**task.dict())

    record = db.session.merge(record)
    db.session.flush()
    db.session.refresh(record)
    db.session.commit()

    return jsonify(record.dict())
  except Exception as err:
    return jsonify({'status': 'Error'})

@app.route('/api/tasks', methods=['PUT'])
def route_put_tasks():
  try:
    params = request.json
    if not params['id']:
      return jsonify({'status': 'id not received'})
    try:
      task = TasksScheme(**params)
    except ValidationError as err:
      return jsonify(err.json())

    params['updated_at'] = datetime.now()
    record = Tasks(**params)
    record = db.session.merge(record)
    db.session.flush()
    db.session.refresh(record)
    db.session.commit()
    return jsonify({'status': True})
  except Exception as err:
    return jsonify({'status': 'Error'})

@app.route('/api/tasks-flag', methods=['PUT'])
def route_put_tasks_flag():
  try:
    id = request.args['id']
    query = db.session.query(Tasks)
    query = query.filter(Tasks.id == id)
    query = query.first()
    params = {
      'id': id,
      'updated_at': datetime.now(),
      'finished': not query.finished
    }
    print(params)
    record = Tasks(**params)
    record = db.session.merge(record)
    db.session.flush()
    db.session.refresh(record)
    db.session.commit()
    return jsonify({'status': True})
  except Exception as err:
    return jsonify({'status': 'Error'})

@app.route('/api/tasks', methods=['DELETE'])
def route_delete_tasks():
  try:
    id = request.args['id']
    Tasks.query.filter(Tasks.id == id).delete()
    db.session.commit()
    return jsonify({'status': True})
  except Exception as err:
    return jsonify({'status': 'Error'})