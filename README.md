   <h1>Electron Multichain Explorer</h1>
A general management tools for Multichain blockchains
Currently it's just a basic template that others can build on.

Currently supports Windows10 and Linux ( tested on Lubuntu 18 ). MacOS coming soon....        

This is not a secure app yet. Real encryption and login needs to be finalized. I've used  <a href="http://bitwiseshiftleft.github.io/sjcl/" target="blank">sjcl</a> encryption in some test runs ( works very well ) but I want to refactor and streamline code more before implementing it. There is a login script that will simulate login of production release. 

I am still studying web development, Electron and Multichain and this is my first real project to try and combine these elements. Any feedback and suggestions will be greatly appreciated. 
 
<h3>The goal:</h3>
I hope to develop this project into a general template that developers can fork and use other frameworks to inhance visual and functional elements. To that end, I've kept dependecies to a minimum. I think it would be relatively simple to adapt the code to suit a React, Angular or Vue project. Forks are welcome. 
   
<p>
   This project was started from <a href="https://github.com/electron/electron-quick-start" target="blank">Electron Quickstart
</p>

<h4>
    Requirements:
</h4>

<a href="https://www.multichain.com/download-install/" target="blank">Multichain</a>. Follow the instructions on the main site. 
On Windows, you will need to add Multichain to the PATH variables. 
<a href="https://www.multichain.com/download-install/" target="blank">Here</a> is a great article showing how to do it.
<a href="https://dist.ipfs.io/#go-ipfs" target="blank">GO-IPFS</a>. Follow the instructions on the main site. It's really easy.

<a href="https://electronjs.org/docs" target="blank">Electron V5</a>. For security, it's always recommended to keep Electron updated to latest version.

<a href="https://nodejs.org/en/" target="blank">Node v12</a>. You could ammend the package.json to install earlier versions of Node. This project was originally started in Node v8 and there aren't any dependecies that require Node v12.

On Linux, you will need to install Multichain manually. The steps are very easy to follow. Future updates will automate this process.

<h4>
    Current features:
</h4>

 <ul>
   <li>Detect existing Multichain blockchains.( Install "app" chain if none exist )</li>
   <li>Automatically start all local chains</li>
   <li>Create new chains with custom permissions</li>
   <li>Create streams ( currently all streams are "closed" by default )</li>
   <li>Post simple text to stream ( Future updates will include more detailed forms, ie. employee details, todo items, contact details, registration forms )</li>
</ul>

<h4>Install: </h4>

clone repo

npm install

npm start


<h4>
    Current state:
</h4>

I will be reviewing code and making improvements before adding any more features. 
