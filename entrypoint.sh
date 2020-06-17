#!/bin/bash

if [ "$POSTGRES_HOST" != "localhost" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python /app/manage.py migrate api # api migrations first for custom user model
python /app/manage.py migrate auth
python /app/manage.py migrate

exec "$@"