class AddTransportFromColumnToDanceRegistrants < ActiveRecord::Migration
  def change
    add_column :dance_registrants, :transport_from, :string
  end
end
