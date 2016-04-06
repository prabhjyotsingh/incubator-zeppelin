'use strict';

angular.module('zeppelinUI')
  .directive('shelves', function() {

    return {
      templateUrl: 'components/shelves/shelves.html',
      restrict: 'E',
      scope: {},
      replace: true,
      controller: function($scope, vl, jsondiffpatch, Spec, Config, Dataset, Logger, Pills) {
        $scope.Spec = Spec;
        $scope.schema = vl.schema.schema;
        $scope.pills = Pills;

        $scope.markChange = function() {
          Logger.logInteraction(Logger.actions.MARK_CHANGE, Spec.spec.marktype);
        };

        $scope.transpose = function() {
          vl.Encoding.transpose(Spec.spec);
        };

        $scope.clear = function() {
          Spec.reset();
        };

        $scope.$watch('Spec.spec', function(spec, oldSpec) {
          Logger.logInteraction(Logger.actions.SPEC_CHANGE, spec, jsondiffpatch.diff(oldSpec, spec));

          Spec.update(spec);
        }, true /* watch equality rather than reference */);
      }
    };
  });
