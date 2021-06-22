import { createRedemption, getRedemptionCode } from '@api/endpoints';
import * as React from 'react';
import { useState } from 'react';

interface Props {
  data: Incentive[];
}
export const Redeem: React.FC<Props> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [message, setMessage] = useState<string>()
  const [code, setCode] = useState<string>()

  async function handleClickRedeem() {
    setLoading(true)
    setRedeemed(false)
    setMessage(undefined)

    let redemptionCode = code;

    if (!redemptionCode) {
      redemptionCode = await getRedemptionCode()
      setCode(redemptionCode)
    }
    
    if (!redemptionCode) {
      setMessage('No avaliable codes')
      setLoading(false)
      return
    }
    
    const { message } = await createRedemption(redemptionCode)
    
    if (message) {
      setRedeemed(false)
      setMessage(message)
    } else {
      setRedeemed(true)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="pb-4 flex flex-col max-w-sm space-y-4">
        <input
          type="text"
          className="border px-2 py-2 rounded-md border-gray-200 shadow-sm"
          placeholder="Enter a code or press redeem to generate one"
          value={code}
          onChange={event => setCode(event.currentTarget.value)}
        />

        <button
          disabled={redeemed}
          className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2"
          onClick={handleClickRedeem}
        >
          {loading ? 'Loading...' : 'Redeem'}
        </button>
      </div>

      {message && (
        <div className="pb-4 text-red-600 italic">
           {message}
        </div>
      )}

      {redeemed && (
        <div className="pb-4 text-green-600 italic">
          Your code is: {code}. Thanks for participating in our research!
        </div>
      )}
    </div>
  );
};
