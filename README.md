# SMTP Tester

This is a simple Node.js application for testing email sending using Nodemailer and SMTP credentials. It provides a form to input an email address and sends a "Hello World" email to the recipient.

## Features

- Form to input the recipient's email address
- Sends a "Hello World" email to the provided address
- Full error logging displayed on the webpage for easy debugging
- **Hot reloading** enabled via `nodemon`, allowing changes (even to `.env` variables) to be tested without restarting the server

## Prerequisites

- Node.js v12+ installed
- Valid SMTP credentials (host, port, user, password)

## Installation

   - `git clone https://github.com/your-repo/smtp-tester.git `
   - `cd smtp-tester`
   - `npm install`
   - `cp .env.example .env`
   - `npm run dev`
