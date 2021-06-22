import classNames from 'classnames'
import * as React from 'react'

export interface IncentiveTableRowProps {
  incentive: Incentive
  isEven?: boolean
  editingEnabled?: boolean
  updateIncentive: (id: number, code: string) => Promise<{success: boolean}>; 
  deleteIncentive: (id: number) => Promise<boolean>
}

export const IncentiveTableRow: React.FC<IncentiveTableRowProps> = ({
  incentive,
  isEven,
  editingEnabled,
  updateIncentive,
  deleteIncentive,
}) => {
  const [editing, setEditing] = React.useState(() => editingEnabled)
  const [code, setCode] = React.useState(incentive.code);
  const [loading, setLoading] = React.useState(false);

  const codeFieldRef = React.useRef<HTMLInputElement>();

  const tdClass = 'px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'

  const booelanDisplay = (value: boolean) => (
    <span className={classNames(
      'text-sm px-2 py-1 uppercase font-semibold',
      'rounded-sm border',
      {
        'text-green-800 bg-green-50 border-green-100': value,
        'text-red-800 bg-red-50 border-red-100': !value
      }
    )}>
      {value ? 'yes' : 'no'}
    </span>
  )

  const handleEdit = async () => {
    const changed = code !== incentive.code;

    if (editing && changed) {
      setLoading(true)
      const { success } = await updateIncentive(incentive.id, code);
      if (!success) alert('Could not update incentive');
      setLoading(false)
      setEditing(false)
    } else if (editing) {
      setEditing(false)
    } else {
      setEditing(true)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this incentive')) {
      const success = await deleteIncentive(incentive.id);
      if (!success) alert('Could not delete incentive')
    }
  }

  React.useEffect(() => {
    if (!editing) return
    codeFieldRef?.current?.focus()
  }, [codeFieldRef, editing])

  return (
    <tr className={classNames({
      'bg-white': !isEven,
      'bg-gray-50': isEven
    })}>
      <td className={tdClass}>{incentive.id}</td>
      <td className={tdClass}>
        <input
          type="text"
          ref={codeFieldRef}
          autoFocus
          value={code}
          placeholder="Enter a code"
          className="w-full bg-transparent"
          style={{ width: `${code.length}ch` }}
          disabled={!editing}
          onChange={(event) => setCode(event.target.value)}
        />
      </td>
      <td className={tdClass}>{booelanDisplay(incentive.is_redeemed)}</td>
      <td className={tdClass}>{booelanDisplay(incentive.is_redeemable)}</td>
      <td className={tdClass}>{incentive.max_redemptions}</td>
      <td className={tdClass}>{incentive.created_at}</td>
      <td className={tdClass}>{incentive.updated_at}</td>
      <td className={tdClass}>
        <button
          onClick={handleEdit}
          type="button"
          disabled={loading}
          className="text-indigo-600 hover:text-indigo-900 font-medium w-10"
        >
          {loading ? 'Loading...' : (
            <>
              {!editing ? 'Edit' : 'Save'}
            </>
          )}
        </button>
      </td>
      <td className={tdClass}>
        <button
          onClick={handleDelete}
          className="text-red-800 font-medium text-sm"
          type="button"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}