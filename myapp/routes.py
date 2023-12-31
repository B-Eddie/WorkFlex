import werkzeug
from flask import Blueprint, request, render_template, session, flash, redirect, url_for, current_app, \
    send_from_directory
from myapp import db, create_app
from .models import ShiftCalendar, Employee, Supervisor
# from .forms import ProductForm, lost_and_found_form
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
import os
from werkzeug.utils import secure_filename
import random
import json

bp = Blueprint('bp', __name__, static_folder='',
               static_url_path='/static')  # bp = Blueprint('bp', __name__, static_folder='static', static_url_path='/static')


@bp.route("/")
def index():
    if 'existing_user_login.id' in session and 'employee-supervisor' in session:
        return redirect(url_for('bp.home'))
    else:
        return render_template('index.html')


@bp.route("/home")
def home():
    if 'existing_user_login.id' in session and 'employee-supervisor' in session:
        id = session['existing_user_login.id']
        if session['employee-supervisor'] == 'employee':
            info = Employee.query.filter_by(id=id).first()
            shifts = ShiftCalendar.query.all()  # fix this
            return render_template('home/home.html', info=info, shifts=shifts, employee_supervisor="employee")
        elif session['employee-supervisor'] == 'supervisor':
            info = Supervisor.query.filter_by(id=id).first()
            shifts = ShiftCalendar.query.all()  # fix this
            return render_template('home/home.html', info=info, shifts=shifts, employee_supervisor="supervisor")
    return redirect(url_for('bp.index'))


@bp.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        signup_username = request.form.get("signup-username")
        signup_email = request.form.get("signup-email")
        signup_password = request.form.get("signup-password")
        signup_employee_supervisor = request.form.get("signup-es")
        signup_supervisor_email = request.form.get("signup-supervisor-email")

        if signup_employee_supervisor == "supervisor":
            existing_username = Supervisor.query.filter_by(username=signup_username).first()
            existing_email = Supervisor.query.filter_by(email=signup_email).first()
            if existing_username or existing_email:
                flash("Username or email taken")
                return redirect(url_for('bp.index'))
            else:
                new_user = Supervisor(username=signup_username, password=signup_password, email=signup_email)
                db.session.add(new_user)
                db.session.commit()

                existing_user_login = Supervisor.query.filter_by(email=signup_email).first()

                session['existing_user_login.id'] = existing_user_login.id
                session['employee-supervisor'] = 'supervisor'
                flash('Login successful!')
                session['logged_in'] = True
                return redirect(url_for('bp.home'))
        elif signup_employee_supervisor == "employee":
            existing_username = Employee.query.filter_by(username=signup_username).first()
            existing_email = Employee.query.filter_by(email=signup_email).first()
            existing_supervisor_email = Supervisor.query.filter_by(email=signup_supervisor_email).first()

            if existing_username or existing_email:
                flash("Username or email taken")
                return redirect(url_for('bp.index'))
            else:
                if existing_supervisor_email:
                    new_user = Employee(username=signup_username, password=signup_password, email=signup_email,
                                        supervisor_email=signup_supervisor_email)
                    db.session.add(new_user)
                    db.session.commit()

                    existing_user_login = Employee.query.filter_by(email=signup_email).first()

                    session['existing_user_login.id'] = existing_user_login.id
                    session['employee-supervisor'] = 'employee'
                    flash('Login successful!')
                    session['logged_in'] = True
                    return redirect(url_for('bp.home'))
                else:
                    flash("Supervisor email not found")
                    return redirect(url_for('bp.index'))
    return redirect(url_for('bp.index'))  # might be wrong


@bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login_email = request.form.get("login-email")
        login_password = request.form.get("login-password")
        login_em = request.form.get("login-es")

        if login_em == 'login-supervisor':
            existing_user_login = Supervisor.query.filter_by(email=login_email).first()
            if existing_user_login and existing_user_login.check_password(login_password):
                session['existing_user_login.id'] = existing_user_login.id
                flash('Login successful!')
                session['logged_in'] = True
                session['employee-supervisor'] = 'supervisor'
                return redirect(url_for('bp.home'))
            else:
                flash("Email or password wrong")
                return redirect(url_for('bp.index'))

        elif login_em == 'login-employee':
            existing_user_login = Employee.query.filter_by(email=login_email).first()
            if existing_user_login and existing_user_login.check_password(login_password):
                session['existing_user_login.id'] = existing_user_login.id
                flash('Login successful!')
                session['logged_in'] = True
                session['employee-supervisor'] = 'employee'

                return redirect(url_for('bp.home'))
            else:
                flash("Email or password wrong")
                return redirect(url_for('bp.index'))
        else:
            flash("\"Employee\" or \"Supervisor\" not checked")
            return redirect(url_for('bp.index'))

    return redirect(url_for('bp.home'))


@bp.route("/calendar")
def calendar():
    if 'existing_user_login.id' in session and 'employee-supervisor' in session:
        id = session['existing_user_login.id']
        if session['employee-supervisor'] == 'employee':
            info = Employee.query.filter_by(id=id).first()
            shifts = ShiftCalendar.query.all()  # fix this
            return render_template('calendar/calendar.html', info=info, shifts=shifts, employee_supervisor="employee")
        elif session['employee-supervisor'] == 'supervisor':
            info = Supervisor.query.filter_by(id=id).first()
            shifts = ShiftCalendar.query.all()  # fix this
            return render_template('calendar/calendar.html', info=info, shifts=shifts, employee_supervisor="supervisor")
    return redirect(url_for('bp.index'))


@bp.route("/request-work-time-change")
def rwtc():
    shifts = ShiftCalendar.query.all()
    return render_template('request-work-time-change/rwtc.html', shifts=shifts)


@bp.route("/employees")
def employees():
    return render_template("employees/employees.html")

@bp.route("/get_events")
def get_events():
    events = [
        {'title': 'Event 1', 'start': '2023-12-28', 'description': 'hiasef'},
        {'title': 'Event 2', 'start': '2023-11-16'},
        {'id': 1, 'title': 'Event 21', 'start': '2023-11-01T10:00:00', 'end': '2023-11-01T12:00:00'},
    ]
    return json.dumps(events)
