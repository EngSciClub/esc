class AddWinsToLadderUsers < ActiveRecord::Migration
  def change
    add_column :ladder_users, :wins, :integer
  end
end
