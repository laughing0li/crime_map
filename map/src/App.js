import React, { useState} from 'react';
import { Menu, Container } from 'semantic-ui-react'
import Mapbox from './container/Mapbox'

import './App.css';

export default function App() {

  const [activeItem, setActiveItem] = useState('Crime')
  const menu = ['Crime', 'Population']
  return (
    <div>
      <Menu stackable size='large' inverted>
        <Container>
          {
            menu.map(item => {
              return <Menu.Item key={item}
                    name={item}
                    active={activeItem === {item}}
                    onClick={() => { setActiveItem(item) }}
              >
                {item}
              </Menu.Item>
            })
          }

          <Menu.Item
            position='right'
            name='sign-in'
            onClick={() => { setActiveItem('sign-in') }}
          >
            Sign-in
          </Menu.Item>
        </Container>
      </Menu>
      <Container>
        <div>
            <Mapbox/>
        </div>
      </Container>
    </div>

  );
}

