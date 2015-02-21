class CreateLadderMatchBuffers < ActiveRecord::Migration
  def change
    create_table :ladder_match_buffers do |t|
      t.string :player1
      t.string :player2
      t.datetime :date_of_game
      t.integer :winner

      t.timestamps
    end
  end
end
