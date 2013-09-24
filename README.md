EngSci Club
====================

Server and client code for EngSci Club site.

## Development setup
1. `cd client`
1. `npm install`
1. `bower install`
1. `cd ..`
1. `bundle`
1. `rake client`
1. `bundle exec rake db:create`
1. `foreman start`

## Deploy procedure
1. Branch onto `deploy/<ISO 8601 date>_<rev #>`. For example, the branches for the first and second deploy of February 28, 2010 would be `deploy/2010-02-28` and `deploy/2010-02-28_2`, respectively.
1. Remove `/public` from `.gitignore`
1. `rake client`
1. `git add .gitignore public ...`
1. `git push heroku ...`

## Code Style
-  2 spaces for indentation in JS and Ruby.
-  4 spaces for indentation in HTML, CSS.
-  Follow the Ruby style guide: https://github.com/styleguide/ruby
-  Use JSHint.
-  TODOs should take the following form in code: `// TODO(username): gotta do this thing`
