FROM node:8.4.0-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk --no-cache add --virtual builds-deps build-base python

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install --progress false

# Bundle app source
COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
