require "awesome_print" if Rails.env.development?

class ApplicationController < ActionController::API

  include AdminAuthorization

end
