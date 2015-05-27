class AddUsernameToLadderUsers < ActiveRecord::Migration
  def change
	add_column :ladder_users, :username, :string
  end
end
