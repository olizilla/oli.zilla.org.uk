---
slug: 2012/05/28/conventions-vs-craftsmanship-and-getting-things-done
layout: ../../layouts/2025.astro
---

Conventions Vs Craftsmanship and Getting Things Done
====================================================

[Yehuda Katz][5] makes an interesting point in his 2012 RailsConf talk.

> Any convention is better than no convention…

<iframe class="aspect-video" width="640" height="360" src="http://www.youtube.com/embed/UlMpIHH1K5s" frameborder="0">
</iframe>

Using a convention is preferable to individual problem solving. Conventions free the developer from having to make "trivial choices". When we use conventions, dull integration boilerplate code gets pushed into re-useable libraries, while the individual craftsman pushes the burden of their solutions onto the next layer.

> When we say convention over configuration what we mostly mean is eliminating trivial choices

So far so familiar, but he also points to the current fashion of crafting your <abbr title="JavaScript Object Notation">JSON</abbr> <abbr title="Application Programming Interface">API</abbr>s and sweating over the serialisation details as being a repeat of the old problems with dealing with <abbr title="Database Administrator">DBA</abbr>s, hand-rolled schemas and trying to write re-usable persistence abstractions.

> How are you going to tell a DBA 'Hey! You need to follow these rules' The DBA has reasons for what they are doing, the DBA want's to think about what they are doing, they want to craft their database in a way that they want it crafted.
>
> It turned out that those arguments didn't matter, those arguments were trumped by the fact that we could eliminate all this extra mapping code, all this gunk that we had to write in order to use ActiveRecord.
>
> And now we're hearing the same arguments for JSON APIs. I want to hand craft my JSON API. I want to think about how it works. I want to make sure the keys are what I think they should be in this particular situation.
>
> In the same way that DBAs thought that was a good idea, people who make JSON APIs think it's a good idea too. But in weighing the win of crafting everything people are not weighing the loss of lacking conventions

Having just lost sleep over a JSON API I was working on, and spending a significant chunk of time hand writing JSON samples demonstrating what I wanted my code to create, I see the truth in this.

The trouble is, to have useful opinions on what a convention should look like you need to have wrestled with the pros and cons of these choices. This is why we like to use frameworks. Some one else can lose sleep over how to keep a web app secure and performant, while I get on with building features the user will actually see. So then the next interesting thing was his experience of dealing with getting JSON standardisation in to Rails:

> We should just get something in and we can tune it over time… The bike-shedding discussion is exactly the sort of things that prevents problems from being solved in other frameworks… We should obviously have a discussion about it, but it should not take another year.

Consulting with the community is a critical part of any open source project, but here a core committer is saying that the discussion is no longer useful and Rails needs get on with providing a convention. **"Any Convention is better than no convention"**.

Software development loves a benevolent dictator. And he has a point. It's hard to get constructive criticism unless you've got something to show. Trying to reach a consensus without a reference implementation just falls foul of [Parkinson's Law of Triviality][1], or ["Bike-shedding"][4] 

> …just because you are capable of building a bikeshed does not mean you should stop others from building one just because you do not like the color they plan to paint it.

<img title="WAT?" src="http://disgrasian.com/wp-content/uploads/2010/04/4469688926_dba43051c2.jpg" />

More charitably, it's a good example of [do-ocracy][2], a terribly named but effective approach to group organisation, which I formulate as:

- Talk to people about the issue
- Tell people what you are going to do about it
- Do it
- Tell them what you did
- Fine tune as required

I've been pushing for this kind of thing in the organisation of the [West Norwood Feast][3]. The key point is that you don't seek unilateral consent to begin. 

> Responsibilities attach to people who do the work, rather than elected or selected officials.

On a large enough project you are are lucky if anyone cares or knows enough to comment on any specific issue. Seeing as you are so deep in the issue you are willing to do something about it you probably are the expert. If you aren't, then it gives others a chance to step in, without the overhead of trying to get permission from those who are busy with other things and have already trusted you with enough power to get on and fix it.

In Rails and open source development terms, [Yehuda][5] knows enough about the issues and is in a position to define a useful convention for JSON serialisation, so he's going to do just that. Once it's in and people have used it, the discussion can continue, but in terms of how it could be better rather than [what colour to paint it][4].

<img width="100%" src="/res/img/jfdi.jpg" title="JFDI"/>

<p>
<small>Image from: <a href="http://pumpingstationone.org/2009/10/psone-is-now-a-do-ocracy">pumpingstationone.org</a></small>
</p>

[1]: http://en.wikipedia.org/wiki/Parkinson's_Law_of_Triviality
[2]: http://www.communitywiki.org/DoOcracy
[3]: http://westnorwoodfeast.com
[4]: http://www.freebsd.org/doc/en_US.ISO8859-1/books/faq/misc.html#BIKESHED-PAINTING
[5]: https://twitter.com/#!/wycats
