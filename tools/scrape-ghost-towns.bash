#!/usr/bin/env bash
curl "https://en.wikipedia.org/w/api.php?action=query&titles=List_of_ghost_towns_in_Alabama&prop=revisions&rvprop=content&format=json" | grep -oP '\|\|\[\[(.*?),' | cut -d \[ -f 3 | cut -d \, -f 1
#lol
