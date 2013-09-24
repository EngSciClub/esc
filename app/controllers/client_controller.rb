class ClientController < ApplicationController
  def home
    render :file => Rails.public_path.join("index.html") and return
  end
end
