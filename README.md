# GP Resource Insights

Greenpeace Resource Insights.

## Development

### Prerequisites

- Install docker
- Install node
- Install yarn (sudo npm i -g yarn)

### Starting the backend

- cd backend
- yarn
- yarn start (starts graphql server)

### Querying the backend

Go to http://localhost:4000 and try to log in

```
mutation {
  login(email: "mail@robf.co.nz", password: "password") {
    token
  }
}
```

Add HTTP headers with the token you get back, e.g.

```
{
  "Authorization": "Bearer XYZ"
}
```

Try a query, e.g.

```
{
  nros {
    name
  }
}
```

### Starting the frontend

- cd frontend
- yarn
- yarn start
