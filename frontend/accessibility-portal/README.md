# Sign Language Translator

This repository contains a small scaffold for a sign language translator: a React TypeScript client and a Flask backend.

Client
- React + TypeScript app in `client/`.
- Put a TensorFlow.js model in `client/public/model` (model.json + weights) if you have one.

Server
- Flask backend in `server/` with a simple health endpoint.

How to run

Frontend (from `client/`):

1. npm install
2. npm start

Backend (from `server/`):

1. python -m venv venv
2. venv\Scripts\activate
3. pip install -r requirements.txt
4. set FLASK_APP=app.py; flask run

