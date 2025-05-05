"use client";

import { motion } from "framer-motion";
import { 
  FaUserClock, 
  FaMoneyBillWave, 
  FaBoxes, 
  FaProjectDiagram,
  FaUserFriends,
  FaChartBar
} from "react-icons/fa";

const ModuleShowcase = () => {
  const modules = [
    {
      icon: <FaUserClock className="text-4xl mb-4 text-blue-600" />,
      title: "Attendance & Payroll",
      description: "Streamline employee attendance tracking and automated payroll processing with AI-powered insights."
    },
    {
      icon: <FaMoneyBillWave className="text-4xl mb-4 text-blue-600" />,
      title: "Financial Management",
      description: "Comprehensive financial tools for accounting, invoicing, and expense tracking."
    },
    {
      icon: <FaBoxes className="text-4xl mb-4 text-blue-600" />,
      title: "Inventory Management",
      description: "Real-time inventory tracking with automated reordering and stock level optimization."
    },
    {
      icon: <FaProjectDiagram className="text-4xl mb-4 text-blue-600" />,
      title: "Project Workflow",
      description: "Advanced project management with Kanban boards, task tracking, and team collaboration."
    },
    {
      icon: <FaUserFriends className="text-4xl mb-4 text-blue-600" />,
      title: "CRM Integration",
      description: "Built-in customer relationship management with AI-powered insights and automation."
    },
    {
      icon: <FaChartBar className="text-4xl mb-4 text-blue-600" />,
      title: "Business Intelligence",
      description: "Powerful analytics and reporting tools for data-driven decision making."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Business Modules
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our modular approach allows you to start with what you need and scale as you grow.
            Each module is powered by AI to enhance productivity and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {module.icon}
              <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModuleShowcase; 