FROM python:3.7

RUN pip install Flask gunicorn

COPY /app
WORKDIR /app

ENV PORT 8080

CMD exec gunicorn --bind :$PORT --workers --threads 8 app:app