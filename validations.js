/*================= INTERNAL AND DEVELOP USE ONLY ==============================/
function testThisTester(){
	var varTypes = [
		function(data,callback){return callback(data);},
		{key: "value", },
		[1,2.3],
		'ksjdhahdkjasd',
		Math.floor((Math.random() * 100) + 1),
		'7bad1f30-0c02-11e6-911e-6725594a44f9',
		'user@domain.com'
	];
	var tests = [
		'isUUID',
		'isEmail',
		'isInt',
		'isString',
		'isArray',
		'isObject',
		'isFunction'
	];

	for (var i = 0; i < tests.length; i++) {
		console.log('\n\n#####################################################################');
		//tests[i]
		var test = validations[tests[i]];
		console.log('Running test for function: \x1b[31m' + tests[i] + '\x1b[0m');
		for (var j = 0; j < varTypes.length; j++) {
			//varTypes[j]
			console.log("\n" + 'testing for input type: ' + '\x1b[36m' + typeof varTypes[j] + '\x1b[0m');
			console.log(	"\t value: (\x1b[37m" +
							varTypes[j] +
							"\x1b[0m) \n" +
							"\t\t" +
							'-Synchronous test:' +
							"\t{\x1b[35m" +
							test.call(validations,varTypes[j]) +
							"\x1b[0m}"
							);
			test.call(validations,varTypes[j],function(data){
				console.log(
					"\t\t-Asynchronous test: \t[\x1b[33m" +
					data +
					"\x1b[0m]\n"
				);
			});
		};
		console.log('ended test for validation: \x1b[31m' + tests[i] + '\x1b[0m' + "\n");
	};
}

/*================= INTERNAL AND DEVELOP USE ONLY ==============================*/

var bulkTester = function(valFn,arrayParams){
	//arguments
	if( validations.isString(valFn) && validations.isArray(arrayParams) ){
		var val = validations[ valFn ];
		for (var i = 0; i < arrayParams.length; i++) {
			if( !val.call( validations, arrayParams[i] ) ){
				return false;
			} else if ( arrayParams.length-i === 1 && !val.call( validations, arrayParams[i] ) ){
				return false;
			} else if ( arrayParams.length-i === 1 && val.call( validations, arrayParams[i] ) ){
				return true;
			}
		};
	} else {
		return false
	}
}

var validations = {
	isUUID:		function(str, callback){
					if(this.isFunction(callback)){
						return callback( /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str) ? str : false );
					} else {
						return  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str)  ? true : false ;
					}
				},
	isEmail: 	function(str,callback){
					if(this.isFunction(callback)){
						return callback( /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(str) ? str : false );
					} else {
						return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(str) ? true : false;
					}
				},
	isInt:		function(num,callback){
					if(this.isFunction(callback)){
						return callback(/^\d+$/.test(num) ? parseInt(num) : false) ;	
					} else {
						return /^\d+$/.test(num) ? true : false;
					}
					
				},
	isString:	function(str,callback){
					if(this.isFunction(callback)){
						return callback( (typeof str ==='string' && !(str instanceof Object) && !(str instanceof Array) && !(str instanceof Function)) ? str : false );
					} else {
						return ( typeof str ==='string' && !(str instanceof Object) && !(str instanceof Array) && !(str instanceof Function) ) ? true : false;
					}
				},
	isArray: 	function(arr,callback) {
					if(this.isFunction(callback)){
						return callback( arr.constructor === Array && arr instanceof Array && !(arr instanceof Function) ) ? arr : false );
					} else {
						return ( arr.constructor === Array && arr instanceof Array && !(arr instanceof Function) ) ? true : false;
					}
				},
	isObject:	function(obj,callback){
					if(this.isFunction(callback)){
						return callback( ( obj.constructor === Object && obj instanceof Object && !(obj instanceof Function) ) ) ? obj : false );
					} else {
						return ( obj.constructor === Object && obj instanceof Object && !(obj instanceof Function) ) ? true : false;
					}
				},
	isFunction:	function(fn,callback){
					if( typeof callback ==='function' && callback instanceof Object && !(callback instanceof Array) && callback instanceof Function ){
						return callback( ( typeof fn ==='function' && fn instanceof Object && !(fn instanceof Array) && fn instanceof Function ) ? fn : false );
					} else {
						return ( typeof fn ==='function' && fn instanceof Object && !(fn instanceof Array) && fn instanceof Function ) ? true : false;
					}
				},
	inArray:	function(needle,haystack){
					if( needle && this.isArray(haystack) ){
						return ( haystack.indexOf(needle) > -1 ) ? true : false;
					} else {
						return false;
					}
				},
	inObject:	function(needle,haystack){
					if( needle && this.isObject(haystack) ){
						return ( needle in haystack ) ? true : false;
					} else {
						return false;
					}
				}
};

module.exports = validations;
module.exports.bulk = bulkTester;