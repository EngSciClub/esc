class DanceTable < ActiveRecord::Base

  TABLE_SIZE = 9

  has_many :registrants, class_name: "DanceRegistrant", foreign_key: "table_number"

  def self.num_tables
    (DanceRegistrant::TOTAL_TICKETS / TABLE_SIZE.to_f).round
  end

end
