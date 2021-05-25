FROM python:3.7
WORKDIR /app_code
ENV FLASK_APP=app
ENV FLASK_ENV=development
RUN apt-get update ##[edited]
RUN apt-get install ffmpeg libsm6 libxext6  -y
COPY requirements.txt requirements.txt
RUN pip install cmake
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]

