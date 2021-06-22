FactoryBot.define do
  factory :incentive do
    code { SecureRandom.hex(6) }

    trait :with_redemptions do
      transient do
        redemptions_count { 1 }
      end

      after(:create) do |incentive, evalulator|
        create_list(:redemption, evalulator.redemptions_count, redeemable: incentive)
        incentive.reload
      end
    end
  end

  factory :redemption do
    association :redeemable, polymorphic: true
    redeemed_at { Time.zone.now }
  end
end
