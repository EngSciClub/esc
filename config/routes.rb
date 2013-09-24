App::Application.routes.draw do

  # Forward other routing to be done on client-side.
  match "*path", to: "client#home", via: :get
end
