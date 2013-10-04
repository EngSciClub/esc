class Api::AdminsController < ApplicationController

  def index
    render json: {
      admins: []
    }
  end

  def current
    render json: {
      admin: nil
    }
  end

end
