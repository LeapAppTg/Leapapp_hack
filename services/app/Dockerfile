FROM node:18

WORKDIR /app

ENV VITE_API_URL=''
ENV VITE_HOSTNAME=''

COPY package* /app/

RUN yarn --frozen-lockfile --silent

COPY . /app

CMD ["yarn", "build"]