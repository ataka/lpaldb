function init_add()
{
    init();
    add_sides();
}

function add_album()
{
    var album_title  = document.getElementById('album_title').value;
    var album_artist = document.getElementById('album_artist').value;
    var label = document.getElementById('label').value;
    var release = document.getElementById('release').value;
    
    db.transaction(
	function(tx){
	    var album_id = 1; // Dummy code
	    tx.executeSql(
		'insert into album(album_title, album_artist, label, release) values(?,?,?,?)',
		[album_title, album_artist, label, release],
		function(tx, rs){
		    album_id = rs.insertId;
		}
	    );
	    for (var i=0; i<side_limit; i++){
		var track_id = get_track_id('A', i);
		var track_title = document.getElementById(track_id).value;
		if (track_title != ''){
		    tx.executeSql(
			'insert into track(album_id, side, track) values(?,"A",?)',
			[album_id, track_title]
		    );
		}
	    }
	}
    );
}

//
// Add Side Information
//

var side_letter = 'A';
var side_limit = 8;

function add_sides(){
    add_side();			// Side A
    add_side();			// Side B
}

function add_side()
{
    var albums = document.getElementById('albums');
    var side = document.createElement('h2');
    side.innerHTML = "Side " + side_letter;
    side.id = "side_" + side_letter;
    albums.appendChild(side);

    var track_list = document.createElement('ol');
    albums.appendChild(track_list);

    add_tracks(track_list, side_letter);
    side_letter = increment_letter(side_letter);
}

function add_tracks(track_list, side)
{
    for (var i=0; i<side_limit; i++){
	var track_id = get_track_id(side,i);
	add_track(track_list, track_id);
    }
}

function add_track(track_list, track_id)
{
    var li = document.createElement('li');
    var track = document.createElement('input');
    track.id = track_id;
    track_list.appendChild(li).appendChild(track);
}

// misc function
function increment_letter(ch)
{
    var code = ch.charCodeAt(0);
    return String.fromCharCode(code+1);
}

function get_track_id(side, num)
{
    return 'track_' + side + '_' + num;
}