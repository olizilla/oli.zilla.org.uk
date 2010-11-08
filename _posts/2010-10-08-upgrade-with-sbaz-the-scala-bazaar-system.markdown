---
layout: day1
---

Upgrade with sbaz, the Scala Bazaar System
==========================================

So you installed a Scala a while ago. Some shiny new features make you want more, but your install is just too old. Before reaching for the download button on the latest version, hear this!

**A Scala installation can update itself**

What's that you say? I don't have to scour some backwater of a recently re-branded site to find the sdk, with a side order of netbeans and open office bundle?

Oh me oh my. That's nice. So a:

	sbaz update

will update just the lists of what sbaz knows about, where as:

	sbaz available

will show you what's new since you last upgraded, and a simple:

	sbaz upgrade

will upgrade you to the latest and greatest version, with all the shiniest features you can have.

Better still, you can ask sbaz to add all sorts of goodies to your vanilla Scala install. Take a closer look at the output of **sbaz available**:

	sbaz available
	...
	scala-android (2.7.0-final, 2.6.1-final)
	scala-cldc (2.7.0-final, 2.6.1-final)
	scala-devel (2.8.0.final, 2.7.7.final, 2.7.6.final, ...)
	scala-devel-docs (2.8.0.final, 2.7.7.final, 2.7.6.final, ...)
	scala-documentation (2.8.0.final, 2.7.7.final, 2.7.6.final, ...)
	scala-library (2.8.0.final, 2.7.7.final, 2.7.6.final, ...)
	scala-msil (2.8.0.final, 2.7.7.final, 2.7.6.final, ...)
	scala-swing (0.5, 0.4, 0.3, ...)
	scala-test (2.8.0.final, 2.7.7.final, 2.7.6.final, ...)
	scala-tool-support (2.8.0.final, 2.7.7.final, 2.7.6.final, ...)
	scalacheck (1.7, 1.6, 1.5, ...)
	...
	56 package names
	371 total packages

Of note:
* **scala-documentation** providing some light reading and tutorials for the interested reader.
* **scala-android** for all your mobile development needs.
* **scala-tool-support** for syntax highlighting and other mods to trick out your text editor of choice.

Tell sbaz to go get them for you like so:

	sbaz install scala-tool-support

For the other packages you can get some more info with a: **sbaz show package-name**

Of course no codes would be complete without some small piece of arcanea for you to forget, fortunately sbaz's are pretty simple.

**If you downloaded a Release Candidate you will always be offered the bleeding edge**

So you got all excited about Scala 2.8 and downloaded 2.8.0.RC1, discovered the eclipse plugin still had serrated edges, and forgot about it. Now when you try a **sbaz available** it will list just the RC's for future versions of Scala, very much the bleeding edge. You probably want the stable release for now. So, in the bombastic parlance of software we must "switch universe", which contrary to it's name actually boils down to swapping one path for another. No wormholes for you here.

Get Scala to update itself from release candidate to stable release
--------------------------------------------------------------------

To point sbaz at the *stable* release list, we need to pass it the path to the poorly named *"scala-dev"* descriptor file which resides in:

	misc/sbaz/descriptors/scala-dev

relative to your Scala install's root directory. So navigate to the your Scala install dir, something like:

	cd /usr/local/scala-2.8.0.RC1

Point sbaz at the universe for stable releases:

	sbaz setuniverse misc/sbaz/descriptors/scala-dev

The path is relative to your install directory, so the above will fail if you are not in the root of your Scala install.

As a control test, show me what I have now:

	sbaz installed

Give me the latest stable release:

	sbaz upgrade

and for empirical evidence of success, show me what I have now:

	sbaz installed

Kick back and wait for more shiney features.

	watch sbaz available

or in my case, remember to go and rename that scala-2.8.0.RC1 directory to something more appropriate.


Get Scala to update itself to the bleeding edge
-----------------------------------------------
Should you yern for the wild west of release candidates you can flip to the *lamp-rc* universe for the bleeding edge releases. Navigate to the your Scala install dir, e.g /usr/local/scala-2.8.0.RC1

	sbaz setuniverse misc/sbaz/descriptors/lamp-rc
	sbaz upgrade


Sources
-------
For a more authorative and intellectual discussion on sbaz please retune your dial to:
[http://www.Scala-lang.org/node/93](http://www.Scala-lang.org/node/93)
