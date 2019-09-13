// Services
import React from 'react';

// Constants

// Components
import ChainInfo from '../components/ChainInfo';
import Parameters from '../components/Parameters';
import Streams from '../components/Streams';
import Addresses from '../components/Addresses';
import Consensus from '../components/Consensus';
import Assets from '../components/Assets';
import Peers from '../components/Peers';

export default function Body({ props }) {


  return (
    <div style={{ marginTop: 100 }}>
      <ChainInfo props={props} />
      <Parameters props={props} />
      <Streams props={props} />
      <Addresses props={props} />
      <Assets props={props} />
      <Consensus props={props} />
      <Peers props={props} />
    </div>
  );
}
