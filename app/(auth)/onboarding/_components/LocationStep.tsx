import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LocationStepProps {
  data: {
    location: {
      lat: number;
      lng: number;
    };
  };
  updateData: (data: { location: { lat: number; lng: number } }) => void;
  onSkip?: () => void;
}

const LocationStep = ({ data, updateData, onSkip }: LocationStepProps) => {
  const [address, setAddress] = useState('');
  
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    // In a real application, you would use a geocoding service here
    // to convert the address to coordinates
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Where are you located?</h2>
          <p className="text-gray-500">Enter your organization's primary location</p>
        </div>
        <Button 
          variant="ghost" 
          onClick={onSkip}
          type="button"
        >
          Skip
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
            className="w-full"
          />
        </div>

        {/* Map placeholder - in a real app, you'd integrate with a maps API */}
        <div className="relative w-full h-[250px] bg-gray-100 rounded-md overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Map would be displayed here (requires Maps API integration)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="0.000001"
              value={data.location.lat}
              onChange={(e) => updateData({ 
                location: { 
                  ...data.location, 
                  lat: parseFloat(e.target.value) 
                } 
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="0.000001"
              value={data.location.lng}
              onChange={(e) => updateData({ 
                location: { 
                  ...data.location, 
                  lng: parseFloat(e.target.value) 
                } 
              })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationStep;
