import createApiRequest from '../../utils/createApiRequest';
import { fetchCampaignSignatures } from './signature';
import { fetchComments } from './comments';

export default function fetchCampaignById(campaignId) {
  return {
    type: 'FETCH_CAMPAIGN',
    promise: createApiRequest(`api/campaigns/${campaignId}`, 'GET')
  };
}

export function updateStateToCampaignInfo(campaignId) {
  return async dispatch => {
    dispatch(fetchCampaignById(campaignId));
    dispatch(fetchCampaignSignatures(campaignId));
    dispatch(fetchComments(campaignId));
  };
}
