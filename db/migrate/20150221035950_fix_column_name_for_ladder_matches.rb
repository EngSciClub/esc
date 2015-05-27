class FixColumnNameForLadderMatches < ActiveRecord::Migration
  def change
	rename_column :ladder_matches, :date_of_game, :date_of_match
  end
end
