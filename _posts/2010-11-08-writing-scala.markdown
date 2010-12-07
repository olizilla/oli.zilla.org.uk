---
layout: day1
published: false
---
Scala from Java
===============

Here is a list of rough edges that Scala polishes away, and the surprises that will stub the toe of expectation.

Different and better
--------------------
* Pattern Matching. Just plain awesome. I hate switch blocks. I love matchers.
* Generics isn't an after thought. I have always hated generics because dispite their utility they make my code look hideous.
* Check preconditions with require (p99)


Just different
--------------
* No static members. Scala uses companion objects to store singleton state. In usage the effect is minimal but you need to know how to write it.
* Operators are methods. Doesn't affect your day to day usage. Allows for DSL's. Precedence and notation are unchanged.
* implicit conversions. like autoboxing but more generally useful, and controllable.
* default scope is public, but who uses the default scope?

Stubbed toe different
----------------------
* equals and == is reversed.
* If you forget to add the = in a def it means unit return. Combine
that with the type inference and you get a method that doesn't return
what you think.

* order of mixins is important



