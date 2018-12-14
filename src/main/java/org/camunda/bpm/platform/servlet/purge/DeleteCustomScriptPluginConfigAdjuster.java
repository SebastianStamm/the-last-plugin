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

import java.util.List;

public class DeleteCustomScriptPluginConfigAdjuster extends ConfigAdjuster {

  private String pluginId;
  private List<String> ngDeps;

  public void setPluginId(String pluginId) {
    this.pluginId = pluginId;
  }

  public void setNgDeps(List<String> ngDeps) {
    this.ngDeps = ngDeps;
  }

  protected DocumentContext adjustCustomScripts(DocumentContext customScriptsContext) {
    String arrayPath = "$.customScripts";
    String arrayField = "ngDeps";
    for (String ngDep : ngDeps) {
      customScriptsContext = deleteEntryFromArray(customScriptsContext, arrayPath, arrayField, ngDep);
    }
    customScriptsContext = deleteEntryFromArray(customScriptsContext, "$.customScripts", "deps", pluginId);

    customScriptsContext = customScriptsContext.delete("$.customScripts.paths." + pluginId);
    return customScriptsContext;
  }
}
