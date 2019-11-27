---
layout: doc
title: "Use Postman"
section: Postman
index: 2
---

## Using Postman

Once in your collection, the API reference allows you to interact with the API.

You can now open and edit your copy of the documentation.

To test your requests remember to change the **{ {domain} }** enviroment to sandbox. This can be set on the top right corner.

![enviroment](/assets/images/enviroment.png)

To see the code, go to the Body tab and rememeber you can save your changes after editing.

Examples can be found in the top right corner. Where both request and response are displayed.

Once you are done editing, you are able to share your changed documents if you wish to do so.

## Setting your API KEY

Once you have an api key, it can be tedious to paste it every time you want to send a request.
To avoid this you can set your api key as a variable so that it will automatically be set in postman.

To set your **api key**, click on the **eye icon** on the top right. There you can edit your global variables.

![api_key](/assets/images/set-api-key.png)

To set your api key, create a new global variable and name it **your_api_key**, and set the current value as your api key itself. 

Current values are stored locally and not on Postman servers.
