# Running Node.js apps with docker - example code

This repository is used as support of my video(https://www.youtube.com/watch?v=7rqavBlLFbg) about how to run node.js applications using docker. It includes examples of linked services, envioronment variables, node_modules optiomization and integration with npm 5 using package-lock to optimize dependency installation on image building.


## Example APP
The example Node.js app includes dummy code and tests

### Running the application

The application is built with Node.js and already has all environment configured with docker. To start the application you will need `docker` and `docker-compose` installed on the machine. Having that you may run:

```shell
docker-compose up
```

And then the application and database will be started:

```shell
Starting nodedocker_mongodb_1 ...
Starting nodedocker_mongodb_1 ... done
Starting nodedocker_app_1 ...
Starting nodedocker_app_1 ... done
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
