---
slug: 2011/02/19/scala-compiler-fictions-and-the-suprising-difficulties-asking-anyval-its-maxvalue
layout: ../../layouts/day1post.astro
---

Scala's polite compiler fictions &amp; the surprising difficulties of asking an AnyVal it's MaxValue
====================================================================================================

In day to day programming I have found Scala allows me to make my code clearer and significantly more fun to write.

Yet somehow a simple code demo to get the numeric types to print their max and min values turned into a multi-man-hour-brain-teaser. 
That's not something I want from my tools, so what follows is the highlights of the ensuing research, presented here so that Scaloids of the future may one day unearth these findings and laugh at the trifling matter that once troubled us. Some class names may have been changed, to protect the innocent, and make me laugh.

> "Hey, how do I write a method to print out the max and min value of Byte, Short, Int, Long..."

> "hmm, that should be pretty simple, let's take a look at what you got."

	object NumberWang {
	  def main(args: Array[String]) {
	    println("Max Byte:  " + Byte.MaxValue )
	    println("Max Short: " + Short.MaxValue)
	    println("Max Int:   " + Int.MaxValue  ) 
	    println("Max Long:  " + Long.MaxValue )
	  }
	}

Output

	scala> NumberWang.main(null)                               
	Max Byte:  127
	Max Short: 32767
	Max Int:   2147483647
	Max Long:  9223372036854775807


> "All good so far, but how would we write a method to get rid of all the repeated code?"

> "hmm. Let's have a go"

	scala> def maxor(numericType: AnyVal) {
	     |   println(numericType.MaxValue)
	     | }
	 <console>:6: error: value MaxValue is not a member of AnyVal
	          println(numericType.MaxValue)
	                              ^

Rats. I'd assumed something like MaxValue would be common to all the AnyVals. Compiler says no. Let's actually find out where MaxValue is defined. And here lies the first surprising difficulty:

	Int.MaxValue does not currently appear anywhere in the ScalaDoc API.

That's weird, since it's now [the recommended way of getting that information][1]

Hmm, so where is MaxValue defined?

Well, from first principles, when we say Int.MaxValue in Scala we are talking about a member of the Int companion object rather than a static member of the Int class as would be the case in Java.
So let's take a look at the docs for that:
	
	Int
	object Int extends AnyValCompanion
	A object representing 'object scala.Int'. It should never be used directly

	Value Members
		def toString () : String
			Returns a string representation of the object.

[http://www.scala-lang.org/api/current/scala/runtime/Int$.html](http://www.scala-lang.org/api/current/scala/runtime/Int$.html)

Great. toString and a bizzarre note that this object *"Should never be used directly"*. I'm gonna put that into the pile marked *"misleading documentations I have known"*, and carry on. Not that this alley gets us very far, as apparently Int.MaxValue is not a notable enough public member to warrant documenting.
Putting the frustration back in the box, this sort of documentation mishap often boils down to refactorings and communication issues, let's see if we can't get some background on this troublesome value...

	
	object Math
	object Math extends MathCommon
	deprecated: use scala.math package instead

	val MAX_INT : Int
	deprecated: Use scala.Int.MaxValue instead

[http://www.scala-lang.org/api/current/scala/Math$.html](http://www.scala-lang.org/api/current/scala/Math$.html)

Ok, so we can see that there has been some noodling around where best to put the max value information, this would explain some of the weirdness.
More interestingly, Scala is your flexible friend, so what can we do about it? Let's have another go at that maxor function, this time with feeling, and maybe some thinking too.

What do we want?

- A function to takes one of Byte, Short, Int, Long and maybe even Float and Double too, as a parameter.
- Returns unit and has the side effect of printing the largest number that numerical type can represent.

Obviously if this were part of a larger system, we would make a proper function that returned a String rather than causing side-effects, but right now that's the least of our troubles.

So why is this even remotely difficult?

Well, we'd like to pass in a variety of AnyValCompanion objects (Int, Byte, etc) and then call a MaxValue function on that object. We know each one implements MaxValue but it isn't defined as part of the AnyValCompanion object contract.

hmm...

_Stand back, I am going to try duck-typing_

	scala> def maxDuck( numericType: { def MaxValue: AnyVal } ) {                       
	      |  println( numericType.MaxValue )
	      |}
	maxDuck: (numericType: AnyRef{def MaxValue: AnyVal})Unit

	scala> maxDuck( Int )
		java.lang.NoSuchMethodException: scala.runtime.Int$.MaxValue()
		at java.lang.Class.getMethod(Class.java:1605)
		at .reflMethod$Method1(<console>:6)
		at .maxDuck(<console>:6)


Kabooom. Hmm... that should have worked! Is this a sign from the capacitors that duck typing is evil and should be avoided? 
No, and before you all shout at me, yes, I know this isn't really duck typing but if you find a simple way to explain what Scala is up to there, do let me know. 
I read it as "the parameter to maxDuck can be any object that has a member called MaxValue that returns an AnyVal", and seeing as we only want to call toString on the result of MaxValue, that seems to capture our requirements.

The MaxValue member that we are interested in has a different signature on each numeric type; Int's returns an Int, and Byte's returns a Byte. 
More importantly MaxValue is common to all the numeric types but isn't defined on any of their common parents or traits, so we went duck style, and so maxDuck says: if it quacks like something with a MaxValue, then that's good enough for us.
I found some other [dreadnought weight solutions][2], involving creating a type for each numeric type, but that kind of boilerplate is exactly what I came to Scala to avoid.

So let's press on. Our error appears to be telling us that there isn't a MaxValue() method defined on scala.runtime.Int$. The Int$ tells us it is trying to look it up on the companion object, but I thought we already proved in the first few lines that it does exist, even if undocumented.
And so to surprising difficulty #2:

	"The AnyVal companion classes are are added synthetically by the compiler"

[http://www.scala-lang.org/node/6650][1]

I read this as, N.B. here be beasties, take care, and a sword. But then I do have a tendency to see patterns in noise. Let's see if we can prove that it's compiler voodoo at the root of all this:


	scala> def max(maxable: {def MaxValue: Any}) { println( maxable.MaxValue ) }
	max: (maxable: AnyRef{def MaxValue: Any})Unit

	scala> object Lung { val MaxValue: Long = 1046 }
	defined module Lung

	scala> object Boot { val MaxValue: Byte = 8 }   
	defined module Boot

	scala> max( Boot )
	8

	scala> max( Lung )
	1046

It works! Ha! In your face compiler. You have been caught out in a lie, or, performing "polite compiler fictions" as mentioned in the wonderfully evocative Scala commit msg that ends this reign of voodoo.

> root/scala/trunk/src/library/scala/Byte.scala
>
>Revision 24068, 5.7 KB (checked in by extempore, 4 weeks ago)
>The AnyVal? types become source files instead of polite
>compiler fictions.

>!! You'll need a serious "ant all.clean" now. !!

>As of this commit the system is fully bootstrapped and the
>synthetic code eliminated: only the source files remain.
>The sort-of-AnyVal?-companions in scala.runtime.* have all
>been eliminated because the actual companions can do everything;
>deprecated vals in the scala.runtime package object point to
>the companions. This left AnyValCompanion? as the only AnyVal?
>related thing in the runtime package: that made little sense,
>so I deprecated and moved it as well.

>Starr is based on r24066 plus this commit. Closes #4121.
>Review by rytz, odersky.

[https://lampsvn.epfl.ch/trac/scala/browser/scala/trunk/src//library/scala/Byte.scala](https://lampsvn.epfl.ch/trac/scala/browser/scala/trunk/src//library/scala/Byte.scala)

Hat's off to extempore for providing the fix, and introducing me to the phrase "polite compiler fictions". I for one welcome our new French speaking overlords.

## Conclusions

- Scala is ace, written by poetic wizards. 
- Compiler magic leads to nuances, nuances lead to frustration, and blog posts.
- A function that prints the MaxValue of anything with a MaxValue can be simply expressed, but on Scala 2.8.1, it doen't work for Int, Byte and co. due to a social faux-pas by an otherwise polite compiler.
- It has been noted and fixed by the aforementioned wizards.

## Credits and links
- Thanks to Martin &amp; Cemal for finding the issue and discussing the solutions.
- Thanks to extempore for services to both computer and human language.
- Thanks to [@_alanshaw](http://twitter.com/_alanshaw) &amp; [@davidparry](http://twitter.com/davidparry) for pulling typos and patterns out of this noise.
- [http://www.scala-lang.org/node/6650](http://www.scala-lang.org/node/6650)
- [http://www.scala-lang.org/node/739](http://www.scala-lang.org/node/739)
- [http://www.scala-lang.org/node/136](http://www.scala-lang.org/node/136)
- [https://lampsvn.epfl.ch/trac/scala/browser/scala/trunk/src//library/scala/Byte.scala](https://lampsvn.epfl.ch/trac/scala/browser/scala/trunk/src//library/scala/Byte.scala)
- [http://www.scala-lang.org/api/current/scala/runtime/Int$.html](http://www.scala-lang.org/api/current/scala/runtime/Int$.html)


[1]: http://www.scala-lang.org/node/6650
[2]: http://stackoverflow.com/questions/4338398/scala-how-to-make-requirements-of-the-type-parametres-of-generic-classes

