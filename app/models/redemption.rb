# == Schema Information
#
# Table name: redemptions
#
#  id              :integer          not null, primary key
#  redeemable_type :string           not null
#  redeemable_id   :integer          not null
#  candidate_name  :string
#  redeemed_at     :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Redemption < ApplicationRecord
  belongs_to :redeemable, polymorphic: true, counter_cache: true,
                          optional: false

  validates :redeemed_at, presence: true

  before_validation :set_redeemed_at

  def set_redeemed_at
    self.redeemed_at ||= Time.zone.now
  end
end
