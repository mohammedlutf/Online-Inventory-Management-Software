from wtforms import Form,StringField, PasswordField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from orders.models import Users
# Register Form Class
class RegisterForm(Form):
    email = StringField('Email', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired(),EqualTo('confirm', message='Passwords do not match')])
    confirm = PasswordField('Confirm Password')
    def validate_email(self, email):
        user = Users.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That email is taken. Please choose a different one.')

    def validate_username(self, username):
        user = Users.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose a different one.')
