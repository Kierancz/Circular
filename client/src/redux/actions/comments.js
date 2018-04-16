import createApiRequest from '../../utils/createApiRequest';

export function fetchComments(campaignId) {
  return {
    type: 'FETCH_COMMENTS',
    promise: createApiRequest(`api/comments/${campaignId}`, 'GET')
  };
}

export function postComment(data) {
  return {
    type: 'POST_COMMENT',
    promise: createApiRequest('api/comments', 'POST', data)
  };
}
