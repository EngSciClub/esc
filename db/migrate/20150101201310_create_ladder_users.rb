class CreateLadderUsers < ActiveRecord::Migration
  def change
    create_table :ladder_users do |t|
      t.string :name
      t.string :email
      t.string :password
      t.integer :points      
      t.integer :matches_played
      t.integer :last_match_played
      t.timestamps
    end
  end
end
