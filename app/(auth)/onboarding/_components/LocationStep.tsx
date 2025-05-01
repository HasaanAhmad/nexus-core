import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  const [searchQuery, setSearchQuery] = useState('');
  const [geocodeResponse, setGeocodeResponse] = useState('');
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(
    [data.location.lat || 51.505, data.location.lng || -0.09]
  );
  const mapRef = useRef<L.Map>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGeocodeAddress = async () => {
    if (!address.trim()) {
      console.error("Cannot geocode: Missing address");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const results = await response.json();
      
      if (results.length > 0) {
        const { lat, lon } = results[0];
        const newLocation = { 
          lat: parseFloat(lat), 
          lng: parseFloat(lon) 
        };
        
        updateData({ location: newLocation });
        setMarkerPosition([newLocation.lat, newLocation.lng]);
        setGeocodeResponse(JSON.stringify(newLocation, null, 2));
        
        if (mapRef.current) {
          mapRef.current.flyTo([newLocation.lat, newLocation.lng], 15);
        }
      } else {
        setGeocodeResponse("No results found for this address");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setGeocodeResponse("Error during geocoding");
    }
  };

  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const results = await response.json();
      
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const newLocation = { 
          lat: parseFloat(lat), 
          lng: parseFloat(lon) 
        };
        
        updateData({ location: newLocation });
        setMarkerPosition([newLocation.lat, newLocation.lng]);
        setAddress(display_name);
        setGeocodeResponse(JSON.stringify(newLocation, null, 2));
        
        if (mapRef.current) {
          mapRef.current.flyTo([newLocation.lat, newLocation.lng], 15);
        }
      } else {
        setGeocodeResponse("No results found for this search query");
      }
    } catch (error) {
      console.error("Search error:", error);
      setGeocodeResponse("Error during search");
    }
  };

  const clearAll = () => {
    setAddress('');
    setSearchQuery('');
    setGeocodeResponse('');
    const clearedLocation = {
      lat: 0,
      lng: 0
    };
    updateData({ location: clearedLocation });
    setMarkerPosition([0, 0]);
  };

  useEffect(() => {
    if (data.location.lat && data.location.lng) {
      setMarkerPosition([data.location.lat, data.location.lng]);
    }
  }, [data.location.lat, data.location.lng]);

  const MapEvents = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const newLocation = { lat, lng };
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const result = await response.json();
          
          updateData({ location: newLocation });
          setMarkerPosition([lat, lng]);
          setAddress(result.display_name || 'Address not found');
          setGeocodeResponse(JSON.stringify(newLocation, null, 2));
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          updateData({ location: newLocation });
          setMarkerPosition([lat, lng]);
          setAddress('Address lookup failed');
          setGeocodeResponse(JSON.stringify(newLocation, null, 2));
        }
      },
    });

    return null;
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
          <p className="text-gray-500">Enter your organization's primary location for geofence-based attendance</p>
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
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Label htmlFor="search">Search Location</Label>
            <div className="relative">
              <Input
                id="search"
                placeholder="Search for a location"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchLocation()}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-end">
            <Button 
              type="button" 
              onClick={handleSearchLocation}
              className="whitespace-nowrap"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="flex-grow">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <Input
                id="address"
                placeholder="Selected location address"
                value={address}
                onChange={handleAddressChange}
                className="w-full pl-10"
                readOnly
              />
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <Button 
              type="button" 
              onClick={handleGeocodeAddress}
              className="whitespace-nowrap"
            >
              Geocode
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={clearAll}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="relative w-full h-[350px] bg-gray-100 rounded-md overflow-hidden border border-gray-200">
          <MapContainer 
            center={markerPosition}
            zoom={15}
            ref={mapRef}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents />
            <Marker position={markerPosition}>
              <Popup>
                <span>Selected Location</span>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="0.000001"
              value={data.location.lat || ''}
              onChange={(e) => updateData({ 
                location: { 
                  ...data.location, 
                  lat: parseFloat(e.target.value) || 0
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
              value={data.location.lng || ''}
              onChange={(e) => updateData({ 
                location: { 
                  ...data.location, 
                  lng: parseFloat(e.target.value) || 0
                } 
              })}
            />
          </div>
        </div>

        {geocodeResponse && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200 overflow-auto max-h-[150px]">
            <p className="text-sm font-medium mb-1">Location Data:</p>
            <pre className="text-xs whitespace-pre-wrap">{geocodeResponse}</pre>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Geofencing Information</h3>
          <p className="text-xs text-blue-600">
            The selected location will serve as the center point for your geofence. 
            You can set the geofence radius in the attendance settings.
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Search for a location or click on the map to select a point. The address will be automatically filled.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationStep;