// src/components/Home.js
import React from "react";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from "../hooks/useLocalStorage";
import { text_css, text_html, text_js } from "../rock paper scissors/first";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [html, setHtml] = useLocalStorage('html', text_html);
  const [css, setCss] = useLocalStorage('css', text_css);
  const [js, setJs] = useLocalStorage('js', text_js);
  const [Doc, setDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDoc(
        `<html>
          <body> ${html} </body>
          <style> ${css}  </style>
          <script> ${js} </script>
        </html>`)
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const [expand, setExpand] = useState(true);

  // Check for token in localStorage
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user'); // Get username from localStorage
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    setHtml(text_html);
    setCss(text_css);
    setJs(text_js);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove username from localStorage
    navigate('/auth'); // Navigate to the authentication page
  };

  return (
    <>
      <div className="navbar">
        <h2>PixelPen</h2>
        {username && <h3 style={{ color: 'white' }}>Hello, {username}</h3>}
        <div className="navbar-buttons">
          <button className="reset" onClick={handleReset}>Reset</button>
          {token && (
            <button className="logout" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
      <div className="editor-space">
        <Editor language="xml" displayName="HTML" value={html} onChange={setHtml} />
        <Editor language="css" displayName="CSS" value={css} onChange={setCss} />
        <Editor language="javascript" displayName="JavaScript" value={js} onChange={setJs} />
      </div>
      <div className={`result ${expand ? '' : 'fullscreen'}`}>
        <button className="expand" onClick={() => setExpand(prevExpand => !prevExpand)}>
          <FontAwesomeIcon icon={expand ? faAngleUp : faAngleDown} />
        </button>
        <iframe 
          srcDoc={Doc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default Home;
