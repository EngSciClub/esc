class DropLadderBuffer < ActiveRecord::Migration
  def change
    drop_table :ladder_match_buffers
  end
end
