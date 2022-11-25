# Sample of the JDisc Web UI integration into third-party Web applications

## Technologies and observations

JDisc provides a GraphQL API for fetching/managing/controlling of the discovery data and discovery jobs.
This is a good way of integration from scripts or third party application. But sometime it is required to display JDisc data in JDisc's Web interface.
In this case you would get a new fields / layouts / theme in your application immediately after updating JDisc to a newer version.

Cross site IFrame-based integration
- Certificate
- CORS
- JDisc Web UI initialization workflow