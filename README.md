# over·arch: Exploration for visitor management system requirements


Built with React, FastAPI, SQLAlchemy, and

To run this project, run: ```docker compose up```

Stop and remove containers with: ```docker-compose down```

## Client

You can run the client locally by first installing the dependencies:

```yarn install```

and then running

```yarn dev```

TODO: Handling visitations to said locations and logging access.

## Locations API

This project uses FastAPI for setting up a CRUD API for handling locations.

Start with setting up a virtual environment: ```virtualenv venv```, and activate it with ```venv/bin/activate```

```pip install -r requirements/dev.txt```

and then running

```yarn dev```

TODO: Handling visitations to said locations and logging access.

## Authentication

This project uses AWS Cognito for user authentication and storing users.

TODO: Setting up a separate Users table and service to handle user information, as AWS Cognito is better at handling auth than user-related information.