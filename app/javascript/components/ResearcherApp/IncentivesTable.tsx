import * as React from 'react'
import classNames from 'classnames';
import { IncentiveTableRow, IncentiveTableRowProps } from './IncentiveTableRow'

export interface IncentivesTableProps {
  incentives: Incentive[]
  updateIncentive: IncentiveTableRowProps['updateIncentive'],
  deleteIncentive: IncentiveTableRowProps['deleteIncentive']
}

export const IncentivesTable: React.FC<IncentivesTableProps> = ({
  incentives,
  deleteIncentive,
  updateIncentive,
}) => {
  const headers = [
    'Id',
    'Code',
    'Redeemed?',
    'Redeemable?',
    'Max Uses',
    'Created At',
    'Updated At',
    '',
    ''
  ]

  return (
    <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
      <table
        id="IncentivesTable"
        data-testid="incentives-table"
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          <tr>
            {headers.map(header => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incentives.map((incentive, index) => (
            <IncentiveTableRow
              incentive={incentive}
              isEven={index % 2 === 0}
              key={incentive.id}
              updateIncentive={updateIncentive}
              deleteIncentive={deleteIncentive}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}