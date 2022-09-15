import { fetchRequest } from './fetch-request';

export const createUser = async (url, userData) => {
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

export const updateUser = async (url, userData, token) => {
	loginUser(url, {username: userData.username, password: userData.password}).then(data => {
		const full_url = `${url}/user`;
		return fetchRequest(
			full_url,
			token,
			{
				id: data.user.id,
				user: {
					username: userData.username,
					password: userData.newPassword,
				},
			},
			'PATCH'
		);
	}
		
	)
	
};
