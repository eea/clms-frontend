FROM node:12-stretch-slim

RUN runDeps="openssl ca-certificates patch" \
    && apt-get update \
    && apt-get install -y --no-install-recommends $runDeps git ssh-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
ARG CI_KEY
COPY .ssh /home/node/.ssh
RUN chown -R node /home/node
RUN echo $CI_KEY > /home/node/.ssh/ci_clms_frontend
RUN chmod 600 /home/node/.ssh/ci_clms_frontend

COPY . /opt/frontend/
RUN chown -R node /opt/frontend/

WORKDIR /opt/frontend/
USER node

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
    && yarn develop \
    && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
    && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build \
    && rm -rf /home/node/.cache

EXPOSE 3000 3001 4000 4001

ENTRYPOINT ["/opt/frontend/entrypoint-prod.sh"]
CMD ["yarn", "start:prod"]
