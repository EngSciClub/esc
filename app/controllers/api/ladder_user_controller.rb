class Api::LadderUserController < ApplicationController
  def index
		p = ActionController::Parameters.new params
    permitted = p.permit(:name, :username, :password, :password_confirmation, :email)

    if permitted[:name] && !permitted[:name].blank? &&permitted[:username] && !permitted[:username].blank? &&permitted[:email] && !permitted[:email].blank? && permitted[:password] && !permitted[:password].blank? && permitted[:password_confirmation] && !permitted[:password_confirmation].blank? 
      render json: {
       	ladder_users: LadderUser.where("lower(email) = ? AND ticket_number = ? AND :name",
                                                 permitted[:email].downcase, permitted[:ticket_number])
      }
      return
    end

    render json: {
      dance_registrants: []
    }#TODO (barryklfung) - write create user form here (to pass data through)
  end

  def update
		#TODO (barryklfung) - invoke class commands to change points
  end

  def retrieve
		#TODO (barryklfung) - retrieve all postgreSQL data from list of users, sort by number of points, list top 10/20 (adapt as needed)
  end
end
