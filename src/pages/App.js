import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router,Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Route path="/">
        <Layout/>
      </Route>
    </Router>
  );
}

export default App;
