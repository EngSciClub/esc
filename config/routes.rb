App::Application.routes.draw do

  namespace :api do
    concern :all_apis do
      resources :admins do
        get "current", on: :collection
      end

      match "/dance_registrants/early_bird_remaining", to: "dance_registrants#early_bird_remaining", via: :get
      match "/dance_registrants/register", to: "dance_registrants#register", via: :post
      match "/dance_registrants/login", to: "dance_registrants#login", via: :post

			#All sessions should be able to access these functions to properly parse stuff (barryklfung)
		  get "/ladder_user/retrieve", to: 'ladder_user#retrieve'
 	  	get "/ladder_user/update", to: 'ladder_user#update'
  		get "/ladder_match/update_player", to: 'ladder_match#update_player'
 			get "/ladder_match/point_calculate", to: 'ladder_match#point_calculate'

      resources :dance_registrants
      resources :dance_tables
			resources :ladder_user
			resources :ladder_match
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
