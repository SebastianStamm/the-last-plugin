/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.camunda.bpm.platform.servlet.purge;

import com.jayway.jsonpath.DocumentContext;

public class InitialConfigAdjuster extends ConfigAdjuster {

  protected DocumentContext adjustCustomScripts(DocumentContext customScriptsContext) {
    String arrayPath = "$.customScripts";
    String arrayField = "ngDeps";
    String value = "cockpit.pluginStore";
    customScriptsContext = addEntryToArray(customScriptsContext, arrayPath, arrayField, value);
    customScriptsContext = addEntryToArray(customScriptsContext, "$.customScripts", "deps", "pluginStore");

    customScriptsContext = customScriptsContext.set("$.customScripts.paths.pluginStore", "scripts/pluginStore/index");
    Object pathPluginStore = customScriptsContext.read("$.customScripts.paths.pluginStore");
    if (pathPluginStore == null) {
      customScriptsContext = customScriptsContext.put(
        "$.customScripts.paths",
        "pluginStore",
        "scripts/pluginStore/index"
      );
    }
    return customScriptsContext;
  }
}
