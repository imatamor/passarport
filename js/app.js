// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});
/*-------------------------------------------------------------------------------------------------------------------------------
/ Name: ready
/ Use: 
/ Description: Funciones que se cargan al momento de cargar el archivo
/------------------------------------------------------------------------------------------------------------------------------*/
$( document ).ready(function() 
{
  console.log('ready');
  $("#log").click(function(){
    console.log('log');
  });
})
/*-------------------------------------------------------------------------------------------------------------------------------
/ Name: wikitude
/ Use: 
/ Description: Funciones para el AR
/------------------------------------------------------------------------------------------------------------------------------*/
var world = {
    // Url/Path to the augmented reality experience you would like to load
    arExperienceUrl: "index.html",
    // The features your augmented reality experience requires, only define the ones you really need
    requiredFeatures: [ "image_tracking", "geo" ],
    // Represents the device capability of launching augmented reality experiences with specific features
    isDeviceSupported: false,
    // Additional startup settings, for now the only setting available is camera_position (back|front)
    startupConfiguration:
    {
        "camera_position": "back"
    },
    // Application Constructor
    initialize: function() {
        console.log('initialize');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log('bindEvents');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        console.log('onDeviceReady');
        world.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        world.wikitudePlugin.isDeviceSupported(world.onDeviceSupported, world.onDeviceNotSupported, world.requiredFeatures);
    },
    // Callback if the device supports all required features
    onDeviceSupported: function() {
      console.log('onDeviceSupported');
      world.wikitudePlugin.loadARchitectWorld(
        world.onARExperienceLoadedSuccessful,
        world.onARExperienceLoadError,
        world.arExperienceUrl,
        world.requiredFeatures,
        world.startupConfiguration
      );
      console.log('loadARchitectWorld');
    },
    // Callback if the device does not support all required features
    onDeviceNotSupported: function(errorMessage) {
        console.log('onDeviceNotSupported');
        alert(errorMessage);
    },
    // Callback if your AR experience loaded successful
    onARExperienceLoadedSuccessful: function(loadedURL) {
        /* Respond to successful augmented reality experience loading if you need to */
        console.log('onARExperienceLoadedSuccessful');
        app.wikitudePlugin.callJavaScript('createCircle(new AR.RelativeLocation(null, -10, 0), \'#97FF18\');');
        console.log('callJavaScript');
    },
    // Callback if your AR experience did not load successful
    onARExperienceLoadError: function(errorMessage) {
        console.log('onARExperienceLoadError');
        alert('Loading AR web view failed: ' + errorMessage);
    }

};

world.initialize();
