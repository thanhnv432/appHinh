
'use client';

import { MapContainer, Marker, TileLayer, Tooltip, Popup, useMap, ZoomControl, LayersControl, Pane } from "react-leaflet"
import { Slider, Switch } from 'antd';
// import { ZoomControl } from 'react-leaflet/ZoomControl'
// import { LayersControl } from 'react-leaflet/LayersControl'
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Collapse, Checkbox, Space, Row, Col } from 'antd';
import { useLeafletContext } from '@react-leaflet/core'
const { Header, Sider, Content } = Layout;



export default function Map(props) {

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // function ChangeMapView({ coords }) {
  //   const map = useMap();
  //   map.setView(coords, map.getZoom());
  //   return null;
  // }

  const [map, setMap] = useState(null)
  const { zoom, style } = props
  const position = { lat: 20.0462334, lng: 106.099291 }



  function addTTLayer(name,url) {
    const [sttLayer, setSttLayer] = useState(false)
    const [opacityNum, setOpacityNum] = useState(1)


    var _componentslayer = L.tileLayer(url, {
      opacity: opacityNum,
      zindex: 351
    })
    _componentslayer.name = name



    return (
      <Row>
        <Col span={8} style={{
          paddingTop: '3px'
        }}>
          <Switch
            size="small"
            //checked={}
            checkedChildren='OFF'
            unCheckedChildren='ON'
            onChange={(value) => {
              // console.log(value, map)
              setSttLayer(!sttLayer)
              if (!map) return;

              map.createPane('qh-mc');
              map.getPane('qh-mc').style.zIndex = 401;
              if (value) {
                map.eachLayer(function (layer) {
                  if (layer.name && layer.name === name) {
                    map.removeLayer(layer)
                  }
                });
                _componentslayer.options.pane = 'qh-mc'
                map.addLayer(_componentslayer)
              } else {
                // if (map.hasLayer(_componentslayer)) {
                //   console.log('cuong')
                // }
                map.eachLayer(function (layer) {
                  if (layer.name && layer.name === name) {
                    map.removeLayer(layer)
                  }
                });
              }

            }}
          />
        </Col>
        <Col span={16} >
          <Slider
            disabled={!sttLayer}
            min={0}
            max={1}
            step={0.01}
            onChange={(value) => {
              setOpacityNum(value)
              map.eachLayer(function (layer) {
                if (layer.name && layer.name === name) {
                  layer.setOpacity(value)
                }
              });
            }}
            defaultValue={1}
          />
        </Col>
      </Row>
    )
  }
  //scrollWheelZoom={false}
  const ResizeMap = () => {
    const map = useMap();
    map._onResize();
    return null;
  }; // <ResizeMap />

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth="0" theme="light"
      >
        <div className="demo-logo-vertical" />
        <Collapse
          className="Collapse-menu-mc"
          style={{
            margin: 5,
          }}
          size="small"
          items={[
            {
              key: '1',
              label: 'Lớp quy hoạch',
              children:
                addTTLayer('Lớp quy hoạch','https://tiles.windy.com/tiles/v10.0/darkmap/{z}/{x}/{y}.png')
              ,
            },
            {
              key: '2',
              label: 'Lớp quy hoạch2',
              children:
                addTTLayer('Lớp quy hoạch2','https://static1.cafeland.vn/cafelandData/upload/quyhoach/tiles/23/7050/2030/{z}/{x}/{y}.png')
              ,
            },
          ]}
        />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        /> */}
      </Sider>
      <Layout>

        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <MapContainer center={position} zoom={zoom} style={style} zoomControl={false}
            ref={setMap}
          >

            <div className="logo">
              <img src='./logo.png' style={{
                fontSize: '16px',
                width: 120,
                height: 50,
              }} />
            </div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                zIndex: 999,
                borderRadius: '0px 8px 8px 0px',
                color: 'black',
                background: 'white',
                top: 10,
                // fontSize: '16px',
                // width: 64,
                // height: 64,
              }}
            />

            <LayersControl position="topright">
              <LayersControl.BaseLayer name="Nền vệ tinh" checked> 
              <Pane style={{ zIndex: 400 }}>
                <TileLayer
                  zindex= "350"
                  url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                />
                 </Pane>
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Openstreetmap">
              <Pane  style={{ zIndex: 400 }}>
                <TileLayer
                  zindex="350"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                </Pane>
              </LayersControl.BaseLayer>

            </LayersControl >

            <ZoomControl position="topright" />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            {/* <ChangeMapView coords={position} /> */}
            {/* <BottomSheet open={true} blocking={false}>My awesome content here</BottomSheet> */}
          </MapContainer>
        </Content>
      </Layout>
    </Layout>
  );


}


