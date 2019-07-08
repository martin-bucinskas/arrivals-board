FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install yarn
RUN yarn add react-scripts@3.0.1 -g
RUN yarn install

CMD ["npm", "start"]