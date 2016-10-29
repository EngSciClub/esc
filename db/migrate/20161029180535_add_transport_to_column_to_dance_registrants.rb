class AddTransportToColumnToDanceRegistrants < ActiveRecord::Migration
  def change
    add_column :dance_registrants, :transport_to, :string
  end
end
