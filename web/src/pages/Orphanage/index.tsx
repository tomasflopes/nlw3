import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { useParams } from 'react-router-dom';

import SideBar from '../../components/SideBar';
import mapIcon from '../../utils/mapIcon';

import '../../styles/pages/orphanage.css';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  images: {
    id: number;
    url: string;
  }[];
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
}

interface OrphanageRouteParams {
  id: string;
}

export default function Orphanage() {
  const { id } = useParams<OrphanageRouteParams>();

  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  async function getOrphanageData() {
    const { data } = await api.get(`/orphanages/${id}`);

    console.log(data);
    setOrphanage(data);
  }

  useEffect(() => {
    getOrphanageData();
  }, [id]);

  if (!orphanage) return <p>Loading . . .</p>;

  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button
                type="button"
                className={activeImageIndex === index ? 'active' : ''}
                key={image.id}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Get the routes on Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instructions to the visit</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Monday to Friday <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  We're open <br />
                  on weekends
                </div>
              ) : (
                <div className="open-on-weekends not-open">
                  <FiInfo size={32} color="#ff669d" />
                  We're not open <br />
                  on weekends
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Get in touch
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
