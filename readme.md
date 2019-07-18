 
  
  ## Challenge: Make a small web application.
  
  
  Make a small web application. It will have one page with a large text input, 1 button, and an output area. The user will put text into the input, click one of the buttons, and the application will transform the text in some way and display the result in the output area. The work can be done by the server or the client.
  
  Requirements
  You can use any language, framework, or library as long as you write your own code for the actual page.
  You don't have to put it online anywhere, we just want to look at that code. We don’t have to be able to compile or run it.
  Send me the source code as a link to a git repository I can clone.
   
   ## Solution: Dad Joke Portal
   
   The "Dad Joke Portal" is a web application build with Node.js/Express/HTML5/ajax/jQuery/Bootstrap.
   The application routes the user's search through a Node.js request to [https://icanhazdadjoke.com/api](https://icanhazdadjoke.com/api)
   
  ##Contents:
  * This README file.
  * "static" directory containing folders for CSS, js, theam (bootstrap)
  * "static/clientCSS" directory containing customBootstrap.css, dadjokes.css
  * "static/clientJs" directory containing dadjokes.js
  * "static/theme" directory containing bootstrap framework sb-admin assets
  * "static" directory containing favicon.ico 
  * "views" directory containing dadjokes.ejs
  * "404.html" to be served in case of 404 error
  * "package.json" npm config 
  * "Server.js" node.js main server logic 
    
   The Dad Joke Portal web browser application accepts 1 text input:
  * Search Term (words seperated by spaces or new line)
  
  ###Usage:
  Enter search terms into the search term input. and click search. The results area will contain a list of dad jokes that contain any of the words in the search term. The maximum number of jokes returnd per page is 20. 
  Click the page navigation buttons to cycle through pages. Searching without a search term will return all dad jokes.
  
  ###Setup: 
  
  The recommended setup environment for the Dad Joke Portal and RHEL v8.0 Linux hosted on Amazon AWS Micro-t2. 
  Instance must have internet access to icanhazdadjoke.com. Port 80 must be opened on incomming firewall connections.
  
  Install Node.js v8.x & Npm if not already installed:
  
      curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -; sudo yum -y install nodejs;
  
  Clone or copy project assets from the git repository "sbgh/DadJokesPortal" into a new project folder in the current user's home directory. From the project folder enter:
  
      npm install
      sudo node Server.js
      
 DadJokesPortal application will start displaying;
 
      Express server listening on port 80
      
 Acces the application by opening a browser with network access to the server and entering the server's host name or IP addresss into the URL bar. The appliuaction UI will be presented.
      