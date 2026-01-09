import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';

interface LocationData {
  country: string;
  countryName: string;
  city: string | null;
  region: string | null;
  regionName: string | null;
  latitude: string | null;
  longitude: string | null;
  timeZone: string | null;
}

function App() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  const getCountryFlag = (countryCode: string): string => {
    if (countryCode === 'unknown') return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(window.location.href, { method: 'HEAD' });
        
        setLocation({
          country: response.headers.get('x-geo-country') || 'unknown',
          countryName: response.headers.get('x-geo-country-name') || 'Unknown',
          city: response.headers.get('x-geo-city'),
          region: response.headers.get('x-geo-region'),
          regionName: response.headers.get('x-geo-region-name'),
          latitude: response.headers.get('x-geo-latitude'),
          longitude: response.headers.get('x-geo-longitude'),
          timeZone: response.headers.get('x-geo-time-zone'),
        });
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation({
          country: 'unknown',
          countryName: 'Unknown',
          city: null,
          region: null,
          regionName: null,
          latitude: null,
          longitude: null,
          timeZone: null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        {loading ? (
          <div className="text-2xl text-gray-600">Loading...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl">
            <div className="text-8xl mb-6">
              {location && getCountryFlag(location.country)}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome!
            </h1>
            <p className="text-2xl text-gray-600">
              You are located in{' '}
              <span className="font-semibold text-blue-600">
                {location?.countryName || 'Unknown'}
              </span>
            </p>
            {(location?.city || location?.regionName) && (
              <p className="text-lg text-gray-500 mt-2">
                {[location.city, location.regionName].filter(Boolean).join(', ')}
              </p>
            )}
            {location?.timeZone && (
              <p className="text-sm text-gray-400 mt-2">
                Timezone: {location.timeZone}
              </p>
            )}
          </div>
        )}
      </div>

      <a
        href="https://github.com/JesusRugama/edge-geolocation"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="GitHub"
      >
        <Github size={28} />
      </a>
    </div>
  );
}

export default App;
