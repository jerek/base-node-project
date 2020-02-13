FROM node:10.13.0

WORKDIR /src
COPY src /src
RUN npm install -g nodemon && npm install --production

LABEL app="example-app-name" \
      git-rev-hash="{{GIT_REV_HASH}}" \
      deploy-time="{{DEPLOY_TIME}}" \
      type="daemon"
EXPOSE 80

CMD ["npm", "run"]
