import React from 'react';
import Button from './button.jsx';

const helloWorld = () => (<section>
  <h1>Hello from React!</h1>
  <Button
    text="click me carajo!"
    onclick={() => console.log('This is a silly function')} />
</section>);

export default helloWorld;
