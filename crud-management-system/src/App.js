import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';

function App() {
  return (
    <Router> {/* Set up the Router component for managing application routing */}
      <Switch> {/* Render the first matching route */}
        <Route exact path="/" component={PersonList} /> {/* Render PersonList component at the root URL */}
        <Route path="/add" component={PersonForm} /> {/* Render PersonForm component when the "/add" path is matched */}
        <Route path="/edit/:id" component={PersonForm} /> {/* Render PersonForm component when the "/edit/:id" path is matched */}
      </Switch>
    </Router>
  );
}

export default App;