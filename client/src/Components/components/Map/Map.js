import GoogleMapReact from "google-map-react";
import { LocationPin } from "./LocationPin";

export const Map = ({ location }) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: "AIzaSyDbBLtZYkNccLcpYX0FElqEuZkI7O2NPu4",
            }}
            defaultCenter={location}
            defaultZoom={12}
        >
            <LocationPin lat={location.lat} lng={location.lng} />
        </GoogleMapReact>
    );
};
