const button = $('#button')[0]
const audioElement = $('#audio')[0]

// Disable/ Enable Button
const toggleButton = () => {
    button.disabled = !button.disabled
}
const tellMeJoke = (joke) => {
    VoiceRSS.speech({
        key: '8fa90871b22e4b31bf3b7440dfc645ac',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes
const getJokes = async () => {
    let joke ='';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else{
            joke=data.joke;
        }
        // Text To Speech
        tellMeJoke(joke)

        // Disable Button
        toggleButton()
    } catch (error) {
        console.log('Could not get a Joke ', error)
    }
}

// Event Listener
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)
// on Load
// test()