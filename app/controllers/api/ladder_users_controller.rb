class Api::LadderUsersController < ApplicationController
  def index
    render json: {
    ladder_users: LadderUser.all.order(points: :desc)
    }
  end

  def create
    p = ActionController::Parameters.new params[:ladder_user]
    permitted = p.permit(:name, :username, :email, :password, :password_confirmation)
    user = LadderUser.new permitted
	unless user.valid?
      render json: { errors: user.errors }, status: 400 and return
    end
    user.save!
    LadderMailer.signup_email(user).deliver!
    render json: { ladder_user: user }
  end
  
end
