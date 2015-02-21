class LadderUser < ActiveRecord::Base

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_EMAIL_UTORONTO_REGEX = /\A[\w+\-.]+@mail.utoronto.ca\z/i
  STARTING_POINTS = 1500 #0 if elo_notWLD = 0

  validates :name,
            presence: true,
            length: {
                maximum: 50,
                too_long: "Name is too long."
            }
  validates :username,
            presence: true,
            length: {
                maximum: 50,
                too_long: "Username is too long."
            },
            uniqueness: { case_sensitive: false, message: "This username has been used already."}
  validates :email,
            presence: true,
            length: {
                maximum: 100,
                too_long: "Email is too long."
            },
            format: { with: VALID_EMAIL_UTORONTO_REGEX, message: "Invalid email address format." },
            uniqueness: { case_sensitive: false, message: "This email has been used already."}
  validate :password,
            presence: {on: create, message: "You must have a password."},
            length: { 
                minimum: 7, message: "This password must be at least 7 characters long."
            }
  has_secure_password
  before_create do
    self.email.downcase!
    self.points = STARTING_POINTS
    self.matches_played = 0;
    self.wins = 0;
    self.last_match_played = nil;
    true
  end
  def match_update (points_modifier, id, win)
	self.points = self.points + points_modifier
	self.matches_played = self.matches_played + 1
	self.last_match_played = id
	if (win == true)
		self.wins = self.wins + 1
	end
	self.save!
  end
end
