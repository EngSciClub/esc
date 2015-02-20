class LadderMatch < ActiveRecord::Base
	validates :player1,	presence: true
	validates :player2,	presence: true
	validates :winner, inclusion: { in: [ 1 , 2 ], message: "Choose a winner."}
	#validates :date_of_game, :check_date_is_past
	
	#custom methods
	validate :check_user_registered1, :check_user_registered2, :check_different_players, :check_match_quota
	
	#virtual attribute
	attr_accessor :password
	
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
		#TO-DO (barryklfung) (P1): Check that only 3 matches are played
	end
	def check_date_is_past
		if date_of_match.present? && date_of_match > Date.today
			errors.add(:date_of_match, "can't be in the future")
		end
	end
	
	def self.point_calculate(elo1, elo2)
		return 1/(1+10**(elo1-elo2))
	end
end
