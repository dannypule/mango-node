#!/bin/bash

set -e
set -u

npm install
npm run build
#ng test
commit=$(git rev-parse HEAD)
echo $commit > $commit.hash
sed -i '/\/dist/d' .gitignore
git config user.email "deploy@ri-team.com"
git config user.name "pipeline"
git add --all
git commit -m 'adding dist folder'

git remote add heroku https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME_PROD.git
git push -f heroku master:master
