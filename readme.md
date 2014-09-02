#Dynamischer Tile Container

## Zweck
Der sap.m.TileContainer lässt sich nicht per Datenbindung an eine Liste knüpfen, für die pro Eintrag eine Kachel erstellt.

Das soll mit dem dynamischen TileContainer möglich sein.

## Features
- Dynamischer Aufbau der Tiles anhand von DataBinding
- Linksbündige Ausgabe

## Known Issues
- Kacheltemplate ist im Container definiert, auch die Datenbindung pro Kacheleigenschaft.
- funktioniert aktuell nur mit einem "named model"
