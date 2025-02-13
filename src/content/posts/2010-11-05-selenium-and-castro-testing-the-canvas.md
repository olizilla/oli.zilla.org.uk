---
layout: ../../layouts/day1post.astro
# layout: ../../layouts/2025.astro
slug: 2010/11/05/selenium-and-castro-testing-the-canvas
---

# Selenium and Castro testing the Canvas


Notes from [Painless product demos & how to test 'untestable' applications](http://www.meetup.com/london-software-craftsmanship/calendar/15118493/). Original talk by Jason Huggins ([@hugs][@]) of [Sauce Labs][1] presenting at the [London Software Craftsmanship Community][2], 4th Nov 2010.

## The Selenium toolbox

* Selenium IDE for Firefox - record and replay browser sessions. Use the output as a starting point for creating selenium tests.
* Selenium Remote Control - an http proxy and library to drive a browser from test code
* Selenium Grid - drive multiple Selenium RCs from a hub, to test multiple browser/os combinations. Run your tests in parallel rather than serially.
* Sauce on demand - selenium testing as cloud service - [http://saucelabs.com/ondemand](http://saucelabs.com/ondemand)

## Painless product demos

AKA: Pilfering ideas for software development from filmmaking.

Dailies - The raw unedited footage, that shows general direction and progress from previous days work. Helps stakeholders seeking assurance that the work meets expectations.

In software dev, we have stakeholders too, and sometimes the html test reports aren't quite enough to keep them happy. Wouldn't it be nice if they could see our dailies, some artefact of our days work, so they can see for themselves that all is well, and those new features are on the way.

**Selenium + Castro = Automated screencasts**

Write your Selenium tests as normal, then bookend them with calls to [Castro][3]. Selenium will drive the browser through some interesting aspect of your web app, and Castro will record the screen as it goes. Run the test suite every day, and publish the generated screencasts along with the rest of your test reports. Anyone who wants to see how things are going now has a shiny video walkthrough of where the project is at.

	c = Castro()
	c.start()
	// Your tests here
	c.stop()
	c.publishToStakeholders()  // ! tweet(), youtube(),


## How to test 'untestable' applications

"Wouldn't it be cool if you could motorise all the pins in a Pin Art box"

<!-- <div class="right">
	<img src="http://www.mutr.co.uk/images/pinart.jpg" title="Time for tea" alt="Time for tea"/>
</div> -->

[pinthing.com][4] provides our example of the untestable web app. The bulk of the UI is created in a new fangled html5 canvas element using three.js to draw 3d pins on to it. The pins are arranged in a grid and can be given commands to raise and lower them independently to form patterns and glyphs.

All this UI magic is exposed as a single canvas node in the dom, hiding its internal structure. This poses a problem for automated testing; you cannot inspect and make assertions about the state of a canvas like you can with the dom.

Well, the theory is, the Javascript object model is good place to start (the JOM!? [@hugs][@] coins a new acronym). As you programatically build up your canvas you create a js structure that you can inspect, make assertions and even trigger interactions on.

pinthing has an in page js powered terminal that allows you to interact with the pins.

	show(3)         // lifts pins 1 and 2, as its a binary display
	show("3")       // lifts the pins to diplay a 3 glyph
	show(3 << 5)    // bit shifing pin lifting, ye haa.

So in this case a Selenuim test can write expressions to the terminal, simulating user interactions.

HTML5 video players present a similar problem for testing. One solution already in use relies on exposing a js api to your player controls and instrumentation to fire events to the console during playback. This allows for Selenuim tests that trigger playback and then assert that the video started playing by listening for the events.

> "It's kinda like particle accelerators. You have to press the fire button and watch for the backsplatter to know you just smashed atoms"

It's one step removed from actually being able to read and inspect the dom, but what else are you going to do? To continue automated UI testing at the frontiers of html5 you are going to have to think about exposing some sort of testable api to your new widgets. With a canvas tag built up with js you get something sensible for free. With a video player you are going to have to give it some more thought.


## The union

Screencasting the automated testing of the untestable app. 

In the [pinthing.com][4] example, having a visible in page terminal window is the key. It shows the *watcher of the screencast* what the Selenium test is up to; they can see the action and the result. The screencast becomes part of the test process, a QA person can scan through the video to check for UI anomalies.

Personally I love the idea. It's not meant as a replacement for all the other reporting metrics, but a user friendly complementary document, that provides a background radiation style way to demonstrate progress to them that care to look. It depends on the project and the stakeholders involved how much value it adds, but automate it and dump it on your continuous integration server (thanks hudson) and it might just be the thing that keeps your investors investing, and the testers testing.

You also end up with an archive of screencasts for your project which you can turn into your blooper reel, complete with directors commentary after a release. Add dramatic music and playback the hi-speed dubbing version for a photo a day, watch how I change but stay the same, [youtube favourite, style video...](http://www.youtube.com/watch?v=UItNVuBI9UI)


## Notes, Quotes, Links, & Thanks

- A big thank you to [@hugs][@] for the talk and going above and beyond the call of duty in proof-reading this post. All quotes, ideas, and new acronyms mentioned here are his.
- "Selnium 2, look out for a good beta by christmas."
- "There are 2 problems in the world... the off by 1 error..."
- "Think of your user interface test recording like your apple commercial"
- Flexpilot - integrates with selenium for flex testing.
- [http://saucelabs.com][1] "Cloud-scale Selenium Testing."
- [http://www.meetup.com/london-software-craftsmanship][2]
- [http://github.com/hugs/castro][3] "screen/cast ro/bot,  a tiny fork of pyvnc2swf, with a smidge of awesome on the side"
- [http://pinthing.com][4] "A [@hugs][@] creation, the culmination of a 10 year itch. A browser controlled pin art simulator with the power to move the real thing."





[1]: http://saucelabs.com "Cloud-scale Selenium Testing."
[2]: http://www.meetup.com/london-software-craftsmanship
[3]: http://github.com/hugs/castro "screen/cast ro/bot,  a tiny fork of pyvnc2swf, with a smidge of awesome on the side"
[4]: http://pinthing.com "A @hugs creation, the culmination of a 10 year itch. A browser controlled pin art simulator with the power to move the real thing."
[@]: http://twitter.com/#!/hugs "Creator, Selenium. Co-founder, Sauce Labs. I make things and think about them."
