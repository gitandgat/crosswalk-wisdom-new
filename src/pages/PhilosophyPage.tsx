import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function PhilosophyPage() {
  return (
    <div id="top" className="min-h-screen bg-parchment text-charcoal">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-semibold mb-2">THE CROSSING GUARD PHILOSOPHY</p>
          <h1 className="text-5xl font-serif font-bold leading-tight mb-6">
            The sidewalk is the classroom.
          </h1>
          <p className="text-xl text-charcoal-light leading-relaxed mb-8">
            Healing doesn't happen in a $10,000 retreat. It happens when you slow down enough to see what's right in front of you. This is what I learned standing on a street corner in a yellow vest.
          </p>
          {/* CTA Button after Hero - Enhanced visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <Link
              to="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded font-bold transition shadow-xl text-base text-center transform hover:scale-105 duration-200"
            >
              ★ Take Fear Audit
            </Link>
            <a
              href="https://www.facebook.com/groups/2073825613397240"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded font-bold transition shadow-xl text-base text-center transform hover:scale-105 duration-200"
            >
              ★ Join Community
            </a>
            <Link
              to="/course"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded font-bold transition shadow-xl text-base text-center transform hover:scale-105 duration-200"
            >
              ★ Learn Method
            </Link>
            <a
              href="#principles"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded font-bold transition shadow-xl text-base text-center transform hover:scale-105 duration-200"
            >
              ★ Read 7 Laws
            </a>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8">The Yellow Vest</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              I spent 12 years in medicine. Long shifts. High stakes. The kind of work where you're taught to run on adrenaline and guilt — guilt for needing sleep, guilt for having doubts, guilt for eventually realizing the whole system was designed to swallow people whole and call it duty.
            </p>
            <p>
              When I left, people asked: "What's next?" I didn't have an answer. So I became a crossing guard.
            </p>
            <p className="font-semibold text-amber-700 text-xl">
              Standing on that corner in a yellow vest — watching strangers cross the street, managing traffic, slowing people down — I learned more about burnout and healing than I ever did in therapy, workshops, or self-help books.
            </p>
            <p>
              Here's what the sidewalk taught me:
            </p>
          </div>

          {/* CTA after story - Enhanced */}
          <div className="mt-12 pt-8 border-t-2 border-amber-200">
            <p className="text-lg font-semibold mb-6">Does this resonate with you?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/"
                className="block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold transition shadow-lg text-lg text-center transform hover:scale-105 duration-200"
              >
                ★ Start Fear Audit
              </Link>
              <Link
                to="/course"
                className="block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition shadow-lg text-lg text-center transform hover:scale-105 duration-200"
              >
                ★ Explore Course
              </Link>
              <a
                href="https://www.facebook.com/groups/2073825613397240"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded font-bold transition shadow-lg text-lg text-center transform hover:scale-105 duration-200"
              >
                ★ Join Community
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The 7 Principles */}
      <section id="principles" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-12">The Seven Principles</h2>
          <div className="grid gap-8 mb-12">
            {[
              {
                num: 1,
                title: "Your body knew before your brain did",
                desc: "The fatigue, numbness, parking lot tears — not weakness. Intelligence. Burnout is wisdom in the body before it becomes decision in the mind. Listen to it."
              },
              {
                num: 2,
                title: "The identity cage is the real prison",
                desc: '"I am a doctor" isn\'t a description — it\'s a load-bearing wall. When you dismantle it, it feels like dying. That\'s because a version of you is. The grief is real, and it\'s necessary.'
              },
              {
                num: 3,
                title: "Leaving is not betrayal",
                desc: "Nobody says it out loud: you need you. Choosing yourself is not abandonment. Erasing yourself to stay is the real betrayal — to yourself, to the people who love you, to the work that deserves someone who actually wants to be there."
              },
              {
                num: 4,
                title: "The sidewalk is smarter than the seminar",
                desc: "The best healing happens in ordinary moments — crossing streets, watching strangers, sitting in a parking lot, standing still. Not in a retreat. Not on a podcast. The classroom is everywhere, and you're already in it."
              },
              {
                num: 5,
                title: "Fear is a map, not a stop sign",
                desc: "The three fears — financial insecurity, fear of judgment, identity loss — are not problems to solve. They're diagnostic data. Navigate toward them, not away. They'll show you where the real work is."
              },
              {
                num: 6,
                title: "Slowing down is the advanced move",
                desc: "In medicine, speed = competence. On the sidewalk, slowing down = survival. Observation is where wisdom begins. A first-grader crossing the street can teach you more than a hospital's entire organizational structure."
              },
              {
                num: 7,
                title: "The crossing guard sees everything the driver misses",
                desc: "When you're moving at 60 mph, you don't see the person frozen at the curb. You don't see the child learning to navigate danger. You don't see yourself. Slowing down isn't failure. It's the only way to actually see."
              }
            ].map((principle) => (
              <div key={principle.num} className="border-l-4 border-amber-500 pl-6 py-4">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="inline-flex w-10 h-10 items-center justify-center bg-amber-100 rounded-full font-serif text-amber-700">
                    {principle.num}
                  </span>
                  {principle.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA after principles - Enhanced */}
          <div className="bg-gradient-to-br from-red-50 via-amber-50 to-orange-50 border-3 border-red-400 rounded-lg p-10 text-center shadow-2xl">
            <h3 className="text-3xl font-serif font-bold mb-4">Which principle hits closest to home?</h3>
            <p className="text-lg mb-8 text-gray-700">
              Take the Fear Audit to see which of your three fears is holding you back.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/"
                className="block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold transition shadow-xl text-lg transform hover:scale-105 duration-200"
              >
                ★ Fear Audit Now
              </Link>
              <Link
                to="/course"
                className="block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition shadow-xl text-lg transform hover:scale-105 duration-200"
              >
                ★ Full Program
              </Link>
              <a
                href="https://www.facebook.com/groups/2073825613397240"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded font-bold transition shadow-xl text-lg transform hover:scale-105 duration-200"
              >
                ★ Join Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8">What Does This Have to Do With You?</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              You might not be a doctor. You might not be about to hand in a badge or wear a yellow vest. But you're probably doing what healthcare workers do — carrying a load that was never meant for one person, telling yourself you should be fine, wondering when the guilt for wanting a different life became so permanent.
            </p>
            <p>
              The Crossing Guard Philosophy isn't about medicine. It's about <strong>presence</strong>. It's about the radical act of slowing down enough to notice what your life is actually asking of you. It's about permission — the permission to stand still, to look both ways, to choose yourself.
            </p>
            <p className="font-semibold text-amber-700 text-xl">
              The sidewalk doesn't judge you for not crossing yet. The crossing guard sees everyone — the ones walking, the ones standing at the curb, the ones frozen mid-street. All of it is valid. All of it is the right place to be.
            </p>

            {/* Links in text - Enhanced visibility */}
            <div className="mt-8 p-10 bg-gradient-to-br from-red-50 via-amber-50 to-yellow-50 rounded-lg border-3 border-red-400 shadow-2xl">
              <p className="font-bold mb-8 text-2xl text-center text-red-700">🎯 Ready for your next step? Choose your path:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-lg border-2 border-red-200 shadow-md hover:shadow-lg transition">
                  <Link
                    to="/"
                    className="block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded text-lg transition shadow-lg w-full transform hover:scale-105 duration-200 text-center"
                  >
                    ★ Take the Audit
                  </Link>
                  <p className="text-sm text-gray-700 mt-3 font-medium">Name your fear and get personalized guidance</p>
                </div>
                <div className="bg-white p-5 rounded-lg border-2 border-green-200 shadow-md hover:shadow-lg transition">
                  <a
                    href="https://www.facebook.com/groups/2073825613397240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded text-lg transition shadow-lg w-full transform hover:scale-105 duration-200 text-center"
                  >
                    ★ Join Community
                  </a>
                  <p className="text-sm text-gray-700 mt-3 font-medium">Connect with others who are choosing themselves</p>
                </div>
                <div className="bg-white p-5 rounded-lg border-2 border-blue-200 shadow-md hover:shadow-lg transition">
                  <Link
                    to="/course"
                    className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded text-lg transition shadow-lg w-full transform hover:scale-105 duration-200 text-center"
                  >
                    ★ Learn Method
                  </Link>
                  <p className="text-sm text-gray-700 mt-3 font-medium">4-week program to move from awareness to action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 via-amber-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif font-bold mb-6 text-charcoal">🎯 Ready to Stand on Your Own Crossing?</h2>
          <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto font-semibold">
            The Fear Audit is where this philosophy becomes practical. It's a mirror for the three fears holding you at the curb. Take it, name your fear, and take one act of courage.
          </p>
          <p className="text-gray-600 mb-12 font-bold text-lg">⏱️ Most people find their answer in 5 minutes.</p>

          {/* Multiple prominent CTAs - Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <Link
              to="/"
              className="block bg-red-600 hover:bg-red-700 text-white px-8 py-5 rounded font-bold transition shadow-xl text-lg transform hover:scale-105 duration-200"
            >
              ★ Start Fear Audit
            </Link>
            <Link
              to="/course"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded font-bold transition shadow-xl text-lg transform hover:scale-105 duration-200"
            >
              ★ Full Course
            </Link>
            <a
              href="https://www.facebook.com/groups/2073825613397240"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded font-bold transition shadow-xl text-lg transform hover:scale-105 duration-200"
            >
              ★ Join Community
            </a>
            <Link
              to="/blog"
              className="block bg-purple-600 hover:bg-purple-700 text-white px-8 py-5 rounded font-bold transition shadow-xl text-lg transform hover:scale-105 duration-200"
            >
              ★ Read Blog
            </Link>
          </div>

          {/* Secondary CTA Section */}
          <div className="text-center pt-8 border-t-3 border-red-300">
            <p className="text-gray-700 mb-6 font-bold text-lg">💡 Want to learn more first?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="#principles"
                className="block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded text-lg transition shadow-lg transform hover:scale-105 duration-200"
              >
                ↑ Jump to 7 Principles
              </a>
              <a
                href="#top"
                className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded text-lg transition shadow-lg transform hover:scale-105 duration-200"
              >
                ↑ Back to Top
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
