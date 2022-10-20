from flask import Flask
from flask_cors import CORS
from config import Configuration
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(Configuration)
cors = CORS(app, resources={r'/*': {'origins': '*'}})

db = SQLAlchemy(app)

from models.core import *
from flask_migrate import Migrate

migrate = Migrate(app, db)