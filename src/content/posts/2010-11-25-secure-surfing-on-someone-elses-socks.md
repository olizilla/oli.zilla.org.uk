---
layout: ../../layouts/2025.astro
slug: 2010/11/25/secure-surfing-on-someone-elses-socks
---

Web by Proxy; Secure surfing on someone else's SOCKS
==========================================================

Today I found myself looking down the barrel of an unknown and unsecured wireless access point. Some kindly soul has gone to the trouble of geting an adsl line into Brixton Village Market and then gone the extra mile of leaving the wireless unsecured (no WAP or WEP password in sight) so anyone may connect, and I assume deliberately as the access point in question comes secured by default. (if not, sorry, I'll buy you a [federation coffee][fed].)

Such a display of generosity warms the cockles, but alas, as a techno-noodler my thoughts immediately turned to the worrying, if over-simplified idea that connecting to such a device would force my laptop to start publicly smearing the contents of my browser, every request, url and search term, over everything in a several meter radius.

When you connect to a secured wireless access point, your communications with that device are encrypted, hindering the casual eavesdropper. When it's not secured, then you are broadcasting your communications in clear text, a bit like shouting your banking details down the telephone at the call center operator whilst sitting on a bus. Then there is the question of whether to trust the access point itself. What if you keep your voice down but the call center operator goes on to use your details to maliciously check your balance‽

Still the technoodler can only see this as an opportunity to put those [funix][funix] lessons to the test, so here is what I did to keep my business secure on an unknown and unsecured access point:

Encrypting browser traffic using only an SSH tunnel, a trusted remote server, Firefox, OSX, Terminal.app, a Goat & some Googling.
-------------------------------------------------------------------------------

As a control test, check your current public ip, probably that of the wireless point, point your browser to: [ipgoat.com][ipgoat] the finest goat based ip service in the world. Go on, click the head.
	
	open -a firefox http://ipgoat.com
	
Set up the tunnel from port 8000 on your machine to the trusted remote server:
	
	ssh -CN -D 8000 user@remoteserver
...where:
* **C** means compress things please, which may help speed up the network traffic where possible.
* **N** means don't do anything yet, just sit and wait.
* **D 8000 user@remoteserver** is what tells ssh to listen on port 8000 and act as a SOCKS server forwarding requests via **user@remoteserver**.

...and coincidentally spelling out CND, providing you with a nuclear disarming mnemonic 

Set up the Firefox to use the tunnel, as a SOCKS proxy connection:
 * Firefox 3.6 > Preferences... > Advanced > Network > Settings
 * Manual Proxy configuration:
 * SOCKS Host: localhost 
 * Port:8000
 * Ok, done.
 
kick the tires:
	
	open -a firefox http://ipgoat.com

If all is working then you should now find that [ipgoat][ipgoat] still loads and that you've fooled it's little goaty face into thinking your public ip is that of your trusted remote server, mainly because to all intents an purposes, it is. You are now sending http requests to the remote, and it is kindly and blindly executing those requests on your behalf, and returning the results to port 8000 on your machine, all encrypted by your trusty SSH client.

I guess access to a trusted remote machine is the stumbling block for most people. In that case, you'll have to take your chances, or keep googling. At the very least be sure to look out for the little https / SSL padlock in your browser when you have to enter any private information, but I'm pretty sure that facebook update can wait till you get home.
 
Credits
--------
* [funix - darq.org.uk][funix] Free Unix Command Line Workshops every week in Shoreditch. "Using the ancient art of words we show you how to disregard the graphical interface, and do what you need from the command line."
* [calomel.org][calomel] The most relevant google search result told me exactly how to do it, and is https, which was nice.
* [commandlinefu.com][cmdfu] A similar but more robust solution for bonus credits, but requires autossh, not on osx by default but only a: **sudo port install autossh** ...away

[ipgoat]: http://ipgoat.com "Baaa my IP"

[cmdfu]: http://www.commandlinefu.com/commands/view/1060/create-an-ssh-socks-proxy-server-on-localhost8000-that-will-re-start-itself-if-something-breaks-the-connection-temporarily "A repository for the most elegant and useful UNIX commands."

[funix]: http://darq.org.uk/ "Free Unix Command Line Workshops every week in Shoreditch. Using the ancient art of words we show you how to disregard the graphical interface, and do what you need from the command line."

[calomel]: https://calomel.org/firefox_ssh_proxy.html "Proxy Firefox through a SSH tunnel"

[fed]: http://federationcoffee.com/ "A good cup of joe"

*[CND]: Campaign for Nuclear Disarmament
*[SOCKS]: SOCKetS - one of the simpler abbreviations in IT
*[SSH]: Secure SHell - a protocol and command line tool.
*[SSL]: Secure Sockets Layer 
