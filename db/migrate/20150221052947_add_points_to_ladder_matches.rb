class AddPointsToLadderMatches < ActiveRecord::Migration
  def change
    add_column :ladder_matches, :points, :integer
  end
end
