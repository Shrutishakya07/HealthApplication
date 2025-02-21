import React from 'react'
import { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

function About() {

  const[show,setShow] = useState(false)

  return (
    <div>
      <div>
        <h2>About Us</h2>
        <p>With a team of experienced professionals, we offer tailored solutions in bioinformatics, 
          including genomic data analysis, computational biology, and AI-driven insights. Our consultation services extend across multiple domains, 
          helping businesses and researchers make data-driven decisions with confidence.</p>
          <p>At ConferencePoint, we are committed to excellence, innovation, and empowering our clients with cutting-edge solutions. Whether you’re a researcher, healthcare professional, or organization looking for bioinformatics expertise, 
            we’re here to support you every step of the way.</p>
      </div>
      <div>
        <h2>Our Goals</h2>
        <p>To revolutionize healthcare by integrating bioinformatics with medical expertise.</p>
        <p>To provide reliable and data-driven consultation for patients and researchers.</p>
        <p>To advance personalized medicine through computational analysis and genetic research.</p>
        <p>To support healthcare professionals and researchers with high-quality bioinformatics services.</p>
      </div>
      <div>
        <h2>FAQs</h2>
        <ol>
          <li>
            <h3>What services do you offer?</h3>
            <span onClick={() => setShow((old) => !old)}>
                                  {show ? (<FaChevronUp />):(<FaChevronDown />)}
                              </span>
            {show === true && <p>We provide expert medical consultation services as well as advanced bioinformatics solutions. 
              Our medical professionals offer telehealth consultations, diagnosis assistance, and treatment recommendations, 
              while our bioinformatics team specializes in data analysis, genomics, and computational biology research.</p>}
          </li>
          <li>
            <h3> How do I book a medical consultation?</h3>
            <span onClick={() => setShow((old) => !old)}>
                                  {show ? (<FaChevronUp />):(<FaChevronDown />)}
                              </span>
            {show === true && <p>You can book a consultation by signing up on our platform, selecting the type of service, 
              and scheduling an appointment at your convenience. You will receive a confirmation email with further details.</p>}
          </li>
          <li>
            <h3>Are my personal and medical details secure?</h3>
            <span onClick={() => setShow((old) => !old)}>
                                  {show ? (<FaChevronUp />):(<FaChevronDown />)}
                              </span>
            {show === true && <p>Yes, we prioritize data security and comply with strict confidentiality regulations.
              All personal and medical information is encrypted and stored securely.</p>}
          </li>
          <li>
            <h3> How long does it take to receive consultation results?</h3>
            <span onClick={() => setShow((old) => !old)}>
                                  {show ? (<FaChevronUp />):(<FaChevronDown />)}
                              </span>
            {show === true && <p>For medical consultations, results and prescriptions (if applicable) are usually provided within 24–48 hours. 
              Bioinformatics analysis timelines depend on the complexity of the data but typically range from a few days to a couple of weeks.</p>}
          </li>
          <li>
            <h3>How do I contact support?</h3>
            <span onClick={() => setShow((old) => !old)}>
                                  {show ? (<FaChevronUp />):(<FaChevronDown />)}
                              </span>
            {show === true && <p>You can reach our support team via email or through our contact form on the website. 
              We aim to respond to all inquiries within 24 hours.</p>}
          </li>
        </ol>
      </div>
    </div>
  )
}

export default About
