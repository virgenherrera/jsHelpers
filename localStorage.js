/* this is foreasy  handle local complex storage in a single line of code */
var sQ = {
			get:    function(key,subKey){
						if( key ){
							var exists = localStorage.getItem(key);
							if( exists ){
								exists = JSON.parse( exists );
								if( !subKey ){
									return exists;
								} else if( subKey && exists[ subKey ] ){
									return exists[ subKey ];
								} else {
									console.error("subKey: "+subKey+" in key: "+key+" was not found in localStorage");
									return null;
								}
							} else {
								console.error("key: "+key+" was not found in localStorage");
								return null;
							}
						} else {
							var res = {}
							for( var key in localStorage ){
								res[ key ] = JSON.parse(localStorage[key]);
							}
							return res;
						}
					},
			set:    function(key,val){
						return (key && val) ? localStorage.setItem(key,JSON.stringify(val)) : null;
					},
			upd: 	function(key,value){
							if( key,value ){
								if( key.indexOf('.') === -1 ){
									return this.set( key,value );
								} else if( key.indexOf('.') > 0 ){
									var tempVar	= key.split('.')
									,	subKey	= tempVar.pop();
									key = tempVar.pop();
									tempVar = this.get( key,subKey );
									if( tempVar ){
										tempVar = this.get( key );
										tempVar[subKey] = value;
										return this.set( key,tempVar );
									} else {
										console.error("subindex: "+subKey+" in key: "+key+" was not found in localStorage:\t");
										return null;
									}
								} else {
									return null
								}
							} else {
								return null;
							}
						},
			del:    function(key,subKey){
						if( key && !subKey ){
							return localStorage.removeItem( key );
						} else if(key && subKey){
							var data = this.get( key );
							if( data[subKey] ){
								delete data[subKey];
								this.set( key,data );
							} else {
								return null;
							}
						} else {
							return null;
						}
					},
			clear:	function(){
						return localStorage.clear();
					}
		};
		/* how work with Local Storage using sQ */
		/* set simple values */
		sQ.set('igriet','Gonzales');
		sQ.set('boolean',true);
		sQ.set('number',7);

		/* how to set a value complex value in  */
		var hugo = {name:'Hugo Enrique',lastName:"Virgen Herrera",email:"virgenherrera@gmail.com",phone:9983386149};
		sQ.set( 'Hugo',hugo );
		
		/* get keys *
		console.log( sQ.get('david') );
		console.log( sQ.get('igriet') );
		console.log( sQ.get('boolean') );
		console.log( sQ.get('number') );

		/* get subKey *
		console.log( sQ.get('Hugo','email') );
		/* if subkey or key doesn't exists will return null and send error to console *
		console.log( sQ.get('Hugo','imail') );
		console.log( sQ.get('mumber') );

		/* update some existing key in localStorage */
		sQ.upd('david',hugo) ;
		/* update sime subindex in a existing local storage key *
		console.log( sQ.upd('Hugo.email','s_virgenhe@globalhitss.com') );

		/* delete an entire key */
		//console.log( sQ.del('boolean') );
		/* delete only a subkey *
		console.log( sQ.del('hugo','k1') );

		
		/* also you can get all data stored un localStorage *
		console.log( sQ.get() );

		/* also you can DROP ALL local storage */
		//console.log( sQ.clear() );

		console.log( sQ.get() );