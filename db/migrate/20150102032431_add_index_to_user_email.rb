class AddIndexToUserEmail < ActiveRecord::Migration
  def change
    add_index :ladder_users, :email, unique: true
  end
end
