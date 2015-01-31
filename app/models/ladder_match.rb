class LadderMatch < ActiveRecord::Base
	validates :player1,
						:check_user_registered1,
						presence: true
	validates :player2,
						:check_user_registered2,
						presence: true
	validates :date_of_game,
						:check_date_is_past
	validates :winner,
						inclusion: { in: %w{1 2}}
	
	def check_user_registered1
		if LadderUser.where(:name => :player1).blank?
  		errors.add(:player1, "is not registered")
		end
	end
	
	def check_user_registered2
		if LadderUser.where(:name => :player2).blank?
  		errors.add(:player2, "is not registered")
		end
	end
	def check_date_is_past
		if date_of_game.present? && date_of_game > Date.today
			errors.add(:date_of_game, "can't be in the future")
		end
	end

	def self.point_calculate(elo1, elo2)
		return 1/(1+10**((elo1-elo2)
	end
end
