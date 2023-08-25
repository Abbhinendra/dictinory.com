
const form = document.querySelector('form');
const result = document.querySelector('.result');
btn1 = document.getElementById('btn');
let sorry=new Audio('2LYFZBX-child-saying-im-sorry.mp3');


btn1.addEventListener('click', function (e){

    e.preventDefault();
  
    getWord(form.elements[0].value);
});

async function getWord(word) {
    try {

        result.innerHTML = "Feching result.";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let def = data[0].meanings[0].definitions[0];
        let index=0;
        let songs=new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${data[0].word}-us.mp3`)
        
      setTimeout(() => {
        
        
              
             songs.play();
             

        
        
        },200);
      
        
    
     

        result.innerHTML = `<h2><strong>Word:</strong>${data[0].word}</h2>
<p class="pt">${data[0].meanings[0].partOfSpeech}</P>
<p>${data[0].meanings[0].definitions[0].definition === undefined ? "Not Found" : def.definition}</P>
<p><strong>Example:</strong>${data[0].meanings[0].definitions[0].example === undefined ? "Not Found" : def.example}</p>
<p><strong>Antonyms:</strong></p>
`
        
        if (def.antonyms.length === 0) {
            result.innerHTML += `<span>Not Found</spna>`
        }
        else {
            for (let i = 0; i < def.antonyms.length; i++) {
                result.innerHTML += `<li>${def.antonyms[i]}</li>`
            }

        }

        if (def.synonyms.length === 0) {
            result.innerHTML += `<span><p class="bold"><srtong>Synonyms:</strong></p><br>Not Found</spna>`
        }
        else {
            for (let i = 0; i < def.synonyms.length; i++) {
                result.innerHTML += `<p class="bold"><srtong class="bold">Synonyms:</strong></p><br><li>${def.synonyms[i]}</li>`
            }

        }



        result.innerHTML += `<div><a href=${data[0].sourceUrls} target="_blank">Read More..</a></div>`;
        
    } catch (error) {
        result.innerHTML = `<p>Sorry,the word could not be found</p>`;
        setTimeout(() => {
            sorry.play();
        }, 200);
        
    }
}







