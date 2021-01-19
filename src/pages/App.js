import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import SearchBooks from './SearchBooks/SearchBooks';
function App() {
  return (
    <Router>
      <Route path="/">
        <Layout>
          <Switch>
            <Route path="/search-books" component={SearchBooks} />
          </Switch>
        </Layout>
      </Route>
    </Router>
  );
}

export default App;
