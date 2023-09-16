# Elysia with Bun runtime

## Docker Setup
To build the docker image run:
```bash
docker build -t bun-app .
```
To run the docker image run:
```bash
docker run -d -p 8080:8080 bun-app
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:8080/ with your browser to see the result.