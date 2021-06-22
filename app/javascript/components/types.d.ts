interface Model {
  id: number;
  created_at: string;
  updated_at: string;
}

interface Incentive extends Model {
  code: string;
  is_redeemable: boolean;
  is_redeemed: boolean;
  redemptions_count: number;
  max_redemptions: number;
}
