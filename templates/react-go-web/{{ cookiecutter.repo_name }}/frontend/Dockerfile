FROM node:16 as base

# --- Build
FROM base as build

WORKDIR /code

COPY . .

RUN npm ci --only=production && \
    npm run build

# --- Run
FROM base as run

COPY --from=build /code/build /build

RUN npm install -g serve

ENTRYPOINT [ "serve", "-s", "/build" ]