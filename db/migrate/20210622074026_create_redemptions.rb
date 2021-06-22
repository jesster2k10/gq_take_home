class CreateRedemptions < ActiveRecord::Migration[6.0]
  def change
    create_table :redemptions do |t|
      t.belongs_to :redeemable, null: false, polymorphic: true
      t.string :candidate_name
      t.datetime :redeemed_at

      t.timestamps
    end
  end
end
