class RedeemCode
  attr_reader :incentive, :candidate_name, :redemption

  class UnredeemableCodeError < StandardError; end

  def self.call(*args, **kwargs)
    new(*args, **kwargs).call
  end

  def initialize(incentive:, candidate_name:)
    @incentive = incentive
    @candidate_name = candidate_name
  end

  def call
    raise UnredeemableCodeError unless incentive.redeemable?

    @redemption = Redemption.create!(
      candidate_name: candidate_name,
      redeemable: incentive,
      redeemed_at: Time.zone.now
    )

    self
  end
end
