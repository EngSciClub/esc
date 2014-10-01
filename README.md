engsci.skule.ca
===============

Server and client code for the Engineering Science Club website.
- Backend using Rails.
- Frontend using Ember.js, Stylus.


## Requirements

- Ruby, Bundler
- Node.js and Node Package Manager
  - Grunt CLI
  - Bower
- Foreman
- Postgres


## Setup

### Client
1. Change to the `client` directory.
1. Run `npm install` to install Node.js dependencies.
1. Run `bower install` to install Bower dependencies.
1. Run `grunt server` to run the client.

### Server
1. Ensure client has been set up.
1. Run `bundle` to install gems.
1. Copy `sample.env` to `.env`, and modify the following values:
   - `GOOGLE_API_CLIENT_ID` and `GOOGLE_API_CLIENT_SECRET` from Google Developer's Console.
   - `SECRET_TOKEN` by running `rake secret`.
1. Run `rake client` to copy the client.
1. Run `rake db:setup` to set up the database.
1. Run `foreman start` to start the server.


## Deployment Procedure

These instructions are meant for deployment to Heroku, where the website is hosted.

Note: These instructions are old, you can now simply do `rake deploy[<remote name>]`
to deploy the application.

1. Branch onto `deploy/<ISO 8601 date>_<rev #>`. For example, the branches for the first and second 
   deploy of February 28, 2010 would be `deploy/2010-02-28` and `deploy/2010-02-28_2`, respectively.
1. Remove `/public` from `.gitignore`.
1. Run `rake client` to generate the client.
1. Commit the `.gitignore` file and `/public` directory.
1. Run `git push heroku ...` to deploy.


## Style Guide
- For ruby code: follow the ruby style guide at: https://github.com/styleguide/ruby
- Try to be consistent with existing code.
- 2 spaces for indentation in Ruby, JavaScipt and CSS.
- 4 spaces for indentation in HTML/Handlebars.
- Run `grunt jshint` to check for JS style errors.
- Prefer issues over TODOs in code where applicable, but for any TODOs in code, 
  use the form: `// TODO(username): todo for future`.

