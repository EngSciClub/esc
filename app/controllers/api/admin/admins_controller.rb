class Api::Admin::AdminsController < Api::AdminsController

  before_filter :authorize_admin, only: :index

  def index
    render json: {
      admins: Admin.all
    }
  end

  def current
    render json: {
      admin: get_admin
    }
  end
  
  def show
	render json:{
	   admin: ::Admin.find(params[:id])
	}
  end
end
