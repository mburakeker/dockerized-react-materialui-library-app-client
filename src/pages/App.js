import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import SearchBooks from './SearchBooks/SearchBooks';
import ManageBooks from './ManageBooks/ManageBooks';
import BookTransactions from './BookTransactions/BookTransactions';
import DailyReports from './DailyReports.jsx/DailyReports';
import ManageMembers from './ManageMembers/ManageMembers';
function App() {
  return (
    <Router>
      <Route path="/">
        <Layout>
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route path="/search-books" component={SearchBooks} />
            <Route path="/manage-books" component={ManageBooks} />
            <Route path="/manage-members" component={ManageMembers} />
            <Route path="/book-transactions" component={BookTransactions} />
            <Route path="/daily-reports" component={DailyReports} />
          </Switch>
        </Layout>
      </Route>
    </Router>
  );
}

export default App;
