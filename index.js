const template = `
<div class="dashboard">
  <h1>Plugin Store</h1>
  <h2>Available Plugins</h2>
  <ul>
    <li ng-repeat="plugin in uninstalledPlugins" style="    list-style: none;
    border: 1px solid black;
    display: inline-block;
    background-color: white;
    padding: 15px;
    height: 250px;
    margin: 10px;
    position: relative;
    box-shadow: 5px 5px 5px lightgrey;">
      <img src="https://thecatapi.com/api/images/get?size=small&rnd={{plugin.id}}" style="height: 100%;" />
      <div style="float: right; margin-left: 15px; width: 300px;">
        <h3>{{plugin.title}}</h3>
        <p>{{plugin.description}}</p>
        </div>
      <button style="position: absolute; bottom: 15px; right: 15px;
      display:inline-block;
      padding:0.7em 1.4em;
      margin:0 0.3em 0.3em 0;
      border-radius:0.15em;
      box-sizing: border-box;
      text-decoration:none;
      font-family:'Roboto',sans-serif;
      text-transform:uppercase;
      font-weight:400;
      color:#FFFFFF;
      background-color:#3369ff;
      box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
      text-align:center;
      border: none;
      width: 100px;
      ">Install</button>
    </li>
  </ul>
</div>
`;

define(["angular"], function(angular) {
  var ngModule = angular.module("cockpit.pluginStore", []);

  ngModule.config([
    "ViewsProvider",
    "$routeProvider",
    function(ViewsProvider, routeProvider) {
      routeProvider.when("/plugins", {
        template,
        controller: [
          "$scope",
          function($scope) {
            $scope.$root.showBreadcrumbs = false;

            console.log("fetching all plugins");
            $scope.availablePlugins = [
              {
                id: "a",
                title: "Sample Plugin",
                description:
                  "This is a normal sample plugin. It conains a quite long description, so that we can test the line breaking"
              },
              {
                id: "b",
                title: "Another Sample Plugin",
                description: "This is another sample plugin"
              }
            ];

            console.log("fetching installed plugins");
            $scope.installedPlugins = [];

            $scope.uninstalledPlugins = $scope.availablePlugins.filter(
              ({ id }) => !$scope.installedPlugins.includes(id)
            );
          }
        ],
        authentication: "required"
      });

      ViewsProvider.registerDefaultView("cockpit.navigation", {
        id: "cockpit.pluginStore",
        label: "Plugin Store",
        pagePath: "#/plugins",
        priority: 9001,
        checkActive: function(path) {
          return path.indexOf("#/plugins") > -1;
        }
      });
    }
  ]);

  return ngModule;
});
