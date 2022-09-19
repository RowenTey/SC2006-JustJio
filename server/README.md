# JustJio-Server

![server-landing](../client/assets/JustJio-Server.gif)

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

# License

[MIT](https://choosealicense.com/licenses/mit/)
