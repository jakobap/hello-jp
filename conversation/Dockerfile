# Use the official lightweight Python image.
FROM python:3.12.1

# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./
COPY .env ./

# Install production dependencies.
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Streamlit app entrypoint
ENTRYPOINT ["python", "main.py", "--server.port=5000", "--server.address=0.0.0.0"]