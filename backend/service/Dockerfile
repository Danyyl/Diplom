FROM python:3.7

ENV PYTHONUNBUFFERED 1

ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /code

COPY .. /code/

RUN apt-get update ##[edited]
RUN apt-get install ffmpeg libsm6 libxext6  -y

#RUN apk add --update --no-cache --virtual .build-deps \
#    gcc libc-dev linux-headers postgresql-dev zlib-dev jpeg-dev make

WORKDIR /code/service

EXPOSE 5000

RUN pip install --upgrade pip setuptools wheel

RUN pip install -r ../requirements.txt

#RUN python app.py

# RUN apk del .build-deps

#RUN adduser -D appuser
#
#USER appuser