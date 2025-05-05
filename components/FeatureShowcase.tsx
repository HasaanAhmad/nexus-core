"use client";

import { motion } from "framer-motion";
import { 
  FaUsers, 
  FaRobot, 
  FaChartLine, 
  FaShieldAlt,
  FaComments,
  FaTasks
} from "react-icons/fa";

const FeatureShowcase = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl mb-4 text-blue-600" />,
      title: "Unlimited Users",
      description: "Scale your team without scaling costs. One fixed price for unlimited users."
    },
    {
      icon: <FaRobot className="text-4xl mb-4 text-blue-600" />,
      title: "AI-Powered Automation",
      description: "Leverage artificial intelligence to automate routine tasks and optimize workflows."
    },
    {
      icon: <FaChartLine className="text-4xl mb-4 text-blue-600" />,
      title: "Advanced Analytics",
      description: "Get real-time insights and analytics to make data-driven decisions."
    },
    {
      icon: <FaShieldAlt className="text-4xl mb-4 text-blue-600" />,
      title: "Enterprise Security",
      description: "Bank-grade security with multi-tenant architecture and data encryption."
    },
    {
      icon: <FaComments className="text-4xl mb-4 text-blue-600" />,
      title: "Integrated Communication",
      description: "Built-in chat and collaboration tools for seamless team communication."
    },
    {
      icon: <FaTasks className="text-4xl mb-4 text-blue-600" />,
      title: "Project Management",
      description: "Comprehensive project tracking with Kanban boards and task management."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive ERP solution combines powerful features with AI-driven automation
            to streamline your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase; 