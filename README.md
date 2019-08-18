# Whether-Sweater-Express

Welcome to Whether-Sweater-Express, a RESTful JSON API built with Express.js framework. Designed to expose endpoints to display weather for different cities, create and login users, and set favorite locations which to be consumed by a hypothetical front end. It consumes the Dark Sky API for gathering weather data, parses it and returns only what is expected in the project specifications. Location data is parsed from a user friendly city, address, or location by Google Cloud Service's Geocoding API into latitude and longitude.

## Intent
This project was completed in 7 days as a requirement for Module 4.

The project was built using Express.js which implements the following:

- Object oriented programming principles
- Building an Internal API app
- External API calls to Google Geocoding and DarkSky

## Tech Stack
- Express 4.16
- Node 10.16.2
- Sequelize 5.15
- Jest

## Available Endpoints:
```
POST /api/v1/users
Headers:
Content-Type: application/json
Accept: application/json

Body:
{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```

```
POST /api/v1/sessions
Headers:
Content-Type: application/json
Accept: application/json

Body:
{
  "email": "my_email@example.com",
  "password": "password"
}
```

```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

```
DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

```
GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

## Production Site
Not secure at the moment, message me for link
