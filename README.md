## Hybrid Mobile Development

This project repository is a part of CS4404 class of 1/2017.

Silapin Narthasilpa 5710944


## Carpooling Application


This application provides the sharing of car journeys so that more than one person travels in cars. By having more people using one vehicle, carpooling reduces each person's travel costs and the stress of driving.

## Features
* People who are drivers can share car journeys with specifying the start point, destination, and number of passengers.
* People who are passengers can search by the destination and request to join planned car journeys.
* Every request by passengers depends on the drivers either to accept if they are comfortable to pick up or to reject if they are not.
* In-app notifications are used to notify users when there is any request form passengers and any accept or rejection from drivers.
* **Google Maps** is used to specify the location and determine where people are.
* **Google Sign-In** and **Facebook API** are used for account creation.

## How to use this template
Install the latest version of [NodeJS](https://nodejs.org/en/download/). After that, install **Ionic CLI** by using the command below:

```bash
$ sudo npm install -g ionic cordova   // MacOS
$ npm install -g ionic cordova        // Windows
```

Clone this repository and start the application by using the command below:

```bash
$ git clone https://github.com/silapinbenz/hybrid-mobile-carpool.git
$ cd hybrid-mobile-carpool
$ npm install
$ ionic serve
```



