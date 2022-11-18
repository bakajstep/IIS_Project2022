import email
from trovy import app
from flask import render_template, redirect, url_for, flash
from trovy.models import User
from trovy.forms import RegisterForm, LoginForm
from trovy import db
from flask_login import login_user, logout_user, login_required

@app.route("/")
@app.route("/home")
def home_page():
    return render_template('home.html')

@app.route("/test1")
#@login_required
def test1():    
    return render_template('test1.html')

@app.route('/test2')
#@login_required
def test2():
    try:
        users = User.query.all()     
    except:
        users = [
        {'id': 1, 'email': 'dsad@dsda.com', 'password_hash': "dsadsadsadasda"},
        {'id': 2, 'email': 'dsdasda233@dsda.com', 'password_hash': "dsadjghjghjghjgh"}        
    ]
    
    return render_template('test2.html', users=users)

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = User(email=form.email_address.data, password=form.password1.data)
        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(f'Úspešne ste si vytvorili účet! Ste prihlásený ako: {user_to_create.email}', category='success')
        return redirect(url_for('test2'))
    
    if form.errors != {}:
        for err_msg in form.errors.values():
            if err_msg == ['Invalid email address.']:
                err_msg = 'Neplatná emailová adresa'
            if err_msg == ['Field must be equal to password1.']:
                err_msg = 'Heslá sa musia zhodovať'
            flash(f'Pri vytváraní používateľa sa vyskytla chyba: {err_msg}', category='danger')
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = User.query.filter_by(email=form.email_address.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=form.password.data):
            login_user(attempted_user)
            flash(f'Super! Ste prihlásený ako: {attempted_user.email}', category='success')
            return redirect(url_for('home_page'))
        else:
            flash('Nesprávny email alebo heslo! Skúste to prosím znovu.', category='danger')

    return render_template('login.html', form=form)

@app.route('/logout')
def logout_page():
    logout_user()     
    flash("You have been logged out!", category='info')
    return redirect(url_for("home_page"))

