<h1>Electron Multichain Explorer</h1>
A general management tools for Multichain blockchains

Currently supports Windows10 and Linux ( tested on Lubuntu 18 ). MacOS coming soon....

<h3>
    Security notice:
</h3>
<p>
    This application uses full Node intergration is all windows. As such you should never load remote content or any
    other
    files that can execute unknown code within the browser window. I would appreciate any advice from experienced
    Electron
    developers to help secure this appilcation. I imagine a whitelist/blacklist could be setup that would block any
    remote
    content from being loaded. Remote content will be loaded in default browsers like Chrome or Firefox.
</p>


<h3>
    Recommendation:
</h3>
<p>I highly recommend using Linux for this app. Multichain and IPFS API calls are significantly faster.</p>

<h3>
    Disclaimer:
</h3>
<p>I am still studying web development and Electron. This is my first real project to try and combine these elements.
    I'm a
    huge fan of blockchains, IPFS and DAT-protocol (which will be added to the project soon ). Any feedback and
    suggestions
    will be greatly appreciated.
</p>

<h3>The goal:</h3>
<p>
    I hope to develop this project into a general template that developers can fork and use other frameworks to inhance
    visual and functional elements. To that end, I've kept dependecies to a minimum. I think it would be relatively
    simple
    to adapt the code to suit a React, Angular or Vue project. Forks are welcome.
</p>


<p>
    This project was started from <a href="https://github.com/electron/electron-quick-start" target="blank">Electron
        Quickstart
</p>

<h3>
    Requirements:
</h3>
<ul>
    <li>
        <a href="https://www.multichain.com/download-install/" target="blank">Multichain</a>. Follow the instructions on
        the
        main site.
        On Windows, you will need to add Multichain to the PATH variables.
        <a href="https://www.multichain.com/download-install/" target="blank">Here</a> is a great article showing how to
        do it.
    </li>
    <li>
        <a href="https://dist.ipfs.io/#go-ipfs" target="blank">GO-IPFS</a>. Follow the instructions on the main site.
        It's
        really easy.
    </li>
    <li>
        <a href="https://nodejs.org/en/" target="blank">Node v12</a>. You could ammend the package.json to install
        earlier
        versions of Node. This project was originally started in Node v8 and there aren't any dependecies that require
        Node v12.
    </li>
</ul>

<h3>
    Current features:
</h3>

<ul>
    <li>
        <h3>
            Login:
        </h3>
        <ul>
            <li>Your login credentials are encrypted with sha256 ( <a href="https://geraintluff.github.io/sha256/">found
                    here</a> ) and stored on the "root" chain. This chain has
                connection restriction to prevent any remote users from connecting to or viewing blockchain details.
            </li>
        </ul>
    </li>
    <li>
        <h3>
            Multichain:
        </h3>
        <ul>
            <li>Install 'root' blockchain. This is used for login and other application related data.</li>
            <li>Detect existing Multichain blockchains.</li>
            <li>Automatically start all local chains on app start. Shutdown chains on app quit.</li>
            <li>Manually start/stop chains once app is loaded.</li>
            <li>Create chains with preset parameters.</li>
            <li>Create custom chains and select custom parameters.</li>
            <li>Delete chains.</li>
            <li>Create generic streams ( open/closed ) and add a description. Designed for generic text input.</li>
            <li>Create premade streams with pre-set data inputs ( IPFS ).</li>
            <li>Filter stream items by publisher or key</li>
            <li>Set stream item display count</li>
        </ul>
    </li>
    <li>
        <h3>
            IPFS:
        </h3>
        <ul>
            <li>Automatically start IPFS on app start. Shutdown IPFS on app quit.</li>
            <li>Add files to repo.</li>
            <li>Publish file details to Multichain.</li>
            <li>View IPFS files in explorer and open with external applications ( ie. default browsers ).</li>
        </ul>
    </li>
</ul>

<h3>
    Planned features:
</h3>
<ul>
    <li>
        <h3>
            Login:
        </h3>
        <ul>
            <li>Improved encryption method. The current technique is very basic.</li>
        </ul>
    </li>
    <li>
        <h3>
            Multichain:
        </h3>
        <ul>
            <li>Connect to other Multichain blockchains. This is the most important feature to add!! If anyone has
                networking experienced and would like to help me make this feature secure and seamless, it would take
                this project to other level!
            </li>
            <li>Add more pre-designed streams browsers, ie. passwords, contacts, customizable forms, messagging, budget.
            </li>
            <li>Improve stream filters</li>
            <li>Custom consensus configuration. Currently all chains are created with default consensus parameters ( 0.5 or 50% )</li>
            <li>Add address and permissions management.</li>
        </ul>
    </li>
    <li>
        <h3>
            IPFS:
        </h3>
        <ul>
            <li>Improve IPFS filebrowser.</li>
            <li>Add support to browse IPFS repo.</li>
        </ul>
    </li>
    <li>
        <h3>
            DAT:
        </h3>
        <ul>
            <li>Add support for DAT protocol.</li>           
            <li>Create DAT filebrowser.</li>           
        </ul>
    </li>
</ul>

<h3>Install: </h3>

clone repo

npm install

npm start


<h3>
    Current state:
</h3>

<p>
    This project is still in pre-alpha. I don't even know if anyone is interested in what I'm doing or if this is a
    useful application. If you read this far, thank you very much. Any feedback and suggestions will be greatly
    appreciated.
</p>
