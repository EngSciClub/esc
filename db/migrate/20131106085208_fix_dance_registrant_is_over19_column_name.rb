class FixDanceRegistrantIsOver19ColumnName < ActiveRecord::Migration
  def self.up
    rename_column :dance_registrants, :is_over_19, :is_over19
  end

  def self.down
    rename_column :dance_registrants, :is_over19, :is_over_19
  end
end
