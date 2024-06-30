FROM node:20.15.0-alpine

ENV NODE_OPTIONS=--max_old_space_size=3000

WORKDIR /tmp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Run it
ENTRYPOINT ["node", "/tmp/dist/main"]

#debug mode
# ENTRYPOINT ["npm","run","start:debug"]
