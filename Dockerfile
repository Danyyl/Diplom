FROM python:3

ENV PYTHONUNBUFFERED 1

COPY ./backend/backend/requirements.txt /requirements_back.txt
#COPY ./backend/service/requirements.txt /requirements_serv.txt

RUN pip install -r /requirements_back.txt
#RUN pip install -r /requirements_serv.txt
RUN apt-get install -y python-pygraphviz
#RUN apt-get update ##[edited]
#RUN apt-get install ffmpeg libsm6 libxext6  -y

#RUN apk add --update --no-cache --virtual .build-deps \
#    gcc libc-dev linux-headers postgresql-dev zlib-dev jpeg-dev make

RUN pip install --upgrade pip setuptools wheel

RUN pip install cmake

RUN mkdir /app
RUN mkdir /app/static
WORKDIR /app
COPY ./backend /app

RUN adduser --disabled-password user
USER user
