<br/>

  <h1 align="center">Animal Tracker</h1>

  <p align="center">
    Application used to keep track of the pet's location.
    <br/>
    <br/>
    <a href="https://youtu.be/Zyi2qndGsR4">View Demo</a>
  </p>
</p>

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Usage](#usage)


## About The Project

![1](https://github.com/Sovellusprojektit/Animal-Tracker/assets/99178278/e1fa7774-bd35-4f43-b7ae-37343155f067) ![2](https://github.com/Sovellusprojektit/Animal-Tracker/assets/99178278/789c88ca-c3dc-4f64-8a31-07864f274ee0)

![3](https://github.com/Sovellusprojektit/Animal-Tracker/assets/99178278/0fd75caa-282e-485f-8cdd-1435c4cafc00) ![4](https://github.com/Sovellusprojektit/Animal-Tracker/assets/99178278/79413615-5f7f-40ef-bcdb-79589eb2b64d)




The Project was created as a group project for a free-choice course "Product Design and Implementation" for Oulu University of Applied Sciences in the autumn term of 2023. We got to decide the subject and ended up creating the Animal Tracker app. 
The application allows the user to keep track of their pets whereabouts in real-time, displayed on a terrain map. The user is also able to view past live-tracking sessions, which can be visualized on to the map.

## Built With

Application was made by using React Native/Javascript for Front-End and Java Spring-Boot/MySQL database for Backend. The terrain map has been retrieved from the National Land Survey of Finland's public API.
The backend is containerized using Docker, and was deployed to DigitalOcean during this course.

We are using this API for communication with Tractive's services:
<a href="https://github.com/FAXES/tractive">tractive</a>



## Usage

Data retrieved from Tractive includes many options, such as location, coordinates, speed, timestamps, and pet details. The application includes register and login functions. After registering and logging in, the user is able to view and change their information.
Since the data is retrieved from Tractive, using their hardware, the user is required to create an account on their service. With these credentials, our application is able to get all the necessary information from Tractive.

The application also features a History-page, where the user can visualize past tracking sessions by selecting a date. Due to Tractive's limitations, the user is only able to see past data for one 24h period at a time.



