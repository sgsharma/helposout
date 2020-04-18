FROM node:13.12.0

RUN mkdir -p /app/frontend
WORKDIR /app/frontend

ENV PATH /app/frontend/node_modules/.bin:$PATH


COPY package.json /app/frontend/package.json
COPY ./public/ /app/frontend/public/
COPY ./src/ /app/frontend/src/

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

EXPOSE 3000
CMD ["npm", "start"]
