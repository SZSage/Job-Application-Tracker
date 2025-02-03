FROM node:23.5.0

WORKDIR /usr/src/app

COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of application code
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
