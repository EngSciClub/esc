class AddPasswordDigestToLadderUsers < ActiveRecord::Migration
  def change
    add_column :ladder_users, :password_digest, :string
  end
end
