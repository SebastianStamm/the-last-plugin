define(["angular"], function(angular) {
  var ngModule = angular.module("cockpit.pluginStore", []);

  ngModule.config([
    "ViewsProvider",
    "$routeProvider",
    "PluginsProvider",
    function(ViewsProvider, routeProvider, PluginsProvider) {
      routeProvider.when("/plugins", {
        template: "<p>Hello world</p>",
        controller: [
          "$scope",
          "Plugins",
          function($scope, Plugins) {
            $scope.$root.showBreadcrumbs = false;
            console.log("Plugins", Plugins.getAllProviders("view"));

            const groupedPlugins = Plugins.getAllProviders("view");

            const pluginCount = Object.values(groupedPlugins).reduce(
              (acc, curr) => acc + curr.length,
              0
            );

            console.log("count", pluginCount);
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

      console.log("plp", PluginsProvider);
    }
  ]);

  return ngModule;
});
