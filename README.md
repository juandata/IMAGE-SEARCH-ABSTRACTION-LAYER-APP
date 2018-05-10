Image Search Abstraction Layer App
=================

A `full stack` JavaScript app that allows you to search for images.

**Description**:
This is one of the 10 FreeCodeCamp challenges designed to get the FCC backend certification. You can check the specific requirements here: [https://www.freecodecamp.org/challenges/image-search-abstraction-layer](https://www.freecodecamp.org/challenges/image-search-abstraction-layer)

This microservices is a `full stack` JavaScript App that allows you to search for images, change the pagination of the responses and check the query history. 

**User Stories**:
 - I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
 - I can paginate through the responses by adding a ?offset=2 parameter to the URL.
 - I can get a list of the most recently submitted search strings.

Example Creation Usage 
------------

 **Search an image with a query:**
 
 [https://image-search-abstraction-layer-app.glitch.me/api/imagesearch/say%20it%20again%20meme?offset=1](https://image-search-abstraction-layer-app.glitch.me/api/imagesearch/say%20it%20again%20meme?offset=1)

 **Response**
- 10 Json Objects containing the image url, snippet, thumbnail and context info of your query. 
Hint,
- At the end of your query add **?offset='x'** where **X** is the page number to be retrieved by the API 

 **Get last 10 queries **
 
 [
- 10 Json Objects containing the image url, snippet, thumbnail and context info of your query. 


Made by [Juan David Tabares Arce](https://juandavidarce.co/)
-------------------
