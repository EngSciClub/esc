class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.string :name
      t.string :mailfrom
      t.string :message

      t.timestamps
    end
  end
end
