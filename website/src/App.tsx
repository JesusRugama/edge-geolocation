import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';

interface LocationData {
  country: string;
  countryName: string;
  city: string | null;
  latitude: string | null;
  longitude: string | null;
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

      setLocation({
          country: 'NI',
          countryName: 'Nicaragua',
          city: null,
          latitude: null,
          longitude: null,
        });

      return;
      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-location`;
        const headers = {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        };

        const response = await fetch(apiUrl, { headers });
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation({
          country: 'unknown',
          countryName: 'Unknown',
          city: null,
          latitude: null,
          longitude: null,
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
            {location?.city && (
              <p className="text-lg text-gray-500 mt-4">
                City: {location.city}
              </p>
            )}
          </div>
        )}
      </div>

      <a
        href="https://github.com"
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
