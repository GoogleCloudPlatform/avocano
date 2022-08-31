# Avocano API Server

Powered by Django REST Framework. 

## Local dev

```
# Create virtualenv
python -m venv venv
source venv/bin/activate

# Copy template env
cp .env.local .env

# Install dependencies
pip install -r requirements.txt

# Prime database with migrations, fixture data
bash scripts/prime_database.sh

# Run local server
python manage.py runserver
```

