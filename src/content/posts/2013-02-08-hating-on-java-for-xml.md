---
layout: ../../layouts/2025.astro
slug: 2013/02/08/hating-on-java-for-xml
published: false
---

Hating on Java for XML? Your DSL is worse.
==========================================

Do tell me again how you've dismissed Java as a waste of time due to it's XML fetish. How fascinating.

__Hating on Java for it's XML love is like hating on a government for wanting transparency.__

XML is a standard for defining structured documents. Every drop of logic that you can externalise allows some other system, regardless of it's implementation language, to operate on it.
I can't think of a useful language that doesn't have a library for dealing with XML.

Oh wait, _XML is too slow_?

__No.__ Your chosen lauguage's runtime is too slow. XML is just structure around plain text.

XML is verbose, and I'm not suggesting we use it send data to the browser (sic), but it's also a well defined standard, something that the web developement community seems to care so much about.

Yes, a standard. The Java community, for all their boring establishment said, "let's try and define some things in a language agnostic way"

Maven, how to build the things. Yes, 500 lines of XML, assuming you stray from the happy path, but it's at least declarative. Hibernate xml: how to serialise the db things, WSDLs, how to interact with the remote thing.

None of these things use a custom DSL that you have to learn, but XML so at the very least, anyone can understand and the syntax of the thing even if the semantics takes a while longer.

All the bullshit DSLs that require me to read the docs to figure out the primatives can go fuck themselves if they think they've improved anything. (Puppet, I love you, but I'm staring hard in your direction here).
You all took a good idea and encrptyed it in your own micro-langauage that isn't properly defined. Not just ill defined like in the pained cries of civilised humans on your mailing lists that are forced to sacrifice a goat at your alter of aracanea to get their shit working,
but ill defined like:

> DSL is the boss now, don't cry. Didn't you enjoy the easy on ramp like eveyone else?
> Now you're 5000 lines in, and I see your requirements don't cleanly map to my concepts. __Now you're crying__ about syntactic obsucrity? Too late bitch. Should have evaluated harder.

Yes. To all DSL writers, that's how you make relatively sane human beings feel when you get a DSL wrong.

I could enumerate, but that would be petty at this stage, you've all worked so hard to obscure your intentions.

I could try and talk about "pragmatic programming" and externalising core logic in a standard format, but you'd probabaly just stare at me like you do all the unworthy at your DSL clusterfuck party.

Over time, consistancy is more important than correctness, so, not that you will, but please don't go and re-write your broken DSLs now. Do just remember that every drop of ego gratifying excitment you get from releasing a new DSL on the world will be payed back manifold by those you inflict it on.
