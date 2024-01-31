from . import db
from werkzeug.security import generate_password_hash, check_password_hash
import json


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(10280), nullable=False)
    email = db.Column(db.String(256), unique=True, nullable=False)
    supervisor_email = db.Column(db.String(502), unique=False, nullable=False)

    switch_times_alert = db.Column(db.Text, unique=False, nullable=True) # when person requests to change worktime
    schedule_change_alert = db.Column(db.Text, unique=False, nullable=True) # when schedule changes
    request_alert = db.Column(db.Text, unique=False,
                              nullable=True)  # like when supervisor approves a sick day or vacation day DELETE?
    msg_alert = db.Column(db.Text, unique=False, nullable=True)

    vacation_days = db.Column(db.Integer, unique=False, nullable=True)
    sick_days = db.Column(db.Integer, unique=False, nullable=True)
    weekTime_worked = db.Column(db.String(100), unique=False, nullable=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __init__(self, username, password, email, supervisor_email):
        self.username = username
        self.set_password(password)
        self.email = email
        self.supervisor_email = supervisor_email

        self.vacation_days = 0
        self.sick_days = 0
        self.weekTime_worked = 0


class Supervisor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(10280), nullable=False)
    email = db.Column(db.String(256), unique=True, nullable=False)
    employees_emails = db.Column(db.String(502), unique=False, nullable=True)

    employee_added_alert = db.Column(db.Text, unique=False, nullable=True)
    sick_day_alert = db.Column(db.Text, unique=False, nullable=True)
    vacation_day_alert = db.Column(db.Text, unique=False, nullable=True)
    msg_alert = db.Column(db.Text, unique=False, nullable=True)

    history = db.Column(db.Text, unique=False, nullable=True)

    vacation_days = db.Column(db.Integer, unique=False, nullable=True)
    sick_days = db.Column(db.Integer, unique=False, nullable=True)
    weekTime_worked = db.Column(db.String(100), unique=False, nullable=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __init__(self, username, password, email):
        self.username = username
        self.set_password(password)
        self.email = email

        self.vacation_days = 0
        self.sick_days = 0
        self.weekTime_worked = 0


class ShiftCalendar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(2000), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(2000), nullable=True)
    supervisor = db.Column(db.String(1000), nullable=True)
    employee = db.Column(db.String(10000), nullable=True)


# switch working times with other employees, request sick day/
class Requests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(256), unique=True, nullable=False)

    # only if it's for a calendar event change
    date = db.Column(db.Date, nullable=True)
    start_time = db.Column(db.Time, nullable=True)
    end_time = db.Column(db.Time, nullable=True)

    date_change = db.Column(db.Date, nullable=True)
    start_time_change = db.Column(db.Time, nullable=True)
    end_time_change = db.Column(db.Time, nullable=True)

    supervisor_email = db.Column(db.String(256), unique=False, nullable=True)
    from_employee_email = db.Column(db.String(256), unique=False, nullable=False)
    to_email = db.Column(db.String(256), unique=False, nullable=True)

    message = db.Column(db.Text, unique=False, nullable=True)
