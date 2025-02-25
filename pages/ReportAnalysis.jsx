import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import vdo from '../public/assets/report.mp4'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import backgroundImage from "../public/assets/bgreport.jpg"
import upload from "../public/assets/upload.gif"
import ReactMarkdown from "react-markdown";


function ReportAnalysis() {
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [medicalSummary, setMedicalSummary] = useState("");
  const [userprofile, setUserprofile] = useState(null);
  const [reportHistory, setreportHistory] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(""); // State for file name
  const [isLoading, setIsLoading] = useState(true); // ✅ Loading state
  const [IsLoaderSummary, setIsLoaderSummary] = useState(false); // ✅ Loading state
  const [selectedReport, setSelectedReport] = useState(null);



  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    setSelectedFileName(event.target.files[0].name); // Update file name state
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userProfileInfo");
    if (storedUser) {
      setUserprofile(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Updated useEffect: Fetch reports when userprofile is available
  useEffect(() => {
    if (userprofile) {
      fetchReports();
    }
  }, [userprofile]); // 🔥 Dependency array now includes userprofile


  const fetchReports = async () => {
    const email = userprofile?.email;
    const phone = userprofile?.contact;

    if (!email || !phone) return; // Ensure both values exist before making the request
    console.log("checking email before fetching report", email);
    console.log("checking phone before fetching report", phone);

    try {
      const response = await axios.get("http://127.0.0.1:4000/api/v1/report/fetch-report", {
        params: { email, phone },
      });

      console.log("✅ Data fetched successfully:", response.data.reports);
      setreportHistory(response.data.reports);

    } catch (error) {
      console.error("❌ Error fetching reports:", error);
    } finally {
      setIsLoading(false); // ✅ Stop loading when request completes
    }
  };


  const handleUpload = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      console.error("❌ No file selected");
      return;
    }

    let userEmail = userprofile?.email
    console.log("current user Email is", userprofile?.email); // Check if email is available

    const formData = new FormData();
    formData.append("username", username);
    formData.append("contact", contact);
    formData.append("pdfFile", pdfFile); // ✅ Ensure correct file field
    formData.append("userEmail", userEmail)


    // ✅ Debugging FormData contents
    for (let pair of formData.entries()) {
      console.log(`📌 ${pair[0]}:`, pair[1]);
    }
    setIsLoaderSummary(true)
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/report/upload-report",
        formData,
        {
          headers: {
            // **Do NOT set Content-Type manually!**
            // "Content-Type": "multipart/form-data",
          },
          // timeout: 10000,
        }
      );

      console.log("✅ Upload success:", response.data);
      setMedicalSummary(response.data.medicalSummary); // ✅ Update state with summary 
      fetchReports();

      // ✅ Reset Form Fields
      setUsername("");
      setContact("");
      setPdfFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input field
      }


    } catch (error) {
      console.error("❌ Upload error:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoaderSummary(false);
    }
  };

  const handleCardClick = (report) => {
    setSelectedReport(report);
    console.log("selectedReport is the report ", report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };


  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className=" flex justify-center min-h-screen px-4" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // or 'contain' depending on your need
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      }}>
        <div className="w-1/2 p-8 mt-3 max-h-[640px] flex flex-col  bg-white rounded-l-lg shadow-lg  overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Upload Report
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="w-full h-76 border-2 border-dashed  rounded-md flex items-center justify-center relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden" // Hide the default input
              />

              {/* Circular Upload Button */}
              <div
                className="w-16 h-16 rounded-full bg-cyan-500 text-white flex items-center justify-center cursor-pointer"
                onClick={handleUploadClick}
              >
                <div className="text-red-700 rounded-full ">
                  <img src={upload} className="" />
                </div>


              </div>
            </div>
            {selectedFileName && (
              <p className="mt-1 text-gray-700 text-sm">{selectedFileName}</p>
            )}
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition duration-300"
            >
              Upload
            </button>
          </form>
        </div>

        {/* Right Side: Lottie or Medical Summary */}
        {/* <div className="w-1/2 p-4 mt-7 max-h-[600px] rounded-r-lg flex flex-col justify-center items-center"> */}
        {medicalSummary ? (
          <div className="w-1/2 p-4 mt-[0rem] max-h-[660px] overflow-x-hidden rounded-r-lg flex flex-col justify-center items-center">
            <div className="w-full h-full bg-white p-4 overflow-y-auto overflow-x-hidden scrollbar-hidden">
              <h3 className="text-xl font-semibold text-gray-900">Medical Summary:</h3>
              <pre className="bg-white p-4 rounded-md  text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown>{medicalSummary}</ReactMarkdown>
              </pre>
              <p className="text-sm font-bold text-cyan-500 mt-4">
                This information is generated by AI, so kindly reassure the information with your doctor.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-1/2 p-4 mt-7 max-h-[600px] rounded-r-lg flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center h-64">
              <DotLottieReact
                src="https://lottie.host/adc7bc94-5fb6-4ac6-b571-6c4d0540bbac/Amg979wJmJ.lottie"
                background="transparent"
                speed="1"
                style={{ width: '750px', height: '1200px' }}
                loop
                autoplay />
              {IsLoaderSummary ? (
                <p className="text-cyan-600 text-lg font-semibold animate-pulse bg-gray-100 px-4 py-2 rounded-lg shadow-md">
                  ⏳ Processing...
                </p>
              ) : null}
            </div>
          </div>
        )}
        {/* </div> */}
      </div>


      <div className="p-6 bg-gradient-to-r from-blue-50 via-sky-100 to-blue-200 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">📄 Report History</h2>
        {isLoading ? (
          <p className="text-gray-600 text-center font-semibold animate-pulse">⏳ Loading reports...</p> // ✅ Loading text
        ) : reportHistory.length === 0 ? (
          <p className="text-gray-600 text-center">No reports found.</p> // ✅ No reports message
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {reportHistory.map((report) => (
              <div
                key={report._id}
                onClick={() => handleCardClick(report)}
                className="bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 rounded-2xl p-6 border border-cyan-500 cursor-pointer relative overflow-hidden"
              >
                {/* Header - Name with Elegant Serif Font */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2 tracking-wide">
                  {report.username}
                </h3>

                {/* Content with Stylish Layout */}
                <div className="space-y-3 text-gray-800">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-black">📧 Email:</span>
                    <span className="text-gray-700 italic">{report.userEmail}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-black">📞 Contact:</span>
                    <span className="text-gray-700">{report.contact}</span>
                  </p>

                  <p className="text-gray-600 text-sm mt-4 border-t pt-2 flex items-center gap-2">
                    <span className="font-semibold text-cyan-600">⏳ Created:</span>
                    <span className="text-gray-700">{new Date(report.createdAt).toLocaleString()}</span>
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-50 opacity-0 hover:opacity-90 transition duration-300"></div>
              </div>


            ))}
          </div>
        )}

        {/* ✅ Modal Overlay */}
        {selectedReport && (
          <div
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            {/* Modal Box */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-[70%] relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close Button (X) */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-700 hover:text-red-700 text-xl font-bold"
              >
                ✖
              </button>

              {/* Report Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedReport.username}</h2>
                <p className="text-sm text-gray-500">
                  Created: {new Date(selectedReport.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Medical Summary with Scroll */}
              <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto  scrollbar-hidden">
                <pre className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown>{selectedReport.medicalSummary.replace(/\\n/g, "  \n")}</ReactMarkdown>
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default ReportAnalysis;
