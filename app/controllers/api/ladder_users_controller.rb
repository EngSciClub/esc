class Api::LadderUsersController < ApplicationController
  def index
	p = ActionController::Parameters.new params
    permitted = p.permit(:name, :username, :password, :password_confirmation, :email)

    if permitted[:username] && !permitted[:username].blank? 
      render json: {
       	ladder_users: LadderUser.where("username = ?", permitted[:username])
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
    #TODO (barryklfung) (P2) - Mailers for registration
    render json: { ladder_user: user }
  end
  def update
		#TODO (barryklfung) (P1) - invoke class commands to change points
  end

  def retrieve
		#TODO (barryklfung) (P1)- retrieve all postgreSQL data from list of users, sort by number of points, list top 10/20 (adapt as needed) - Might be able to do this merely with Ember instead.
  end
end
