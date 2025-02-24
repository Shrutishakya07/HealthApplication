import React from 'react'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const target = document.querySelector("#animated-text");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div className=''>
      <div className="relative w-full h-[30rem] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 animate-bg-slideshow bg-cover  bg-no-repeat bg-center"></div>
        <div className="absolute inset-0 bg-gray-600/50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center gap-5 w-[700px] text-white text-center">
          <motion.h2 
          id="animated-text"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className='text-7xl'>Welcome to ConferencePoint</motion.h2>
          <motion.p
          id="animated-text"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          >A trusted provider of consultation and bioinformatics services. Our mission is to empower researchers, healthcare professionals, and businesses with cutting-edge bioinformatics solutions and expert consulting. With a team of experienced specialists, 
      we bridge the gap between complex biological data and actionable insights, helping you make informed decisions with confidence.</motion.p>
        </div>
        <style>
          {`
            @keyframes bg-slideshow {
              0% { background-image: url('/assets/home1.jpg'); }
              33% { background-image: url('/assets/home2.jpg'); }
              66% { background-image: url('/assets/service1.jpg'); }
              100% { background-image: url('/assets/login2.jpg'); }
            }

            .animate-bg-slideshow {
              animation: bg-slideshow 10s infinite ease-in-out;
            }
          `}
  </style>
      </div>
      
      <h3>Our Values</h3>
      <div>
        <div>
          <h4>Precision & Innovation</h4>
          <p>We leverage the latest technology to ensure accurate results and insights.</p>
        </div>
        <div>
          <h4>Patient-Centric Approach</h4>
          <p>Every consultation is driven by a commitment to personalized care.</p>
        </div>
        <div>
          <h4>Collaboration & Integrity</h4>
          <p>We believe in working together with transparency and trust.</p>
        </div>
        <div>
          <h4>Excellence in Research</h4>
          <p>Our bioinformatics solutions are rooted in scientific rigor and excellence.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
