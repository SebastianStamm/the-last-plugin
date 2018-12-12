const template = `
<style>
.installButton {
  position: absolute; bottom: 15px; right: 15px;
  display:inline-block;
  padding:0.7em 1.4em;
  margin:0 0.3em 0.3em 0;
  border-radius:0.15em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  text-transform:uppercase;
  font-weight:400;
  background-color:#3369ff;
  color:#FFFFFF;
  box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
  text-align:center;
  border: none;
  width: 100px;
  height: 40px;
}
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 5px;
  margin: -18px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>
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
      <button class="installButton" ng-click="install(plugin)" ng-if="!isInstalling(plugin)">Install</button>
      <button style="background-color:#ffc733; cursor: default;" class="installButton" ng-if="isInstalling(plugin)"><div class="loader">Loading</div></button>
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

            $scope.installingPlugins = [];

            $scope.install = plugin => {
              console.log("should install", plugin);
              $scope.installingPlugins.push(plugin.id);
            };

            $scope.isInstalling = ({ id }) =>
              $scope.installingPlugins.includes(id);
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
