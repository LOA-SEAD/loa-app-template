/*
 * app/config/path.js
 *
 * Defines global paths of the application.
 *
 * Created at: 07/27/2014
 * Updated at: 07/27/2014
 * 
 */

App.path = {
    mainController: 'app.js',

    controller: App.url + 'app/controller/',
    model:      App.url + 'app/model/',
    view :      'text!' + App.url + 'app/view/',

    public: App.url + 'public/',

    config: App.url + 'app/config/',
    lib:    App.url + 'app/lib/',
    util:   App.url + 'app/util/',
}
