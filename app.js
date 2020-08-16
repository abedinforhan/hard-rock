const API_URl="https://api.lyrics.ovh/suggest/"

const searchLyrics=()=>{
   const searchValue=document.getElementById('searchInput').value;
  
    fetchData('summer');
  //  console.log(typeof(searchValue));
}

const fetchData=(searchValue)=>{
  const full=API_URl+searchValue;
  console.log(full);
   let obj;
  fetch(full)
  .then(res => res.json())
  .then(data => showData(data))
} 

const showData=(data)=>{
  // console.log(data);
  let html='';
   
  for(let i=0;i<=9;i++){
    
    html+=`<div>
    <p class="author lead">
    <strong id="title">
    ${data.data[i].title}
    </strong> 
    Album by 
    <span artist">${data.data[i].artist.name}</span> 
    <button id="btn${i}" onclick="getLyrics(this.id)"  class="btn btn-success">
    Get Lyrics
    </button>
    </p>
    </div>`
  }
  document.getElementById('show-output').innerHTML=html;
 
  }

const getLyrics=(btnId)=>{
  const button=document.getElementById(btnId);
  
  const artistElem=button.previousElementSibling;
  const artistName=artistElem.innerText;
  
  const titleElem=artistElem.previousElementSibling;
  const titleName=titleElem.innerText;
  
  const lyrics_URL=`https://api.lyrics.ovh/v1/${artistName}/${titleName}`;
  
  fetch(lyrics_URL)
  .then(res=>res.json())
  .then(data=>showLyrics(data.lyrics,titleName))
}

const showLyrics=(lyrics='',titleName)=>{
    document.getElementById('lyrics-title').innerText=titleName;
    // console.log(lyrics);
     
    if(lyrics===''){
     document.getElementById('lyrics-output').innerText='Lyrics not Found';
     }
     else{
       document.getElementById('lyrics-output').innerText=lyrics;
      }
}