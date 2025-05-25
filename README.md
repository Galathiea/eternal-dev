# Eternal Project

This project is a full-stack application with separate frontend and backend directories.

## Project Structure

```
eternal-dev/
├── frontend/           # Frontend React application
│   ├── public/         # Static assets
│   ├── src/           # Source code
│   ├── package.json   # Frontend dependencies
│   ├── vite.config.ts # Vite configuration
│   └── ...            # Other frontend files
│
└── backend/           # Django backend
    ├── api/          # API endpoints
    ├── cart/         # Cart functionality
    ├── categories/   # Category management
    ├── payments/     # Payment processing
    ├── recipes/      # Recipe management
    ├── reviews/      # Review system
    ├── users/        # User management
    ├── manage.py     # Django management script
    ├── requirements.txt # Backend dependencies
    └── ...           # Other backend files
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Frontend
Create a `.env` file in the frontend directory with:
```
VITE_API_URL=http://localhost:8000
```

### Backend
Create a `.env` file in the backend directory with:
```
SECRET_KEY=your_secret_key_here
DEBUG=True
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Development

The frontend runs on `http://localhost:5173` and proxies API requests to the backend running on `http://localhost:8000`.

## Deployment

Separate deployment instructions for frontend and backend are recommended. The frontend can be deployed to platforms like Vercel or Netlify, while the backend can be deployed to platforms like Heroku or AWS. eternal-dev
