var albums = null;

var makeRequest =function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var populateList = function(albumsToPrint, poptype) {

  var list = document.querySelector('#albums');
  list.innerText = "";

  albumsToPrint.forEach(function(album) {
  var p = document.createElement('p');
  

    if(poptype == "album"){
        p.innerText = "Album title: " + album.name + "\nArtist Name: " + album.artists[0].name + "\nAlbum Type: " + album.album_type;
        list.appendChild(p);
      }
    
    if(poptype == "artist"){
        p.innerText = "Album title: " + album.name + "\nAlbum Genre: " + album.genres;
        list.appendChild(p);
        album.images.forEach(function(image){
        var img = document.createElement('img');
        img.src = image.url;
        img.style = "width:" + (image.width/3.5) + "px;height:" + (image.height/3.5) + "px" ;
        list.appendChild(img);          
        });

        
      }       
  });
}

var getAlbumsByArtist = function() {

  var search = document.querySelector('#search-query').value;
  var url = 'https://api.spotify.com/v1/search?q=' +search + '&type=artist';

  makeRequest(url, requestComplete);

}

var requestComplete = function() {
  if (this.status != 200) return;

  var retString = this.responseText;
  var retType = retString.substring(5,11)
  var requestedData = JSON.parse(retString);

  if (retType == "albums") {
    albums = requestedData.albums.items;
    populateList(albums, "album");
    };

  if (retType == "artist") {
    console.log(retString);
    albums = requestedData.artists.items;
    populateList(albums, "artist");
    };

  
}

var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=metal&type=album';
  makeRequest(url, requestComplete);

  var searchQuery = document.querySelector('#search');
  searchQuery.onclick = getAlbumsByArtist;

}

window.onload = app;