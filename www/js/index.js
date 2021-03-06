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
var db = null;
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
        db = window.sqlitePlugin.openDatabase({
            name: 'example.db',
            location: 'default'
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    createKeyValueOnDb: function() {
        key = $('#key');
        value = $('#value');
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS KeyValue (key, value)');
            tx.executeSql('INSERT INTO KeyValue VALUES (?,?)', [key, value]);
        }, function(error) {
            $('#log').text('Transaction Error: ' + error.message);
        }, function() {
            $('#log').text('Success');
        });
        this.getKeyValueOnDb();
    },
    getKeyValueOnDb: function() {
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM KeyValue', [], function(tx, rs) {
                $('#log').text('Exceuted');
                var html = '';
                for (var i = 0, len = rs.rows.length; i < len; i++) {
                    html += '<td>' + ts.rows.item(i).key + '</td>'
                    html += '<td>' + ts.rows.item(i).value + '</td>'
                }
                $('#table').html(html);
            }, function(tx, error) {
                $('#log').text('SELECT error: ' + error.message);
            });
        });
    }
};