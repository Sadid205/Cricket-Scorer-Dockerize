FROM node:18

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --legacy-peer-deps

COPY . /app/

ARG VITE_CLIENT_ID
ARG VITE_REQUEST_URL
ARG PORT 

ENV PORT=$PORT
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_REQUEST_URL=$VITE_REQUEST_URL

RUN npm run build 

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]
