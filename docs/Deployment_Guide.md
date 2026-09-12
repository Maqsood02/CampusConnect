# Production Deployment Guide - CPMS

## 1. Local Development Setup

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Seed Database
```bash
python seed.py
```

### Step 3: Run Development Server
```bash
python app.py
```
Access application at `http://127.0.0.1:5000`.

---

## 2. Cloud Deployment Options

### Deployment to Render / Railway
1. Create a `Procfile`:
   ```
   web: gunicorn app:app
   ```
2. Set Environment Variables:
   - `SECRET_KEY`: Production secret key
   - `JWT_SECRET_KEY`: Production JWT signature key
3. Deploy directly via GitHub repository.

### Database Migration to PostgreSQL / MySQL
To deploy on PostgreSQL or MySQL:
1. Run `schema.sql` on target database instance.
2. Update `DATABASE_PATH` or connection URI in `config.py`.
