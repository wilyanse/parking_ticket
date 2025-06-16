# Parking Ticket: Treat your parking lot like it's a movie screening!

## Project overview

### Parking can't be this easy!
Parking ticket serves as a full-stack application that runs on React, Django, and Postgres.

### Features
In Parking ticket, you have 2 roles! You can be an admin, one that owns and manages the parking lot and the mobile app, or a user, one that aims to use the app to see if there are any parking spaces available.

Specifically, an admin can:
- [ ] Log in securely to access the admin dashboard.
    - [/] Backend - API call to login
    - [/] Backend - Limit views based on group/permissions
    - [ ] Frontend - Admin dashboard
- [/] Add, update, or delete parking locations
    - [/] Backend - API call to add
    - [/] Backend - API call to update
    - [/] Backend - API call to delete
    - [/] Frontend - Add screen
    - [/] Frontend - Update screen
    - [/] Frontend - Delete screen
- [/] Define the number of slots available for each location
    - [/] Backend - API call to list all parking locations
    - [/] Backend - API call to check number of slots available per parking location
    - [/] Frontend - Table for parking locations
    - [/] Frontend - Individual parking location screen
- [/] View a list of current and upcoming reservations
    - [/] Backend - API call to see list of reservations
    - [/] Frontend - Table for reservations
- [/] Cancel user reservations if necessary
    - [/] Backend - API call to modify reservation status
    - [/] Frontend - Screen to cancel reservation
- [ ] View a summary of parking activity (e.g., total reservations per day).
    - [/] Backend - API call by date range to see statistics
    - [ ] Frontend - Data dashboard of parking activities
        - May include reservations per day/per week/ per month
        - Include statistical comparison from day to day, week to week, month to month
- [ ] Manage user accounts (view and deactivate if needed).
    - [/] Backend - API call to see list of user accounts
    - [/] Backend - API call to modify user account by ID
    - [ ] Frontend - Screen for list of user accounts
    - [ ] Frontend - Screen for individual accounts

Specifically, a user can:
- [/] Register for an account and log in securely.
    - [/] Backend - Login account
    - [/] Backend - Register account
    - [/] Frontend - Landing page with registration details
    - [/] Frontend - Landing page with login screen
- [ ] Update account profile and password.
    - [/] Backend - Update account by ID
    - [ ] Frontend - Profile screen
    - [ ] Frontend - Change details screen
- [/] View a list or visual representation of available parking locations.
    - [/] Backend - Obtain list of parking locations
    - [/] Frontend - Table to see parking locations
- [/] See real-time availability of parking slots of a location.
    - [/] Backend - get location details by ID
    - [/] Frontend - Screen for location details
- [ ] Reserve a parking slot and receive confirmation.
    - [/] Backend - get details per parking slot
    - [ ] Backend - send confirmation response
    - [ ] Backend - send details to email
    - [/] Frontend - screen for parking slot reservation
- [ ] View active and past reservations.
    - [/] Backend - list reservations by user ID
    - [/] Frontend - table for reservations by user ID
- [ ] Cancel a reservation before the start time.
    - [/] Backend - modify reservation status
    - [/] Frontend - View reservation details by reservation ID
- [ ] Receive alerts for reservation expiration or cancellation.
    - [ ] Backend - send email
    - [ ] Backend - popup for user
    - [ ] Frontend - modal for alerts

### Database Schema
Below are the tables generated outside of Django's automatically generated tables for users, groups, and permissions.

parking_locations:
- id
- name
- description
- location
- date_created
- date_updated
- user_id FK

parking_slots:
- id
- parking_location_id FK
- status
- date_created
- date_updated

reservations:
- id
- start_time
- end_time
- parking_location_id FK
- user_id FK
- date_created
- date_updated
- status

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
4. Create a .env file using the sample provided
5. Run `python manage.py runserver`

Or for a dockerized development environment, run `docker compose -f docker-compose.dev.yml up`
>NOTE: Running the dockerized development environment will require running `pip freeze > requirements.txt` and rebuilding the docker containers in order to reflect new python modules.