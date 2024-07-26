import { createLayerComponent } from "@react-leaflet/core";
import L from "leaflet";
import "tilelayer-canvas";

const createLayer = (props, context) => {
  const instance = L.tileLayer.canvas(props.url, { ...props });

  return { instance, context };
};

const updateLayer = (instance, props, prevProps) => {
  // basic layer setters for any leaflet layer:
  if (prevProps.url !== props.url) {
    if (instance.setUrl) instance.setUrl(props.url);
  }
  if (prevProps.opacity !== props.opacity) {
    if (instance.setOpacity) instance.setOpacity(props.opacity);
  }
  if (prevProps.zIndex !== props.zIndex) {
    if (instance.setZIndex) instance.setZIndex(props.zIndex);
  }
};

const TilelayerCanvas = createLayerComponent(createLayer, updateLayer);

export default TilelayerCanvas;
