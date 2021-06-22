require 'test_helper'
require_relative '../../app/services/redeem_code'

class RedeemCodeTest < ActiveSupport::TestCase
  subject { Incentive.create(code: SecureRandom.hex, max_redemptions: 1) }
  before { subject.redemptions.destroy_all }

  describe 'when redeemable' do
    test 'should create a new redemption' do
      assert_equal subject.redeemable?, true
      assert_difference 'Redemption.count' do
        RedeemCode.call(incentive: subject, candidate_name: 'Test candidate')
      end
    end
  end

  describe 'when unredeemable' do
    before do
      @redemption = Redemption.create!(redeemable: subject, candidate_name: 'Test candidate')
      subject.reload
    end

    after do
      @redemption.destroy
    end

    test 'should raise an unredeemable code error' do
      assert_equal subject.redemptions.size, 1
      assert_equal subject.redeemable?, false

      assert_raises RedeemCode::UnredeemableCodeError do
        RedeemCode.call(incentive: subject, candidate_name: 'Test Candidate')
      end
    end
  end
end
