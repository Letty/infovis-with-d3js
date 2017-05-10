# Journalists Killed since 1992

## Sources

* [Kaggle Dataset](https://www.kaggle.com/cpjournalists/journalists-killed-worldwide-since-1992)
* [Committee to Protect Journalists](https://cpj.org/)

## Description

* Type: CPJ classified deaths as motive confirmed or motive confirmed, as well as Media Workers
* Date_original : Date of the killing from original dataset
* Date : containes the original date, but nothing if there was an unclear date set
* Name: of the Journalist
* Sex
* Country_killed : country where the killing happend
* Organization: that the journalist was working for
* Nationality: of the journalist
* Medium: he was working for
* Job
* Coverage
* Freelance
* Local_Foreign: local or foreign of the country where the killing happend
* Source_fire
* Type_death
* Impunity_for_murder
* Taken_captive
* Threatened
* Tortured

## Some infos

* checking a date variable, if the date (via new Date()) is a valide date `if(isNaN(d.date)){ // not valid }`
