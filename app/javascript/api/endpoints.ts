/** 
 * @mark Incentives
 */

export const getIncentives = async (): Promise<Incentive[]> => {
  const resp = await fetch('/api/incentives');
  if (resp.ok) {
    return await resp.json();
  }
  return null;
};

export const updateIncentive = async (id: number, params: Partial<Incentive>): Promise<Incentive> => {
  const resp = await fetch(`/api/incentives/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params),
  });
  if (resp.ok) {
    return await resp.json();
  }
  return null;
};

export const deleteIncentive = async (id: number): Promise<boolean> => {
  const resp = await fetch(`/api/incentives/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });
  if (resp.ok) {
    return true;
  }
  return false;
};

export const createIncentive = async (params: Partial<Incentive>): Promise<Incentive> => {
  const resp = await fetch(`/api/incentives`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params),
  });

  if (resp.ok) {
    return await resp.json();
  }
  return null;
};

/**
 * @mark Redemptions
 */
export const getRedemptionCode = async (): Promise<string | null> => {
  const response = await fetch('/api/redemptions.json')
  if (response.ok) {
    const { code } = await response.json()
    return code
  }

  return null
}

export const createRedemption = async (code: string): Promise<{
  message?: string;
  incentive?: Incentive
}> => {
  const response = await fetch('/api/redemptions', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ redemption: { code } })
  })
  
  let body = { message: null }

  try {
    body = await response.json();
    if (!response.ok && !body.message) {
      body.message = 'An unexpected error ocurred'
    }
  } catch (error) {
    body.message = 'An unexpected error ocurred'
  }

  return body
}