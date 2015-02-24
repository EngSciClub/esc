class LadderMailer < ActionMailer::Base
  default from: "engsci.website@gmail.com"
	
  def signup_email(user)
    @user = user
    @default_email = 'engsci.website+sent@gmail.com'
    mail(to: @user.email, bcc: @default_email, subject: 'Welcome to the EngSci Ladder!')
  end	
	
  def match_mail(game, user1, user2)
    @user1 = user1
    @user2 = user2
    @game = game
    @default_email = 'engsci.website+sent@gmail.com'
    mail(to: [@user1.email, @user2.email], bcc: @default_email, subject: 'Ladder Game Submission Report')
  end
end
