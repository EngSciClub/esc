class CreateDanceTables < ActiveRecord::Migration
  def change
    create_table :dance_tables do |t|
      t.boolean :reserved
      t.timestamps
    end
  end
end
