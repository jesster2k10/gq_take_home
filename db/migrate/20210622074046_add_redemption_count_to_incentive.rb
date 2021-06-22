class AddRedemptionCountToIncentive < ActiveRecord::Migration[6.0]
  def change
    add_column :incentives, :redemptions_count, :integer, default: 0, null: false
  end
end
