import { useLoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";
import { GG_MAPS_API_KEY } from "../../configs";

export default function GoogleWrapper(props: {children: ReactNode}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GG_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) 
    return <div>Couldn't load maps. Try again.</div>
  return <>{props.children}</>;
}