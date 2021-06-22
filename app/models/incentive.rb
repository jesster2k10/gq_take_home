# == Schema Information
#
# Table name: incentives
#
#  id               :integer          not null, primary key
#  code             :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  redemption_count :integer
#  max_redemptions  :integer          default(1)
#
class Incentive < ApplicationRecord
  has_many :redemptions, as: :redeemable

  before_save :transform_code

  validates :code, uniqueness: true

  def as_json(options = {})
    super(options.deep_merge(methods: %i[is_redeemed is_redeemable]))
  end

  def redeemable?
    redemptions.size + 1 <= max_redemptions
  end

  def reedemed?
    redemptions.size == max_redemptions
  end

  def transform_code
    self.code = code.parameterize
  end

  alias is_redeemed reedemed?
  alias is_redeemable redeemable?
end
