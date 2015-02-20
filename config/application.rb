require File.expand_path("../boot", __FILE__)

require "rails/all"
require "google/api_client"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module App
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

	config.time_zone = 'Eastern Time (US & Canada)'
	config.active_record.default_timezone = 'Eastern Time (US & Canada)'
    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.autoload_paths += %W(#{config.root}/lib)

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    ActiveRecord::Base.send(:include, ActiveModel::ForbiddenAttributesProtection)

    config.hostname = ENV["HOSTNAME"]

    config.google_api_client = Google::APIClient.new
    config.google_api_client.authorization.client_id = ENV["GOOGLE_API_CLIENT_ID"]
    config.google_api_client.authorization.client_secret = ENV["GOOGLE_API_CLIENT_SECRET"]
    config.google_api_client.authorization.scope = "https://www.googleapis.com/auth/userinfo.email"

    config.oauth2_api = config.google_api_client.discovered_api("oauth2", "v2")

  end
end
