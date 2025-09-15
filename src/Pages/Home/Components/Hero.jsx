import React from 'react';
import { ArrowRight, Star, Users, Download } from 'lucide-react';
import { dummyResume } from '../../../Utils/data';
import RenderResume from './RenderResume';
// import ResumePreview from './ResumePreview';

const Hero = () => {
  return (
    <section className="font-urbanist pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 -translate-y-16">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-900 py-0.5 ">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">Trusted by 500K+ professionals</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Build Your 
                <span className="bg-gradient-to-r from-purple-600 to-pink-500
                    bg-clip-text text-transparent"> Perfect Resume</span> in Minutes
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Create beautiful, ATS-friendly resumes with ease.
                    Stand out and land your dream job faster with ResumeForge.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group btn-large px-8 py-4 rounded-xl text-xl">
                <span>Start Building Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all duration-200 font-semibold text-lg">
                View Templates
              </button>
            </div>

            <div className="flex items-center  space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>500,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>2M+ downloads</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

          <div className="relative ">
            <div className="absolute  inset-0  bg-gradient-to-r from-purple-500/85 to-purple-300 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                <div className=' h-[100vh] rounded-md translate-x-16 translate-y-10 rotate-3  hover:rotate-6 transform ease-in duration-200'>
                    <RenderResume
                        templateId={"01"}
                        resumeData={ dummyResume}
                        containerWidth={400}
                        colorPalette={""}
                        />
                </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;