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
          {profile?.user?.name}
        </strong>
        , a driven full stack developer and Computer Science engineering student who enjoys building practical tech solutions that create real impact. With a knack for clean code and collaboration, Satish thrives in both development and leadership roles.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Technical Expertise:</h2>
      <p>
        <strong>Front-End:</strong> Experienced with React.js, Next.js, HTML5, CSS3, and responsive UI design. Focused on building clean, fast, and user-friendly interfaces. <br />
        <strong>Back-End:</strong> Skilled in Node.js and Express.js, with solid understanding of REST APIs and full-stack architecture. <br />
        <strong>Databases:</strong> Comfortable working with both relational and non-relational databases like MySQL and MongoDB. <br />
        <strong>Hosting & Deployment:</strong> Proficient in Git, GitHub, Netlify, Cloudflare, and Vercel for smooth CI/CD workflows.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Professional Highlights:</h2>
      <p>
        Creator of <strong>Next Bite</strong>, a real-time mess management system used in hostels and PGs. <br />
        Logistics Coordinator at the DSC (Developer Student Club), responsible for smooth event execution and cross-team coordination. <br />
        Main organizer of <strong>HackElite</strong>, a national-level 24-hour hackathon hosted by JSS STU with 50+ teams and a prize pool of ₹1 lakh. <br />
        Editorial Lead at LCC, where he coordinated content, led communications, and played a key role in events like FOSS Camp and Projectify. <br />
        Led and contributed to several student-led initiatives focused on community learning and tech enablement.
      </p>

      <br />
      <span>
        Satish is passionate about using technology to solve everyday challenges and empower students and communities. Whether it's through organizing tech events, building tools that make life easier, or contributing to open-source, he believes in staying hands-on and humble.
      </span>

      <h2 className="font-semibold text-blue-800 text-xl">Leadership & Recognition:</h2>
      <p>
        Former school leader and cadet in both NCC Navy and Scouts & Guides. <br />
        Earned the <strong>B Certificate</strong> in NCC and was honored with the prestigious <strong>Rajya Puraskar</strong> in Scouts, recognized by the State Governor. <br />
        Academically, he secured first rank in SSLC with 96.96% and 5th rank in PU with 94.33% overall.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
        Outside of tech, Satish enjoys storytelling, community engagement, and sharing knowledge with others. He draws inspiration from his humble beginnings and strives to help students from rural areas discover their potential. His journey is deeply rooted in determination, hard work, and a desire to give back to society.
      </p>
    </div>
  );
}

export default About;
