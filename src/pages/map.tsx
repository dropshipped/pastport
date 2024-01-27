import { MapView } from "~/components/mapview";

type Props = {}; // eslint-disable-line

const MapPage = ({}: Props) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <MapView />
    </div>
  );
};

export default MapPage;
