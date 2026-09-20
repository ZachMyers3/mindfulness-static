# Build the static Astro site, then serve dist/ with nginx on port 8080.
# Pull official images via the GCR Hub mirror so GitHub Actions is not
# subject to docker.io auth resets / anonymous rate limits.
FROM mirror.gcr.io/library/node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci --legacy-peer-deps

COPY . .
ARG SITE=https://mindfulnessandmovement.example.com
ARG BASE_PATH=/
ENV SITE=$SITE
ENV BASE_PATH=$BASE_PATH
RUN npm run build

FROM mirror.gcr.io/library/nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
