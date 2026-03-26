FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN adduser --disabled-password --gecos "" appuser
USER appuser

EXPOSE 4013

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "4013"]
