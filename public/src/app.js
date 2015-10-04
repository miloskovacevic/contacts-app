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
            });
        $locationProvider.html5Mode(true);
    });