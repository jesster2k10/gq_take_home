class AddMaxRedemptionsToIncentive < ActiveRecord::Migration[6.0]
  def change
    add_column :incentives, :max_redemptions, :integer, default: 1, null: false
  end
end
