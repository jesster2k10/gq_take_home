class ResearchersController < ApplicationController
  def show
    @incentives = Incentive.all
  end
end
