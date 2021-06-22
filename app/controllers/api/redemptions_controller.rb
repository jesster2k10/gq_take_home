class Api::RedemptionsController < ApplicationController
  rescue_from RedeemCode::UnredeemableCodeError do
    render json: { message: 'The code you entered was unredeemable' }, status: :bad_request
  end

  def show
    @incentive = Incentive.where('redemptions_count < max_redemptions').sample
    render json: { code: @incentive&.code }
  end

  def create
    @incentive = Incentive.find_by! code: redeem_params[:code]
    @result = RedeemCode.call(incentive: @incentive, candidate_name: redeem_params[:candidate_name])

    render json: {
      incentive: @incentive.as_json,
      redemption: @result.redemption.as_json
    }
  end

  private

  def redeem_params
    params.require(:redemption).permit(:code, :candidate_name)
  end
end
