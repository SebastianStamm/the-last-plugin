package org.camunda.bpm.platform.servlet.purge;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import org.camunda.bpm.engine.impl.ManagementServiceImpl;
import org.eclipse.jgit.api.Git;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Servlet that deployes
 */
@WebServlet(name="DeployBasicProcessServlet", urlPatterns={"/*"})
public class PurgeServlet extends HttpServlet {
  private List<ManagementServiceImpl> managementServices;
  private ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public void init(ServletConfig config) throws ServletException {
    super.init(config);
    managementServices = (List<ManagementServiceImpl>) config.getServletContext().getAttribute("managementServices");
    this.objectMapper = new ObjectMapper();
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//    for (ManagementServiceImpl managementService : managementServices) {
//      PurgeReport purgeReport = managementService.purge();
//      resp.setCharacterEncoding("UTF-8");
//      resp.getWriter().println(objectMapper.writeValueAsString(purgeReport));
//    }
//    resp.getWriter().flush();
//    resp.setStatus(200);
//    resp.setContentType("application/json");
    try {
      if (Objects.equals("/plugins", req.getPathInfo())) {
        retrieveAllAvailablePlugins(resp);
      } else if (Objects.equals("/installed", req.getPathInfo())) {
        retrieveInstalledPlugins(resp);
      } else if (req.getPathInfo() != null  && req.getPathInfo().startsWith("/install?id")) {
        installPlugin(req.getPathInfo(), resp);
      } else if (req.getPathInfo() != null  && req.getPathInfo().startsWith("/uninstall?id")) {
        uninstallPlugin(req.getPathInfo(), resp);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.sendError(500);
    }

    System.out.println("Got request from: " + req.getServletPath());
    System.out.println("Context path: " + req.getContextPath());
    System.out.println("Path info: " + req.getPathInfo());
  }

  private void uninstallPlugin(String pathInfo, HttpServletResponse resp) {

  }

  private void installPlugin(String pathInfo, HttpServletResponse resp) {

  }

  private void retrieveInstalledPlugins(HttpServletResponse resp) {

  }

  private void retrieveAllAvailablePlugins(HttpServletResponse response) throws Exception {

    String classPath = Objects.requireNonNull(this.getClass().getClassLoader().getResource("")).getPath();
    Path classesFolderPath = Paths.get(classPath);
    Path webInfPath = classesFolderPath.getParent();
    Path camundaPluginStore = webInfPath.resolve("camunda-plugin-store");
    File camundaPluginStoreFolder = new File(camundaPluginStore.toString());
    Git git;
    if (!camundaPluginStoreFolder.exists()) {
      git = Git.cloneRepository()
      .setURI("https://github.com/SebastianStamm/camunda-plugin-store.git")
      .setDirectory(camundaPluginStoreFolder)
      .call();
    } else {
      git = Git.open(camundaPluginStoreFolder);
      git.pull().call();
    }

    List<CamundaPlugin> plugins = new ArrayList<>();
//    System.out.println("Pluginstorefolder: " + camundaPluginStore.toString());
    File[] directories = camundaPluginStoreFolder.listFiles(f -> f.isDirectory() && !f.getName().equals(".git"));
//    Arrays.stream(directories).forEach(System.out::println);
    for (File directory : Objects.requireNonNull(directories)) {
      CamundaPlugin plugin = new CamundaPlugin();
      plugin.setId(directory.getName());

//      Arrays.stream(directory.listFiles()).forEach(System.out::println);
      Optional<File> setupJson = Arrays.stream(Objects.requireNonNull(directory.listFiles()))
        .filter(l -> l.getName().equals("setup.json"))
        .findFirst();
      if (setupJson.isPresent()) {
        List<String> lines = Files.readAllLines(Paths.get(setupJson.get().getPath()), Charset.defaultCharset());
        String setupJsonAsString = String.join("", lines);
        DocumentContext context = JsonPath.parse(setupJsonAsString);
        String title = context.read("$.title");
        plugin.setTitle(title);
        String description = context.read("$.description");
        plugin.setDescription(description);
      }
      plugins.add(plugin);
    }

    response.setHeader("Content-Type", "application/json");
    response.setHeader("success", "yes");
    PrintWriter writer = response.getWriter();
    writer.write(objectMapper.writeValueAsString(plugins));
    writer.close();
  }


}
