import * as React from 'react';
import { useEffect, useState } from 'react';
import { createIncentive, deleteIncentive, getIncentives, updateIncentive } from '@api/endpoints';
import { IncentiveForm } from './IncentiveForm';
import { IncentivesTable } from './IncentivesTable'

interface ResearcherAppProps {
  incentives: Incentive[]
}

export const ResearcherApp: React.FC<ResearcherAppProps> = ({
  incentives: initialData,
}: ResearcherAppProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Incentive[]>(initialData);

  useEffect(() => {
    fetchIncentives()
  }, []);

  const fetchIncentives = async () => {
    await getIncentives()
      .then(incentives => {
        setData(incentives);
        setLoading(false);
      });
  }

  const onUpdateIncentive = async (id: number, code: string) => {
    const incentive = await updateIncentive(id, { code })
    const success = !!incentive;
    return { success, incentive }
  }
  
  const onCreateIncentive = async (code: string, maxUses = 1) => {
    const incentive = await createIncentive({ code, max_redemptions: maxUses });
    if (incentive) setData(old => [...old, incentive]);
    return incentive
  }

  const onDeleteIncentive = async (id: number) => {
    const success = await deleteIncentive(id)
    if (success) await fetchIncentives()
    return success
  }

  return (
    <div className="px-12 py-6">
      <h1 className="text-2xl font-bold mb-6">Setup incentive</h1>
      {data && data.length ? (
        <div className="mb-5 border-b pb-5">
          <h2 className="text-sm uppercase font-semibold mb-4">Exisiting Coupons</h2>
          <IncentivesTable
            deleteIncentive={onDeleteIncentive}
            updateIncentive={onUpdateIncentive}
            incentives={data}
          />
        </div>
      ) : null}

      <p className="mb-4">Create a new coupon code for the candidate to receive:</p>

      {loading && !data && <span>Loading...</span>}
      {data && <IncentiveForm data={data} onCreate={onCreateIncentive} />}
    </div>
  );
};
