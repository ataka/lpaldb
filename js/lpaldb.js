
//
var db = window.openDatabase("Album", "0.1", "album", 1024*1024);

function init() 
{
    db.transaction(
	function(tx){
	    tx.executeSql(
		'create table if not exists album (' +
		    'id integer primary key autoincrement,' +
		    'album_title text,' +
		    'album_artist text,' +
		    'label text,' +
		    'release text' +
		    ' )'
	    );
	    tx.executeSql(
		'create table if not exists track (' +
		    'id integer primary key autoincrement,' +
		    'album_id integer,' +
		    'side text,' +
		    'track text' +
		    ')'
	    );
	}
    );
}

function list_albums()
{
    // Prepare UL
    var list = document.getElementById('list');
    var ul = document.createElement('ul');
    list.appendChild(ul);

    // Get Data from DB
    db.transaction(
	function(tx){
	    tx.executeSql(
		'select album_title from album', [],
		function(tx, rs){
		    // List Albums
		    for (var i=0; i < rs.rows.length; i++){
			var li = document.createElement('li');
			li.innerHTML = rs.rows.item(i).album_title;
			ul.appendChild(li);
		    }
		}
	    );
	}
    );
}

function search_album()
{
    // Prepare ULp
    var list = document.getElementById('list');
    var ul = document.createElement('ul');
    list.appendChild(ul);

    // Get query
    var query = document.getElementById('search').value;

    // Get Data from DB
    db.transaction(
	function(tx){
	    tx.executeSql(
		'SELECT album_title FROM album WHERE album_title LIKE ?', [query],
		function(tx, rs){
		    // List Albums
		    for (var i=0; i < rs.rows.length; i++){
			var li = document.createElement('li');
			li.innerHTML = rs.rows.item(i).album_title;
			ul.appendChild(li);
		    }
		}
	    );
	}
    );
}

function drop_tables()
{
    db.transaction(
	function(tx){
	    tx.executeSql(
		'drop table album' 
	    );
	}
    );
}
