function checkSpecial(str) {
	const specialPattern = /[`~!@#$%^&*|\\\'\";:\/?]/;

	if(specialPattern.test(str) == true) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	checkSpecial
}