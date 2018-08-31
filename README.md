# DisplayLagAndTypingError_Study
How does the latency in rendering effect the ability of a user to type?
This repository contains materials (html and javascript) to simulate the effect of a high latency input device and/or a low frame rate display. These simulations assume that the rendering and input latency of the browser/keyboard/display is effectively zero compared to the added latency. This will not be true in the high performance regime, however it is a reasonable approximation for slower input speeds. This simulation can be useful for studying the viability of slower display technologies like e-ink displays.

"typing_latency_demo.html" runs a simple application though any modern web browser that lets you get a sense of how latency feels while typing. You can run it [here](http://www.highdimensionalcoconuts.com/Projects/typing_test/typing_latency_demo.html).

In addition to this basic demo, this repository also more formal study [typing_latency_experiment.html]((http://www.highdimensionalcoconuts.com/Projects/typing_test/typing_latency_experiment.html). This experiment examines the hypothesis that higher latency will result in more mistakes. You can run it your self, or you can use the data files in this repo and 'typing_error_rate_analysis.py' to explore this hypothesis. Note that this experiment can modulate both the lag from the refresh rate and the lag from the data. I would conjecture that lag from frame rate is a consequence of the general lag of a display. More precisely the effect of frame-rate lag should be, on average, be equivalent to a display lag of ~2/frameRate - the average lag induced by the refresh rate.

When I ran a pilot study, I did not see any (significant) correlation between latency and typing errors.
My initial supposition was that a slower display would result in more errors. This may be true for longer text sequences. The data shows this, but the effect is weak. Nonetheless a lag of ~100 ms is really annoying - it feels restrictive.



Ben Lucas
