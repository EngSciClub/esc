require 'json'
class Api::LadderMatchesController < ApplicationController
  def index
    matches = LadderMatch.all
    render json: {
      matches: JSON.parse(matches.to_json())
    }
  end
  def create
    p = ActionController::Parameters.new params[:ladder_match]
    permitted = p.permit(:player1,:player2, :date_of_match, :winner)#, :password)
    match = LadderMatch.new permitted
	@player1 = LadderUser.find_by(username: p[:player1])
	#logger.debug "player1_check: #{@player1.to_json}"
	match.password = p[:password]
	unless match.valid? && @player1.try(:authenticate, match.password)
	  unless @player1.try(:authenticate, match.password)
	    match.errors.add(:password, 'This player (1) and password combination is invalid')
	  end
      render json: { errors: match.errors }, status: 400 and return
    end
    
    #TO-DO (barryklfung) (P1): match calculations (Point Manipulation, Increment Match, Last_Match_Played)
    match.save!
    #TO-DO (barryklfung) (P1): Send Mailer to both players
    match.password = '0'
    render json: {ladder_match: match}
  end  

  def update_player
    #TO-DO (barryklfung) (P1): update player 1 using inbuilt commands, then player 2. build commands in LadderUserController
  end

  def point_calculate
	#Calculate points - not sure if htis command should be in controllers or the model itself.	
  end
end
