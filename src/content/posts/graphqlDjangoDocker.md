---
title: Baby steps with GraphQL, Django and Docker
description: Learn to setup GraphQL, in a Dockerized Django environment with me.
published: 2018-08-18
tags: [graphql, docker, js, python, dev, learning]
category: tutorial
url: https://medium.com/@john.nissenhooper/baby-steps-with-graphql-django-and-docker-b1319608c41
image: https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FfUfk3eJF5uY%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=f0cdcb1cb83c31633d2bba27d3a0ff91cc9de24526458187fb16996c9b814710&ipo=images
---

Baby steps with GraphQL, Django and Docker
==========================================

This is going to be a learning by failing situation. I have only ever used Docker in the sense that I was exposed to the sheer magic of it at a new job, GraphQL has dazzled me through some articles I’ve read and a tutorial I’ve halfway completed twice over the course of 4 months, and Django… well the last time I wrote python for more than an hour was several years ago in college, so that should say enough about that. So this is your warning. This is as much a learning experience for me as it is for whoever stumbles across this. I’m sure there are better ways to do the things I’ll be doing and **_please_** point t hem out in the comments!

For the record I’m going to be attempting to cobble together two separate tutorials. [A very short Docker and Django tutorial](https://docs.docker.com/compose/django/#create-a-django-project) and a longer [Django + GraphQL tutorial](http://docs.graphene-python.org/projects/django/en/latest/tutorial-plain/) specifically Graphene and Django

Docker Setup
============

I wont walk you through the installation of Docker, because there are plenty of tutorials on that so for now I will assume you have Docker and Docker-compose installed…. I assume those are two different things. Again. Baby steps. A good portion of this will just follow the tutorial on the docker portion linked above

First we need to make a clean new directory for our project, and navigate inside it. Then we want to create a `Dockerfile`(notice no extension)

```docker
FROM python:3  
 ENV PYTHONUNBUFFERED 1  
 RUN mkdir /code  
 WORKDIR /code  
 ADD requirements.txt /code/  
 RUN pip install -r requirements.txt  
 ADD . /code/
```

From my limited understanding this is grabbing a base docker image named python:3 from dockerhub. It is then setting up and env variable and creating a code directory in the docker image. (Dont think too hard about this, I only vaguely understand whats all happening myself) It then changes the working directory to the newly made code directory, and will add a file called `requirements.txt`to that directory (we’ll make that in a sec) finally it runs pip install, effectively installing all the requirements we will list in our `requirements.txt`. It then adds everything in the current directory to /code… At least I assume that’s what’s happening.

After you save this file you will make the requirements.txt file, I mentioned above.

```txt
django  
psycopg2  
graphene\_django
```

Easy Peasy. Note that this is where we differ from the Docker tutorial, not in a large way, but it’s important to list that graphene\_django requirement there.

Next up. The docker-compose.yml file.

> The docker-compose.yml file describes the services that make your app. In this example those services are a web server and database. The compose file also describes which Docker images these services use, how they link together, any volumes they might need mounted inside the containers. Finally, the `docker-compose.yml` file describes which ports these services expose. See the `[docker-compose.yml](https://docs.docker.com/compose/compose-file/)` [reference](https://docs.docker.com/compose/compose-file/) for more information on how this file works.

Don’t think I can add anything to that, so I’ll just copy and paste my docker-compose.yml file here for you.

```docker
version: '3'  
  
services:  
 db:  
   image: postgres  
 web:  
   build: .  
   command: python3 manage.py runserver 0.0.0.0:8000  
   volumes:  
      - .:/code  
    ports:  
      - "8000:8000"  
    depends\_on:  
      - db
```

Now we need to create a Django project. or rather a Graphene Django project.

Graphene
========

Graphene from my understanding is just a library that make working integrating graphQL into your python project simpler. I have never used it before but we might as well try it out.

we are already in our project directory from setting up docker, so we are going to go straight to the django scaffolding commands.

The tutorial says to run django-admin.py startproject cookbook .\` (note the period), but because we are doing things the Docker way we have to instead run the more laborious

```bash
sudo docker-compose run web django-admin.py startproject cookbook .
```

Easy enough. However where I ran into issues, and spent way too long figuring out a work around was the next seemingly easy part of the graphene tutorial

```bash
cd cookbook  
django-admin.py startapp ingredients
```

The problem here is the `cd cookbook` . Sure you can cd into cookbook fine but if you just run that command it will complain about not knowing what django-admin.py is, since that is installed on your Docker image, not your local machine! No problem, you think. ill just do the sudo docker-compose and instead pass it the commands `cd cookbook && django-admin.py startapp ingredients`. Well that wont work either because apparently Docker can’t handle cd commands.

If youre a Django pro I’m sure the solution is obvious but for me it took some googling around for all the wrong things. instead of focusing on docker, there is a much easier Django solution. Just change the directory where you install ingredients

```bas
sudo docker-compose run web django-admin.py startapp ingredients ./cookbook/ingredients
```

this will scaffold out the ingredients subapp inside the cookbook directory.

Now following along with the Graphene tutorial, but translating to Docker `sudo docker-compose run web python manage.py migrate`

update the cookbook/ingredients/models.py

```python
from django.db import models  
  
  
class Category(models.Model):  
    name = models.CharField(max\_length=100)  
  
    def \_\_str\_\_(self):  
        return self.name  
  
  
class Ingredient(models.Model):  
    name = models.CharField(max\_length=100)  
    notes = models.TextField()  
    category = models.ForeignKey(  
        Category, related\_name='ingredients', on\_delete=models.CASCADE)  
  
    def \_\_str\_\_(self):  
        return self.name
```

and the `INSTALLED_APPS` located in cookbook/settings.py

```python
INSTALLED\_APPS = \[  
    ...  
    # Install the ingredients app  
    'cookbook.ingredients',  
\]
```

and then run the migrations in Docker lingo

```bash
sudo docker-compose run web python manage.py makemigrations
```

```bash
sudo docker-compose run web python manage.py migrate
```

From here out you should be able to continue to follow the Django Graphene tutorial. just remember that wherever you see them running `python ....` you are instead going to run it in docker with `docker-compose run web python ....` The only other thing that caused a small stumble for me was instead of running `docker-compose run web python ./manage.py runserver` you should instead just run `docker-compose up` and it will start the server for you (I’m pretty sure this is due to us defining `command` in `docker-compose.yml` as `python3 manage.py runserver 0.0.0.0:8000` )

now when you commit everything and push it up to github/gitlab whatever you’ll be able to pull it down on any computer that has docker installed and just run `docker-compose up` this will build and install all your dependencies in the docker env, and start the server. So maybe it would be better to first run `docker-compose build` so that it does the install and then run `docker-compose run web python manage.py migrate` &&`docker-compose run web python manage.py loaddata ingredients` && `docker-compose run web python manage.py createsuperuser`. After that creates, all the relations, the test data, and the super user you can then just run `docker-compose up` and enjoy your lovely containerized django graphene server!

Conclusion
==========

If you want to checkout the finished code for this project clone it here [https://gitlab.com/jnhooper/grapheneDjango](https://gitlab.com/jnhooper/grapheneDjango)

Again, this is mainly just for me to remember what I did to get a project like this set up. I’m **100%** sure there is a better way to do this, and I probably messed up somewhere and did something not the “Docker way”, so if you know better, please let me know in the comments!
