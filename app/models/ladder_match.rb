class LadderMatch < ActiveRecord::Base
	validates :player1,	presence: true
	validates :player2,	presence: true
	validates :winner, inclusion: { in: [ 1 , 2 ], message: "Choose a winner."}
	validates :date_of_match, presence: true
	
	#custom methods
	validate :check_user_registered1, :check_user_registered2, :check_different_players, :check_match_quota,  :check_date_is_past
	
	#virtual attribute
	attr_accessor :password
	
	#All the custom validators - are users registered, are users different players, have they played the maximum number of games, is the date physically possible
	def check_user_registered1
		if (LadderUser.find_by username: player1).blank?
  		errors.add(:player1, "Player 1 is not registered")
		end
	end
	def check_user_registered2
		if (LadderUser.find_by username: player2).blank?
  		errors.add(:player2, "Player 2 is not registered")
		end
	end
	def check_different_players
		if (player1 === player2)
		errors.add(:player2, "You can't play yourself!")
		end
	end
	def check_match_quota
		matches_played = LadderMatch.where("player1 = ? AND player2 = ?", player1, player2).length + LadderMatch.where("player1 = ? AND player2 = ?", player2, player1).length
		if (matches_played >= 3)
			errors.add(:winner, "You've already played #{matches_played} matches against each other!")
		end
	end
	def check_date_is_past
		if date_of_match.beginning_of_day() > Date.today.end_of_day()
			errors.add(:date_of_match, "The date can't be in the future.")
		end
	end
	
    #Point calculations for Elo scoring.
	def self.point_calculate(elo1, elo2)
		return 32.0/(1.0+10.0**((elo1 - elo2)/400.0))
	end
end
