FROM node:8.11.2-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk --no-cache add --virtual builds-deps build-base python

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm config set loglevel warn

RUN npm install --silent

RUN npm rebuild bcrypt --build-from-source --silent

# Bundle app source
COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
