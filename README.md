# magic-store
* Usage:
    mvn package && java -jar target/magic-store-0.1.0.jar
    Browse http://localhost:8088/
* Reason why you used specific frameworks and libraries for the front-end and back-end
    Used Facebook React and jquery for the front-end for following reasons. 
    - Jquery provide a cross-browser API for HTML document traversal and manipulation, event handling and Ajax.
    - React make it possible to build Component-Based interactive UIs with javascript.     
    Used Spring Boot for the back-end.
    - Spring provide an easy-to-use IoC/DI framework.
    - It is very simple to write a RESTful service with Spring MVC.
    - Spring Boot provide facilities for unit test and debug.
* How the persistent layer could be implemented?
    - Create an RDB table to store inventory data.
    - implement the InventoryModel with a new class which access the RDB table using Hibernate or MyBatis.
    - Inject the new class to RestServiceController. 
* How long did it take you to create the code?
    - I spent about 10 hours to write the code and learn the Reach library.
