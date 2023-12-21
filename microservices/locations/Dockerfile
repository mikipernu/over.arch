FROM python:3.11

WORKDIR /code

COPY ./requirements/ /code/requirements/

RUN pip install --no-cache-dir --upgrade -r /code/requirements/prod.txt

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]
# CMD ["uvicorn", "app.main:app", "--proxy-headers", "--root-path=/api", "--host", "0.0.0.0", "--port", "80"]
