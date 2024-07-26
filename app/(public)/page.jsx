
import { Alert } from '_components';
import dynamic from 'next/dynamic'

export default MapHome;


const Map = dynamic(
  () => import('_components/Map'),
  { 
    loading: () => <p>A map is loading</p>,
    ssr: false
  }
)
function MapHome() {

  const pot = { lat: 15.536634, lng: 102.779852 }

    return (
        <>
      <Map center={pot} zoom={12} style={{ height: 'calc(100vh )' }} />


            {/* <Alert />
            <div className="col-md-6 offset-md-3 mt-5">
                {children}têt
            </div> */}
        </>



    );
}