class LadderUser < ActiveRecord::Base

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_EMAIL_UTORONTO_REGEX = /\A[\w+\-.]+@mail.utoronto.ca\z/i
  STARTING_POINTS = 1500

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
                too_long: "Userame is too long."
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
            presence: {on: create},
            length: { 
                minimum: 7, message: "This password must be at least 7 characters long."
            }
  has_secure_password
  before_create do
    self.email.downcase!
    self.points = STARTING_POINTS
    self.matches_played = 0;
    self.last_match_played = nil;
    true
  end
  def access_match_history
    #TO-DO: develop match access history if needed, highly doubted though.	
  end
  def modify_score(points)
    self.points = self.points + points
  end
  def match_played_increment
    self.matches_played = self.matches_played + 1
  end
end
