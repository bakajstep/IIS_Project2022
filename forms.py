from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Length, EqualTo, Email, DataRequired, ValidationError
from trovy.models import User

class RegisterForm(FlaskForm):
    def validate_email_address(self, email_address_to_check):
        email_address = User.query.filter_by(email=email_address_to_check.data).first()
        if email_address:
            raise ValidationError('Emailová adresa už existuje. Použite prosím inú.')

    email_address = StringField(label="Email", validators=[(Email()), DataRequired()])
    password1 = PasswordField(label='Heslo:', validators=[Length(min=8), DataRequired()])
    password2 = PasswordField(label='Potvrďte heslo:', validators=[EqualTo('password1'), DataRequired()])
    submit = SubmitField(label='Vytvoriť účet')


class LoginForm(FlaskForm): 
    email_address = StringField(label="Email", validators=[DataRequired()])
    password = PasswordField(label='Heslo:', validators=[DataRequired()])    
    submit = SubmitField(label='Prihlásiť sa')