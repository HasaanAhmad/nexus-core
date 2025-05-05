import { FaCheck } from "react-icons/fa";
import Button from "./Button";
import { IoMdCheckmark } from "react-icons/io";

const Pricing = () => {
  return (
    <div className="mb-8 bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="flex flex-col items-center font-medium mb-12 px-12 mx-auto max-w-[550px]">
        <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80 bg-white/50 backdrop-blur-sm">
          Simple, Transparent Pricing
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          One Price, Unlimited Users
        </div>

        <div className="text-center text-lg mb-8 md:text-xl">
          No per-user fees. Scale your team without scaling costs. 
          Get all features for one fixed monthly price.
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center pb-20 gap-8 max-w-5xl mx-auto px-4">
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="font-bold text-gray-500 mb-2">Free</div>
            <div className="py-6">
              <span className="font-extrabold text-5xl">$0</span>
              <span className="font-semibold text-gray-600">/month</span>
            </div>
            <button className="text-white mb-8 bg-black py-3 w-full rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
              Get started for free
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <IoMdCheckmark className="text-green-500 text-xl mr-3" />
                <span>Up to 5 users</span>
              </div>
              <div className="flex items-center">
                <IoMdCheckmark className="text-green-500 text-xl mr-3" />
                <span>Basic modules</span>
              </div>
              <div className="flex items-center">
                <IoMdCheckmark className="text-green-500 text-xl mr-3" />
                <span>2GB storage</span>
              </div>
              <div className="flex items-center">
                <IoMdCheckmark className="text-green-500 text-xl mr-3" />
                <span>Community support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-gradient-to-br from-[#001E80] to-[#002499] rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-white/80">Professional</div>
                <div className="border border-white/20 w-fit p-0.5 px-3 text-xs rounded-xl bg-white/10 backdrop-blur-sm">
                  Most Popular
                </div>
              </div>
              <div className="py-6">
                <span className="font-extrabold text-5xl">$99</span>
                <span className="font-semibold text-white/80">/month</span>
              </div>
              <button className="text-[#001E80] font-medium mb-8 bg-white py-3 w-full rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                Start free trial
              </button>
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <IoMdCheckmark className="text-white text-xl mr-3" />
                  <span>Unlimited users</span>
                </div>
                <div className="flex items-center">
                  <IoMdCheckmark className="text-white text-xl mr-3" />
                  <span>All modules included</span>
                </div>
                <div className="flex items-center">
                  <IoMdCheckmark className="text-white text-xl mr-3" />
                  <span>100GB storage</span>
                </div>
                <div className="flex items-center">
                  <IoMdCheckmark className="text-white text-xl mr-3" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center">
                  <IoMdCheckmark className="text-white text-xl mr-3" />
                  <span>AI-powered features</span>
                </div>
                <div className="flex items-center">
                  <IoMdCheckmark className="text-white text-xl mr-3" />
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center">
                  <IoMdCheckmark className="text-white text-xl mr-3" />
                  <span>API access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
