# Parking Ticket: Treat your parking lot like it's a movie screening!

## Project overview

### Parking can't be this easy!
Parking ticket serves as a full-stack application that runs on React, Django, and Postgres.

### Features
In Parking ticket, you have 2 roles! You can be an admin, one that owns and manages the parking lot and the mobile app, or a user, one that aims to use the app to see if there are any parking spaces available.

Specifically, an admin can:
- [ ] Log in securely to access the admin dashboard.
- [ ] Add, update, or delete parking locations
- [ ] Define the number of slots available for each location
- [ ] View a list of current and upcoming reservations
- [ ] Cancel user reservations if necessary
- [ ] View a summary of parking activity (e.g., total reservations per day).
- [ ] Manage user accounts (view and deactivate if needed).

Specifically, a user can:
- [ ] Register for an account and log in securely.
- [ ] Update account profile and password.
- [ ] View a list or visual representation of available parking locations.
- [ ] See real-time availability of parking slots of a location.
- [ ] Reserve a parking slot and receive confirmation.
- [ ] View active and past reservations.
- [ ] Cancel a reservation before the start time.
- [ ] Receive alerts for reservation expiration or cancellation.

## Tech stack
Frontend: React

Backend: Django

Database: Postgres

## Setup and installation instructions
In order to run the app, navigate to the main "parking_ticket" directory and run `docker compose up`

## Development and deployment notes
For development:

Frontend:
1. Install NodeJS
2. Run `cd frontend`
3. Run `npm install`
4. Run `npm run dev`

Backend:
1. Create virtual python environment with `python3 -m venv .venv`
2. Activate virtual python environment with `source .venv/bin/activate`
3. Run `cd backend`
4. Run `

Or for a dockerized development environment, run `docker compose -f docker-compose.dev.yml up`
