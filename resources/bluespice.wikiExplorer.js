BSWikiExplorer = {};
BSWikiExplorer.renderPrototypes = {
	raw: function( value, meta ) {
		meta.attr = 'qtip="' + value + '"';
		return value;
	},
	page_title: function( name, meta, record ) {
		var ns = bs.util.getNamespaceText( record.get('page_namespace') );
		var title = record.get( 'page_title' );
		if( ns !== undefined && ns != '' ) {
			title = ns + ':' + title;
		}
		var lnk = mw.util.getUrl( title );
		return '<a href="' + lnk + '" qtip="' + title + '">' + record.get( 'page_title' ) + '</a>';
	},
	page_namespace: function( name, meta, record ) {
		var ns = record.get( 'page_namespace' );
		if( typeof ns === 'undefined' || ns === 'undefined' ) {
			return '';
		}
		return bs.util.getNamespaceText( record.get( 'page_namespace' ) );
	},
	rev_user_text: function( name, meta, record ) {
		var title = record.get( 'rev_user_text' );
		title = 'User:' + title;
		var lnk = mw.util.getUrl( title );
		return '<a href="' + lnk + '" qtip="' + name + '">' + name + '</a>';
	},
	rev_comment: function( name, meta, record ) {
		return record.get( 'rev_comment' );
	},
	page_touched: function( name, meta, record ) {
		if( !record.get( 'page_touched' ) || record.get( 'page_touched' ) == '' ) {
			return '';
		}
		//MW to ISO
		//YYYYMMDDHHMMSS => YYYY-MM-DDTHH
		var match = record.get( 'page_touched' ).match(
			/^(\d{4})(\d{2})(\d{2}).*$/
		);
		var date = new Date( match[1] + '-' + match[2] + '-' + match[3] );
		if( !date ) {
			return '';
		}
		meta.attr = 'qtip="' + date.toLocaleDateString() + '"';
		return date.toLocaleDateString();
	},
	page_created: function( name, meta, record ) {
		if( !record.get( 'page_created' ) || record.get( 'page_created' ) == '' ) {
			return '';
		}
		//MW to ISO
		//YYYYMMDDHHMMSS => YYYY-MM-DDTHH
		var match = record.get( 'page_created' ).match(
			/^(\d{4})(\d{2})(\d{2}).*$/
		);
		var date = new Date( match[1] + '-' + match[2] + '-' + match[3] );
		if( !date ) {
			return '';
		}
		meta.attr = 'qtip="' + date.toLocaleDateString() + '"';
		return date.toLocaleDateString();
	},
	page_len: function( name, meta, record ) {
		//return record.get('page_len');
		//meta.attr = 'qtip="' + size + '"';
		return Ext.util.Format.fileSize( record.get( 'page_len' ) );
	},
	page_is_redirect: function( name, meta, record ) {
		if ( record.get( 'page_is_redirect' ) == 0 ) {
			return WikiExplorerBoolIcon( false );
		}
		return WikiExplorerBoolIcon( true );
	},
	page_categories: function( name, meta, record ) {
		var sOut = '<ul class="bs-wikiexplorer-list-field">';
		for (var i = 0; i < record.get( 'page_categories' ).length; i++) {
			if( !record.get( 'page_categories' )[i] ) {
				continue;
			}
			var lnk = mw.util.getUrl( 'Category' + record.get( 'page_categories' )[i] );
			sOut = sOut + '<li><a href="' + lnk + '" qtip="' + record.get( 'page_categories' )[i] + '">' + record.get( 'page_categories' )[i] + '</a></li>';
		}
		sOut = sOut + '</ul>';
		return sOut;
	},
	page_links: function( name, meta, record ) {
		var sOut = '<ul class="bs-wikiexplorer-list-field">';
		for ( var i = 0; i < record.get( 'page_links' ).length; i++ ) {
			if( !record.get( 'page_links' )[i] ) {
				continue;
			}
			var lnk = mw.util.getUrl( record.get( 'page_links' )[i] );
			sOut = sOut + '<li><a href="' + lnk + '" qtip="' + record.get( 'page_links' )[i] + '">' + record.get( 'page_links' )[i] + '</a></li>';
		}
		sOut = sOut + '</ul>';
		return sOut;
	},
	page_linked_files: function( name, meta, record ) {
		var sOut = '<ul class="bs-wikiexplorer-list-field">';
		for ( var i = 0; i < record.get( 'page_linked_files' ).length; i++ ) {
			if( !record.get( 'page_linked_files' )[i] ) {
				continue;
			}
			var lnk = mw.util.getUrl( 'Medium:' + record.get( 'page_linked_files' )[i] );
			sOut = sOut + '<li><a href="' + lnk + '" qtip="' + record.get( 'page_linked_files' )[i] + '">' + record.get( 'page_linked_files' )[i] + '</a></li>';
		}
		sOut = sOut + '</ul>';
		return sOut;
	},
	contentstabilization_date: function( name, meta, record ) {
		if( !record.get( 'contentstabilization_date' ) || record.get( 'contentstabilization_date' ) == '' ) {
			return '';
		}
		//MW to ISO
		//YYYYMMDDHHMMSS => YYYY-MM-DDTHH
		var match = record.get( 'contentstabilization_date' ).match(
			/^(\d{4})(\d{2})(\d{2}).*$/
		);
		var date = new Date( match[1] + '-' + match[2] + '-' + match[3] );
		if( !date ) {
			return '';
		}
		meta.attr = 'qtip="' + date.toLocaleDateString() + '"';
		return date.toLocaleDateString();
	}
};

WikiExplorerLecayRender_contentstabilization_state = function( name, meta, record ) {
	if ( ( record.get( 'is_contentstabilization_enabled' ) == 1 ) && ( record.get( 'contentstabilization_state' ) == 0 ) ) {
		return WikiExplorerBoolIcon( false );
	}
	if ( ( record.get( 'is_contentstabilization_enabled' ) == 1 ) && ( record.get( 'contentstabilization_state' ) == 1 ) ) {
		return WikiExplorerBoolIcon( true );
	}
	return '';
};

WikiExplorerLecayRender_contentstabilization_date = function( name, meta, record ) {
	if( !record.get( 'contentstabilization_date' ) || record.get( 'contentstabilization_date' ) == '' ) {
		return '';
	}
	//MW to ISO
	//YYYYMMDDHHMMSS => YYYY-MM-DDTHH
	var match = record.get( 'contentstabilization_date' ).match(
		/^(\d{4})(\d{2})(\d{2}).*$/
	);
	var date = new Date( match[1] + '-' + match[2] + '-' + match[3] );
	if( !date ) {
		return '';
	}
	meta.attr = 'qtip="' + date.toLocaleDateString() + '"';
	return date.toLocaleDateString();
};

WikiExplorerLecayRender_contentstabilization_is_new_available = function( name, meta, record ) {
	if ( ( record.get( 'is_contentstabilization_enabled' ) == 1 ) && ( record.get( 'contentstabilization_is_new_available' ) == 0 ) ) {
		return WikiExplorerBoolIcon( false );
	}
	if ( ( record.get( 'is_contentstabilization_enabled' ) == 1 ) && ( record.get( 'contentstabilization_is_new_available' ) == 1 ) ) {
		return WikiExplorerBoolIcon( true );
	}
	return '';
};

WikiExplorerBoolIcon = function( state ) {
	var icon = '<span class="bs-wikiexplorer-column-bool-{0}" aria-label="{1}"></span>';
	if ( state === false ) {
		var iconAriaLabel = mw.message( 'bs-wikiexplorer-icon-bool-false-aria-label' ).text()
		return icon.format( 'false', iconAriaLabel );
	}
	var iconAriaLabel = mw.message( 'bs-wikiexplorer-icon-bool-true-aria-label' ).text()
		return icon.format( 'true', iconAriaLabel );
}

mw.loader.using( 'ext.bluespice.extjs', function() {
	Ext.onReady( function(){
		//Maybe in the future
		//Ext.create( 'BS.WikiExplorer.Panel', {
		//	renderTo: 'wikiExplorer_grid'
		//});

		Ext.require([
			'BS.store.BSApi',
			'Ext.grid.*',
			'Ext.data.*',
			'Ext.tip.QuickTipManager',
			'BS.WikiExplorer.data.ListEntry',
			'Ext.grid.filters.Filters'
		], function() {
			var store = new BS.store.BSApi( {
				apiAction: 'bs-wikiexplorer-store',
				pageSize: 25,
				model: 'BS.WikiExplorer.data.ListEntry',
				proxy: {
					extraParams: {
						format: 'json',
						metaLoaded: false
					},
					reader: {
						type: 'json',
						rootProperty: 'results',
						metaProperty: 'metadata',
						idProperty: 'page_id',
						totalProperty: 'total'
					}
				},
				autoLoad: false,
				remoteSort: true,
				listeners: {
					metachange: function( store, metaData, options ) {
						var columns = metaData.columns;
						for ( var i = 0; i < columns.length; i++ ) {
							if( typeof columns[i].render !== "undefined" ) {
								columns[i].renderer = window[columns[i].render];
							} else if( typeof BSWikiExplorer.renderPrototypes[columns[i].id] !== "undefined" ) {
								columns[i].renderer = BSWikiExplorer.renderPrototypes[columns[i].id];
							}
							if( columns[i].hidden !== true ) {
								columns[i].flex = 1;
							}
						}

						grid.destroy();
						var cfg = {
							store: store,
							border: false,
							hideBorder: true,
							columns: columns,
							plugins: 'gridfilters',
							renderTo: 'superlist_grid',
							cls: 'bs-extjs-crud-grid',
							autoHeight: true,
							tbar: new Ext.toolbar.Toolbar({
								xtype: 'toolbar',
								//dock: 'top',
								displayInfo: true
							}),
							dockedItems: [{
								xtype: 'pagingtoolbar',
								store: store, // same store GridPanel is using
								dock: 'bottom',
								displayInfo: true
							}],
							getHTMLTable: function( sender ) {
								var dfd = $.Deferred();
								var lastRequest = store.getProxy().getLastRequest();
								var params = lastRequest.getParams();

								//This is ugly... unfortunately most AJAX interfaces can not
								//handle requests without those parameters
								params.page = 1;
								params.limit = 9999999;
								params.start = 0;

								var url = lastRequest.getUrl();

								Ext.Ajax.request({
									url: url,
									params: params,
									success: function(response){
										var resp = Ext.decode( response.responseText );
										var proxy = store.getProxy();
										var reader = proxy.getReader();
										var rows = resp[reader._rootProperty];
										var columns = grid.getColumns();
										var row = null;
										var col = null;
										var value = '';
										var $table = $('<table>');
										var $row = null;
										var $cell = null;
										var record = null;

										$row = $('<tr>');
										$table.append($row);
										for( var j = 0; j < columns.length; j++ ) {
											col = columns[j];
											if( col instanceof Ext.grid.ActionColumn ) {
												continue;
											}

											if( col.hidden === true ) {
												continue;
											}

											$cell = $('<td>');
											$row.append( $cell );
											$cell.append( col.header || col.text );
										}

										for( var i = 0; i < rows.length; i++ ) {
											row = rows[i];
											$row = $('<tr>');
											record = new store.model( row );
											$table.append($row);

											for( var j = 0; j < columns.length; j++ ) {
												col = columns[j];
												if( col instanceof Ext.grid.ActionColumn )
													continue;

												if( col.hidden === true )
													continue;

												$cell = $('<td>');
												$row.append( $cell );

												value = row[col.dataIndex];
												if( typeof BSWikiExplorer.renderPrototypes[col.dataIndex] !== "undefined" ) {
													col.renderer = BSWikiExplorer.renderPrototypes[col.dataIndex];
													value = col.renderer(
														row[col.dataIndex],
														{}, //Cell meta... we don't have any
														record,
														i,
														j,
														store
													);
												}
												$cell.append( value );
											}
										}
										dfd.resolve( '<table>' + $table.html() + '</table>' );
									}
								});
								return dfd;
							}
						};
						$(document).trigger('BSPanelInitComponent', [cfg] );
						grid = Ext.create('Ext.grid.Panel', cfg );
						store.proxy.extraParams.metaLoaded = true;
					},
					beforeload: function(store, operation) {
						return true;
					}
				}
			});
			var grid = Ext.create('Ext.grid.Panel', {
				store: store,
				border: false,
				hideBorder: true,
				columns: [],
				plugins: 'gridfilters',
				height: 600,
				renderTo: 'superlist_grid'
			});
			store.load();
		});
	});
});
