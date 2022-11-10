import  { useState,useEffect} from 'react';
import './App.scss';
// import ReactDOM from 'react-dom'
import Colors_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("There is only one way to avoid criticism: do nothing, say nothing, and be nothing.")
  const [author,setAuthor] = useState("Aristotle")
  const [randomNumber, setRandomnumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setaccentColor] = useState('#')


  const fetchQoutes = async (url) =>{
       const response = await fetch(url)
       const parsedJson = await response.json()
       setQuotesArray(parsedJson.quotes)
      
  }

  const getRandQoute = () => {
    let randInteger = Math.floor(quotesArray.length*Math.random());
    setRandomnumber(randInteger)
    setaccentColor(Colors_ARRAY[randInteger])
    setQuote(quotesArray[randInteger].quote)
    setAuthor(quotesArray[randInteger].author)
  
  }

  useEffect (()=>{
    fetchQoutes(quoteDBUrl)
  })


  return (
    <div className='App'>
      
        <header className='App-header' style={
          { background :  accentColor, }}>
          <div id="quote-box" style={{ color: accentColor, }}>
          {/* //<h1>Random Number :{randomNumber}</h1> */}
          
              <p id="text">
                "{quote}"
              </p>
           <p id="author">
             -{author}
           </p>
           <button  style={
          { background :  accentColor, }} id= "new-quote" onClick={()=>getRandQoute()}>generate Random Qoute</button>
           <div className='button'>
           <a   style={
          { background :  accentColor, }} id ="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} >
         <FontAwesomeIcon icon={faTwitter} /> </a>
          </div>
           </div>
        </header>
         </div>
  );
}
 
export default App;
