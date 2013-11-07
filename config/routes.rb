App::Application.routes.draw do

  namespace :api do
    concern :all_apis do
      resources :admins do
        get "current", on: :collection
      end

      match "/dance_registrants/early_bird_remaining", to: "dance_registrants#early_bird_remaining", via: :get
      match "/dance_registrants/register", to: "dance_registrants#register", via: :post
      match "/dance_registrants/login", to: "dance_registrants#login", via: :post

      resources :dance_registrants
      resources :dance_tables
    end

    scope constraints: lambda{|req| !req.session[:access_token].blank? } do
      scope module: "admin" do
        # Price checking routes for dinner dance registrants.
        match "/dance_registrants/check_price", to: "dance_registrants#check_price", via: :get

        concerns :all_apis
      end
    end

    concerns :all_apis
  end

  match "/auth", to: "oauth#callback", via: :get

  # Forward other routing to be done on client-side.
  match "*path", to: "client#home", via: :get
end
