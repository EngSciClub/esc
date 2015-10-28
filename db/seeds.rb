# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

DanceTable.delete_all
ActiveRecord::Base.connection.reset_pk_sequence! DanceTable.table_name

num_reserved = 2
for i in (1..DanceTable.num_tables)
  DanceTable.create(reserved: i > DanceTable.num_tables - num_reserved)
end
