# Lerping Per Frame

In Deltarune (and in many other games), there is a pattern to do `x = lerp(x, dest, num)`,
where `num` is between 0 and 1. This results in an effect where `x` goes to `dest`
with an exponentially decreasing rate.

Because one of the things we want to do with GonerEngine is to make things FPS-independent,
we need to figure out how to change lerping, which is FPS-dependent.

Let x(t) be x at time t, where t is in frames.
Let x approach value k, using: x = lerp(x, k, a).
This equation is the same as: x = (1 - a)x + ak.
We know that x(t + 1) = lerp(x, k, a), so x(t + 1) = (1 - a)x + ak.

What if a = 0.5?
Then, x(t + 1) = 0.5x + 0.5k.
Every frame, 

