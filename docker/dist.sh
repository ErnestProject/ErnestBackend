#!/bin/bash

npm install -g phantomjs-prebuilt --phantomjs_cdnurl=https://bitbucket.org/ariya/phantomjs/downloads
npm install -g $(cat requirements.txt)
cd /app
npm install && npm update && bower update --allow-root
grunt build
