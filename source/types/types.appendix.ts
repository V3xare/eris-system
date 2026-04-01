import { StorageInitType, useStorage } from "../utility/use.storage";

export const ParseWhere = ( filter: {[key: string]: string }, storage: StorageInitType ) : {[key: string]: string } => {
	let skip = false;
	let filtersData: {[key: string]: string } = {};

	if( !storage )
		return {};

	if( !filter )
		return filtersData;

	for( let key in filter ){

		let filterKey = filter[ key ];
		let split = filterKey.split( /:/g );

		if( split.length < 2 ){
			filtersData[ key ] = filterKey;
			continue;
		}else if( storage.getValue( split[ split.length - 1 ] ) === undefined ){
			skip = true;
			break;
		};

		filtersData[ key ] = storage.getValue( split[ split.length - 1 ] );
	};

	if( skip )
		return filtersData;

	return filtersData;
};