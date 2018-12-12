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

.pluginStore li {
  list-style: none;
  border: 1px solid black;
  display: inline-block;
  background-color: white;
  padding: 15px;
  height: 250px;
  margin: 10px;
  position: relative;
  box-shadow: 5px 5px 5px lightgrey;
}

.pluginStore .successOverlay {
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(51, 255, 83, 0.15);
  padding-top: 100px;
  text-align: center;
  filter: drop-shadow(0 0 0.75rem green);
  opacity: 0;
  transition: opacity 0.2s;
}

.checkmark {
  display:inline-block;
  width: 22px;
  height:22px;
  transform: scale(15) rotate(45deg);
  filter: drop-shadow(0 0 .4px green);
}

.checkmark div {
  background-color:#29e61a;
}

.checkmark_stem {
  position: absolute;
  width:3px;
  height:9px;
  left:11px;
  top:6px;
}

.checkmark_kick {
  position: absolute;
  width:3px;
  height:3px;
  left:8px;
  top:12px;
}

</style>
<div class="dashboard pluginStore">
  <h1>Plugin Store</h1>
  <h2>Available Plugins</h2>
  <ul>
    <li ng-repeat="plugin in uninstalledPlugins">
      <img src="https://thecatapi.com/api/images/get?size=small&rnd={{plugin.id}}" style="height: 100%;" />
      <div style="float: right; margin-left: 15px; width: 300px;">
        <h3>{{plugin.title}}</h3>
        <p>{{plugin.description}}</p>
        </div>
      <button class="installButton" ng-click="install(plugin)" ng-if="!isInstalling(plugin) && !isInstalled(plugin)">Install</button>
      <button style="cursor: default;" class="installButton" ng-if="isInstalling(plugin)"><div class="loader">Loading</div></button>
      <!--<button style="cursor: default; background-color: #33ff53;" class="installButton" ng-if="isInstalled(plugin)">Success</button>-->
      <div class="successOverlay" id="overlay_{{plugin.id}}">
      <span class="checkmark">
        <div class="checkmark_stem"></div>
        <div class="checkmark_kick"></div>
      </span>
      </div>
    </li>
  </ul>
  <h2>Installed Plugins</h2>
  <ul>
    <li ng-repeat="plugin in installedPlugins">
      <img src="https://thecatapi.com/api/images/get?size=small&rnd={{plugin.id}}" style="height: 100%;" />
      <div style="float: right; margin-left: 15px; width: 300px;">
        <h3>{{plugin.title}}</h3>
        <p>{{plugin.description}}</p>
        </div>
      <button style="background-color:#ff3333;" class="installButton" ng-click="uninstall(plugin)">Remove</button>
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
            $scope.installedPlugins = ["b"].map(id =>
              $scope.availablePlugins.find(plugin => plugin.id === id)
            );

            $scope.uninstalledPlugins = $scope.availablePlugins.filter(
              ({ id }) =>
                !$scope.installedPlugins.find(plugin => plugin.id === id)
            );

            $scope.installingPlugins = [];
            $scope.successPlugins = [];

            $scope.install = plugin => {
              console.log("should install", plugin);
              $scope.installingPlugins.push(plugin.id);
              setTimeout(() => {
                $scope.successPlugins.push(plugin.id);
                $scope.installingPlugins = $scope.installingPlugins.filter(
                  id => id !== plugin.id
                );
                document.querySelector("#overlay_" + plugin.id).style.opacity =
                  "1";
                $scope.$apply();
              }, 1000);
            };

            $scope.uninstall = plugin => {
              console.log("should uninstall", plugin);
            };

            $scope.isInstalling = ({ id }) =>
              $scope.installingPlugins.includes(id);

            $scope.isInstalled = ({ id }) => {
              return $scope.successPlugins.includes(id);
            };
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
