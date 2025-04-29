
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface OrganizationDetailsProps {
  data: {
    name: string;
    description: string;
  };
  updateData: (data: Partial<{ name: string; description: string }>) => void;
}

const OrganizationDetails = ({ data, updateData }: OrganizationDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us about your organization</h2>
        <p className="text-gray-500">Enter the basic details about your organization</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name</Label>
          <Input
            id="org-name"
            placeholder="Enter your organization name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="org-description">Description</Label>
          <Textarea
            id="org-description"
            placeholder="Tell us about what your organization does"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            className="min-h-[120px] w-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default OrganizationDetails;
