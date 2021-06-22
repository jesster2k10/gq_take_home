import * as React from 'react';
import { useState } from 'react';
import { updateIncentive } from '@api/endpoints';

interface Props {
  data: Incentive[];
  onCreate: (code: string, maxUses: number) => Promise<Incentive | undefined>
}

export const IncentiveForm: React.FC<Props> = ({ data, onCreate }) => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [maxUses, setMaxUses] = useState(1)
  const [inputValue, setInputValue] = useState<string>();

  async function handleClickSave() {
    setSaving(true);
    const incentive = await onCreate(inputValue, maxUses)
    if (incentive) {
      setMessage('Successfully updated!');
      setTimeout(() => setMessage(''), 2000);
      setInputValue('')
    } else {
      setMessage('An error occured');
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="flex space-x-2 pb-4">
        <input
          disabled={saving}
          className="text-xl border"
          type="text"
          name="incentive_code"
          placeholder="Enter the code"
          value={inputValue}
          onChange={e => setInputValue(e.currentTarget.value)}
        />
        <div className="flex flex-col">
          <label>Max Uses</label>
          <input
            type="number"
            placeholder="Max Uses"
            value={maxUses}
            className="border text-xl"
            onChange={(e) => setMaxUses(parseInt(e.currentTarget.value, 10))}
          />
        </div>
        <button
          disabled={saving}
          className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2"
          onClick={handleClickSave}
        >
          Save
        </button>
      </div>
      {message && <div className="text-gray-600 italic">{message}</div>}
    </div>
  );
};
