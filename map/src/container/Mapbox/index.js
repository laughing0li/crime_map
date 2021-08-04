// eslint-disable-next-line
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Display from '../Display';
import axios from 'axios';
import RegionContext from '../../createContext'
import './index.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiZGRvczAwIiwiYSI6ImNrcmNzZTR3NzA3bjQyb28wZnZyZmZmN3MifQ.GfIqGnU5887K2bN127FWsg'

export default function Mapbox() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  // 初始化data为一个空数组，用于在加载子组件的时候进行判断
  const [data, setData] = useState([])
  // const [region, setRegion] = useState('Balcatta')

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/ddos00/ckrfteny64rro17p3jm65r6br',
      center: [115.8586, -31.9555],
      zoom: 10
    });
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('load', function () {
      map.current.addSource('states', {
        'type': 'vector',
        'url': 'mapbox://ddos00.2je5esu4'
      });

      map.current.addLayer({
        'id': 'state-borders',
        'type': 'line',
        'source': 'states',
        'source-layer': 'crime-8sujt3',
        'layout': {},
        'paint': {
          'line-color': '#627BC1',
          'line-width': 2
        }
      });
      map.current.on('click', function (e) {
        let states = map.current.queryRenderedFeatures(e.point, {
          // 需要与远程的layer名称相同
          layers: ['crime_layer']
        });
        if (states.length > 0) {
          document.getElementById('loc').innerHTML = states[0].properties.wa_local_2
        } else {
          document.getElementById('loc').innerHTML = ''
        }
        const region = document.getElementById('loc').innerHTML
        // 如果不排除region为空的情况，在点击地图的海的时候，会报错
        if (region !== '') {
          const fetchData = async () => {
            const results = await axios.get('api/crime/' + format_city_name(region) + '/');
            setData(results.data);
          };
          fetchData();
        }
      });

    })
  });

  function format_city_name(region) {
    let arr = region.toLowerCase().split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length)
    }
    let str = arr.join(" ");
    return str
  }

  return (
    <div>
      <div className='sidebar'>
        <div>
          <strong>Western Australia Crime Map</strong> <span id='mag'></span>
        </div>
        <div><strong>Location:</strong> <span id='loc'></span></div>
      </div>
      <div ref={mapContainer} className="map-container" />
      <RegionContext.Provider value={data}>
        {
          // 只有data的长度在不为0的情况下，才能加载子组件
          data.length !== 0 ? <Display /> : ""
        }
        {/* <YearlyDisplay /> */}
      </RegionContext.Provider>
    </div>

  );
}

