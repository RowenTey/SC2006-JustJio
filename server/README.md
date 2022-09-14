# JustJio-Server

Server-side code for JustJio

## 🛠 Getting Started

> From your command line go to the project server directory and run the following scripts in the terminal.

1\. Install dependencies

```terminal
go mod tidy
```

2\. Make a copy of `.env` and populate the environment variables inside

```terminal
copy .env.example .env
```

3\. Run the code

```terminal
air
```

or if you don't have `air` installed

```terminal
go run main.go
```

## 📂 Project Folder Structure

#### Top Level Directory Layout

```terminal
.
├── config
├── database
├── handlers
├── middleware
├── model
├── router
├── main.go
├── go.mod
├── go.sum
└── README.md
```

## Database

The database folder holds 2 files. The first file `connect.go` initalizes the database connection and migrates the registered models. If you are looking to add new models make sure to register them here for the database. The second file `database.go` initalizes the global DB variable that is referenced in other files.

## Handlers

This folder is the place that holds the functions for each model. Here you will define each request and how it interacts with the database. These functions are used mapped by the router the the URL links.

## Middleware

The middleware folder contains a file for each middleware function. The security middleware is applied first to everything in `router.go` and applies general security middleware to the incoming requests. The JSON middleware serializes the incoming request so that it only allows JSON. This is applied after the hello world in `router.go`. Finally the Authentication middleware is applied indivually to requests that require the user to be logged in.

## Router

The router file maps each incoming request to the corresponding function in `handlers`. It first applies the middleware and then groups the requests to each model and finally to the indiviual function.

## Main.go

The main.go file functions by reading for enviroment variables and applying the CORS middleware. You can change the allowed request sites in the configuration. It then connects to the database by running the function from `database/connect.go` and finally initalizes the app through the router.

## Debug

the port can be specified with an enviroment variable but will default to 3000 if not specified.

## Database

to run the database on docker use the following command: `docker run --name database -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:alpine`. and to connect to the database you can set the enviroment variable of `DATABASE_URL="host=localhost port=5432 user=postgres password=password dbname=postgres sslmode=disable"`

# License

[MIT](https://choosealicense.com/licenses/mit/)
