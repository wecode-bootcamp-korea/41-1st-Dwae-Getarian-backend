function merge(arr1, arr2) {
	let result = [];
	let first = 0;
	let second = 0;

	while (first < arr1.length && second < arr2.length) {
		if (arr1[first]["quantity"] <= arr2[second]["quantity"]) {
			result.push(arr1[first]);
			first++;
		}

		else if (arr1[first]["quantity"] > arr2[second]["quantity"]) {
			result.push(arr2[second]);
			second++;
		}

		else {
			return;
		}
	}

	return result;
}


function mergeSort(arr) {
	if (arr.length === 0 || arr.length === 1) return arr;
	
	const middle = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, middle));
	const right = mergeSort(arr.slice(middle));

	return merge(left, right);
}


module.exports = {
	mergeSort
}