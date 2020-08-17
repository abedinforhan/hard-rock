const API_URl="https://api.lyrics.ovh/suggest/"

//function to Seach a song name in the search bar
const searchLyrics=()=>{
  const searchInput=document.getElementById('search-input').value;
  //validation for seacrh input 
  if(searchInput!=''){
     fetchSearchData(searchInput);
   }
  else{
    alert('Nothing To Search');
    }
    clearLyrics();
 }

//function to fetch json data from api
const fetchSearchData=(searchValue)=>{
  const searchURL=API_URl+searchValue;
  
  fetch(searchURL)
  .then(res => res.json())
  .then((data) => 
    showData(data))
} 

//function to show Song List in HTML
const showData=(data)=>{
  
  let html=''; 
  for(let i=0;i<=9;i++){
    html+=
    `<div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-7">
        <h3 id="title" class="lyrics-name">${data.data[i].title}</h3>
        <p id="artist" class="author lead">Album by <span>${data.data[i].artist.name}</span></p>
    </div>
    <div class="col-md-4text-md-right text-center btn-container">
        
        <div>
        <button onclick='playPreview(this)' data-play="${data.data[i].preview}" class="btn btn-success preview-btn mr-2">play preview</button> 
        </div>
        
        <div><button onclick="lyricsClick(this)" data-song="${data.data[i].title}" data-artist="${data.data[i].artist.name}" class="lyrics-btn btn btn-success">Get Lyrics</button></div>
    </div>
   </div>
    `
  }
  document.getElementById('search-result').innerHTML=html;
 }


//function to get lyrics from API  
const getLyrics=(artist,song)=>{
  
  const lyrics_URL=`https://api.lyrics.ovh/v1/${artist}/${song}`;
  
  fetch(lyrics_URL)
  .then(res=>res.json())
  .then(data=>showLyrics(data.lyrics,song))
}

//function to show lyrics into the HTML file
const showLyrics=(lyrics='',song)=>{
    document.getElementById('lyrics-title').innerText=song;
     
    if(lyrics==='') //default value to check lyrics is found or not
    {   
     document.getElementById('lyrics-output').innerText='Lyrics not Found';
     }
     else{
       document.getElementById('lyrics-output').innerText=lyrics;
      }
}

//lyrics button Click Function
const lyricsClick=(element)=>{
  const artist=element.getAttribute('data-artist');
  const song=element.getAttribute('data-song');
   
  getLyrics(artist,song);
}

//function to preview song
const playPreview=(elem)=>{
 const  previewLink=elem.getAttribute('data-play');
 window.open(previewLink,"_blank");
}

//function for clear previous lyrics
const clearLyrics=()=>{
  document.getElementById('lyrics-output').innerHTML='';
  document.getElementById('lyrics-title').innerHTML='';
}







