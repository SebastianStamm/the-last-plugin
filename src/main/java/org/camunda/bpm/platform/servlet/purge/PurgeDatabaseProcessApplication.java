package org.camunda.bpm.platform.servlet.purge;

import org.camunda.bpm.application.PostDeploy;
import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.application.impl.ServletProcessApplication;
import org.camunda.bpm.engine.ProcessEngine;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.Optional;

/**
 * Simple process application to purge engine database in a clean manner.
 * <p>
 * Intended to be deployed along side with shared engine and used by unit tests to
 * properly reset state of database to clean.
 */
@ProcessApplication
public class PurgeDatabaseProcessApplication extends ServletProcessApplication {

  /**
   * Publish management service to servlet context.
   */
  @PostDeploy
  public void purgeDatabase(ProcessEngine ignoredProcessEngine) throws IOException {

    String path = Objects.requireNonNull(this.getClass().getClassLoader().getResource("")).getPath();
    if (isWindows()) {
      path = path.replaceFirst("/", "");
    }
    System.out.println("Path of calss loader: " + path);

    Path foo = Paths.get(path);
    Path webapps = foo.getParent().getParent().getParent();
    Path scripts = webapps.resolve("camunda" + File.separator + "app" + File.separator +
                                     "cockpit" + File.separator + "scripts");
    System.out.println("Resolved path: " + scripts.toString());

    Path pluginStorePath = scripts.resolve("pluginStore");
    Files.createDirectories(pluginStorePath);

    Optional<Path> indexJsPath = Files.walk(Paths.get(path))
      .filter(f -> f.getFileName().toString().equals("index.js"))
      .findFirst();

    indexJsPath.ifPresent(
      jsPath -> {
        try {
          Files.copy(jsPath, pluginStorePath.resolve("index.js"), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    );


  }

  private static String OS = System.getProperty("os.name").toLowerCase();

  public static boolean isWindows() {

		return (OS.indexOf("win") >= 0);

	}

}
