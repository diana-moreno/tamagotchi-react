import React from 'react';
import '../style.css';
// import '../sprites.css';

const App = () => (
  <main>
    <div className={'container'}>
      <div className={'inner'}>
        <div className={'game day'}></div>
        <div className={'fox hidden'}></div>
        <div className={'poop-bag hidden'}></div>
        <div className={'foreground-rain'}></div>
        <div className={'modal'}>
          <div className={'modal-inner'}>Press the middle button to start</div>
        </div>
        <div className={'frame'}></div>
        <div className={'buttons'}>
          <div className={'btn left-btn'}></div>
          <div className={'btn middle-btn'}></div>
          <div className={'btn right-btn'}></div>
        </div>
        <div className={'icons'}>
          <div className={'icon highlighted fish-icon'}></div>
          <div className={'icon poop-icon'}></div>
          <div className={'icon weather-icon'}></div>
        </div>
      </div>
    </div>
  </main>
);

export default App;
