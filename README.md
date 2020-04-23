# helposout
Help OS Out

# Docker Quickstart

```
$ git clone git@github.com:sgsharma/helposout.git
$ cd helposout

# Update the variables.env file before you run docker-compose
$ cp variables.env .env
$ docker-compose up --build -d
$ docker-compose exec django python manage.py createsuperuser

```