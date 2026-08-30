'use client';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Mail, Navigation, ChevronRight } from 'lucide-react';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle auto-fitting bounds based on markers
function MapBounds({ locations, selectedId }: { locations: any[], selectedId: string | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (locations.length === 0) return;

    if (selectedId) {
      const loc = locations.find(l => l.id === selectedId);
      if (loc) {
        map.setView([loc.latitude, loc.longitude], 15, { animate: true });
        return;
      }
    }

    if (locations.length === 1) {
      map.setView([locations[0].latitude, locations[0].longitude], 15);
    } else {
      const bounds = L.latLngBounds(locations.map(loc => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [locations, map, selectedId]);

  return null;
}

interface LocationsMapProps {
  locations: any[];
  isAr: boolean;
}

export default function LocationsMap({ locations, isAr }: LocationsMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  if (!locations || locations.length === 0) {
    return (
      <div className="w-full h-[500px] bg-slate-100 flex flex-col items-center justify-center text-center p-6 border border-slate-200">
        <MapPin size={48} className="text-slate-300 mb-4" />
        <h3 className={`text-xl font-bold text-slate-500 font-serif mb-2 ${isAr ? 'font-arabic' : ''}`}>{isAr ? 'مواقعنا' : 'LOCATIONS'}</h3>
        <p className={`text-slate-400 ${isAr ? 'font-arabic' : ''}`}>{isAr ? 'ستظهر مواقعنا هنا قريباً.' : 'Our locations will appear here.'}</p>
      </div>
    );
  }

  const getLangStr = (obj: any) => obj?.[isAr ? 'ar' : 'en'] || obj?.en || '';

  return (
    <div className="flex flex-col lg:flex-row shadow-2xl border border-slate-200 rounded-lg overflow-hidden bg-white">
      
      {/* Map Section */}
      <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px] relative z-0">
        <MapContainer 
          center={[locations[0].latitude, locations[0].longitude]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapBounds locations={locations} selectedId={selectedId} />
          
          {locations.map((loc) => (
            <Marker 
              key={loc.id} 
              position={[loc.latitude, loc.longitude]}
              eventHandlers={{
                click: () => setSelectedId(loc.id),
              }}
            >
              <Popup className={isAr ? 'leaflet-popup-rtl' : ''} closeButton={false}>
                <div className="p-1 min-w-[200px]" dir={isAr ? 'rtl' : 'ltr'}>
                  <h4 className={`font-bold text-slate-900 text-lg font-serif leading-tight mb-1 ${isAr ? 'font-arabic' : ''}`}>{getLangStr(loc.name)}</h4>
                  <p className={`text-slate-500 text-sm mb-3 ${isAr ? 'font-arabic' : ''}`}>{getLangStr(loc.city)}, {getLangStr(loc.country)}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <p className="text-slate-600 flex items-start gap-2">
                      <MapPin size={14} className="mt-0.5 text-dazz-gold shrink-0" />
                      <span className={`leading-snug ${isAr ? 'font-arabic' : ''}`}>{getLangStr(loc.address)}</span>
                    </p>
                    {loc.phone && (
                      <p className="text-slate-600 flex items-center gap-2">
                        <Phone size={14} className="text-dazz-gold shrink-0" />
                        <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="hover:text-dazz-navy transition" dir="ltr">{loc.phone}</a>
                      </p>
                    )}
                    {loc.email && (
                      <p className="text-slate-600 flex items-center gap-2">
                        <Mail size={14} className="text-dazz-gold shrink-0" />
                        <a href={`mailto:${loc.email}`} className="hover:text-dazz-navy transition">{loc.email}</a>
                      </p>
                    )}
                  </div>
                  
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-2 bg-slate-900 text-white text-xs font-bold tracking-wider rounded-sm hover:bg-dazz-gold hover:text-dazz-navy transition-colors ${isAr ? 'font-arabic uppercase-none flex-row-reverse' : 'uppercase'}`}
                  >
                    <Navigation size={14} /> {isAr ? 'الحصول على الاتجاهات' : 'GET DIRECTIONS'}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Location List Section */}
      <div className="w-full lg:w-1/3 h-[400px] lg:h-[600px] overflow-y-auto bg-slate-50 border-l border-slate-200">
        <div className="p-6">
          <h3 className={`text-xl font-bold font-serif text-slate-900 mb-6 flex items-center gap-2 ${isAr ? 'flex-row-reverse font-arabic' : ''}`}>
            <MapPin size={20} className="text-dazz-gold" /> {isAr ? 'مكاتبنا' : 'OUR OFFICES'}
          </h3>
          
          <div className="space-y-4">
            {locations.map((loc, index) => {
              const isActive = selectedId === loc.id;
              return (
                <div 
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`p-5 rounded-md cursor-pointer transition-all border ${
                    isActive 
                    ? 'bg-white border-dazz-gold shadow-md shadow-dazz-gold/10' 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`flex items-start justify-between gap-4 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <div className={`flex gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <div className="text-xl font-light text-slate-300 font-serif">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className={`font-bold font-serif text-lg mb-1 ${isActive ? 'text-dazz-navy' : 'text-slate-900'} ${isAr ? 'font-arabic' : ''}`}>
                          {getLangStr(loc.name)}
                        </h4>
                        <p className={`text-sm text-slate-500 mb-2 ${isAr ? 'font-arabic' : ''}`}>
                          {getLangStr(loc.city)}, {getLangStr(loc.country)}
                        </p>
                        {loc.type && (
                          <span className={`inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider rounded-sm ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                            {getLangStr(loc.type)}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={18} className={`shrink-0 transition-transform ${isActive ? 'text-dazz-gold' : 'text-slate-300'} ${isAr ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}
