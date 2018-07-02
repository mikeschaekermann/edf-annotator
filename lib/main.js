/*
Copyright 2018 The EDF Annotator Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var CrowdCurioClient = require('crowdcurio-client');
require('./time-series-annotator');

global.csrftoken = $("[name='csrfmiddlewaretoken']").val();

// set UI vars
var DEV = window.DEV;
var task = window.task || -1;
var user = window.user || -1;
var experiment = window.experiment || -1;
var condition = window.condition || -1;
var containerId = window.container || 'task-container';
var containerElement = $('#' + containerId);

var config = convertKeysFromUnderscoreToCamelCase(window.config);
var task_config = convertKeysFromUnderscoreToCamelCase(window.task_config);
var apiClient = new CrowdCurioClient();
var apiClientConfig = {
    user: user,
    task: task,
}
if (experiment != -1) {
    apiClientConfig.experiment = experiment;
}
if (condition != -1) {
    apiClientConfig.condition = condition;
}
apiClient.init(apiClientConfig);
task_config.apiClient = apiClient;
function byId(a, b) {
    return (a.id - b.id);
}
apiClient.getNextTask('required', function(data) {
    if (!data || !data.id) {
        if (experiment != -1) {
            var workflowNextUrl = '/experiments/' + experiment + '/workflow/next/';
            $.ajax({
                url: workflowNextUrl,
                type: 'POST',
                data: {
                    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
                },
                dataType: 'json',
                success: function() {
                    window.location.reload();
                },
                error: function(error) {
                    window.location.reload();
                },            
            });
        }
        return;
    }
    apiClient.setData(data.id);
    var dataTaskConfig = convertKeysFromUnderscoreToCamelCase(data.content.task_config);
    $.extend(true, task_config, dataTaskConfig);
    containerElement.TimeSeriesAnnotator(task_config);
})

function convertKeysFromUnderscoreToCamelCase(a) {
    return JSON.parse(JSON.stringify(a, function (key, value) {
        if (value && typeof value === 'object' && !(value instanceof Array)) {
            var replacement = {};
            for (var k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                    replacement[underscoreToCamelCase(k)] = value[k];
                }
            }
            return replacement;
        }
        return value;
    }));
    function underscoreToCamelCase(string) {
        return string.replace(/(\_\w)/g, function(m){
            return m[1].toUpperCase();
        });
    }
}
