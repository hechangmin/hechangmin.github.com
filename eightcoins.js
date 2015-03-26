/**
 * 8枚硬币，天平鉴假算法
 * @author  hechangmin@gmail.com
 * @date 2014.9.9
 */

var eightCoins = function(){
	var compare = function(coins, i, j, k) {
		
		var ret = {};

		if (coins[i] > coins[k]) {
			ret.index = i + 1;
			ret.weight = 1;
			
		} else {
			ret.index = j + 1;
			ret.weight = -1;
		}

		return ret;
	};

	return function(coins) {
		if (coins[0] + coins[1] + coins[2] === coins[3] + coins[4] + coins[5]) {
			if (coins[6] > coins[7]) {
				return compare(coins, 6, 7, 0);
			} else {
				return compare(coins, 7, 6, 0);
			}
		} else if (coins[0] + coins[1] + coins[2] > coins[3] + coins[4] + coins[5]) {
			// 节约步奏的关键
			if (coins[0] + coins[3] === coins[1] + coins[4]) {
				return compare(coins,2, 5, 0);
			} else if (coins[0] + coins[3] > coins[1] + coins[4]) {
				return compare(coins, 0, 4, 1);
			} else {
				return compare(coins,1, 3, 0);
			}
		} else if (coins[0] + coins[1] + coins[2] < coins[3] + coins[4] + coins[5]) {
			// 节约步奏的关键
			if (coins[0] + coins[3] === coins[1] + coins[4]) {
				return compare(coins,5, 2, 0);
			} else if (coins[0] + coins[3] < coins[1] + coins[4]) {
				return compare(coins,4, 0, 1);
			} else {
				return compare(coins,3, 1, 0);
			}
		}
	};
}();

//test
var index = 0, ret, arrCoins;

for(var i = 0; i < 10; i++){

	arrCoins = [1, 1, 1, 1, 1, 1, 1, 1];

	index = Math.floor(8 * Math.random());
	arrCoins[index] = 1 + (1 * (Math.random() - 0.5));

	console.log(index, arrCoins[index], arrCoins);
	
	ret = eightCoins(arrCoins);

	if(ret.weight > 0){
		console.log('第' + ret.index + '枚硬币为假币', '假币较重');	
	}else{
		console.log('第' + ret.index + '枚硬币为假币', '假币较轻');	
	}
}
