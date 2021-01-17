const API_ENDPOINT = 'https://api.mux.com/data/v1/';
const MUX_ACCESS_TOKEN_ID = '9b492c09-e22b-4093-bbbd-8d7fbf741fa7';
const MUX_ACCESS_TOKEN_SECRET =
  'EWUqNeLKd9gVKtPsFbdVSP6tLf+XjO08nTOfpZJIAYdepTHZRZh28eONdGbo//HsS6H/3JfniC0';

export const GET = async (path) => {
  return await fetch(`${API_ENDPOINT}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization:
        'Basic ' + MUX_ACCESS_TOKEN_ID + ':' + MUX_ACCESS_TOKEN_SECRET,
    },
    // body: JSON.stringify(postData),
  });
};

export const getLiveStreamById = async (id) => {
  return await GET(`live-streams/${id}`);
};
