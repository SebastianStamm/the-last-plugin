define(["angular"], function(angular) {
  var ngModule = angular.module("cockpit.pluginStore", []);

  ngModule.config([
    "ViewsProvider",
    "$routeProvider",
    function(ViewsProvider, routeProvider) {
      routeProvider.when("/plugins", {
        template: "<p>Hello world</p>",
        controller: [
          "$scope",
          function($scope) {
            $scope.$root.showBreadcrumbs = false;
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
