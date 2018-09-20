#!/bin/bash

# Use ./build-listener.sh [folder to listen to]. for example  ./build-listener.sh src

#FOLDER=$1
FILES=src/*.js
MAX_DATE=0
CHANGE=false
FIRST_RUN=true

# stat difference between Mac and Linux
if uname | grep -q "Darwin"; then
    mod_time="-f %m"
else
    mod_time="-c %Y"
fi

# loop through all the files and compare the timestamps. if the date changed... set the flag
get_max_date_from_folder () {

    for file in $FILES
    do
        local TIME=$(stat $mod_time $file)
        if (( TIME > MAX_DATE )); then

            # on first run we don't want to set the changed flag
            if [ "$FIRST_RUN" = false ]; then
                CHANGE=true
            fi

            MAX_DATE=$TIME
        fi
    done

    # on first run we don't want to set the changed flag
    if [ "$FIRST_RUN" = true ]; then
        FIRST_RUN=false
    fi
}

while true
do
    # check for changes
    get_max_date_from_folder

    # in case of a change - run the build
    if [ "$CHANGE" = true ]; then
        # echo "building"
        CHANGE=false
        # run the build ->
        cat $FILES > plugin/content-script.js
    fi
    sleep 5
done
