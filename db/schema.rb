# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131106085208) do

  create_table "admins", force: true do |t|
    t.string   "email"
    t.text     "authorized_routes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "dance_registrants", force: true do |t|
    t.string   "name"
    t.string   "phone"
    t.string   "email"
    t.string   "year"
    t.string   "password"
    t.integer  "registered_by_id"
    t.integer  "ticket_number"
    t.text     "dietary_restrictions"
    t.boolean  "is_over19"
    t.string   "entree_choice"
    t.integer  "table_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_early_bird"
    t.float    "amount_paid"
  end

  create_table "dance_tables", force: true do |t|
    t.boolean  "reserved"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ladder_users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.integer  "matches_played"
    t.integer  "points"
    t.integer  "last_match_played"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ladder_matches_buffer", force: true do |t|
    t.string   "player_1"
    t.string   "player_2"
    t.integer  "winner"
	t.datetime "match_date"
    t.datetime "system_input_date"
  end

  create_table "ladder_matches", force: true do |t|
    t.string   "player_1"
    t.string   "player_2"
    t.integer  "winner"
	t.datetime "match_date"
    t.datetime "system_input_date"
  end	
	
end
