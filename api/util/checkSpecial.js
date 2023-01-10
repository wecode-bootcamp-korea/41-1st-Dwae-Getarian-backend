function checkSpecial(str) {
	const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

	if(special_pattern.test(str) == true) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	checkSpecial
}