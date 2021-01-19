import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import SearchBooks from './SearchBooks/SearchBooks';
import BookTransactions from './BookTransactions/BookTransactions';
function App() {
  return (
    <Router>
      <Route path="/">
        <Layout>
          <Switch>
            <Route path="/search-books" component={SearchBooks} />
            <Route path="/book-transactions" component={BookTransactions} />
          </Switch>
        </Layout>
      </Route>
    </Router>
  );
}

export default App;
