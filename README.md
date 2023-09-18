# react_on_rails_demo

# OS X installation (12.6.2)
```
brew update
brew upgrade openssl
```

# install node.js
https://nodejs.org/en/

# install node
`brew install node`

# install yarn
`brew install yarn`
yarn add react react-dom
yarn add @babel/preset-react prop-types --dev
yarn add react-router-dom
yarn add jquery

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


# (Dev) Run webpacker to compile assets on the fly
bin/webpack-dev-server

# Run server
rails s

# Generating new react components
rails generate react:component HelloWorld greeting:string


# Clean webpacker cache before pushing
rails tmp:clear