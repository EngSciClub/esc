class CreateDanceRegistrants < ActiveRecord::Migration
  def change
    create_table :dance_registrants do |t|
      t.string :name
      t.string :phone
      t.string :email
      t.string :year
      t.string :password
      t.belongs_to :registered_by, :class_name => "Admin"
      t.integer :ticket_number
      t.text :dietary_restrictions
      t.boolean :is_over_19
      t.string :entree_choice
      t.integer :table_number

      t.timestamps
    end
  end
end
