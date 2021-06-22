require 'test_helper'

class Api::RedemptionsControllerTest < ActionDispatch::IntegrationTest
  describe 'GET #show' do
    subject { get '/api/redemptions' }

    describe 'when no redeemable incentives' do
      before do
        2.times do
          create(:incentive, :with_redemptions)
        end
      end

      test 'it should a blank code' do
        subject
        assert_response :ok
        data = response.parsed_body
        assert_equal nil, data['code']
      end
    end

    describe 'with redeemable incentives' do
      let(:code) { SecureRandom.hex }
      before do
        create(:incentive, code: code)
        create(:incentive, :with_redemptions)
        create(:incentive, :with_redemptions)
      end

      test 'it should return the code' do
        subject
        assert_response :ok
        data = response.parsed_body
        assert_equal code, data['code']
      end
    end
  end

  describe 'POST #create' do
    let(:incentive) { create(:incentive) }
    subject { post '/api/redemptions', params: { redemption: { code: incentive.code } } }

    test 'it should create a new redemption' do
      assert_difference 'Redemption.count' do
        subject
      end

      assert_response :ok
      data = response.parsed_body
      assert_equal incentive.id, data['incentive']['id']
      assert_equal incentive.code, data['incentive']['code']
      assert_not_nil data['redemption']
      assert_equal incentive.id, data['redemption']['redeemable_id']
      assert_equal 'Incentive', data['redemption']['redeemable_type']
      assert_equal incentive.reload.redeemable?, false
    end
  end
end
