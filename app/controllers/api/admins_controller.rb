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
  def show
	render json:{
	   admin: ::Admin.find(params[:id])
	}
  end
end
