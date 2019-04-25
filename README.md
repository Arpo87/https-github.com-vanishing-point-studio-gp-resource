# GP Resource Insights

Greenpeace Resource Insights.

## Development

### Prerequisites

- Install docker
- Install node
- Install yarn (sudo npm i -g yarn)
- Install prisma (sudo npm i -g prisma)

### Starting the backend

- cd backend
- yarn
- docker-compose up -d (starts postgres and prisma server in containers)
- prisma deploy (creates database tables and seeds with initial data)
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

Add HTTP headers with the token you get back

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
