import { fetchRequest } from './fetch-request';

export const signupUser = async (url, userData) => {
	const full_url = `${url}/users/`;
	return await fetchRequest(
		full_url,
		'',
		{user: { username: userData.username, password: userData.password }},
		'POST'
	);
};

export const loginUser = async (url, userData) => {
	const full_url = `${url}/login`;
	return await fetchRequest(
		full_url,
		'',
		{user: { username: userData.username, password: userData.password }},
		'POST'
	);
};

export const updateUser = async (url, userData) => {
	const response = await loginUser(url, {username: userData.username, password: userData.password})
	
	if (!response.ok) {
		throw new Error(response.error || 'Something went wrong.');
	}
	const full_url = `${url}/user`;
	
	return await fetchRequest(
		full_url,
		response.token,
		{
			id: response.user.id,
			user: {
				username: userData.username,
				password: userData.newPassword,
			},
		},
		'PATCH'
	);
}
	
