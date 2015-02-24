class RemoveExtraPasswordFromLadderUsers < ActiveRecord::Migration
  def change
    remove_column :ladder_users, :password
  end
end
