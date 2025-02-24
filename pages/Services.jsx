import React from 'react'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


function Services() {
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
    <div className='mb-40 mt-10'>
      <div className='flex items-center justify-center '>
          <div className='relative bg-sky-500/50 w-[35rem] h-[20rem] flex items-center justify-center mt-15 -mr-20 z-10 rounded-sm'>
            <motion.p 
            id="animated-text"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className='w-[400px] absolute text-center px-5 text-white font-semibold tracking-wide'>Whether you're a patient seeking medical advice or a researcher looking for data-driven insights,
              we are here to support you with our expertise.</motion.p>
          </div>
          <img src='/assets/about.webp' className='bg-cover bg-contain bg-center bg-no-repeat h-[20rem] w-1/3 rounded-sm relative z-0'/>
      </div>
      <div className='mt-20'>
        <h2 className='text-4xl text-center text-gray-700'>Our Services</h2>
        <div className='mt-10'>
          <h2 className='text-2xl text-center'>Medical Consultation </h2>
          <p className='text-center text-sm'>We offer expert medical consultation services to help you get the care and guidance you need. 
            Our team of experienced healthcare professionals provides:</p>
          <div className='flex items-center justify-center mt-5'>
            <DotLottieReact src="https://lottie.host/4260f0af-9a2a-449c-9161-497a3cc8d028/IUG9vvTAli.lottie" 
              background="transparent" 
              speed="1" 
              style={{ width: "25rem", height: "15rem" }} 
              loop 
              autoplay/>
            <ul className='flex flex-col gap-2'>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Virtual Consultations – </h3>
                <p className='text-sm'>Speak with a doctor from the comfort of your home.</p>
              </li>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Diagnosis Assistance – </h3>
                <p className='text-sm'>Get expert insights and second opinions on medical conditions.</p>
              </li>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Treatment Recommendations –</h3>
                <p className='text-sm'>Personalized treatment plans tailored to your health needs.</p>
              </li>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Preventive Healthcare Advice – </h3>
                <p className='text-sm'>Guidance on maintaining a healthy lifestyle and preventing diseases.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='mt-15 '>
        <div>
          <h2 className='text-2xl text-center'>Bioinformatics Solutions</h2>
          <p  className='text-center text-sm'>We specialize in cutting-edge bioinformatics services to support researchers, 
            healthcare professionals, and organizations. Our expertise includes:</p>
          <div className='flex items-center justify-center mt-5'>
            <ul className='flex flex-col gap-2'>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Genomic Data Analysis –</h3>
                <p className='text-sm'>Unlock insights from DNA and RNA sequencing data.</p>
              </li>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Computational Biology –</h3>
                <p className='text-sm'>Advanced modeling and simulations for biological research.</p>
              </li>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>AI-Driven Medical Insights – </h3>
                <p className='text-sm'> Machine learning algorithms for disease prediction and biomarker discovery.</p>
              </li>
            </ul>
            <DotLottieReact src="https://lottie.host/a5f24d59-5670-4fb4-92bd-16b995d3e5d1/M7dGtWCqBb.lottie" 
            background="transparent" 
            speed="1" 
            style={{ width: "25rem", height: "15rem" }}
            loop autoplay/>
          </div>
        </div>
      </div>
      <div className='mt-15 '>
        <div>
          <h2 className='text-2xl text-center'>Healthcare & Research Support</h2>
          <p  className='text-center text-sm'>We bridge the gap between medicine and technology, providing:</p>
          <div className='flex items-center justify-center mt-5'>
            <DotLottieReact src="https://lottie.host/bd9fef63-d607-442c-b407-1100dfd27389/TlvTF1jq7D.lottie" 
            background="transparent" speed="1" 
            style={{ width: "25rem", height: "15rem" }}
             loop autoplay/>
            <ul className='flex flex-col gap-2'>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Clinical Data Interpretation – </h3>
                <p className='text-sm'>Analysis of medical records and patient data.</p>
              </li>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Personalized Medicine Solutions – </h3>
                <p className='text-sm'>Tailored treatments based on genetic information.</p>
              </li>
              <li className='flex items-center gap-2'>
                <h3 className='text-sky-700'>Research Consultation – </h3>
                <p className='text-sm'>Bioinformatics support for scientific research and publications.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
