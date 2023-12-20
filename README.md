# over·arch: Exploration for visitor management system requirements
![over arch-logo](https://github.com/mikipernu/over.arch/assets/6062294/f0c66504-8459-4ab4-83d9-541a6558c198)


Built with React, FastAPI, SQLAlchemy, and PostgreSQL.

To run this project, you'll need to configure AWS Cognito to get access to a user pool and related environment variables. A set of `example.env` files show what kind of variables exist.

When .env have been created, you can run: ```docker compose up```

Stop and remove containers with: ```docker-compose down```

## Client
<img width="1680" alt="Screenshot 2023-12-20 at 9 28 44" src="https://github.com/mikipernu/over.arch/assets/6062294/50e517c9-40c9-4f46-9bcb-080b638d0c5f">

You can run the client locally by first installing the dependencies:

```yarn install```

and then running

```yarn dev```

TODO: Handling visitations to said locations and logging access.

## Locations API
<img width="1679" alt="Screenshot 2023-12-20 at 9 48 29" src="https://github.com/mikipernu/over.arch/assets/6062294/43eaf981-c9fe-4060-806c-b7df146f3a27">

This project uses FastAPI for setting up a CRUD API for handling locations.

Start with setting up a virtual environment: ```virtualenv venv```, and activate it with ```venv/bin/activate```

```pip install -r requirements/dev.txt```

and then running

```yarn dev```

TODO: Handling visitations to said locations and logging access.

## Authentication

This project uses AWS Cognito for user authentication and storing users.

TODO: Setting up a separate Users table and service to handle user information, as AWS Cognito is better at handling auth than user-related information.
