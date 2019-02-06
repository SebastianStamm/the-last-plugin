# The Last Camunda Plugin

This is literally the Last Camunda Plugin you will ever need. 
Once you have installed this plugin, a plugin store is added to your
Camunda WebApps. This allows you to install plugins using a web interface.

The list of all available plugins can be found in the following repository:
https://github.com/SebastianStamm/camunda-plugin-store

## Install The Last Plugin

Execute the following command to build the applicaiton:
```bash
mvn clean install
```
As a result you should find a `store.war` file in the `target` folder. 
In case you don't want to build the war file yourself, you can just
take the [version](./store.war) in the root directory of this repository.
Keep in mind that this version might be outdated and not contain all
bug fixes and features.

Copy the .war file to the following webapps folder of your shared application
server. For instance, on Tomcat you would copy it to the 
`/server/apache-tomcat-9.0.12/webapps` directory. Tomcat should then deploy
the application for you.

## Contributing Guide

There are several ways in which you may contribute to this project.

* [File issues](link-to-issue-tracker)
* Submit a pull request

## License

* [Apache License, Version 2.0](./LICENSE)
