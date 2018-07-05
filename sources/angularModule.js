var MY_TOTAL_APP = angular.module("myApp", []);

MY_TOTAL_APP.controller('myLittleController', ['$scope', '$timeout', '$http', '$q', '$rootScope',

    function ($scope, $timeout, $http, $q, $rootScope) {
        var vm = this;
        vm.textareaModel='';

        $rootScope.$on('myCustomEvent', function (event, value) {
            vm.textareaModel = value.someProp;
        });

        vm.look = function(){
            console.info('vm.textareaModel= ' + JSON.stringify(vm.textareaModel, null, 2)); //JSON.stringify(vm.textareaModel, null, 2)
        }

        vm.isTotalLoadedAndShown=false;
        vm.isTotalLoadedAndShownFunc = function (varChange) {
            if(varChange == false){
                vm.isTotalLoadedAndShown = true;
            }else{
                vm.isTotalLoadedAndShown = false;
            }
        }
        vm.downloadFunc = function () {
            var promise = $http.get('/users/static/myJson.JSON');
            promise.then(function (response) {
                debugger;
                vm.textareaModel='';
                vm.textareaModel = response.data;

            });
        }

        vm.saveFunc = function(){
            data = {myJson: vm.textareaModel}
            debugger;
            var promise = $http.post('/users/static/send_json', data , {
                headers: {'Content-Type': 'application/json'}
            });
            promise.then(function (e){
                console.log(e.status);
            }).catch(function(error) {
                console.log(error.status);
            });

        }

        vm.clearFunc = function(){
            vm.textareaModel='';
        }
    }
]);

MY_TOTAL_APP.directive('lookDirective', ['$rootScope', function ($rootScope) {
    return {
        scope: {
            info: "=lookDirective"
        },
        link: function (scope, element, attr) {
            //debugger;
            var extendeElem = $(element);
            var info = scope.info;

            extendeElem.on('DOMSubtreeModified',function(){
                $rootScope.$emit('myCustomEvent', {
                    someProp: JSON.parse(extendeElem.text())
                });
            });
        }
    }
}]);