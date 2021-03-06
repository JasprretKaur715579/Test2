/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("btnweather").addEventListener("click", getweather);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');

        console.log('Received Event: ' + id);
    }
};

function getweather(){
    //alert('hello');
   
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position)
    {
        $("#geoloc").html("latitude:" + position.coords.latitude + "<br> longitude: " + position.coords.longitude);

        var lat = position.coords.latitude ;
        var long = position.coords.longitude;
        // alert('lat' + lat);
        // alert('long' + long);
      
        var weatherURL= "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=65fe47f3f95c8cf02f5ca6470bf8cdb6";
        $.getJSON(weatherURL).done(function(data){
            $("#Currentlocation").html("currentlocation:" + data.name);
            $("#current temp").html("current temp:" + data.main.temp);
            $("#Minimum temp").html("minimum temperature:" + data.main.temp_min);
            $("#Maximun temp").html("maximum temperature:" + data.main.temp_max);
            $("#Wind").html("wind speed:" + data.wind.speed);
            $("#Humidity").html("humidity in environmnt:" + data.main.humidity);
            $("#Pressure").html("pressure:" + data.main.pressure);
            $("#Subweather").html("subweather:" + data.weather.main);
            $("#Sunrise").html("sunrise:" + data.sys.sunrise);
            $("#Sunset").html("sunset:" + data.sys.sunset);
            
        });
    },function(er){
        alert(er.message);
    });
}
}