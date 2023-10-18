FROM node:16

# Set environment variable
ENV MONGO_URI=<URI string>

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]