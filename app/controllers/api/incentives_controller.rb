class Api::IncentivesController < ApplicationController
  def index
    @incentives = Incentive.all

    render json: @incentives.as_json
  end

  def update
    @incentive = Incentive.find(params[:id])
    @incentive.update!(incentive_params)

    render json: @incentive.as_json
  end

  def create
    @incentive = Incentive.create incentive_params

    render json: @incentive.as_json
  end

  def destroy
    @incentive = Incentive.find params[:id]
    @incentive.destroy!
  end

  private

  def incentive_params
    params.require(:incentive).permit(:code, :max_redemptions)
  end
end
