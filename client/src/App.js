import React from 'react';

// Pass the props as parameters
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    // The join component
    <Router>
        <Route path="/" exact component = {Join} />
        <Route path="/chat" exact component = {Chat} />
    </Router>
)

export default App;