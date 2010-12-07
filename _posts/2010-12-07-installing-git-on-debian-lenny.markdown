---
layout: day1
title: Git on Lenny, a love story

---


Git on Lenny, a love story
==========================

> "You are running Debian stable, because you prefer the Debian stable tree. 
> It runs great, there is just one problem: the software is a little bit outdated compared to other distributions."
[http://backports.debian.org/][backports]

**Exactly...**

So I have Debian Lenny running nicely as a production server. Along comes git. A long period of flirtation follows and eventually I find myself calling her everyday. Time to make a real git of her and get her into the [workflow]. So I save up 3 months wages, get down on one knee and roll out a:

	# DONT DO THIS! Skip to the end if you prefer facts to love and stories.
	$ sudo aptitude update
	$ sudo aptitude install git
	... pregnant pause while internets are downloaded
	... Done

So I'm all happy as to my eyes that's a yes, but then things get weird. She pulls off her face and reveals that she is infact *a transitional dummy package to pull in the renamed gnuit package. It can be safely removed.*

**What!?** Please expand on that you freak...
	
	$ aptiude show gnuit
	Package: gnuit
	...
	Provides: git
	Description: GNU Interactive Tools, a file browser/viewer and process viewer/killer

*Erm...* hold it right there. You are not the git I love. Git would never claim to be a file viewer killer like that. It would say something more sexually aggressive like *fast, scalable, distributed revision control system* or something. I hate you fakey git imposter. Be gone from this box:

	$ sudo aptitude purge git

**OK now think fast dammit**, where did you see her last.

	$ aptitude search git
	git-core - fast, scalable, distributed revision control system

A-HA!, **git-core**!, well of course I love your new hair-do, I just didn't recognise you, what with getting your name changed and all, come here:

	$ sudo aptitude install git-core
	... pregnant pause while internets are downloaded
	... Done

*thank god it's you*. Still I hope you don't mind but I'd just like to take a quick look at your birth certificate over here...

	$ git --version
	git version 1.5.6.5
	
**NO NO NO.** If there is one thing worse than installing completely unrelated packges, it's finding the package you want is older than your nan.

	$ sudo aptiude purge git-core	

**Oh wrinkly torment** I've just purged your grandmother. You were a youthful git 1.7 when we last met, what have I done to deserve this... Googling commences, hmm debian sources... yes yes, *git-core*, uh huh, **(obsolete)**, oh what have i done, [stackoverflow][so]... *git-core*... not you again, ...wait... what... backports you say? install lenny-backports-keyring you say? that all sounds a bit extreme, I just want git... hyperlinking now...

[backports.debian.org][backports] is where it's at, to complete the quote at the top:

> "...the software is a little bit outdated compared to other distributions. This is where backports come in.
> 
> Backports are recompiled packages from testing (mostly) and unstable (in a few cases only, e.g. security updates) in a stable environment so that they will run without new libraries (whenever it is possible) on a Debian stable distribution."


Be sure to check the instructions page which is a couple of steps simpler than the stackoverflow suggestion, or just read on...

Installing git 1.7 rather than gnuit or git 1.5 on Debian Lenny
---------------------------------------------------------------
	
In **/etc/apt/sources.list** add
	
	deb http://backports.debian.org/debian-backports lenny-backports main

Update your apt indexes
	
	$sudo apt-get update

Check you can now see the latest git version. The lesson from all that rambling above is to always ask apt what it is you are about to install before doing it.

	$ aptitude -t lenny-backports show git
	Package: git
	State: not installed
	Version: 1:1.7.1-1.1~bpo50+1
	Description: fast, scalable, distributed revision control system
	
Go install!
	
	$ aptitude -t lenny-backports show git
	... Done
	$ git --version
	git version 1.7.1

Love, git init your brains out and have git babies. See below:

<img src="http://joemaller.com/wordpress/wp-content/uploads/2008/11/hub-prime2.jpg" title="git babies" />
[http://joemaller.com/990/a-web-focused-git-workflow/](http://joemaller.com/990/a-web-focused-git-workflow/)

Now I can get on with that web focused git workflow. If you are wondering how to make git do all your work for you then I  highly recommend Mr joemaller's [article][workflow] on the subject.

Credits
-------
* stackoverflow: [http://serverfault.com/questions/157383/why-does-the-debian-lenny-git-package-not-install-git] [so]
* backports: [http://backports.debian.org/][backports]

[so]: http://serverfault.com/questions/157383/why-does-the-debian-lenny-git-package-not-install-git "Well serverfault actually, but it's all the same to me thanks"
[backports]: http://backports.debian.org/
[workflow]: http://joemaller.com/990/a-web-focused-git-workflow/	



