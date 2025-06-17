import { useState, useEffect } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import Editior from 'react-simple-code-editor'
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import prism from "prismjs"

function App() {

  const [code, setCode] = useState(`function sum ()
  {
    return 1 + 1  
  }`)

  const [review , setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll();
  }, [])

  async function reviewCode () {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error while getting review:", error);
      setReview("❌ Failed to fetch review. Check your backend or network.");
  }
  }
  
  return (
    <>
    <div className="heading">Code Reviewer</div>
      <main>
        <div className="left">
          <div className="code">
            <Editior
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style = {{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: '#282c34',
                color: '#ffffff',
                height: '100%',
                width : '100%',
                borderRadius : '5px'
              }}
            />
          </div>
          <div 
          onClick={reviewCode}
          className="review">Review</div>
        </div>
        <div className="right">
          <Markdown
          rehypePlugins={[ rehypeHighlight ]}
          >{review}</Markdown>
        </div>
      </main>
      <footer>Copyright @CodeReviewer | All Right Reserved.</footer>
    </>
  )
}

export default App
