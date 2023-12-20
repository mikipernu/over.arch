install:
	pip install --upgrade pip && \
	pip install -r requirements/dev.txt
format:
	black app/
	flake8 app/
lint:
	pylint app/
test:
	black app/
	flake8 app/
	pytest tests/
tox:
	tox
mypy:
	mypy app/ --install-types
deploy:
	# deploy
all: install format lint test