# over·arch: Exploration for visitor management system requirements
![over arch-logo](https://github.com/mikipernu/over.arch/assets/6062294/f0c66504-8459-4ab4-83d9-541a6558c198)


Built with React, FastAPI, SQLAlchemy, and PostgreSQL.

To run this project, you'll need to configure AWS Cognito to get access to a user pool and related environment variables. A set of `example.env` files show what kind of variables exist. Alternatively, you could change the protectedRoutes in `main.tsx` and remove the `_: dict = Depends(get_current_user)` from the API routes inside `router.py`.

When the .env files have been created, aad the Docker images of the client and microservices have been created, you can run: ```docker compose up```.

Stop and remove containers with: ```docker-compose down```.

## Locations API
<img width="1679" alt="Screenshot 2023-12-20 at 9 48 29" src="https://github.com/mikipernu/over.arch/assets/6062294/43eaf981-c9fe-4060-806c-b7df146f3a27">

This project uses FastAPI for setting up a CRUD API for handling locations.

Start with setting up a virtual environment: ```virtualenv venv```, and activate it with ```venv/bin/activate```

```pip install -r requirements/dev.txt```

and then running

```uvicorn main:app --reload```

You can find the API locally at `http://localhost:8000/docs`.

TODO: Handling visitations to said locations and logging access.

## Authentication

This project uses AWS Cognito for user authentication and storing users.

TODO: Setting up a separate Users table and service to handle user information, as AWS Cognito is better at handling auth than user-related information.
