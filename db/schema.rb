# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_22_074057) do

  create_table "incentives", force: :cascade do |t|
    t.string "code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "redemptions_count", default: 0, null: false
    t.integer "max_redemptions", default: 1, null: false
  end

  create_table "redemptions", force: :cascade do |t|
    t.string "redeemable_type", null: false
    t.integer "redeemable_id", null: false
    t.string "candidate_name"
    t.datetime "redeemed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["redeemable_type", "redeemable_id"], name: "index_redemptions_on_redeemable_type_and_redeemable_id"
  end

end
