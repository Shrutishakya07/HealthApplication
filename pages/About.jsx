import React, { useState,useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";

function About() {
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

  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide expert medical consultation services as well as advanced bioinformatics solutions. Our medical professionals offer telehealth consultations, diagnosis assistance, and treatment recommendations, while our bioinformatics team specializes in data analysis, genomics, and computational biology research."
    },
    {
      question: "How do I book a medical consultation?",
      answer: "You can book a consultation by signing up on our platform, selecting the type of service, and scheduling an appointment at your convenience. You will receive a confirmation email with further details."
    },
    {
      question: "Are my personal and medical details secure?",
      answer: "Yes, we prioritize data security and comply with strict confidentiality regulations. All personal and medical information is encrypted and stored securely."
    },
    {
      question: "How long does it take to receive consultation results?",
      answer: "For medical consultations, results and prescriptions (if applicable) are usually provided within 24–48 hours. Bioinformatics analysis timelines depend on the complexity of the data but typically range from a few days to a couple of weeks."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via email or through our contact form on the website. We aim to respond to all inquiries within 24 hours."
    }
  ];

  return (
    <div>
      <div className="bg-[url('/assets/home3.jpg')] bg-cover bg-center bg-fixed bg-no-repeat h-[30rem] w-full -mt-3 relative flex items-center justify-center">
        <div className='flex flex-col absolute items-center justify-center w-[800px] text-center gap-5'>
          <motion.h2 
          id="animated-text"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl font-bold">About Us</motion.h2>
          <div>
            <motion.p 
            id="animated-text"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className='text-gray-800 text-sm font-semibold'>With a team of experienced professionals, we offer tailored solutions in bioinformatics, including genomic data analysis, computational biology, and AI-driven insights. 
              Our consultation services extend across multiple domains, helping businesses and researchers make data-driven decisions with confidence.
              </motion.p><br/>
            <motion.p 
            id="animated-text"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className='text-gray-800 text-sm font-semibold'>At ConferencePoint, we are committed to excellence, innovation, and empowering our clients with cutting-edge solutions. Whether you’re a researcher, healthcare professional, 
            or organization looking for bioinformatics expertise, we’re here to support you every step of the way.</motion.p>
          </div>
        </div>
      </div>
      <div className="mt-15 mb-15">
        <h2 className="text-3xl font-bold text-center">Our Goals</h2>
        <ul className="mt-15 flex  items-center justify-center gap-7">
          <div className='bg-red-200 w-60 h-60 rounded-full relative flex items-center'>
            <li className='absolute text-center font-semibold text-sm p-2'>To revolutionize healthcare by integrating bioinformatics with medical expertise.</li>
          </div>
          <div className='bg-blue-200 w-60 h-60 rounded-full relative flex items-center'>
            <li className='absolute text-center font-semibold text-sm  p-2'>To provide reliable and data-driven consultation for patients and researchers.</li>
          </div>
          <div className='bg-green-200 w-60 h-60 rounded-full relative flex items-center'>
            <li className='absolute text-center font-semibold text-sm  p-2'>To advance personalized medicine through computational analysis and genetic research.</li>
          </div>
          <div className='bg-yellow-200 w-60 h-60 rounded-full relative flex items-center'>
            <li className='absolute text-center font-semibold text-sm  p-2'>To support healthcare professionals and researchers with high-quality bioinformatics services.</li>
          </div>
        </ul>
      </div>
      <div className="mb-15 flex flex-col items-center mb-10">
        <div className="relative w-full h-full mt-10">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full object-cover"
          >
            <source src='/assets/video.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h2 className="relative text-4xl font-bold text-center text-white pt-10">How it works?</h2>
            <div className="relative z-10 flex items-center justify-center">
              <ol className='grid grid-cols-2 gap-10 mt-10 text-white '>
                <li className='w-[400px] bg-gray-700/50 h-[200px] flex justify-center items-center rounded-2xl'>
                  <div className='flex flex-col items-center px-5 '>
                    <h3>Create Your Account</h3>
                    <p className='text-sm'>Consultants require admin approval before login.</p>
                  </div>
                </li>
                <li className='w-[400px] bg-gray-700/50 h-[200px] flex justify-center items-center rounded-2xl'>
                  <div className='flex flex-col items-center  px-5 '>
                    <h3>Update Profile</h3>
                    <p className='text-sm'>You can update your profile as per your choice.</p>
                  </div>
                  </li>
                  <li className='w-[400px] bg-gray-700/50 h-[200px] flex justify-center items-center rounded-2xl'>
                    <div className='flex flex-col items-center  px-5 '>
                      <h3>Booking appointments via Calendly</h3>
                      <p className='text-center text-sm'>Users can book, cancel and reschedule appointments.</p>    
                    </div>
                  </li>
                  <li className='w-[400px] bg-gray-700/50 h-[200px] flex justify-center items-center rounded-2xl'>
                    <div className='flex flex-col items-center px-5 '>
                      <h3>Virtual Consultations</h3>
                      <p className='text-center text-sm'>Users can speak with a doctor or research analysts from the comfort of their home.</p>
                    </div>
                  </li>
                  <li className='w-[400px] bg-gray-700/50 h-[200px] flex justify-center items-center rounded-2xl col-span-2 mx-auto w-1/2'>
                    <div className='flex flex-col items-center  px-5 '>
                      <h3>Clinical Data Interpretation</h3>
                      <p className='text-sm'>Users can get analysis of medical records.</p>
                    </div>
                  </li>
              </ol>
            </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col justify-center items-center mb-30">
        <h2 className="text-3xl font-bold text-center py-10">FAQs</h2>
        <div className="mt-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b py-3 w-[800px]">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <span className='bg-gray-800 w-10 h-10 flex items-center justify-center rounded-lg m-0'>{openFAQ === index ? <FaChevronUp className='text-white'/> : <FaChevronDown className='text-white'/>}</span>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${
                openFAQ === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <p className="mt-2 text-sm text-gray-800">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
