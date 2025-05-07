import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Campus Clubs</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Linux Campus Club
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Computer Society Of India
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  IEEE
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DSC
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Sahas
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">College and University</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  JSSSTU
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  SJCE
                </a>
              </li>
            </ul>
          </div>

          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Comparison</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Lcc vs CSI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  IEEE Vs LCC
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  CSI vs IEEE
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  CSI vs DSC
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DSC vs LCC
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  IEEE vs DSC
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  IEEE vs SAHAS
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">University</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://jssstuniv.in/#/" className="text-gray-400 hover:text-white">
                  &copy;JSSSTU
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className=" container mx-auto  flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold hidden md:flex">
          CAMPUS<span className="text-blue-500 font-bold">RUSH</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; JSS science And technology university</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="https://github.com/">
            <FaGithub className="h-6" />
          </a>
          <a href="https://www.youtube.com/">
            <BsYoutube className="h-6" />
          </a>

          <a href="https://www.linkedin.com/in/harsh-sharma-b714b622a/">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
