import GoogleMapReact from "google-map-react";
import { LocationPin } from "./LocationPin";

export const Map = ({ location, GOOGLE_KEY }) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: GOOGLE_KEY,
            }}
            defaultCenter={location}
            defaultZoom={12}
        >
            <LocationPin lat={location.lat} lng={location.lng} />
        </GoogleMapReact>
    );
};
