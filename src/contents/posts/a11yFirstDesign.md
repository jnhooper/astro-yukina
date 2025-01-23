---
published: 2022-11-19
title: Accessibility First Design
tags: [accessibility, philosophy]
category: philosophy
draft: false
description: Developing with accessibility in mind.
cover: https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.learningforjustice.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Ftw_fb%2Fpublic%2F2021-09%2FLFJ1-Curb-Cutting-Effect-spot2-Kailey-Whitman-Hero-1800x1080-09142021.png%3Fh%3D4f4378cb%26itok%3DcH6qOhN4&f=1&nofb=1&ipt=4ae6d3b68026c801a3c6983223bae1c3e861a3292ff8aca7b25da97bec13a34a&ipo=images
url: https://medium.com/@john.nissenhooper/accessibility-first-design-71557b637608
---

# Accessibility First Design

I'd love to have that ya'll

For several years now everyone has been touting mobile first design, but in my mind there is a
better, more impactful practice we should be engaged in. accessibility first design. (from here on
out i'll be shortening accessibility to
[a11y](https://www.a11yproject.com/posts/a11y-and-other-numeronyms/)).

a11y is often overlooked in tech as a nice to have “feature” that can come later down the line, or
sometime after the [mvp](https://www.hwca.com/accountants-london/opinion/mvp-stage-tech-startup/)
has launched, however, treating a11y as an afterthought can lead to massive [tech
debt](https://www.productplan.com/glossary/technical-debt/), loss of business and legal troubles.
also making your website more accessible is just the right thing to do.

Let’s see some numbers.

The CDC says that [61
million](https://www.cdc.gov/ncbddd/disabilityandhealth/infographic-disability-impacts-all.html)
adults in the United States live with a disability. That’s 26 percent.

![An info-graphic of the United states with outlines of blue and yellow people filling in the
map](https://miro.medium.com/v2/resize:fit:1400/1*MolxD3BbtpkFXpjNB0gwnQ.png)

Oooof that’s a lot of people. But I’m sure your website will be so wildly successfully viral that
you can afford to just write off 26 percent of the population…right?

Here’s some more numbers for you nerds. In a wide study by
[WebAIM](https://webaim.org/projects/million/) 96.8% of webpages had accessibility errors on their
home page. It’s also worth noting that these errors are only the ones that are able to be found via
automated testing, easy to find things like color contrast, non-unique ids, no alt text etc. If you
take into account that a lot of a11y problems are _not_ able to be found via automated testing that
number is going to get a _lot_ higher.

Just think of it. By doing _easy_ to solve things like, checking for color contrast, using actual
anchor tags for navigation instead of pretty divs or buttons, adding alt text, you can be better
positioned in the market than 96.8% of your competitors!

However, if helping people with disabilities, preventing tech debt and avoiding legal troubles isn’t
enough for you, consider this take on disability from the [World Health
Organization](https://www.afro.who.int/health-topics/disabilities):

> Disability is not just one health problem. It is a complex phenomenon, reflecting the interaction
> between features of a person’s body and features of the society in which he or she lives.

As a
[Microsoft](https://scope.bccampus.ca/pluginfile.php/52293/block_html/content/MS-InclusiveDesignToolkit.pdf)
puts it, disability is _context dependent._

> These points of interaction between a person and society  
> are where disability happens.

The aha moment that really drove home the importance of a11y for me was from the [Microsoft slide
deck](https://www.productplan.com/glossary/technical-debt/) making the point that disability can be
_temporary_ **_and/or_** _situational._ That’s right! You can make this about _you_!

![three stick figures with only one usable arm above a line moving from permanent to situational](
https://miro.medium.com/v2/resize:fit:1400/1*_5OLTg6LM3AioqAq5zOtpA.png )

In the image above (again taken from that fantastic [Microsoft
presentation](https://www.productplan.com/glossary/technical-debt/)) we have 3 people with the
disability of having one usable arm. On the left we have the permanent, missing an arm, then the
temporary “I forgot I’m in my 30s and I tried to learn a new _youthful_ skill” broken arm, and
finally the situational, “I’m wrangling my screaming newborn in one hand”. The end result of these
for your site is all the same, they only have use of one hand.

I think it’s fairly safe to assume that every one of us will at some point experience some form of
impairment (hopefully more to the right of that scale above). So if you can’t be bothered to design
and develop for a11y for the ethical, moral, or legal arguments above do it for the selfish reason
that someday, you too will find the fact that you can’t navigate your site via keyboard, or at
increased zoom level, or with a screen reader **_incredibly_** annoying.

![a grid of stick figures demonstrating how different disabilities can vary from permanent to
temporary](https://miro.medium.com/v2/resize:fit:1400/1*jRa5H4h6KwSezwkCxB2p8Q.png)

psst: sneaky bonus reason to do a11y first design. Usually prioritizing a11y helps make your designs
more simplified and less… overly extravagant, leading to not only a simpler design but one that
feels… cleaner.
