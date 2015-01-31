class Api::LadderMatchController < ApplicationController
  def index
		matches = LadderMatch.includes(:player1, :player2)
    render json: {
     	matches: JSON.parse(matches.to_json(include: {only: [:player1, :player2] }))
    }
  end

  def update_player
		#update player 1 using inbuilt commands, then player 2. build commands in LadderUserController
  end

  def point_calculate
		
  end
end
