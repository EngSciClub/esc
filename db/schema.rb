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

ActiveRecord::Schema.define(version: 20131015073737) do

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
    t.boolean  "is_over_19"
    t.string   "entree_choice"
    t.integer  "table_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_early_bird"
    t.float    "amount_paid"
  end

end
