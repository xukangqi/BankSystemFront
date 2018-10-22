const Mock = require('mockjs');
const Random = Mock.Random;

export const user = [{
	path: '/user/userinfo',
	type: 'get',
	data(option) {
		let req = JSON.parse(option.body);
		let result = {
			status: 200,
			msg: '',
			data:[]
		};
		for(let i=0; i < 1000; i++) {
			let user = {
				username: Random.cname(),
				password: Random.integer(0, 10000000),
				phonenum: Mock.mock({
							  'regexp': /^1[34578]\d{9}$/
							}),
				userid:Random.integer(0, 10000000),
				usertype:Random.integer(0, 1),
				address:Random.county(true),
				email:Random.email(),
			};
			result.data.push(user);
		}
		return result;
	}
}
];