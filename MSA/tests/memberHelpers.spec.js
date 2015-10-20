var expect = require('chai').expect;
var should = require('chai').should()

describe('memberHelper', function() {
	var MemberHelpers = require('../app/scripts/shared/memberHelpers');
	describe('getVip', function() {
		it('should return a VIP member', function() {
			expect(MemberHelpers.getVip({vipTier:'VIP Gold'}).color).to.equal('gold');
			expect(MemberHelpers.getVip({vipTier:'VIP Platinum'}).color).to.equal('silver');
			expect(MemberHelpers.getVip({vipTier:'Other'}).color).to.equal('green');
		});
	});
	describe('getMemberById', function() {
		it('should return a found member', function() {
			var MemberStore = require('../app/scripts/stores/Member');
			MemberStore.addMembers([{memberNumber:11, _id: 1}]);
			expect(MemberHelpers.getMemberById(11)._id).to.equal(1);
			should.not.exist(MemberHelpers.getMemberById(1));
		});
	});

});