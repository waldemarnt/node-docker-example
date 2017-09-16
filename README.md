# NASA NEO (Near Earth Objects) API

This API is built on top of official [NASA NEO API](https://api.nasa.gov/neo/?api_key=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD) allowing custom queries about hazardous asteroids.

## Example

###  GET all possible hazardous asteroids

```shell
curl --request GET \
  --url http://localhost:3000/neo/hazardous \
  --header 'content-type: application/json' \
```

response:

```json
[
    {
        "_id": "59bafeb5fea87d001c3c011e",
        "__v": 0,
        "date": "2017-09-14T00:00:00.000Z",
        "reference": "2088254",
        "speed": 59540.7422645489,
        "is_hazardous": true
    },
    {
        "_id": "59bafeb5fea87d001c3c011f",
        "__v": 0,
        "date": "2017-09-14T00:00:00.000Z",
        "reference": "2310560",
        "speed": 77331.2021001263,
        "is_hazardous": true
    },
    {
        "_id": "59bafeb5fea87d001c3c0135",
        "__v": 0,
        "date": "2017-09-11T00:00:00.000Z",
        "reference": "3507718",
        "speed": 43820.0818093472,
        "is_hazardous": true
    }
]
```

## Running the application

The application is built with Node.js and already has all environment configured with docker. To start the application you will need `docker` and `docker-compose` installed on the machine. Having that you may run:

```shell
docker-compose up
```

And then the application and database will be started:

```shell
Starting nodenasa_mongodb_1 ...
Starting nodenasa_mongodb_1 ... done
Starting nodenasa_app_1 ...
Starting nodenasa_app_1 ... done
```

The application will be avaible on *PORT 3000* by default, but it's configurable via `docker-compose.yml` file as an environment variable.

### Running the application in development mode

Sometimes you would like to run the application in development mode. This project already has a prepared enviroment for that, you have to run:

```shell
docker-compose -f docker-compose.development.yml up
```

This docker compose file will start the application using [`nodemon`](https://github.com/remy/nodemon) and will share the local application code with the container. Any change on the hosts code will restart the application (whitout restarting the container because nodemon is taking care of that).

### Running the tests

To run the tests using docker you just have to run the following command:

```shell
docker-compose -f docker-compose.test.yml up
```

And then all tests will be ran and the status exit code will be 0 or 1 that means true or false.


## Routes

This application includes many routes ralated to NEO operations that are:

### List all NEO Hazardous asteroids

The following request will filter all possible hazardous asteroids that includes the flag `is_hazardous: true`.

```curl
curl --request GET \
  --url http://localhost:3000/neo/hazardous \
```

### List the fastest asteroid

This route will return the fastest asteroid based on its `speed`

```curl
curl --request GET \
  --url http://localhost:3000/neo/fastest \
  --header 'content-type: application/json' \
```

The response will be something like:

```json
[
    {
        "_id": "59bb010df4d9b7001c68a1d9",
        "__v": 0,
        "date": "2017-09-14T00:00:00.000Z",
        "reference": "3685816",
        "speed": 124405.6335547075,
        "is_hazardous": false
    }
]
```

Also is possible to filter only hazardous asteroids passing the parameter `hazardous=true` as the example below:

```curl
curl --request GET \
  --url 'http://localhost:3000/neo/fastest?hazardous=true' \
  --header 'content-type: application/json' \
```

### List the year with most asteroids

This route will return the year with most asteroids:

```curl
curl --request GET \
  --url http://localhost:3000/neo/best-year \
  --header 'content-type: application/json' \
```

This also suports `hazards=true|false` filter parameter.

### List the month with most asteroids

This route will return the month with most asteroids

```curl
curl --request GET \
  --url http://localhost:3000/neo/best-month \
  --header 'content-type: application/json' \
```

This also supports `hazards=true|false` filter parameter.


## Populating the local database

By default `every time` the application is started it fetches the NASA api and stores the data from NEOs from the last **3 days**. It's configurable via enviroment variable: `FETCH_DAYS_FROM_NOW` (NASA app is limited to 7 days).

