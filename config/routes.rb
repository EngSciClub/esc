App::Application.routes.draw do

  namespace :api do

    concern :all_apis do
      resources :admins do
        get 'current', on: :collection
      end
    end

    scope constraints: lambda{|req| !req.session[:access_token].blank? } do
      scope module: 'admin' do
        concerns :all_apis
      end
    end
    concerns :all_apis
  end

  match '/auth', to: 'oauth#callback', via: :get

  # Forward other routing to be done on client-side.
  match "*path", to: "client#home", via: :get
end
