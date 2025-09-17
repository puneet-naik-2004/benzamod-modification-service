
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = { width: '100%', height: '600px' }
const center = { lat: 12.99978, lng: 77.625526 }

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB-Ls_QJXCERwv3AA9yP7p1by0-bbPPibo',
  })

  return (
    <div
      style={{
        textAlign: 'center',
        margin: '20px 0',
        overflow: 'visible',          // <- helps if parent tries to clip
        position: 'relative',
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#4e1616ff',
          marginBottom: '15px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textDecoration: 'underline',
        }}
      >
        Our Location on Map
      </h2>

      {/* Map */}
      <div style={{ marginBottom: 20 }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <p>Loading Map...</p>
        )}
      </div>

      {/* Address & Time */}
      <div
        style={{
          margin: '0 auto',
          padding: '20px',
          maxWidth: 520,
          borderRadius: 12,
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          textAlign: 'left',
        }}
      >
        <h3 style={{ marginBottom: 10 }}>📍 Address</h3>
        <p style={{ margin: '5px 0' }}>
          123, MG Road,<br />
          Near Central Mall,<br />
          Bengaluru, Karnataka — 560001
        </p>

        <h3 style={{ margin: '15px 0 10px' }}>⏰ Working Hours</h3>
        <p style={{ margin: '5px 0' }}>Mon – Sat: 10:00 AM – 8:00 PM</p>
        <p style={{ margin: '5px 0' }}>Sunday: Closed</p>
      </div>
    </div>
  )
}

export default React.memo(MyComponent)
