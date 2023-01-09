FROM node:slim

# Declaring envs
ARG APP_APIKEY
ENV APP_APIKEY $APP_APIKEY

ARG OUTPUT
ENV OUTPUT $OUTPUT

ARG DATABASE_TYPE
ENV DATABASE_TYPE $DATABASE_TYPE

ARG MONGODB_CONNECTION_STRING
ENV MONGODB_CONNECTION_STRING $MONGODB_CONNECTION_STRING

ENV NODE_ENV production


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