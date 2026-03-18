# Part 3: Web Service Integration

SVGMap.js's advanced and flexible tiling mechanism allows for a wide range of Jamstack patterns , significantly reducing the need for dynamic web services with high server overhead compared to traditional frameworks. (References: Tutorial using SVGMapTools , Quad Tree Composite Tiling and the standardization of tiling )

However, there are still many cases where dynamic service integration is required, so here we will implement a method to do this as a webApp layer that uses existing public web services. (Therefore, this tutorial will only cover using dynamic services and will not go into building the dynamic service itself. GeoServer , MapServer , PostgREST + PostGIS, etc. can be used for this implementation. SVGMap.org also publishes code for building a high-performance dynamic service called redisSvgMap. )

Because services are connected as individual layers, and the individual layers are composed (loosely coupled) into encapsulated applications ( Layers as WebApps ), this pattern can be considered a kind of micro-frontend (or composite UI ) type of microservices applied to maps.
