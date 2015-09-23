var MemberStore = require('../stores/Member');
module.exports = {
getVip: function(user){
	var ret = {}
	switch (user.vipTier) {
		case 'VIP Gold':
			ret = {
				img: '/images/vip-3.jpg'
				, title: "GOLD"
				, color: 'gold' 
			}
		break;
		case 'VIP Platinum':
			ret = {
				img: '/images/vip-2.jpg'
				, title: "SILVER"
				, color: 'silver' 
			}
		break;
		default:
			ret = {
				img: '/images/vip-1.jpg'
				, title: "MEMBER"
				, color: 'green' 
			}
		break;
	}
	return ret;
}
, getMemberById: function(id) {
	return MemberStore.getMemberById(id);
}
}