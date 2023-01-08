FROM node:slim

# Declaring envs
ARG app_apikey
ENV APP_APIKEY $app_apikey

ARG output
ENV OUTPUT $output

ARG database_type
ENV DATABASE_TYPE $database_type

ARG mongodb_connection_string
ENV MONGODB_CONNECTION_STRING $mongodb_connection_string

ENV NODE_ENV development


# Setting up the work directory
WORKDIR /usr/src/app

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "index.js" ]

# Exposing server port
EXPOSE $port