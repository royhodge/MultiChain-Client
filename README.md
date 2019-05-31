<h1>Electron Multichain Explorer</h1>
A general management tools for Multichain blockchains

Currently supports Windows10 and Linux ( tested on Lubuntu 18 ). MacOS coming soon....

<h4>
    Security notice:
</h4>
This application uses full Node intergration is all windows. As such you should never load remote content or any other
files that can execute unknown code within the browser window. I would appreciate any advice from experienced Electron
developers to help secure this appilcation. I imagine a whitelist/blacklist could be setup that would block any remote
content from being loaded. Remote content will be loaded in default browsers like Chrome or Firefox.

<h4>
    Recommendation:
</h4>

I highly recommend using Linux for this app. Multichain and IPFS API calls are significantly faster.
<h4>
    Disclaimer:
</h4>
I am still studying web development and Electron. This is my first real project to try and combine these elements. I'm a
huge fan of blockchains, IPFS and DAT-protocol (which will be added to the project soon ). Any feedback and suggestions
will be greatly appreciated.

<h3>The goal:</h3>
I hope to develop this project into a general template that developers can fork and use other frameworks to inhance
visual and functional elements. To that end, I've kept dependecies to a minimum. I think it would be relatively simple
to adapt the code to suit a React, Angular or Vue project. Forks are welcome.

<p>
    This project was started from <a href="https://github.com/electron/electron-quick-start" target="blank">Electron
        Quickstart
</p>

<h4>
    Requirements:
</h4>

<a href="https://www.multichain.com/download-install/" target="blank">Multichain</a>. Follow the instructions on the
main site.
On Windows, you will need to add Multichain to the PATH variables.
<a href="https://www.multichain.com/download-install/" target="blank">Here</a> is a great article showing how to do it.

<a href="https://dist.ipfs.io/#go-ipfs" target="blank">GO-IPFS</a>. Follow the instructions on the main site. It's
really easy.

<a href="https://nodejs.org/en/" target="blank">Node v12</a>. You could ammend the package.json to install earlier
versions of Node. This project was originally started in Node v8 and there aren't any dependecies that require Node v12.

<h4>
    Current features:
</h4>

<ul>
    <li>
        <h4>
            Login:
        </h4>
        <ul>
            <li>Your login credentials are encrypted with sha256 and stored on the "root" chain. This chain has
                connection restriction to prevent any remote users from connecting to or viewing blockchain details.
            </li>
        </ul>
    </li>
    <li>
        <h4>
            Multichain:
        </h4>
        <ul>
            <li>Detect existing Multichain blockchains.( Install "root" chain if none exist )</li>
            <li>Automatically start all local chains. Manually stop chains</li>
            <li>Create chains with preset parameters</li>
            <li>Create custom chains and select custom parameters</li>
            <li>Delete chains</li>
            <li>Create generic streams ( open/closed ) and add a description. Designed for generic text input</li>
            <li>Create premade streams with pre-set data inputs ( IPFS )</li>
        </ul>
    </li>
    <li>
        <h4>
            IPFS
        </h4>
        <ul>
            <li>Add files</li>
            <li>Publish file details to Multichain</li>
            <li>View IPFS files in explorer and open with external applications ( ie. default browsers )</li>
        </ul>
    </li>
</ul>

<h4>
    Planned features:
</h4>

<h4>Install: </h4>

clone repo

npm install

npm start


<h4>
    Current state:
</h4>

I will be reviewing code and making improvements before adding any more features.
