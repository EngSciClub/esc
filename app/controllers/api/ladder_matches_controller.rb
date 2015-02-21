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
    permitted = p.permit(:player1,:player2, :date_of_match, :winner)
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
    #Point Manipulation & updates.
    @player2 = LadderUser.find_by(username: p[:player2])
    match.points = update_players(@player1,@player2,match.winner,match.id).abs
    match.save!
    #send that verification mail.
    LadderMailer.match_mail(match,@player1,@player2).deliver!
    render json: {ladder_match: match}
  end  

  def update_players(player1,player2,winner,id)
	#Match level calculations, using match's class level methods
	elo_notWLD = true
	if (elo_notWLD)
		if (winner == 1)
			p1points = LadderMatch.point_calculate(player1.points, player2.points)
			p2points = -p1points
		else
			p2points = LadderMatch.point_calculate(player2.points, player1.points)
			p1points = -p2points
		end
	else
		if (winner == 1)
			p1points = 3
			p2points = 0
		else
			p2points = 3
			p1points = 0
		end
	end
	#logger.debug "player 1 change in points #{p1points}"
    #logger.debug "player 2 change in points #{p2points}"
	#Player-level updates
	player1.match_update(p1points, id, winner == 1)
	player2.match_update(p2points, id, winner == 2)
	return p1points
  end
end
