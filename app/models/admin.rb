# == Schema Information
#
# Table name: admins
#
#  id                :integer          not null, primary key
#  email             :string(255)
#  authorized_routes :text
#  created_at        :datetime
#  updated_at        :datetime
#

class Admin < ActiveRecord::Base
	serialize :authorized_routes, Array
end
