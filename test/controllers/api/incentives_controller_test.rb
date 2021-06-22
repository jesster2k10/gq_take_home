require 'test_helper'

class Api::IncentivesControllerTest < ActionDispatch::IntegrationTest
  describe 'GET #index' do
    subject { get '/api/incentives' }

    setup do
      create(:incentive, code: 'COUPON!')
    end

    it 'should return all incentives' do
      subject
      assert_response :ok
      data = response.parsed_body
      assert_equal 1, data.size
      assert_equal 'coupon', data[0]['code']
      assert data[0].key? 'id'
    end
  end

  describe 'POST #create' do
    let(:code) { SecureRandom.hex }
    let(:max_redemptions) { rand(1...3) }

    subject { post '/api/incentives', params: { incentive: { code: code, max_redemptions: max_redemptions } } }

    it 'should create the incentive' do
      assert_difference 'Incentive.count' do
        subject
      end

      assert_response :ok

      data = response.parsed_body
      assert_equal code, data['code']
      assert_equal max_redemptions, data['max_redemptions']
    end
  end

  describe 'DESTROY #delete' do
    let(:incentive) { create(:incentive) }
    subject { delete "/api/incentives/#{incentive.id}" }

    it 'should remove the incentive' do
      assert_difference 'Incentive.count' do
        subject
      end
      assert_response :ok
    end
  end

  describe 'PUT #update' do
    subject { put "/api/incentives/#{incentive.id}", params: { incentive: params } }

    let(:incentive) { create(:incentive) }
    let(:params) { { code: 'FOOBAR' } }

    it 'should update the incentive' do
      subject
      assert_response :success
      assert_equal 'foobar', incentive.reload.code
    end
  end
end
