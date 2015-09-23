var React = require('react');
React.initializeTouchEvents(true);
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var App = require('./scripts/App');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="user" path="/user/:userId" handler={require('./scripts/pages/User')}>
        <Route name="member" path="member" handler={require('./scripts/pages/Member')}>
            <Route name="search" path="search" handler={require('./scripts/pages/SearchMembers')} />
            <Route name="select" path=":term/select" handler={require('./scripts/pages/SelectMember')} />
            <Route name="details" path=":memberId/details" handler={require('./scripts/pages/MemberDetails')} />
            <Route name="categorydetails" path=":memberId/category/:categoryId" handler={require('./scripts/pages/CategoryDetails')} />
        </Route>
    </Route>
    <Route path="/login" handler={require('./scripts/pages/Login')}/>
    <DefaultRoute handler={require('./scripts/pages/Login')}/>
    <Route path="*" handler={require('./scripts/pages/NotFound')}/>
  </Route>
);

var thisRouter = Router.run(routes, function (Handler, state) {
	var params = state.params;
	React.render(<Handler params={params} router={Handler} state={state} />, document.getElementById('app'));
});
