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
  display: inline-flex;
  background-color: white;
  padding: 15px;
  height: 250px;
  margin: 10px;
  width: 700px;
  position: relative;
  box-shadow: 5px 5px 5px lightgrey;
  overflow: hidden;
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

.pluginStore .removeOverlay {
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 51, 51, 0.15);
  padding-top: 65px;
  text-align: center;
  // filter: drop-shadow(0 0 0.75rem red);
  opacity: 0;
  transition: opacity 0.2s;
  color: red;
}

.pluginStore .removeOverlay span {
  transform: rotate(-20deg);
  display: inline-block;
  -webkit-text-stroke: 3px darkred;
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

.stamp {
	font-weight: 700;
	padding: 0.25rem 1rem;
	text-transform: uppercase;
	border-radius: 1rem;
	font-family: 'Courier';
	-webkit-mask-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png');
  -webkit-mask-size: 944px 604px;
}

.is-nope {
  color: #D23;
  border: 0.5rem double #D23;
	-webkit-mask-position: 2rem 3rem;
  font-size: 6rem;
}

.pluginStore > div > ul {
  transition: margin 1s;
}

#enterpriseHack li {
  background-color: lightyellow;
}

.git-fork {
  display: block;
  position: absolute;
  top: 3rem;
  right: -7rem;
  width: 25rem;
  line-height: 2em;
  height: 2em;
  transform: rotate(45deg);
  background-color: #b5152b;
  text-indent: .9em;
}
.git-fork a {
  position: relative;
  width: 100%;
  height: 100%;
  color: #dedede;
  display: block;
  text-align: center;
  text-decoration: none;
}
.git-fork a:hover {
  text-decoration: underline;
}
.git-fork a:before, .git-fork a:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 100%;
  border-bottom: 1px dashed #dedede;
}
.git-fork a:after {
  bottom: 0;
  top: auto;
  border-bottom-width: 0;
  border-top: 1px dashed #dedede;
}


</style>
<div class="dashboard pluginStore" style="background-color: #f3f3f3; padding: 0 15em;">
  <h1>Plugin Store</h1>
  <div ng-if="availablePlugins.length > 0">
    <h2>Available Plugins</h2>
    <ul>
      <li ng-repeat="plugin in availablePlugins">
        <img src="/store/image/{{plugin.id}}.png" style="height: 100%;" />
        <div style="float: right; margin-left: 15px;">
          <h3>{{plugin.title}}</h3>
          <p>{{plugin.description}}</p>
          </div>
        <button class="installButton" ng-click="install(plugin)" ng-if="!isInstalling(plugin) && !isInstalled(plugin)">Install</button>
        <button style="cursor: default;" class="installButton" ng-if="isInstalling(plugin)"><div class="loader"></div></button>
        <div class="successOverlay" id="overlay_{{plugin.id}}">
          <span class="checkmark">
            <div class="checkmark_stem"></div>
            <div class="checkmark_kick"></div>
          </span>
        </div>
      </li>
    </ul>
  </div>
  <div ng-if="installedPlugins.length > 0">
    <h2>Installed Plugins</h2>
    <ul>
      <li ng-repeat="plugin in installedPlugins">
        <img src="/store/image/{{plugin.id}}.png" style="height: 100%;" />
        <div style="float: right; margin-left: 15px;">
          <h3>{{plugin.title}}</h3>
          <p>{{plugin.description}}</p>
          </div>
        <button style="background-color:#ff3333;" class="installButton" ng-if="!isUninstalling(plugin) && !isUninstalled(plugin)" ng-click="uninstall(plugin)">Remove</button>
        <button style="background-color:#ff3333; cursor: default;" class="installButton" ng-if="isUninstalling(plugin)"><div class="loader"></div></button>
        <div class="removeOverlay" id="overlay_{{plugin.id}}">
          <span class="stamp is-nope">Removed</span>
        </div>
      </li>
    </ul>
  </div>
  <div style="position: absolute; top: 122px; opacity: 0; transform: scale(.5); transition: 1s;" id="enterpriseHack">
      <ul>
        <li style="width: 1420px;">
          <img src="https://www.livingwellaware.com/wp-content/uploads/2018/07/SUCCESS.jpg" style="height: 100%;" />
          <img src="https://docs.camunda.org/manual/7.10/webapps/cockpit/img/cockpit-heatmap.png" style="    position: absolute;
          height: 65%;
          top: 40px;
          right: 235px;" />
          <div style="float: right; margin-left: 15px; width: 500px;">
            <h3>Enterprise Edition</h3>
            <p>The right choice for accelerated development and rock-solid production deployments. The Camunda Enterprise Edition comes with Contractual Warranties, SLA based support (up to 24/7/365), Patch releases for further stability, Consulting and Training Services and a whole bunch of awesome Cockpit features!</p>
          </div>
          <a class="installButton" style="width: 180px; height: 50px; background-color: #ffe433; color: #333; line-height: 30px;" href="https://camunda.com/enterprise/" target="_blank">Find out more</a>
          <div class="git-fork">
            <a href="https://camunda.com/enterprise/">Camunda Certified</a>
          </div>

        </li>
      </ul>
    </div>
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
          async function($scope) {
            $scope.$root.showBreadcrumbs = false;

            console.log("fetching all plugins");
            const allPlugins = await fetch("/store/plugins");
            $scope.allPlugins = await allPlugins.json();

            console.log("fetching installed plugins");
            const installedReq = await fetch("/store/installed");
            $scope.installedPlugins = (await installedReq.json()).map(id =>
              $scope.allPlugins.find(plugin => plugin.id === id)
            );

            $scope.availablePlugins = $scope.allPlugins.filter(
              ({ id }) =>
                !$scope.installedPlugins.find(plugin => plugin.id === id)
            );

            $scope.installingPlugins = [];
            $scope.uninstallingPlugins = [];
            $scope.successPlugins = [];
            $scope.uninstalledPlugins = [];

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
              }, 1500);
            };

            $scope.uninstall = plugin => {
              console.log("should uninstall", plugin);
              $scope.uninstallingPlugins.push(plugin.id);
              setTimeout(() => {
                $scope.uninstalledPlugins.push(plugin.id);
                $scope.uninstallingPlugins = $scope.uninstallingPlugins.filter(
                  id => id !== plugin.id
                );
                document.querySelector("#overlay_" + plugin.id).style.opacity =
                  "1";
                $scope.$apply();
              }, 1000);
            };

            $scope.isInstalling = ({ id }) =>
              $scope.installingPlugins.includes(id);

            $scope.isUninstalling = ({ id }) =>
              $scope.uninstallingPlugins.includes(id);

            $scope.isInstalled = ({ id }) => {
              return $scope.successPlugins.includes(id);
            };
            $scope.isUninstalled = ({ id }) =>
              $scope.uninstalledPlugins.includes(id);

            $scope.$apply();
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

document.addEventListener("keydown", evt => {
  if (evt.key === "F7") {
    console.log("providing entreprise");
    const ul = document.querySelector(".pluginStore ul");
    ul.style.marginTop = "280px";

    setTimeout(() => {
      const ee = document.querySelector("#enterpriseHack");
      ee.style.opacity = "1";
      ee.style.transform = "scale(1)";
    }, 1000);
  }
  // console.log(evt.key);
});
