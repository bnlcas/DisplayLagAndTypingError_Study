# DisplayLagAndTypingError_Study
How does latency is rendering effect the ability of a user to type?
This study explores this question in a very rough pass by creating a simple typing task (javascript and html) that runs in a web browswer.
This lets us simulate the effect of a high latency input device, or a low frame rate display, and measure errors in typing.
In addition to this, I have included a basic python script to analyze the errors rate (edit distance) and explore how the speed of the display feedback is related to usability.
In addition to this more formal study, it is possible to directly experience how latency effects typing with the basic html file (typetest.html).

In all of these scripts it is assumed that the rendering and input latency of the browser in effectively zero. This will not be true in the high performance regime, however it is a reasonable approximation for slower inputs, and this can be useful for studying the viability of slower display technologies like e-ink.

Ben Lucas
