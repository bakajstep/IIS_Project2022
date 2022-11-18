import mysql.connector

my_db = mysql.connector.connect(
    host="localhost",
    user="joe",
    passwd ="joe1234*"
)

my_cursor = my_db.cursor()

my_cursor.execute("DROP DATABASE trovy_mysql__db")

my_cursor.execute("SHOW DATABASES")
for db in my_cursor:
    print(db)
