# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN apt update && \
     apt install -y libmariadb-dev-compat libmariadb-dev gcc
RUN pip3 install -r requirements.txt

COPY . .
EXPOSE 5000
RUN export FLASK_APP=app.py
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
