class Api::LadderUsersController < ApplicationController
  def index
	p = ActionController::Parameters.new params
    permitted = p.permit(:name, :username, :password, :password_confirmation, :email)

    if permitted[:name] && !permitted[:name].blank? &&permitted[:username] && !permitted[:username].blank? &&permitted		[:email] && !permitted[:email].blank? && permitted[:password] && !permitted[:password].blank? && permitted[:password_confirmation] && !permitted[:password_confirmation].blank? 
      render json: {
       	ladder_users: LadderUser.where("name = ? AND username = ? AND lower(email) = ?",
                                                 permitted[:name], permitted[:username], permitted =[:email].downcase)
      }
      return
    end

    render json: {
     ladder_users: LadderUser.all
    }#TODO (barryklfung) - write create user form here (to pass data through)
  end

  def create
    p = ActionController::Parameters.new params[:ladder_user]
    permitted = p.permit(:name, :username, :email, :password, :password_confirmation)
    user = LadderUser.new permitted
	unless user.valid?
      render json: { errors: user.errors }, status: 400 and return
    end
    user.save!
    render json: { ladder_user: user }
  end
  def update
		#TODO (barryklfung) - invoke class commands to change points
  end

  def retrieve
		#TODO (barryklfung) - retrieve all postgreSQL data from list of users, sort by number of points, list top 10/20 (adapt as needed)
  end
end
