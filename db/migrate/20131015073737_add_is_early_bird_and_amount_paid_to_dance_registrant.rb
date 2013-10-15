class AddIsEarlyBirdAndAmountPaidToDanceRegistrant < ActiveRecord::Migration
  def change
    add_column :dance_registrants, :is_early_bird, :boolean
    add_column :dance_registrants, :amount_paid, :float
  end
end
