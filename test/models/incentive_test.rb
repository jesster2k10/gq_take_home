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
require 'test_helper'

class IncentiveTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
