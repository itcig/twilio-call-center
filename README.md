# Twilio Call Center

This application will be the front end portion of the app. It will likely communicate with an endpoint in between this application and Twilio's API.

## Components to build

- [ ] Main Application
  - [ ] Authentication
  - [ ] Header
    - [ ] User Actions
    - [ ] User Status
  - [ ] Administrative
    - [ ] Reporting
    - [ ] Agents
    - [ ] Call Flow*
  - [ ] Agent
    - [ ] Phone
      - [ ] Phone Settings
      - [ ] Phone Dialer
    - [ ] Agent Actions
      - [ ] Reservations
      - [ ] Call
        - [ ] Caller Information
        - [ ] Call Actions

## Component and Container Layout

[Checkout Lucid Chart](https://www.lucidchart.com/invitations/accept/be4d1971-73b0-4f66-a531-788e14174df5)

## State Planning

Entire Application

- User Authenticated
- User Status
- User Information (TBD)
- ?UI (TBD)

Component Specific

- Phone Container
  - Phone Number to be dialed
  - Phone Settings (mic and speaker for browser to use etc.)
- Agent Action Container
  - UI (TBD)
  - Reservation status (if there are reserved tasks)
  - Caller Information (data returned from CIG API)
  - Agent Input (call notes, call disposition, etc.)

## Environment Setup

Clone the repository and then run `npm install`

The following variables will need to be added to a .env file in the root of the project
- TWILIO_ACCOUNT_SID = "AC..."
- TWILIO_AUTH_TOKEN = "..."
- TWILIO_WORKSPACE_SID = "WS..."

Start the application by running `npm start`
Access the app at http://localhost:3000/
