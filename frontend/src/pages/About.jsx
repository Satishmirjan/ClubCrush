import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        This is{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          Aman
        </strong>
        , an enthusiastic Computer Science and Business Systems student with a strong foundation in full-stack development. Aman is passionate about building impactful applications that enhance user experience and solve real-world problems.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Technical Expertise:</h2>
      <p>
        <strong>Languages & Tools:</strong> Proficient in C, C++, HTML, CSS, JavaScript, SQL, and Git. <br />
        <strong>Frameworks & Libraries:</strong> Experienced with React, Next.js, Django, and React Toolkit. <br />
        <strong>Projects:</strong> Skilled in developing APIs, working with AWS, and designing UI/UX using Figma.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Professional Highlights:</h2>
      <p>
        Developed <strong>Campus-Buzz</strong>, a full-stack platform to enhance event visibility for student clubs at JSSSTU. <br />
        Built the <strong>AMA App</strong> using Next.js and TypeScript, enabling interactive Q&A with authentication and voting features. <br />
        Created an <strong>Inventory Management System</strong> with Django and secure access control. <br />
        Active member and event coordinator in the CSI Club at JSSSTU, helping organize various college-level events. <br />
        Represented his college in inter-college fashion competitions as a model for the <strong>Pehchaan</strong> club.
      </p>

      <span>
        Aman is driven by curiosity and creativity. He enjoys building things that are not only functional but also engaging. Whether it's through code, coordination, or creativity, he thrives in collaborative and fast-paced environments.
      </span>

      <h2 className="font-semibold text-blue-800 text-xl">Leadership & Recognition:</h2>
      <p>
        Event Team Student Coordinator for CSI JSSSTU, playing a pivotal role in event planning and execution. <br />
        Winner of various coding competitions hosted by CSI and LCC. <br />
        Champion of Tuvvie’s Inter-College Fashion Competition as a key contributor in the Pehchaan team.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
        Aman’s interests go beyond code—he is also drawn to fashion, creativity, and event organizing. His ability to blend technical skills with artistic expression makes him a unique and versatile individual who’s always looking to grow, contribute, and inspire.
      </p>
    </div>
  );
}

export default About;
