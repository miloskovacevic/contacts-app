angular.module('ContactsApp',['ngRoute','ngResource','ngMessages'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/contacts',{
                templateUrl:'views/list.html',
                controller: 'ListController'
            })
            .when('/contact/new',{
                templateUrl: 'views/new.html',
                controller: 'NewController'
            })
            .when('/contact/:id', {
                templateUrl: 'views/single.html',
                controller: 'SingleController'
            })
            .when('/settings', {
                templateUrl: 'view/settings.html',
                controller: 'SettingsController'
            })
            .otherwise({
               redirectTo: '/contacts'
            });
        $locationProvider.html5Mode(true);
    })
    .value('options', {})
    .run(function (options, Fields) {
        Fields.get().success(function (data) {
            options.displayed_fields = data;
        });
    });