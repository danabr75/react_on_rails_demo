# react_on_rails_demo

# OS X installation (12.6.2)
```
brew update
brew upgrade openssl

# Failed to install, must be installed via Docker
# https://www.elastic.co/guide/en/elasticsearch/reference/7.17/brew.html
# brew tap elastic/tap
# brew install elastic/tap/elasticsearch-full
# brew services start elasticsearch-full

# FAILED on OS X M2
# Because docker is a system-level package, you cannot install it using brew install, and must use --cask instead
brew install --cask docker
brew install docker-machine
brew install --cask virtualbox

# OS X M2 required download from docker site: https://www.docker.com/get-started/

# run the following to confirm that docker is running
docker ps
```

# install node.js
https://nodejs.org/en/

# install node
`brew install node`

# install yarn
```
brew install yarn
yarn add react react-dom
yarn add @babel/preset-react prop-types --dev
yarn add react-router-dom
yarn add jquery
yarn add react-icons
yarn add styled-components
yarn add bootstrap reactstrap
yarn add semantic-ui-react semantic-ui-css
yarn add react-rails-pagination
yarn add react-axios
yarn add axios
yarn add "@babel/plugin-proposal-private-methods"
yarn add multiselect-react-dropdown
yarn add qs
```

# fix babel bug
yarn add @babel/plugin-proposal-private-methods --dev
OR
npm install @babel/plugin-proposal-private-methods --save-dev
# Remove bad plugin in babel.config.js
# - '@babel/plugin-proposal-private-property-in-object'

https://learnetto.com/blog/react-rails
# Setup Rails 6.x:
```
bundle install
rails webpacker:install
rails webpacker:install:react
rails generate react:install
```

# How to Run

## (Dev) Run webpacker to compile assets on the fly
bin/webpack-dev-server

## Run server
rails s

# Generating new react components
rails generate react:component HelloWorld greeting:string


# Clean webpacker cache before pushing
rails tmp:clear

# React Semantic UI
https://react.semantic-ui.com/


# Notes:
React with Bootstrap
https://blog.logrocket.com/using-bootstrap-react-tutorial-examples/
https://getbootstrap.com/docs/5.0

Rails API Only
https://guides.rubyonrails.org/api_app.html


# React and Devise
https://medium.com/@alessandrahagarty/using-devise-for-authentication-in-a-react-rails-app-f6a0eb87fbd5
https://blog.dennisokeeffe.com/blog/2022-03-07-part-1-setting-up-devise-with-rails-7
- Note: this is for Rails 7


# Running with Docker
- src: https://semaphoreci.com/community/tutorials/dockerizing-a-ruby-on-rails-application
- necessary for searchkick, on OS X
```
docker build -t demoreact -f Dockerfile.rails .
# docker-compose up
# docker-compose down
docker run -p 3000:80 demoreact
```