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
require 'test_helper'

class RedemptionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
