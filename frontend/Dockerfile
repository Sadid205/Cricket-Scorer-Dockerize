FROM node:18

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --legacy-peer-deps

COPY . /app/

CMD ["npm","run","dev","--","--host"]
